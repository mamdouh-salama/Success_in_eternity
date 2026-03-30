# Success in Eternity

An Islamic lecture platform by **Dr. Mamdouh Salama** — featuring Quranic reflections, surah theme analyses, and educational videos.

## Overview

Success in Eternity is a modern, statically-generated website built with Next.js that serves as a comprehensive archive of Dr. Mamdouh Salama's Islamic lectures, video sermons, and written materials.

### Features

- **53 lectures** covering Surah themes, Tadabbur series, Khutbahs, and more
- **138 video sermons** with embedded YouTube players
- **PDF library** with downloadable lecture materials
- **Full-text search** across all content (powered by Fuse.js)
- **Arabic/RTL support** with proper bidirectional rendering
- **Dark mode** with system preference detection
- **Responsive design** — mobile-first, works on all devices
- **Static generation** — all 200+ pages pre-rendered for fast loading

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Search:** Fuse.js
- **Fonts:** Playfair Display (headings), Inter (body), Amiri (Arabic)
- **Icons:** Lucide React

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
git clone https://github.com/omarmsalama/Success_in_eternity.git
cd Success_in_eternity
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
```

### Production

```bash
npm start
```

## Deployment on Vercel

This project is optimized for deployment on [Vercel](https://vercel.com):

1. Push this repo to GitHub
2. Import the repo in Vercel
3. Vercel auto-detects Next.js — no configuration needed
4. Deploy

The site generates 200+ static pages at build time for optimal performance.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Homepage
│   ├── biography/         # Dr. Salama biography
│   ├── lectures/          # Lecture archive + detail pages
│   ├── videos/            # Video archive + detail pages
│   ├── pdfs/              # PDF library
│   ├── search/            # Full-text search
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles & design tokens
├── components/            # Reusable UI components
│   ├── Header.tsx         # Navigation header
│   ├── Footer.tsx         # Site footer
│   ├── Logo.tsx           # SVG Islamic geometric logo
│   ├── IslamicPattern.tsx # Decorative SVG pattern
│   ├── SearchBar.tsx      # Search input component
│   ├── LectureCard.tsx    # Lecture card component
│   ├── VideoCard.tsx      # Video card with thumbnail
│   ├── Pagination.tsx     # Pagination controls
│   └── ThemeProvider.tsx  # Dark mode provider
├── data/                  # Content data (JSON)
│   ├── lectures.json      # 53 lectures
│   ├── videos.json        # 138 videos
│   ├── pdfs.json          # PDF documents
│   └── biography.json     # Speaker biography
└── lib/                   # Utilities
    ├── content.ts         # Content access + search
    └── types.ts           # TypeScript types
```

## Design

- **Color palette:** Warm cream (#F8F6F1) background, deep teal (#0E7B7F) accent, gold (#B8860B) highlights
- **Typography:** Playfair Display for elegant headings, Inter for readable body text, Amiri for Arabic script
- **Aesthetic:** Professional, minimal, warm — subtly Islamic without being ornate

## Content Management

Content is stored as JSON files in `src/data/`. To add or modify content:

### Adding a Lecture

Edit `src/data/lectures.json` and add an entry:

```json
{
  "id": "unique-id",
  "slug": "url-friendly-slug",
  "title": "Lecture Title",
  "excerpt": "Brief description...",
  "date": "2025-01-01",
  "category": "Surah Themes",
  "tags": ["Quran Themes", "Surah Analysis"],
  "surah": "Al-Baqarah",
  "surahNumber": 2,
  "videoId": "youtube-video-id",
  "pdfUrl": "https://example.com/lecture.pdf",
  "sourceUrl": "https://successineternity.com/original-post"
}
```

### Adding a Video

Edit `src/data/videos.json` similarly with `youtubeId`, `title`, `description`, `date`, and `speaker` fields.

## Placeholders

The following items are marked for manual completion:

- **Speaker photo** — Add to the biography page
- **Mission statement** — Customize the hero section text
- **Additional PDFs** — Add more lecture materials to `pdfs.json`
- **Missing video mappings** — Some lectures may need YouTube IDs linked

See `MIGRATION-REPORT.md` for a detailed list of migrated content and items needing review.

## License

All content is the intellectual property of Dr. Mamdouh Salama. The website code is available for reference.

## Contact

Dr. Mamdouh Salama — [mamdouh.salama@comcast.net](mailto:mamdouh.salama@comcast.net)
