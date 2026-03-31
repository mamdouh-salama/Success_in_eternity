import Link from 'next/link';
import { BookOpen, Video, FileText, User, ArrowRight } from 'lucide-react';
import { getAllLectures, getAllVideos, getBiography } from '@/lib/content';
import LectureCard from '@/components/LectureCard';
import VideoCard from '@/components/VideoCard';
import IslamicPattern from '@/components/IslamicPattern';

export default function HomePage() {
  const lectures = getAllLectures();
  const videos = getAllVideos();
  const bio = getBiography();

  const recentLectures = lectures.slice(0, 6);
  const recentVideos = videos.filter((v) => v.youtubeId).slice(0, 4);

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden py-20 md:py-28">
        {/* Background pattern */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <IslamicPattern className="w-[600px] h-[600px] md:w-[800px] md:h-[800px]" />
        </div>

        <div className="container-site relative z-10 text-center max-w-3xl mx-auto">
          <p
            className="text-sm font-medium tracking-widest uppercase mb-4"
            style={{ color: 'var(--color-gold)' }}
          >
            Islamic Lecture Platform
          </p>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Success in Eternity
          </h1>
          <p
            className="text-lg md:text-xl leading-relaxed mb-8"
            style={{ color: 'var(--color-muted)' }}
          >
            Quranic reflections and Islamic educational content by{' '}
            <span style={{ color: 'var(--color-ink)' }} className="font-medium">
              {bio.name}
            </span>
            . Exploring the themes of the Quran to deepen understanding and strengthen faith.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link href="/lectures" className="btn-primary">
              <BookOpen size={18} />
              Browse Lectures
            </Link>
            <Link href="/videos" className="btn-secondary">
              <Video size={18} />
              Watch Videos
            </Link>
          </div>
        </div>
      </section>

      {/* ── Recent Lectures ── */}
      <section className="container-site py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2
              className="text-2xl md:text-3xl font-bold"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Recent Lectures
            </h2>
            <p className="text-sm mt-1" style={{ color: 'var(--color-muted)' }}>
              Latest Quranic analyses and reflections
            </p>
          </div>
          <Link
            href="/lectures"
            className="hidden sm:flex items-center gap-1 text-sm font-medium"
            style={{ color: 'var(--color-teal)' }}
          >
            View All <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentLectures.map((lecture) => (
            <LectureCard key={lecture.id} lecture={lecture} />
          ))}
        </div>

        <div className="sm:hidden mt-6 text-center">
          <Link href="/lectures" className="btn-secondary text-sm">
            View All Lectures <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* ── Recent Videos ── */}
      <section
        className="py-16 border-t"
        style={{ borderColor: 'var(--color-border)' }}
      >
        <div className="container-site">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2
                className="text-2xl md:text-3xl font-bold"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Recent Videos
              </h2>
              <p className="text-sm mt-1" style={{ color: 'var(--color-muted)' }}>
                Watch lectures and sermons on YouTube
              </p>
            </div>
            <Link
              href="/videos"
              className="hidden sm:flex items-center gap-1 text-sm font-medium"
              style={{ color: 'var(--color-teal)' }}
            >
              View All <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentVideos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>

          <div className="sm:hidden mt-6 text-center">
            <Link href="/videos" className="btn-secondary text-sm">
              View All Videos <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Quick Links ── */}
      <section className="container-site py-16">
        <h2
          className="text-2xl md:text-3xl font-bold text-center mb-10"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Explore the Archive
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              href: '/biography',
              icon: User,
              title: 'About Dr. Salama',
              desc: 'MIT scholar and ASME Life Fellow dedicated to Islamic education',
              color: 'var(--color-gold)',
            },
            {
              href: '/lectures',
              icon: BookOpen,
              title: 'Lecture Archive',
              desc: `${lectures.length} lectures covering Surah themes, Tadabbur, and more`,
              color: 'var(--color-teal)',
            },
            {
              href: '/videos',
              icon: Video,
              title: 'Video Archive',
              desc: `${videos.length} recorded lectures and sermons on YouTube`,
              color: 'var(--color-teal)',
            },
            {
              href: '/pdfs',
              icon: FileText,
              title: 'Books',
              desc: 'Downloadable books and written materials',
              color: 'var(--color-teal)',
            },
          ].map((item) => (
            <Link key={item.href} href={item.href} className="block">
              <div className="card p-6 h-full text-center">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                  style={{
                    backgroundColor: `color-mix(in srgb, ${item.color} 10%, transparent)`,
                    color: item.color,
                  }}
                >
                  <item.icon size={24} />
                </div>
                <h3
                  className="text-base font-semibold mb-2"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {item.title}
                </h3>
                <p className="text-sm" style={{ color: 'var(--color-muted)' }}>
                  {item.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
