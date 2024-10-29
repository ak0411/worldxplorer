import { Github, Twitter } from 'lucide-react';
import Link from 'next/link';
import { ThemeToggle } from '../shared/ThemeToggle';
import { Logo } from '../shared/Logo';

export default function Footer() {
  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Logo and Description */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Logo className="size-8" />
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
              <div className="flex justify-between">
                <h3 className="mb-3 font-semibold">Connect</h3>
                <ThemeToggle />
              </div>
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
  );
}
