'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Search, Sun, Moon } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import Logo from './Logo';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/biography', label: 'Biography' },
  { href: '/lectures', label: 'Lectures' },
  { href: '/videos', label: 'Videos' },
  { href: '/pdfs', label: 'PDFs' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header
      className="sticky top-0 z-50 border-b"
      style={{
        backgroundColor: 'var(--color-surface)',
        borderColor: 'var(--color-border)',
        backdropFilter: 'blur(8px)',
      }}
    >
      <div className="dark:bg-[var(--color-surface-dark)]">
        <nav className="container-site flex items-center justify-between h-16">
          {/* Logo + site name */}
          <Link href="/" className="flex items-center gap-3 group" style={{ color: 'var(--color-ink)' }}>
            <span style={{ color: 'var(--color-teal)' }} className="dark:text-[var(--color-teal-light)]">
              <Logo size={36} />
            </span>
            <span
              className="text-lg font-semibold tracking-tight hidden sm:block"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Success in Eternity
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                style={{
                  color: isActive(link.href) ? 'var(--color-teal)' : 'var(--color-muted)',
                  backgroundColor: isActive(link.href)
                    ? 'color-mix(in srgb, var(--color-teal) 8%, transparent)'
                    : 'transparent',
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <Link
              href="/search"
              className="p-2 rounded-lg transition-colors"
              style={{ color: 'var(--color-muted)' }}
              aria-label="Search"
            >
              <Search size={20} />
            </Link>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg transition-colors cursor-pointer"
              style={{ color: 'var(--color-muted)' }}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg cursor-pointer"
              style={{ color: 'var(--color-muted)' }}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t" style={{ borderColor: 'var(--color-border)' }}>
            <div className="container-site py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 rounded-lg text-sm font-medium transition-colors"
                  style={{
                    color: isActive(link.href) ? 'var(--color-teal)' : 'var(--color-ink)',
                    backgroundColor: isActive(link.href)
                      ? 'color-mix(in srgb, var(--color-teal) 8%, transparent)'
                      : 'transparent',
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
