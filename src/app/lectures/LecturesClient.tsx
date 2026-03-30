'use client';

import { useState, useMemo } from 'react';
import { BookOpen, Filter } from 'lucide-react';
import type { Lecture } from '@/lib/types';
import LectureCard from '@/components/LectureCard';
import SearchBar from '@/components/SearchBar';
import Pagination from '@/components/Pagination';

const PER_PAGE = 12;

interface Props {
  lectures: Lecture[];
  categories: string[];
}

export default function LecturesClient({ lectures, categories }: Props) {
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState<'newest' | 'oldest' | 'surah'>('newest');
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    let result = [...lectures];

    // Filter by category
    if (category !== 'all') {
      result = result.filter((l) => l.category === category);
    }

    // Filter by search query
    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(
        (l) =>
          l.title.toLowerCase().includes(q) ||
          l.excerpt.toLowerCase().includes(q) ||
          l.surah.toLowerCase().includes(q) ||
          l.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Sort
    if (sort === 'newest') {
      result.sort((a, b) => {
        if (!a.date && !b.date) return 0;
        if (!a.date) return 1;
        if (!b.date) return -1;
        return b.date.localeCompare(a.date);
      });
    } else if (sort === 'oldest') {
      result.sort((a, b) => {
        if (!a.date && !b.date) return 0;
        if (!a.date) return 1;
        if (!b.date) return -1;
        return a.date.localeCompare(b.date);
      });
    } else if (sort === 'surah') {
      result.sort((a, b) => a.surahNumber - b.surahNumber);
    }

    return result;
  }, [lectures, category, sort, query]);

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
          Lecture Archive
        </h1>
        <p className="text-sm mt-2" style={{ color: 'var(--color-muted)' }}>
          {filtered.length} lecture{filtered.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Search + Filters */}
      <div className="mb-8 space-y-4">
        {/* Search */}
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setPage(1); }}
            placeholder="Search lectures by title, surah, or topic..."
            className="w-full pl-11 pr-4 py-3 rounded-xl text-sm outline-none transition-all"
            style={{
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              color: 'var(--color-ink)',
            }}
          />
          <BookOpen
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ color: 'var(--color-muted)' }}
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <Filter size={14} style={{ color: 'var(--color-muted)' }} />
            <select
              value={category}
              onChange={(e) => { setCategory(e.target.value); setPage(1); }}
              className="text-sm rounded-lg px-3 py-2 cursor-pointer outline-none"
              style={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                color: 'var(--color-ink)',
              }}
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as 'newest' | 'oldest' | 'surah')}
            className="text-sm rounded-lg px-3 py-2 cursor-pointer outline-none"
            style={{
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              color: 'var(--color-ink)',
            }}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="surah">By Surah Number</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      {paginated.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginated.map((lecture) => (
            <LectureCard key={lecture.id} lecture={lecture} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <BookOpen size={48} className="mx-auto mb-4" style={{ color: 'var(--color-muted)' }} />
          <p className="text-lg font-medium" style={{ color: 'var(--color-muted)' }}>
            No lectures found
          </p>
          <p className="text-sm mt-1" style={{ color: 'var(--color-muted)' }}>
            Try adjusting your search or filters
          </p>
        </div>
      )}

      {/* Pagination */}
      <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  );
}
