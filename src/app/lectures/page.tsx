import type { Metadata } from 'next';
import { getAllLectures, getCategories } from '@/lib/content';
import LecturesClient from './LecturesClient';

export const metadata: Metadata = {
  title: 'Lecture Archive — Success in Eternity',
  description:
    'Browse all Islamic lectures by Dr. Mamdouh Salama, including Surah themes, Tadabbur series, khutbahs, and special topics.',
};

export default function LecturesPage() {
  const lectures = getAllLectures();
  const categories = getCategories();

  return <LecturesClient lectures={lectures} categories={categories} />;
}
