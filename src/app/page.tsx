import { Map, MapPin, Navigation, Navigation2 } from 'lucide-react';
import { ModeCard } from '@/components/landing/ModeCard';
import Footer from '@/components/landing/Footer';
import Hero from '@/components/landing/Hero';
import { ThemeToggle } from '@/components/shared/ThemeToggle';

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
      <main className="bg-secondary">
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
        <div className="relative mx-auto h-[200px] w-full">
          <svg className="absolute h-full w-full">
            <path
              d="M 50 100 C 250 150 250 150 450 100 C 650 50 650 50 850 100 C 1050 150 1050 150 1250 100 C 1450 50 1450 50 1650 100 L 1850 150 "
              fill="none"
              stroke="#CBD5E1"
              strokeWidth="4"
              strokeDasharray="12 8"
              className="path-animation"
            />
          </svg>
          <div className="absolute left-[25px] top-[75px] rounded-full bg-emerald-500 p-3 shadow-lg">
            <MapPin className="h-6 w-6 text-white" />
          </div>
          <div className="absolute left-[1825px] top-[125px] rounded-full bg-rose-500 p-3 shadow-lg">
            <Navigation className="h-6 w-6 text-white" />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
