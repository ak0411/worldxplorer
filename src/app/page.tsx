import {
  Github,
  Globe2,
  Map,
  Navigation2,
  Search,
  Shuffle,
  Twitter,
  View,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Link from 'next/link';

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
            <Globe2 className="mx-auto h-20 w-20 animate-pulse text-primary" />
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-primary sm:text-6xl">
              WorldXplorer
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-xl text-muted-foreground">
              Embark on virtual journeys across the globe. Discover random
              locations or explore specific places through custom queries.
            </p>
          </div>
        </div>
        {/* Modes Section */}
        <div className="mx-auto -mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2">
            {/* Explore Mode Card */}
            <Card className="bg-card/50 p-6 backdrop-blur transition-shadow duration-300 hover:shadow-xl">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="rounded-full bg-primary/10 p-3">
                  <Navigation2 className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-2xl font-semibold">Explore Mode</h2>
                <p className="text-muted-foreground">
                  Visit random locations worldwide or explore specific
                  countries. Let serendipity guide your virtual travels.
                </p>
                <Link href="/explore" className="w-full">
                  <Button className="w-full" size="lg">
                    Start Exploring
                  </Button>
                </Link>
              </div>
            </Card>
            {/* Overpass Mode Card */}
            <Card className="bg-card/50 p-6 backdrop-blur transition-shadow duration-300 hover:shadow-xl">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="rounded-full bg-primary/10 p-3">
                  <Map className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-2xl font-semibold">Overpass Mode</h2>
                <p className="text-muted-foreground">
                  Use Overpass QL queries to discover specific locations and
                  points of interest around the world.
                </p>
                <Link href="/overpass" className="w-full">
                  <Button className="w-full" size="lg">
                    Start Querying
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
          {/* Features Section */}
          <div className="mt-20 pb-20 text-center">
            <h2 className="mb-8 text-2xl font-semibold">Why WorldXplorer?</h2>
            <div className="grid gap-8 sm:grid-cols-3">
              <div className="flex flex-col items-center space-y-3">
                <div className="rounded-full bg-primary/10 p-3">
                  <Shuffle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-medium">Random Discovery</h3>
                <p className="text-sm text-muted-foreground">
                  Discover unexpected places and broaden your horizons
                </p>
              </div>
              <div className="flex flex-col items-center space-y-3">
                <div className="rounded-full bg-primary/10 p-3">
                  <Search className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-medium">Custom Queries</h3>
                <p className="text-sm text-muted-foreground">
                  Find specific locations using powerful Overpass QL
                </p>
              </div>
              <div className="flex flex-col items-center space-y-3">
                <div className="rounded-full bg-primary/10 p-3">
                  <View className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-medium">Street View Integration</h3>
                <p className="text-sm text-muted-foreground">
                  Immersive 360° views of locations worldwide
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="py-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {/* Logo and Description */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Globe2 className="h-6 w-6" />
                  <span className="text-lg font-semibold">WorldXplorer</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Explore the world from your browser through immersive Street
                  View experiences.
                </p>
              </div>
              {/* Quick Links */}
              <div>
                <h3 className="mb-3 font-semibold">Quick Links</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link
                      href="/explore"
                      className="text-muted-foreground transition-colors hover:text-primary"
                    >
                      Explore Mode
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/overpass"
                      className="text-muted-foreground transition-colors hover:text-primary"
                    >
                      Overpass Mode
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/"
                      className="text-muted-foreground transition-colors hover:text-primary"
                    >
                      About
                    </Link>
                  </li>
                </ul>
              </div>
              {/* Social Links */}
              <div>
                <h3 className="mb-3 font-semibold">Connect</h3>
                <div className="flex space-x-4">
                  <Link
                    href="/"
                    rel="noopener noreferrer"
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    <Github className="h-5 w-5" />
                  </Link>
                  <Link
                    href="/"
                    rel="noopener noreferrer"
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    <Twitter className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            </div>
            {/* Copyright */}
            <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
              <p>
                © {new Date().getFullYear()} WorldXplorer. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
