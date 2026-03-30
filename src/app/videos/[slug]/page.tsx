import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, ExternalLink } from 'lucide-react';
import { getAllVideos, getVideoBySlug } from '@/lib/content';
import VideoCard from '@/components/VideoCard';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const videos = getAllVideos();
  return videos.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const video = getVideoBySlug(slug);
  if (!video) return { title: 'Video Not Found' };
  return {
    title: `${video.title} — Success in Eternity`,
    description: video.description || `Watch "${video.title}" by ${video.speaker}.`,
  };
}

export default async function VideoDetailPage({ params }: Props) {
  const { slug } = await params;
  const video = getVideoBySlug(slug);
  if (!video) notFound();

  const allVideos = getAllVideos();
  const currentIndex = allVideos.findIndex((v) => v.id === video.id);
  const related = allVideos
    .filter((v) => v.id !== video.id && v.youtubeId)
    .slice(Math.max(0, currentIndex - 2), Math.max(0, currentIndex - 2) + 4);

  return (
    <div className="container-site animate-fade-in">
      {/* Back link */}
      <div className="pt-6 pb-4">
        <Link
          href="/videos"
          className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
          style={{ color: 'var(--color-teal)' }}
        >
          <ArrowLeft size={16} />
          Back to Videos
        </Link>
      </div>

      {/* Video embed */}
      {video.youtubeId ? (
        <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-8 bg-black">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        </div>
      ) : (
        <div
          className="w-full aspect-video rounded-xl flex items-center justify-center mb-8"
          style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
        >
          <p className="text-sm" style={{ color: 'var(--color-muted)' }}>
            Video not yet available
          </p>
        </div>
      )}

      {/* Title + metadata */}
      <div className="max-w-3xl">
        <h1
          className="text-2xl md:text-3xl font-bold mb-4"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          {video.title}
        </h1>

        <div
          className="flex flex-wrap items-center gap-4 mb-6 pb-6 border-b"
          style={{ borderColor: 'var(--color-border)' }}
        >
          <span className="text-sm font-medium" style={{ color: 'var(--color-teal)' }}>
            {video.speaker}
          </span>
          {video.date && (
            <span
              className="flex items-center gap-1.5 text-sm"
              style={{ color: 'var(--color-muted)' }}
            >
              <Calendar size={14} />
              {new Date(video.date + 'T00:00:00').toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          )}
          {video.youtubeUrl && (
            <a
              href={video.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm"
              style={{ color: 'var(--color-muted)' }}
            >
              <ExternalLink size={14} />
              YouTube
            </a>
          )}
        </div>

        {video.description && (
          <p className="leading-relaxed" style={{ color: 'var(--color-ink)' }}>
            {video.description}
          </p>
        )}
      </div>

      {/* Related videos */}
      {related.length > 0 && (
        <section className="mt-16">
          <h2
            className="text-xl font-bold mb-6"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            More Videos
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map((v) => (
              <VideoCard key={v.id} video={v} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
