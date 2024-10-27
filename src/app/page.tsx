import { Map, Navigation2, Search, Shuffle, View } from 'lucide-react';
import { ModeCard } from '@/components/landing/ModeCard';
import { FeatureCard } from '@/components/landing/FeatureCard';
import Footer from '@/components/landing/Footer';
import { Logo } from '@/components/shared/Logo';

const modes = [
  {
    icon: Navigation2,
    title: 'Explore Mode',
    description:
      'Visit random locations worldwide or explore specific countries. Let serendipity guide your virtual travels.',
    href: '/explore',
    buttonText: 'Start Exploring',
  },
  {
    icon: Map,
    title: 'Overpass Mode',
    description:
      'Use Overpass QL queries to discover specific locations and points of interest around the world.',
    href: '/overpass',
    buttonText: 'Start Querying',
  },
];

const features = [
  {
    icon: Shuffle,
    title: 'Random Discovery',
    description: 'Discover unexpected places and broaden your horizons',
  },
  {
    icon: Search,
    title: 'Custom Queries',
    description: 'Find specific locations using powerful Overpass QL',
  },
  {
    icon: View,
    title: 'Street View Integration',
    description: 'Immersive 360° views of locations worldwide',
  },
];

export default function Home() {
  return (
    <>
      <main className="min-h-screen bg-gradient-to-b from-background to-secondary">
        {/* Hero Section */}
        <div className="relative">
          <div
            className="absolute inset-0 z-0 h-[500px] bg-cover bg-center opacity-20"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=2070')",
            }}
          />
          <div className="relative z-10 mx-auto max-w-7xl px-4 pb-16 pt-20 text-center sm:px-6 lg:px-8">
            <div className="mt-6 flex items-center justify-center text-4xl font-bold tracking-widest text-primary sm:text-6xl">
              <span>World</span>
              <Logo className="size-32" />
              <span>plorer</span>
            </div>
            <p className="mx-auto mt-4 max-w-2xl text-xl text-muted-foreground">
              Embark on virtual journeys across the globe. Discover random
              locations or explore specific places through custom queries.
            </p>
          </div>
        </div>
        <div className="mx-auto -mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Modes Section */}
          <div className="grid gap-8 md:grid-cols-2">
            {modes.map((mode) => (
              <ModeCard key={mode.title} {...mode} />
            ))}
          </div>
          {/* Features Section */}
          <div className="mt-20 pb-20 text-center">
            <h2 className="mb-8 text-2xl font-semibold">Why WorldXplorer?</h2>
            <div className="grid gap-8 sm:grid-cols-3">
              {features.map((feature) => (
                <FeatureCard key={feature.title} {...feature} />
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
