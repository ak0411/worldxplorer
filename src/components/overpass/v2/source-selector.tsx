import React, { ComponentProps } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useRouter, useSearchParams } from 'next/navigation';

type Props = {
  streetViewSource: google.maps.StreetViewSource;
  className?: string;
};

export default function StreetViewSourceSelector({
  streetViewSource,
  className,
}: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleStreetViewSource = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('streetViewSource', value);
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className={className}>
      <Select value={streetViewSource} onValueChange={handleStreetViewSource}>
        <SelectTrigger className="w-fit rounded-[2px] border-none bg-[#222]/80 font-semibold text-white focus-visible:ring-transparent">
          <SelectValue placeholder="Select a Street View Source" />
        </SelectTrigger>
        <SelectContent className="rounded-[2px] border-none bg-[#222]/80 text-white">
          <SelectGroup>
            <SelectLabel>Street View Source</SelectLabel>
            <SelectItem value={google.maps.StreetViewSource.DEFAULT}>
              Default
            </SelectItem>
            <SelectItem value={google.maps.StreetViewSource.GOOGLE}>
              Google
            </SelectItem>
            <SelectItem value={google.maps.StreetViewSource.OUTDOOR}>
              Outdoor
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
