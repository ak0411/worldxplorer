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
    label: 'Overpass QL Tutorial',
    descrption: 'A beginner-friendly tutorial on writing Overpass QL queries.',
  },
  {
    link: 'https://tagfinder.osm.ch/',
    label: 'TagFinder',
    descrption: 'Handy tool for finding tags to filter locations.',
  },
  {
    link: 'https://osmlab.github.io/learnoverpass/en/docs/',
    label: 'Overpass API Documentation',
    descrption: 'A comprehensive documentation for Overpass QL.',
  },
  {
    link: 'https://overpass-turbo.eu/',
    label: 'Overpass Turbo',
    descrption:
      "Great for testing Overpass QL queries. This mode was inspired by Overpass Turbo's functionality.",
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
                  className="text-primary hover:underline"
                >
                  {item.label}
                </Link>
                <span> - {item.descrption}</span>
              </li>
            ))}
          </ul>
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
