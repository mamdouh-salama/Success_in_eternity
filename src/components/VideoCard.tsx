import Link from 'next/link';
import { Play, Calendar } from 'lucide-react';
import type { Video } from '@/lib/types';

export default function VideoCard({ video }: { video: Video }) {
  const thumbnailUrl = video.youtubeId
    ? `https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`
    : null;

  return (
    <Link href={`/videos/${video.slug}`} className="block">
      <article className="card overflow-hidden h-full flex flex-col">
        {/* Thumbnail */}
        <div className="relative aspect-video bg-black/5 overflow-hidden">
          {thumbnailUrl ? (
            <img
              src={thumbnailUrl}
              alt={video.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center"
              style={{ backgroundColor: 'var(--color-surface)' }}
            >
              <Play size={40} style={{ color: 'var(--color-muted)' }} />
            </div>
          )}
          {/* Play overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/20 transition-colors">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center bg-white/90 shadow-lg"
            >
              <Play size={20} fill="var(--color-teal)" style={{ color: 'var(--color-teal)' }} className="ml-0.5" />
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="p-5 flex flex-col flex-1">
          <h3
            className="text-sm font-semibold leading-snug mb-2 line-clamp-2"
            style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-ink)' }}
          >
            {video.title}
          </h3>
          <div className="mt-auto flex items-center gap-2">
            {video.date && (
              <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--color-muted)' }}>
                <Calendar size={12} />
                {new Date(video.date + 'T00:00:00').toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </span>
            )}
            <span className="text-xs" style={{ color: 'var(--color-muted)' }}>
              {video.speaker}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
