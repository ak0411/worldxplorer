import { Map, MapPin, Navigation, Navigation2 } from 'lucide-react';
import { ModeCard } from '@/components/landing/ModeCard';
import Footer from '@/components/landing/Footer';
import Hero from '@/components/landing/Hero';
import { ThemeToggle } from '@/components/shared/ThemeToggle';
import worldMap from '@/public/assets/world_map.svg';
import Image from 'next/image';

const modes = [
  {
    icon: Navigation2,
    title: 'Explore Mode',
    description:
      'Visit random locations worldwide or explore specific countries. Let the winds guide your virtual travels.',
    href: '/explore',
    buttonText: 'Go Explore',
  },
  {
    icon: Map,
    title: 'Overpass Mode',
    description:
      'Use Overpass QL queries to discover specific locations and points of interest around the world.',
    href: '/overpass',
    buttonText: 'Go Query',
  },
];

export default function Home() {
  return (
    <>
      <main className="relative bg-secondary pb-8">
        <Image
          priority
          src={worldMap}
          alt="world map"
          className="absolute left-1/2 -translate-x-1/2 px-4 opacity-20"
        />
        <div className="container mx-auto flex justify-end pt-4">
          <ThemeToggle />
        </div>
        <Hero />
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2">
            {modes.map((mode) => (
              <ModeCard key={mode.title} {...mode} />
            ))}
          </div>
        </div>
        <div className="hidden px-4 2xl:block">
          <svg className="h-[100px] w-full md:h-[200px]" viewBox="0 0 1600 100">
            <path
              d="M 0 50 C 200 0 200 0 400 50 C 650 100 650 100 800 50 C 1000 0 1000 0 1200 50 C 1400 100 1400 100 1600 50"
              fill="none"
              stroke="#CBD5E1"
              strokeWidth="4"
              strokeDasharray="12 8"
              className="path-animation"
            />
          </svg>
        </div>
      </main>
      <Footer />
    </>
  );
}
