'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Globe, Map, Compass, Users, Camera } from 'lucide-react';
import FeatureCard from '@/components/FeatureCard';
import TestimonialCard from '@/components/TestimonialCard';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative flex h-[70vh] items-center justify-center">
        <div className="relative z-10 text-center">
          <h1 className="mb-4 text-6xl font-bold">Exlore the World</h1>
          <p className="mx-auto mb-8 max-w-2xl text-2xl">
            Embark on a virtual journey around the world. Discover new places,
            cultures, and perspectives from the comfort of your home.
          </p>
          <Link href="/explore">
            <Button size="lg" className="text-lg" variant="outline">
              <Globe className="mr-2 h-5 w-5" /> Start Exploring
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-secondary py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-4xl font-bold">
            Why Explore with Us?
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <FeatureCard
              icon={<Map className="mb-4 h-12 w-12 text-primary" />}
              title="Random Destinations"
              description="Discover unexpected places around the globe with our random location generator."
            />
            <FeatureCard
              icon={<Compass className="mb-4 h-12 w-12 text-primary" />}
              title="Immersive Experience"
              description="Explore streets, landmarks, and local cultures as if you were really there."
            />
            <FeatureCard
              icon={<Users className="mb-4 h-12 w-12 text-primary" />}
              title="Cultural Insights"
              description="Gain a deeper understanding of different cultures and ways of life worldwide."
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-background py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-4xl font-bold">How It Works</h2>
          <div className="flex flex-col items-center justify-center space-y-8 md:flex-row md:space-x-12 md:space-y-0">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                1
              </div>
              <h3 className="mb-2 text-xl font-semibold">Click Explore</h3>
              <p className="text-muted-foreground">
                Start your journey with a single click
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                2
              </div>
              <h3 className="mb-2 text-xl font-semibold">
                Discover a New Place
              </h3>
              <p className="text-muted-foreground">
                Get transported to a random location
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                3
              </div>
              <h3 className="mb-2 text-xl font-semibold">Explore and Learn</h3>
              <p className="text-muted-foreground">
                Immerse yourself in the local environment
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-secondary py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-4xl font-bold">
            What Our Explorers Say
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <TestimonialCard
              quote="WorldXplorer opened my eyes to places I never knew existed. It's like traveling without leaving home!"
              author="Sarah K., Virtual Traveler"
            />
            <TestimonialCard
              quote="I use this app to scout locations for my photography trips. It's an invaluable tool for planning and inspiration."
              author="Michael R., Photographer"
            />
            <TestimonialCard
              quote="As a teacher, I use WorldXplorer to give my students virtual field trips. It's an amazing educational resource!"
              author="Emily L., Educator"
            />
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-primary py-16 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-4xl font-bold">
            Ready to Start Your Journey?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-xl">
            Embark on a virtual adventure and explore the world from a new
            perspective. No passport required!
          </p>
          <Link href="/explore">
            <Button size="lg" variant="secondary" className="text-lg">
              <Camera className="mr-2 h-5 w-5" /> Begin Your Virtual Tour
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            © {new Date().getFullYear()} WorldXplorer. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
