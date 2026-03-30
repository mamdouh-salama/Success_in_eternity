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

  const hasArabic = /[\u0600-\u06FF]/.test(lecture.title);

  // Split excerpt into parts: detect Arabic portions
  const renderContent = (text: string) => {
    // Simple approach: split on Arabic text chunks
    const parts = text.split(/([\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF][^\n]*[\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF])/g);
    return parts.map((part, i) => {
      const isArabicChunk = /[\u0600-\u06FF]/.test(part) && part.length > 5;
      if (isArabicChunk) {
        return (
          <span key={i} className="arabic inline">{part}</span>
        );
      }
      return <span key={i}>{part}</span>;
    });
  };

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

          {/* Content */}
          <div className="prose prose-custom max-w-none">
            <p className="text-lg leading-relaxed" style={{ color: 'var(--color-ink)' }}>
              {renderContent(lecture.excerpt)}
            </p>
          </div>

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
