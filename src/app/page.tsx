import { Map, Navigation2 } from 'lucide-react';
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
        <div className="mx-auto max-w-7xl pb-20 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2">
            {modes.map((mode) => (
              <ModeCard key={mode.title} {...mode} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
