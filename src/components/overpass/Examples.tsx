/* eslint-disable react/no-unescaped-entities */
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

export function Examples() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Example Queries</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-fit">
        <DialogHeader>
          <DialogTitle>Example Queries</DialogTitle>
          <DialogDescription>
            Overpass QL is great for interacting with OpenStreetMap (OSM) data!
            Here are some queries:
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div className="space-y-1">
            <p>
              <b>Example 1:</b> "Shrines in Japan."
            </p>
            <pre className="rounded-[2px] bg-secondary p-2">
              <code>
                area["ISO3166-1"="JP"];
                <br />
                nwr["building"="shrine"](area);
              </code>
            </pre>
          </div>
          <div className="space-y-1">
            <p>
              <b>Example 2:</b> "Parks in Thailand with English names."
            </p>
            <pre className="rounded-[2px] bg-secondary p-2">
              <code>
                area["ISO3166-1"="TH"];
                <br />
                nwr["leisure"="park"]["name:en"](area);
              </code>
            </pre>
          </div>
          <div className="space-y-1">
            <p>
              <b>Example 2:</b> "Viewpoints in Sweden within 50m to a
              coastline."
            </p>
            <pre className="rounded-[2px] bg-secondary p-2">
              <code>
                area["ISO3166-1"="SE"];
                <br />
                way(area)["natural"="coastline"];
                <br />
                node(around:50)["tourism"="viewpoint"];
              </code>
            </pre>
          </div>
          <p className="text-muted-foreground">
            <b>NOTE</b>: When writing a query, the output type is predefined to{' '}
            <span className="bg-secondary font-bold">[out:json]</span> and{' '}
            <span className="bg-secondary font-bold">out center</span>. You
            don't need to include these in your query, as adding them may cause
            an error response.
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
