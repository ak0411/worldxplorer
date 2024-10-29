import { Copy } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import Link from 'next/link';

const resources = [
  {
    link: 'https://osm-queries.ldodds.com/tutorial/',
    label: 'TagFinder',
    descrption: 'Handy tool for finding tags to filter locations.',
  },
  {
    link: 'https://overpass-turbo.eu/',
    label: 'Overpass Turbo',
    descrption:
      "Great for testing Overpass QL queries. This app was inspired by Overpass Turbo's functionality.",
  },
  {
    link: 'https://osm-queries.ldodds.com/tutorial/',
    label: 'Overpass QL Tutorial',
    descrption: 'A beginner-friendly tutorial on writing Overpass QL queries.',
  },
  {
    link: 'https://osmlab.github.io/learnoverpass/en/docs/',
    label: 'Overpass API Documentation',
    descrption: 'A comprehensive documentation for Overpass QL.',
  },
];

export function Resources() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Help/Resources</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-fit">
        <DialogHeader>
          <DialogTitle>Useful Resources</DialogTitle>
          <DialogDescription>
            Explore these resources to help you make the most of Overpass Mode
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <ul className="space-y-1">
            {resources.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.link}
                  rel="noopener noreferrer"
                  target="_blank"
                  className="text-blue-500 hover:underline"
                >
                  {item.label}
                </Link>
                <span> - {item.descrption}</span>
              </li>
            ))}
          </ul>
          <p className="text-muted-foreground">
            <b>NOTE</b>: When writing a query, the output type is predefined to{' '}
            <span className="bg-secondary font-bold">[out:json]</span> and{' '}
            <span className="bg-secondary font-bold">out center</span>. You
            don't need to include these in your query, as adding them may cause
            an error response. Simply focus on the main query parameters to
            filter locations.
          </p>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
