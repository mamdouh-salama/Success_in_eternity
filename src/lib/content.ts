import Fuse from 'fuse.js';
import type { Lecture, Video, PDF, Biography, SearchResult } from './types';

import lecturesData from '@/data/lectures.json';
import videosData from '@/data/videos.json';
import pdfsData from '@/data/pdfs.json';
import biographyData from '@/data/biography.json';

// ── Lectures ──

export function getAllLectures(): Lecture[] {
  return lecturesData as Lecture[];
}

export function getLectureBySlug(slug: string): Lecture | undefined {
  return (lecturesData as Lecture[]).find((l) => l.slug === slug);
}

export function getLecturesByCategory(category: string): Lecture[] {
  return (lecturesData as Lecture[]).filter((l) => l.category === category);
}

export function getLecturesByTag(tag: string): Lecture[] {
  return (lecturesData as Lecture[]).filter((l) => l.tags.includes(tag));
}

// ── Videos ──

export function getAllVideos(): Video[] {
  return videosData as Video[];
}

export function getVideoBySlug(slug: string): Video | undefined {
  return (videosData as Video[]).find((v) => v.slug === slug);
}

// ── PDFs ──

export function getAllPdfs(): PDF[] {
  return pdfsData as PDF[];
}

// ── Biography ──

export function getBiography(): Biography {
  return biographyData as Biography;
}

// ── Derived data ──

export function getCategories(): string[] {
  const cats = new Set((lecturesData as Lecture[]).map((l) => l.category));
  return Array.from(cats).sort();
}

export function getYears(): string[] {
  const allDates = [
    ...(lecturesData as Lecture[]).map((l) => l.date),
    ...(videosData as Video[]).map((v) => v.date),
  ].filter(Boolean);
  const years = new Set(allDates.map((d) => d.slice(0, 4)));
  return Array.from(years).sort().reverse();
}

export function getTags(): string[] {
  const tags = new Set((lecturesData as Lecture[]).flatMap((l) => l.tags));
  return Array.from(tags).sort();
}

// ── Search ──

export function searchContent(query: string): SearchResult[] {
  if (!query || query.trim().length === 0) return [];

  const lectureItems = (lecturesData as Lecture[]).map((l) => ({
    type: 'lecture' as const,
    title: l.title,
    slug: l.slug,
    excerpt: l.excerpt,
    content: l.content || '',
    date: l.date,
    url: `/lectures/${l.slug}`,
    category: l.category,
    tags: l.tags.join(' '),
    surah: l.surah,
  }));

  const videoItems = (videosData as Video[]).map((v) => ({
    type: 'video' as const,
    title: v.title,
    slug: v.slug,
    excerpt: v.description,
    content: '',
    date: v.date,
    url: `/videos/${v.slug}`,
    category: '',
    tags: '',
    surah: '',
  }));

  const pdfItems = (pdfsData as PDF[]).map((p) => ({
    type: 'pdf' as const,
    title: p.title,
    slug: p.slug,
    excerpt: '',
    content: '',
    date: p.date,
    url: `/pdfs`,
    category: '',
    tags: '',
    surah: '',
  }));

  const allItems = [...lectureItems, ...videoItems, ...pdfItems];

  const fuse = new Fuse(allItems, {
    keys: [
      { name: 'title', weight: 0.35 },
      { name: 'excerpt', weight: 0.2 },
      { name: 'content', weight: 0.2 },
      { name: 'category', weight: 0.12 },
      { name: 'tags', weight: 0.08 },
      { name: 'surah', weight: 0.05 },
    ],
    threshold: 0.4,
    includeScore: true,
  });

  const results = fuse.search(query, { limit: 30 });
  return results.map((r) => ({
    type: r.item.type,
    title: r.item.title,
    slug: r.item.slug,
    excerpt: r.item.excerpt,
    date: r.item.date,
    url: r.item.url,
  }));
}
