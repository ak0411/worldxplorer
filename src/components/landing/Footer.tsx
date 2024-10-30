import Link from 'next/link';
import { Logo } from '@/components/shared/Logo';
import { metadata } from '@/app/layout';
import { Github } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Logo and Description */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Logo className="size-8" />
                <span className="font-pixelated tracking-widest">
                  WorldXplorer
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                {metadata.description}
              </p>
            </div>
            {/* Quick Links */}
            <div className="flex-col items-center md:flex">
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
              </ul>
            </div>
            {/* Social Links */}
            <div>
              <h3 className="mb-3 font-semibold">Social</h3>
              <div className="flex space-x-4">
                <Link
                  href="https://github.com/ak0411"
                  rel="noopener noreferrer"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  <Github />
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
  );
}
