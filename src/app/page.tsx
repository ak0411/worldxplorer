import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MapIcon } from 'lucide-react';

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background to-muted">
      <div className="space-y-6 text-center">
        <h1 className="text-4xl font-bold tracking-tighter">WorldXplorer</h1>
        <p className="mx-auto max-w-md text-muted-foreground">
          Discover locations and explore the world with our interactive map
          interface
        </p>
        <div className="flex flex-col gap-2">
          <Link href="/explore">
            <Button size="lg" className="gap-2">
              <MapIcon className="size-4" />
              Explore
            </Button>
          </Link>
          <Link href="/overpass">
            <Button size="lg" className="gap-2">
              <MapIcon className="size-4" />
              Open Map
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
