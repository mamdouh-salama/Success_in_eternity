import type { Metadata } from 'next';
import { FileText, Download, Calendar, FlaskConical } from 'lucide-react';
import proposals from '@/data/research-proposals.json';

export const metadata: Metadata = {
  title: 'Research Proposals — Success in Eternity',
  description:
    'Academic research proposals by Dr. Mamdouh Salama exploring Quranic studies and Islamic scholarship.',
};

export default function ResearchProposalsPage() {
  return (
    <div className="container-site py-12">
      {/* Page header */}
      <div className="mb-8 pb-6 border-b" style={{ borderColor: 'var(--color-border)' }}>
        <p
          className="text-xs font-semibold uppercase tracking-widest mb-2"
          style={{ color: 'var(--color-gold)' }}
        >
          Academic Research
        </p>
        <h1
          className="text-3xl md:text-4xl font-bold"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Research Proposals
        </h1>
        <p className="text-sm mt-2" style={{ color: 'var(--color-muted)' }}>
          {proposals.length} research proposal{proposals.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Info note */}
      <div
        className="flex gap-3 p-4 rounded-xl mb-8"
        style={{
          backgroundColor: 'color-mix(in srgb, var(--color-teal) 8%, transparent)',
          border: '1px solid color-mix(in srgb, var(--color-teal) 20%, transparent)',
        }}
      >
        <FlaskConical size={18} className="mt-0.5 shrink-0" style={{ color: 'var(--color-teal)' }} />
        <p className="text-sm" style={{ color: 'var(--color-ink)' }}>
          Academic research proposals by Dr. Mamdouh Salama covering Quranic studies,
          Islamic scholarship, and interdisciplinary research.
        </p>
      </div>

      {/* Proposals list */}
      <div className="flex flex-col gap-4">
        {proposals.map((proposal: {
          id: number;
          title: string;
          slug: string;
          date: string;
          pdfUrl: string;
          description?: string;
        }) => (
          <div
            key={proposal.id}
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
                  backgroundColor: 'color-mix(in srgb, var(--color-teal) 12%, transparent)',
                }}
              >
                <FileText size={20} style={{ color: 'var(--color-teal)' }} />
              </div>
              <div className="min-w-0">
                <h2
                  className="font-semibold text-base leading-snug"
                  style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-heading)' }}
                >
                  {proposal.title}
                </h2>
                {proposal.description && (
                  <p className="text-sm mt-0.5 line-clamp-2" style={{ color: 'var(--color-muted)' }}>
                    {proposal.description}
                  </p>
                )}
                <div className="flex items-center gap-1 mt-1" style={{ color: 'var(--color-muted)' }}>
                  <Calendar size={12} />
                  <span className="text-xs">
                    {new Date(proposal.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                </div>
              </div>
            </div>

            <a
              href={proposal.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium shrink-0 transition-opacity hover:opacity-80"
              style={{
                backgroundColor: 'var(--color-teal)',
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
      {proposals.length === 0 && (
        <div className="text-center py-20">
          <FileText size={48} className="mx-auto mb-4" style={{ color: 'var(--color-muted)' }} />
          <p className="text-lg font-medium" style={{ color: 'var(--color-muted)' }}>
            No research proposals yet
          </p>
          <p className="text-sm mt-1" style={{ color: 'var(--color-muted)' }}>
            Check back soon for academic research materials
          </p>
        </div>
      )}
    </div>
  );
}
