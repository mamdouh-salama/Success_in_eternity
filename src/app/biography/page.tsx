import type { Metadata } from 'next';
import { GraduationCap, Award, BookOpen, Mail } from 'lucide-react';
import { getBiography } from '@/lib/content';

export const metadata: Metadata = {
  title: 'About Dr. Mamdouh Salama — Success in Eternity',
  description:
    'Learn about Dr. Mamdouh Salama — MIT graduate, ASME Life Fellow, and dedicated Islamic scholar and educator.',
};

export default function BiographyPage() {
  const bio = getBiography();

  const books = [
    'Your Reflection on the Mirror of Islam',
    'Reflection on the Theme of the Chapters of the Qur\'an',
    'Journey through the Shoreless Ocean of the Meaning of Surat Al-Baqara',
    'The Myth of Abrogation (Naskh) in the Quran',
    'The Memoirs of the Prophet (PBUH)',
    'Reflections on Selected Verses of Qur\'an',
    'The Companions of the Prophet (PBUH)',
    'Divine Communications to the Believers',
    'Basis of Fiqh',
    'Foundational Principles for Verifying Islamic Information',
  ];

  return (
    <div className="container-site animate-fade-in">
      {/* Page header */}
      <div className="page-header">
        <p
          className="text-sm font-medium tracking-widest uppercase mb-2"
          style={{ color: 'var(--color-gold)' }}
        >
          Biography
        </p>
        <h1
          className="text-3xl md:text-4xl font-bold"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          About Dr. Mamdouh Salama
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main content */}
        <div className="lg:col-span-2">
          {/* Photo placeholder */}
          <div className="flex items-start gap-6 mb-10">
            <div
              className="w-24 h-24 md:w-32 md:h-32 rounded-2xl flex items-center justify-center shrink-0"
              style={{
                backgroundColor: 'color-mix(in srgb, var(--color-teal) 10%, transparent)',
                color: 'var(--color-teal)',
              }}
            >
              <span className="text-3xl md:text-4xl font-bold" style={{ fontFamily: 'var(--font-heading)' }}>
                MS
              </span>
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                {bio.name}
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                {bio.shortBio}
              </p>
            </div>
          </div>

          {/* Full biography */}
          <div className="prose prose-custom max-w-none">
            {bio.fullBio.split('\n\n').map((paragraph, i) => {
              // Check if it's a list section (starts with •)
              if (paragraph.includes('\n•') || paragraph.startsWith('•')) {
                const lines = paragraph.split('\n').filter(Boolean);
                const intro = lines[0].startsWith('•') ? null : lines[0];
                const items = lines.filter((l) => l.startsWith('•')).map((l) => l.replace(/^•\s*/, ''));
                return (
                  <div key={i} className="mb-6">
                    {intro && (
                      <p className="mb-3" style={{ color: 'var(--color-ink)' }}>
                        {intro}
                      </p>
                    )}
                    <ul className="space-y-2">
                      {items.map((item, j) => (
                        <li
                          key={j}
                          className="flex items-start gap-2 text-sm"
                          style={{ color: 'var(--color-ink)' }}
                        >
                          <BookOpen size={14} className="mt-1 shrink-0" style={{ color: 'var(--color-teal)' }} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              }
              return (
                <p key={i} className="mb-4 leading-relaxed" style={{ color: 'var(--color-ink)' }}>
                  {paragraph}
                </p>
              );
            })}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="space-y-8">
          {/* Education */}
          <div className="card p-6">
            <div className="flex items-center gap-2 mb-4">
              <GraduationCap size={20} style={{ color: 'var(--color-teal)' }} />
              <h3 className="text-base font-semibold" style={{ fontFamily: 'var(--font-heading)' }}>
                Education
              </h3>
            </div>
            <ul className="space-y-3">
              {bio.education.map((ed, i) => (
                <li
                  key={i}
                  className="text-sm leading-relaxed pl-4 border-l-2"
                  style={{
                    borderColor: 'var(--color-teal)',
                    color: 'var(--color-ink)',
                  }}
                >
                  {ed}
                </li>
              ))}
            </ul>
          </div>

          {/* Achievements */}
          <div className="card p-6">
            <div className="flex items-center gap-2 mb-4">
              <Award size={20} style={{ color: 'var(--color-gold)' }} />
              <h3 className="text-base font-semibold" style={{ fontFamily: 'var(--font-heading)' }}>
                Achievements
              </h3>
            </div>
            <ul className="space-y-3">
              {bio.achievements.map((ach, i) => (
                <li
                  key={i}
                  className="text-sm leading-relaxed pl-4 border-l-2"
                  style={{
                    borderColor: 'var(--color-gold)',
                    color: 'var(--color-ink)',
                  }}
                >
                  {ach}
                </li>
              ))}
            </ul>
          </div>

          {/* Books */}
          <div className="card p-6">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen size={20} style={{ color: 'var(--color-teal)' }} />
              <h3 className="text-base font-semibold" style={{ fontFamily: 'var(--font-heading)' }}>
                Books &amp; Publications
              </h3>
            </div>
            <ul className="space-y-3">
              {books.map((book, i) => (
                <li
                  key={i}
                  className="text-sm leading-relaxed"
                  style={{ color: 'var(--color-ink)' }}
                >
                  <span style={{ color: 'var(--color-teal)' }} className="mr-2">
                    &#x25AA;
                  </span>
                  {i === 0 ? <strong>{book}</strong> : <span className="italic">{book}</span>}
                  {i === 0 && (
                    <span className="text-xs ml-1" style={{ color: 'var(--color-muted)' }}>
                      (published)
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="card p-6">
            <div className="flex items-center gap-2 mb-4">
              <Mail size={20} style={{ color: 'var(--color-teal)' }} />
              <h3 className="text-base font-semibold" style={{ fontFamily: 'var(--font-heading)' }}>
                Contact
              </h3>
            </div>
            <a
              href={`mailto:${bio.email}`}
              className="text-sm font-medium break-all"
              style={{ color: 'var(--color-teal)' }}
            >
              {bio.email}
            </a>
          </div>
        </aside>
      </div>
    </div>
  );
}
