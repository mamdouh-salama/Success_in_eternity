import type { Metadata } from 'next';
import Link from 'next/link';
import { FileText, Download, Calendar, BookOpen, Video } from 'lucide-react';
import { getAllPdfs } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Books — Success in Eternity',
  description:
    'Download books and written materials by Dr. Mamdouh Salama.',
};

export default function PdfsPage() {
  const pdfs = getAllPdfs();

  return (
    <div className="container-site animate-fade-in">
      {/* Page header */}
      <div className="page-header">
        <p
          className="text-sm font-medium tracking-widest uppercase mb-2"
          style={{ color: 'var(--color-gold)' }}
        >
          Library
        </p>
        <h1
          className="text-3xl md:text-4xl font-bold"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Books
        </h1>
        <p className="text-sm mt-2" style={{ color: 'var(--color-muted)' }}>
          {pdfs.length} downloadable book{pdfs.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Info note */}
      <div
        className="rounded-xl p-4 mb-8 flex items-start gap-3"
        style={{
          backgroundColor: 'color-mix(in srgb, var(--color-gold) 8%, transparent)',
          border: '1px solid color-mix(in srgb, var(--color-gold) 20%, transparent)',
        }}
      >
        <FileText size={18} className="mt-0.5 shrink-0" style={{ color: 'var(--color-gold)' }} />
        <p className="text-sm" style={{ color: 'var(--color-ink)' }}>
          This library is growing. More books will be added as they become available.
          Check back regularly for new materials.
        </p>
      </div>

      {/* PDF list */}
      <div className="space-y-4">
        {pdfs.map((pdf) => (
          <article
            key={pdf.id}
            className="card p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <div className="flex items-start gap-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                style={{
                  backgroundColor: 'color-mix(in srgb, var(--color-teal) 10%, transparent)',
                  color: 'var(--color-teal)',
                }}
              >
                <FileText size={24} />
              </div>
              <div>
                <h3
                  className="text-base font-semibold mb-1"
                  style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-ink)' }}
                >
                  {pdf.title}
                </h3>
                <div className="flex flex-wrap items-center gap-3">
                  {pdf.date && (
                    <span
                      className="flex items-center gap-1 text-xs"
                      style={{ color: 'var(--color-muted)' }}
                    >
                      <Calendar size={12} />
                      {new Date(pdf.date + 'T00:00:00').toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                  )}
                  {pdf.relatedLectureSlug && (
                    <Link
                      href={`/lectures/${pdf.relatedLectureSlug}`}
                      className="flex items-center gap-1 text-xs font-medium"
                      style={{ color: 'var(--color-teal)' }}
                    >
                      <BookOpen size={12} />
                      Related Lecture
                    </Link>
                  )}
                  {pdf.relatedVideoSlug && (
                    <Link
                      href={`/videos/${pdf.relatedVideoSlug}`}
                      className="flex items-center gap-1 text-xs font-medium"
                      style={{ color: 'var(--color-teal)' }}
                    >
                      <Video size={12} />
                      Related Video
                    </Link>
                  )}
                </div>
              </div>
            </div>
            <a
              href={pdf.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary whitespace-nowrap"
            >
              <Download size={16} />
              Download PDF
            </a>
          </article>
        ))}
      </div>

      {/* Empty state */}
      {pdfs.length === 0 && (
        <div className="text-center py-20">
          <FileText size={48} className="mx-auto mb-4" style={{ color: 'var(--color-muted)' }} />
          <p className="text-lg font-medium" style={{ color: 'var(--color-muted)' }}>
            No books available yet
          </p>
          <p className="text-sm mt-1" style={{ color: 'var(--color-muted)' }}>
            Check back soon for downloadable books
          </p>
        </div>
      )}
    </div>
  );
}
