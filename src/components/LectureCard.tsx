import Link from 'next/link';
import { FileText, Video, Calendar, BookOpen } from 'lucide-react';
import type { Lecture } from '@/lib/types';

export default function LectureCard({ lecture }: { lecture: Lecture }) {
  const hasArabic = /[\u0600-\u06FF]/.test(lecture.title);

  return (
    <Link href={`/lectures/${lecture.slug}`} className="block">
      <article className="card p-6 h-full flex flex-col">
        {/* Category + Surah */}
        <div className="flex items-center flex-wrap gap-2 mb-3">
          {lecture.category && (
            <span className="badge">{lecture.category}</span>
          )}
          {lecture.surah && (
            <span className="badge-gold badge">{lecture.surah}</span>
          )}
        </div>

        {/* Title */}
        <h3
          className="text-base font-semibold leading-snug mb-2 line-clamp-2"
          style={{
            fontFamily: hasArabic ? 'var(--font-arabic), var(--font-heading)' : 'var(--font-heading)',
            color: 'var(--color-ink)',
          }}
        >
          {lecture.title}
        </h3>

        {/* Excerpt */}
        {lecture.excerpt && (
          <p
            className="text-sm leading-relaxed mb-4 line-clamp-3 flex-1"
            style={{ color: 'var(--color-muted)' }}
          >
            {lecture.excerpt}
          </p>
        )}

        {/* Bottom row */}
        <div
          className="flex items-center justify-between mt-auto pt-3 border-t"
          style={{ borderColor: 'var(--color-border)' }}
        >
          <div className="flex items-center gap-3">
            {lecture.date && (
              <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--color-muted)' }}>
                <Calendar size={13} />
                {new Date(lecture.date + 'T00:00:00').toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {lecture.pdfUrl && (
              <span style={{ color: 'var(--color-teal)' }} title="PDF available">
                <FileText size={16} />
              </span>
            )}
            {lecture.videoId && (
              <span style={{ color: 'var(--color-teal)' }} title="Video available">
                <Video size={16} />
              </span>
            )}
            <BookOpen size={16} style={{ color: 'var(--color-muted)' }} />
          </div>
        </div>
      </article>
    </Link>
  );
}
