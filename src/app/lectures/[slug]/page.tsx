import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  Calendar,
  FileText,
  Video,
  Tag,
  BookOpen,
  ExternalLink,
} from 'lucide-react';
import { getAllLectures, getLectureBySlug } from '@/lib/content';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const lectures = getAllLectures();
  return lectures.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const lecture = getLectureBySlug(slug);
  if (!lecture) return { title: 'Lecture Not Found' };
  return {
    title: `${lecture.title} — Success in Eternity`,
    description: lecture.excerpt || `Islamic lecture on ${lecture.title} by Dr. Mamdouh Salama.`,
  };
}

const ARABIC_RE = /[\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF]/;

/** True if the paragraph is predominantly Arabic text (>40% Arabic chars). */
function isArabicParagraph(text: string): boolean {
  const chars = [...text.trim()];
  if (chars.length === 0) return false;
  const arabicCount = chars.filter((c) => ARABIC_RE.test(c)).length;
  return arabicCount / chars.length > 0.4;
}

/**
 * Render a single paragraph, splitting inline Arabic chunks from English text.
 * Arabic chunks get the `arabic` class; predominantly-Arabic paragraphs get
 * both `arabic` and `quran-verse` classes.
 */
function ParagraphBlock({ text, index }: { text: string; index: number }) {
  const isArabic = isArabicParagraph(text);

  if (isArabic) {
    return (
      <p
        key={index}
        className="arabic quran-verse"
        dir="rtl"
        style={{
          fontFamily: 'var(--font-arabic), serif',
          fontSize: '1.25rem',
          lineHeight: '2',
          textAlign: 'right',
          padding: '0.75rem 1rem',
          margin: '1.25rem 0',
          borderRight: '4px solid var(--color-gold)',
          borderRadius: '0 4px 4px 0',
          background: 'var(--color-surface)',
          color: 'var(--color-ink)',
        }}
      >
        {text}
      </p>
    );
  }

  // Mixed paragraph — split inline Arabic runs
  const parts = text.split(/([^\u0000-\u007F\u0080-\u00FF\u0100-\u024F]*[\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF][^\n]*)/g);
  return (
    <p key={index} style={{ color: 'var(--color-ink)', lineHeight: '1.85', marginBottom: '1rem' }}>
      {parts.map((part, j) => {
        if (ARABIC_RE.test(part) && part.trim().length > 3) {
          return (
            <span
              key={j}
              className="arabic"
              dir="rtl"
              style={{
                fontFamily: 'var(--font-arabic), serif',
                fontSize: '1.1em',
                lineHeight: '2',
              }}
            >
              {part}
            </span>
          );
        }
        return <span key={j}>{part}</span>;
      })}
    </p>
  );
}

/** Split content on double newlines and render each block. */
function ContentRenderer({ content }: { content: string }) {
  if (!content) return null;

  const paragraphs = content
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <div className="prose prose-custom max-w-none">
      {paragraphs.map((para, i) => (
        <ParagraphBlock key={i} text={para} index={i} />
      ))}
    </div>
  );
}

export default async function LectureDetailPage({ params }: Props) {
  const { slug } = await params;
  const lecture = getLectureBySlug(slug);
  if (!lecture) notFound();

  const allLectures = getAllLectures();
  const related = allLectures
    .filter(
      (l) =>
        l.id !== lecture.id &&
        (l.category === lecture.category ||
          l.tags.some((t) => lecture.tags.includes(t)))
    )
    .slice(0, 4);

  const hasArabic = ARABIC_RE.test(lecture.title);

  // Use full content if available, otherwise fall back to excerpt
  const displayContent = lecture.content && lecture.content.length > lecture.excerpt.length
    ? lecture.content
    : lecture.excerpt;

  return (
    <div className="container-site animate-fade-in">
      {/* Back link */}
      <div className="pt-6 pb-4">
        <Link
          href="/lectures"
          className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
          style={{ color: 'var(--color-teal)' }}
        >
          <ArrowLeft size={16} />
          Back to Lectures
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main content */}
        <article className="lg:col-span-2">
          {/* Meta */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            {lecture.category && <span className="badge">{lecture.category}</span>}
            {lecture.surah && <span className="badge badge-gold">{lecture.surah}</span>}
            {lecture.surahNumber > 0 && (
              <span className="text-xs" style={{ color: 'var(--color-muted)' }}>
                Surah #{lecture.surahNumber}
              </span>
            )}
          </div>

          {/* Title */}
          <h1
            className="text-3xl md:text-4xl font-bold mb-4 leading-tight"
            style={{
              fontFamily: hasArabic
                ? 'var(--font-arabic), var(--font-heading)'
                : 'var(--font-heading)',
            }}
          >
            {lecture.title}
          </h1>

          {/* Date + tags */}
          <div className="flex flex-wrap items-center gap-4 mb-8 pb-6 border-b" style={{ borderColor: 'var(--color-border)' }}>
            {lecture.date && (
              <span className="flex items-center gap-1.5 text-sm" style={{ color: 'var(--color-muted)' }}>
                <Calendar size={14} />
                {new Date(lecture.date + 'T00:00:00').toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            )}
            {lecture.tags.map((tag) => (
              <span key={tag} className="flex items-center gap-1 text-xs" style={{ color: 'var(--color-muted)' }}>
                <Tag size={12} />
                {tag}
              </span>
            ))}
          </div>

          {/* Full Content */}
          <ContentRenderer content={displayContent} />

          {/* Action buttons */}
          <div className="flex flex-wrap gap-4 mt-10">
            {lecture.pdfUrl && (
              <a
                href={lecture.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <FileText size={18} />
                Download PDF
              </a>
            )}
            {lecture.videoId && (
              <a
                href={`https://www.youtube.com/watch?v=${lecture.videoId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                <Video size={18} />
                Watch Video
              </a>
            )}
            {lecture.sourceUrl && (
              <a
                href={lecture.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                <ExternalLink size={18} />
                View Original
              </a>
            )}
          </div>
        </article>

        {/* Sidebar: related lectures */}
        <aside>
          {related.length > 0 && (
            <div>
              <h3
                className="text-lg font-semibold mb-4 flex items-center gap-2"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                <BookOpen size={18} style={{ color: 'var(--color-teal)' }} />
                Related Lectures
              </h3>
              <div className="space-y-4">
                {related.map((r) => (
                  <Link
                    key={r.id}
                    href={`/lectures/${r.slug}`}
                    className="block card p-4 transition-colors"
                  >
                    <h4
                      className="text-sm font-medium leading-snug mb-1 line-clamp-2"
                      style={{ color: 'var(--color-ink)' }}
                    >
                      {r.title}
                    </h4>
                    <p className="text-xs line-clamp-2" style={{ color: 'var(--color-muted)' }}>
                      {r.excerpt}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
