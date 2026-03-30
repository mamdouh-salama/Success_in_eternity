import type { Metadata } from 'next';
import { getAllVideos } from '@/lib/content';
import VideosClient from './VideosClient';

export const metadata: Metadata = {
  title: 'Video Archive — Success in Eternity',
  description:
    'Watch Islamic lectures and sermons by Dr. Mamdouh Salama on YouTube.',
};

export default function VideosPage() {
  const videos = getAllVideos();
  return <VideosClient videos={videos} />;
}
