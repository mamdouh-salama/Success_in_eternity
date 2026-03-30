export interface Lecture {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  date: string;
  surah: string;
  surahNumber: number;
  tags: string[];
  category: string;
  pdfUrl: string;
  videoId: string;
  sourceUrl: string;
}

export interface Video {
  id: number;
  title: string;
  slug: string;
  youtubeId: string;
  youtubeUrl: string;
  date: string;
  description: string;
  speaker: string;
}

export interface PDF {
  id: number;
  title: string;
  slug: string;
  date: string;
  pdfUrl: string;
  relatedLectureSlug: string;
  relatedVideoSlug: string;
}

export interface Biography {
  name: string;
  shortBio: string;
  fullBio: string;
  education: string[];
  achievements: string[];
  email: string;
  photo: string;
  missionStatement: string;
}

export interface SearchResult {
  type: 'lecture' | 'video' | 'pdf';
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  url: string;
}
