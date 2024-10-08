'use client';

import StreetView from '@/components/StreetView';
import { Button } from '@/components/ui/button';
import useRandomStreetView from '@/hooks/useRandomStreetView';

export default function Home() {
  const { position, loading, refetch } = useRandomStreetView();

  return (
    <div className="relative h-full">
      <Button className="absolute z-10" disabled={loading} onClick={refetch}>
        {loading ? 'Loading...' : 'Random Location'}
      </Button>
      {position && <StreetView position={position} />}
    </div>
  );
}
