import type { Metadata } from 'next';
import { Suspense } from 'react';
import SearchClient from './SearchClient';

export const metadata: Metadata = {
  title: 'Search — Success in Eternity',
  description: 'Search across lectures, videos, and books on Success in Eternity.',
};

function SearchFallback() {
  return (
    <div className="container-site animate-fade-in">
      <div className="page-header">
        <h1
          className="text-3xl md:text-4xl font-bold"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Search
        </h1>
        <p className="text-sm mt-2" style={{ color: 'var(--color-muted)' }}>
          Loading search...
        </p>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<SearchFallback />}>
      <SearchClient />
    </Suspense>
  );
}
