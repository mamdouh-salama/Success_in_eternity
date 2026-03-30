import Link from 'next/link';
import Logo from './Logo';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="border-t mt-20"
      style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)' }}
    >
      <div>
        <div className="container-site py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span style={{ color: 'var(--color-teal)' }}>
                  <Logo size={32} />
                </span>
                <span
                  className="text-lg font-semibold"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  Success in Eternity
                </span>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                Islamic lectures and Quranic reflections by Dr. Mamdouh Salama.
                Dedicated to deepening understanding of the Quran.
              </p>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: 'var(--color-muted)' }}>
                Explore
              </h4>
              <nav className="flex flex-col gap-2">
                {[
                  { href: '/lectures', label: 'Lecture Archive' },
                  { href: '/videos', label: 'Video Archive' },
                  { href: '/pdfs', label: 'PDF Library' },
                  { href: '/biography', label: 'About Dr. Salama' },
                  { href: '/search', label: 'Search' },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm transition-colors"
                    style={{ color: 'var(--color-muted)' }}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: 'var(--color-muted)' }}>
                Contact
              </h4>
              <p className="text-sm" style={{ color: 'var(--color-muted)' }}>
                For inquiries, reach out to Dr. Salama:
              </p>
              <a
                href="mailto:mamdouh.salama@comcast.net"
                className="text-sm font-medium mt-2 inline-block"
                style={{ color: 'var(--color-teal)' }}
              >
                mamdouh.salama@comcast.net
              </a>
            </div>
          </div>

          {/* Bottom bar */}
          <div
            className="mt-10 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4"
            style={{ borderColor: 'var(--color-border)' }}
          >
            <p className="text-xs" style={{ color: 'var(--color-muted)' }}>
              &copy; {currentYear} Success in Eternity. All rights reserved.
            </p>
            <p className="text-xs" style={{ color: 'var(--color-muted)' }}>
              Islamic lectures by Dr. Mamdouh Salama
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
