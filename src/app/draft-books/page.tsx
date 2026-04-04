import type { Metadata } from 'next';
import { FileText, Download, Calendar, BookOpen } from 'lucide-react';
import draftBooks from '@/data/draft-books.json';

export const metadata: Metadata = {
  title: 'Draft Books — Success in Eternity',
  description:
    'Draft books and works in progress by Dr. Mamdouh Salama, shared for early review.',
};

export default function DraftBooksPage() {
  return (
    <div className="container-site py-12">
      {/* Page header */}
      <div className="mb-8 pb-6 border-b" style={{ borderColor: 'var(--color-border)' }}>
        <p
          className="text-xs font-semibold uppercase tracking-widest mb-2"
          style={{ color: 'var(--color-gold)' }}
        >
          Works in Progress
        </p>
        <h1
          className="text-3xl md:text-4xl font-bold"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Draft Books
        </h1>
        <p className="text-sm mt-2" style={{ color: 'var(--color-muted)' }}>
          {draftBooks.length} draft book{draftBooks.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Info note */}
      <div
        className="flex gap-3 p-4 rounded-xl mb-8"
        style={{
          backgroundColor: 'color-mix(in srgb, var(--color-gold) 8%, transparent)',
          border: '1px solid color-mix(in srgb, var(--color-gold) 20%, transparent)',
        }}
      >
        <BookOpen size={18} className="mt-0.5 shrink-0" style={{ color: 'var(--color-gold)' }} />
        <p className="text-sm" style={{ color: 'var(--color-ink)' }}>
          These books are drafts shared for early review. They are works in progress and have not
          yet been formally published.
        </p>
      </div>

      {/* Draft books list */}
      <div className="flex flex-col gap-4">
        {draftBooks.map((book: {
          id: number;
          title: string;
          slug: string;
          date: string;
          pdfUrl: string;
          description?: string;
        }) => (
          <div
            key={book.id}
            className="flex items-center justify-between gap-4 p-5 rounded-xl border transition-shadow hover:shadow-md"
            style={{
              backgroundColor: 'var(--color-surface)',
              borderColor: 'var(--color-border)',
            }}
          >
            <div className="flex items-center gap-4 min-w-0">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                style={{
                  backgroundColor: 'color-mix(in srgb, var(--color-gold) 12%, transparent)',
                }}
              >
                <FileText size={20} style={{ color: 'var(--color-gold)' }} />
              </div>
              <div className="min-w-0">
                <h2
                  className="font-semibold text-base leading-snug truncate"
                  style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-heading)' }}
                >
                  {book.title}
                </h2>
                {book.description && (
                  <p className="text-sm mt-0.5 line-clamp-1" style={{ color: 'var(--color-muted)' }}>
                    {book.description}
                  </p>
                )}
                <div className="flex items-center gap-1 mt-1" style={{ color: 'var(--color-muted)' }}>
                  <Calendar size={12} />
                  <span className="text-xs">
                    {new Date(book.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                </div>
              </div>
            </div>

            <a
              href={book.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium shrink-0 transition-opacity hover:opacity-80"
              style={{
                backgroundColor: 'var(--color-gold)',
                color: '#ffffff',
              }}
              download
            >
              <Download size={15} />
              Download PDF
            </a>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {draftBooks.length === 0 && (
        <div className="text-center py-20">
          <FileText size={48} className="mx-auto mb-4" style={{ color: 'var(--color-muted)' }} />
          <p className="text-lg font-medium" style={{ color: 'var(--color-muted)' }}>
            No draft books yet
          </p>
          <p className="text-sm mt-1" style={{ color: 'var(--color-muted)' }}>
            Check back soon for works in progress
          </p>
        </div>
      )}
    </div>
  );
}
