'use client';

import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Search, BookOpen, Video, FileText } from 'lucide-react';
import { searchContent } from '@/lib/content';
import type { SearchResult } from '@/lib/types';

const typeIcons = {
  lecture: BookOpen,
  video: Video,
  pdf: FileText,
};

const typeLabels = {
  lecture: 'Lectures',
  video: 'Videos',
  pdf: 'PDFs',
};

export default function SearchClient() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery);
      const res = searchContent(initialQuery);
      setResults(res);
      setSearched(true);
    }
  }, [initialQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      const res = searchContent(query.trim());
      setResults(res);
      setSearched(true);
      // Update URL without navigation
      window.history.replaceState(null, '', `/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const grouped = useMemo(() => {
    const groups: Record<string, SearchResult[]> = {
      lecture: [],
      video: [],
      pdf: [],
    };
    results.forEach((r) => {
      groups[r.type]?.push(r);
    });
    return groups;
  }, [results]);

  return (
    <div className="container-site animate-fade-in">
      {/* Page header */}
      <div className="page-header">
        <h1
          className="text-3xl md:text-4xl font-bold"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Search
        </h1>
        <p className="text-sm mt-2" style={{ color: 'var(--color-muted)' }}>
          Find lectures, videos, and PDFs across the entire archive
        </p>
      </div>

      {/* Search input */}
      <form onSubmit={handleSearch} className="mb-10">
        <div className="relative max-w-2xl">
          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ color: 'var(--color-muted)' }}
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title, surah, topic, or keyword..."
            className="w-full pl-12 pr-28 py-4 rounded-xl text-base outline-none"
            style={{
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              color: 'var(--color-ink)',
            }}
            autoFocus
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 btn-primary text-sm py-2 px-5 cursor-pointer"
          >
            Search
          </button>
        </div>
      </form>

      {/* Results */}
      {searched && results.length === 0 && (
        <div className="text-center py-16">
          <Search size={48} className="mx-auto mb-4" style={{ color: 'var(--color-muted)' }} />
          <p className="text-lg font-medium" style={{ color: 'var(--color-muted)' }}>
            No results found for &ldquo;{query}&rdquo;
          </p>
          <p className="text-sm mt-2" style={{ color: 'var(--color-muted)' }}>
            Try different keywords or check your spelling
          </p>
        </div>
      )}

      {searched && results.length > 0 && (
        <div>
          <p className="text-sm mb-6" style={{ color: 'var(--color-muted)' }}>
            Found {results.length} result{results.length !== 1 ? 's' : ''} for &ldquo;{query}&rdquo;
          </p>

          {(['lecture', 'video', 'pdf'] as const).map((type) => {
            const items = grouped[type];
            if (!items || items.length === 0) return null;
            const Icon = typeIcons[type];

            return (
              <section key={type} className="mb-10">
                <h2
                  className="text-lg font-semibold mb-4 flex items-center gap-2"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  <Icon size={20} style={{ color: 'var(--color-teal)' }} />
                  {typeLabels[type]}
                  <span className="text-sm font-normal" style={{ color: 'var(--color-muted)' }}>
                    ({items.length})
                  </span>
                </h2>

                <div className="space-y-3">
                  {items.map((item, i) => (
                    <Link
                      key={`${item.slug}-${i}`}
                      href={item.url}
                      className="block card p-5 transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <span className="badge text-xs mt-0.5">{type}</span>
                        <div className="min-w-0">
                          <h3
                            className="text-base font-medium mb-1 line-clamp-1"
                            style={{ color: 'var(--color-ink)' }}
                          >
                            {item.title}
                          </h3>
                          {item.excerpt && (
                            <p
                              className="text-sm line-clamp-2"
                              style={{ color: 'var(--color-muted)' }}
                            >
                              {item.excerpt}
                            </p>
                          )}
                          {item.date && (
                            <p className="text-xs mt-1" style={{ color: 'var(--color-muted)' }}>
                              {new Date(item.date + 'T00:00:00').toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                              })}
                            </p>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}
