import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  Calendar,
  Video,
  Tag,
  BookOpen,
} from 'lucide-react';
import { getAllLectures, getLectureBySlug } from '@/lib/content';
import DownloadPdfButton from '@/components/DownloadPdfButton';

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

/** Count Arabic characters in a string */
function arabicRatio(text: string): number {
  const chars = [...text.replace(/\s/g, '')];
  if (chars.length === 0) return 0;
  return chars.filter((c) => ARABIC_RE.test(c)).length / chars.length;
}

/**
 * Render a paragraph. Pure Arabic blocks (>70% Arabic) get styled as
 * Quranic verse blocks. Mixed content gets inline Arabic spans.
 * English prefixes like "Allah says:" are separated out cleanly.
 */
function ParagraphBlock({ text, index }: { text: string; index: number }) {
  const ratio = arabicRatio(text);

  // Check if this is a mixed line: English prefix + Arabic verse
  // e.g. "Allah says: لَيْسَ الْبِرَّ أَنْ تُوَلُّوا..."
  // Split the English prefix out so it doesn't end up inside the Arabic block
  const prefixMatch = text.match(
    /^([^\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF]{3,80}?)([:\s]+)([\u0600-\u06FF][\s\S]+)$/
  );
  if (prefixMatch && ratio > 0.4) {
    const [, englishPart, , arabicPart] = prefixMatch;
    const arabicOnly = arabicRatio(arabicPart);
    if (arabicOnly > 0.7) {
      // Render as: English label paragraph + Arabic verse block
      return (
        <div key={index}>
          <p style={{ color: 'var(--color-ink)', lineHeight: '1.85', marginBottom: '0.5rem' }}>
            {englishPart.trim()}
          </p>
          <div
            dir="rtl"
            style={{
              fontFamily: 'var(--font-arabic), serif',
              fontSize: '1.25rem',
              lineHeight: '2.2',
              textAlign: 'right',
              padding: '1rem 1.25rem',
              margin: '0.5rem 0 1.5rem 0',
              borderRight: '4px solid var(--color-gold)',
              borderRadius: '0 4px 4px 0',
              background: 'var(--color-surface)',
              color: 'var(--color-ink)',
            }}
          >
            {arabicPart.trim()}
          </div>
        </div>
      );
    }
  }

  // Pure Arabic block (Quranic verse) — >85% Arabic characters, no English prefix
  if (ratio > 0.85) {
    return (
      <div
        key={index}
        dir="rtl"
        style={{
          fontFamily: 'var(--font-arabic), serif',
          fontSize: '1.25rem',
          lineHeight: '2.2',
          textAlign: 'right',
          padding: '1rem 1.25rem',
          margin: '1.5rem 0',
          borderRight: '4px solid var(--color-gold)',
          borderRadius: '0 4px 4px 0',
          background: 'var(--color-surface)',
          color: 'var(--color-ink)',
        }}
      >
        {text}
      </div>
    );
  }

  // For paragraphs with some Arabic (inline), render with proper spans
  if (ARABIC_RE.test(text)) {
    // Split into segments: non-Arabic text vs Arabic text runs
    const segments: { text: string; isArabic: boolean }[] = [];
    let remaining = text;
    // Match Arabic runs (including tashkeel, spaces between Arabic words, punctuation)
    const arabicRunRe = /([\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF][\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF\u0020\u060C\u061B\u061F\u0640\u064B-\u065F\u0670]*[\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF])/g;
    let lastIdx = 0;
    let m;
    while ((m = arabicRunRe.exec(remaining)) !== null) {
      if (m.index > lastIdx) {
        segments.push({ text: remaining.slice(lastIdx, m.index), isArabic: false });
      }
      segments.push({ text: m[1], isArabic: true });
      lastIdx = m.index + m[0].length;
    }
    if (lastIdx < remaining.length) {
      segments.push({ text: remaining.slice(lastIdx), isArabic: false });
    }

    return (
      <p key={index} style={{ color: 'var(--color-ink)', lineHeight: '1.85', marginBottom: '1rem' }}>
        {segments.map((seg, j) => {
          if (seg.isArabic) {
            return (
              <span
                key={j}
                dir="rtl"
                style={{
                  fontFamily: 'var(--font-arabic), serif',
                  fontSize: '1.15em',
                  lineHeight: '2.2',
                  unicodeBidi: 'embed',
                }}
              >
                {seg.text}
              </span>
            );
          }
          return <span key={j}>{seg.text}</span>;
        })}
      </p>
    );
  }

  // Plain English paragraph
  return (
    <p key={index} style={{ color: 'var(--color-ink)', lineHeight: '1.85', marginBottom: '1rem' }}>
      {text}
    </p>
  );
}

/** Render a bullet/list item */
function ListItem({ text }: { text: string }) {
  // Check if it has Arabic inline
  if (ARABIC_RE.test(text)) {
    const segments = text.split(/([\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF][\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF\u0020-\u0040\u00AB\u00BB\u060C\u061B\u061F\u0640\u064B-\u065F\u0670\uFB50-\uFDFF\uFE70-\uFEFF]*)/g);
    return (
      <li style={{ color: 'var(--color-ink)', lineHeight: '1.85', marginBottom: '0.5rem' }}>
        {segments.map((seg, j) => {
          if (ARABIC_RE.test(seg) && seg.trim().length > 2) {
            return (
              <span
                key={j}
                dir="rtl"
                style={{
                  fontFamily: 'var(--font-arabic), serif',
                  fontSize: '1.1em',
                  lineHeight: '2',
                  unicodeBidi: 'embed',
                }}
              >
                {seg}
              </span>
            );
          }
          return <span key={j}>{seg}</span>;
        })}
      </li>
    );
  }
  return <li style={{ color: 'var(--color-ink)', lineHeight: '1.85', marginBottom: '0.5rem' }}>{text}</li>;
}

/** Split content into paragraphs and render each block. */
function ContentRenderer({ content }: { content: string }) {
  if (!content) return null;

  const paragraphs = content
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <div className="prose prose-custom max-w-none">
      {paragraphs.map((para, i) => {
        // Detect bullet-point lists (lines starting with •, -, or numbered)
        const lines = para.split('\n').map(l => l.trim()).filter(Boolean);
        const isList = lines.length > 1 && lines.every(l => /^[•\-\d]+[.)\s]/.test(l));
        if (isList) {
          return (
            <ul key={i} style={{ paddingLeft: '1.5rem', margin: '1rem 0' }}>
              {lines.map((line, j) => (
                <ListItem key={j} text={line.replace(/^[•\-\d]+[.)\s]+/, '')} />
              ))}
            </ul>
          );
        }
        return <ParagraphBlock key={i} text={para} index={i} />;
      })}
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

          {/* Date + tags + Download */}
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
            <span className="ml-auto">
              <DownloadPdfButton
                title={lecture.title}
                content={displayContent}
                date={lecture.date}
                category={lecture.category}
                pdfUrl={lecture.pdfUrl || undefined}
              />
            </span>
          </div>

          {/* Full Content */}
          <ContentRenderer content={displayContent} />

          {/* Action buttons */}
          <div className="flex flex-wrap gap-4 mt-10">
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
