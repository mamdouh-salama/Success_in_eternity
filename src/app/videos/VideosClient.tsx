'use client';

import { useState, useMemo } from 'react';
import { Video as VideoIcon, Filter } from 'lucide-react';
import type { Video } from '@/lib/types';
import VideoCard from '@/components/VideoCard';
import Pagination from '@/components/Pagination';

const PER_PAGE = 12;

export default function VideosClient({ videos }: { videos: Video[] }) {
  const [query, setQuery] = useState('');
  const [year, setYear] = useState('all');
  const [page, setPage] = useState(1);

  const years = useMemo(() => {
    const ySet = new Set(
      videos.map((v) => v.date?.slice(0, 4)).filter(Boolean)
    );
    return Array.from(ySet).sort().reverse();
  }, [videos]);

  const filtered = useMemo(() => {
    let result = [...videos];

    if (year !== 'all') {
      result = result.filter((v) => v.date?.startsWith(year));
    }

    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(
        (v) =>
          v.title.toLowerCase().includes(q) ||
          v.description.toLowerCase().includes(q)
      );
    }

    // Sort by date descending
    result.sort((a, b) => {
      if (!a.date && !b.date) return 0;
      if (!a.date) return 1;
      if (!b.date) return -1;
      return b.date.localeCompare(a.date);
    });

    return result;
  }, [videos, year, query]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const handlePageChange = (p: number) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="container-site animate-fade-in">
      {/* Page header */}
      <div className="page-header">
        <p
          className="text-sm font-medium tracking-widest uppercase mb-2"
          style={{ color: 'var(--color-gold)' }}
        >
          Archive
        </p>
        <h1
          className="text-3xl md:text-4xl font-bold"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Video Archive
        </h1>
        <p className="text-sm mt-2" style={{ color: 'var(--color-muted)' }}>
          {filtered.length} video{filtered.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Search + Filters */}
      <div className="mb-8 space-y-4">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setPage(1); }}
            placeholder="Search videos..."
            className="w-full pl-11 pr-4 py-3 rounded-xl text-sm outline-none transition-all"
            style={{
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              color: 'var(--color-ink)',
            }}
          />
          <VideoIcon
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ color: 'var(--color-muted)' }}
          />
        </div>

        <div className="flex items-center gap-3">
          <Filter size={14} style={{ color: 'var(--color-muted)' }} />
          <select
            value={year}
            onChange={(e) => { setYear(e.target.value); setPage(1); }}
            className="text-sm rounded-lg px-3 py-2 cursor-pointer outline-none"
            style={{
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              color: 'var(--color-ink)',
            }}
          >
            <option value="all">All Years</option>
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid */}
      {paginated.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginated.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <VideoIcon size={48} className="mx-auto mb-4" style={{ color: 'var(--color-muted)' }} />
          <p className="text-lg font-medium" style={{ color: 'var(--color-muted)' }}>
            No videos found
          </p>
          <p className="text-sm mt-1" style={{ color: 'var(--color-muted)' }}>
            Try adjusting your search or filters
          </p>
        </div>
      )}

      <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  );
}
