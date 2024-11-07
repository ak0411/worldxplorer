import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Element } from '@/lib/types';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import { FixedSizeList } from 'react-window';

type LocationSelectorProps = {
  elements: Element[];
  index: number;
};
export function LocationSelector({ elements, index }: LocationSelectorProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleValueChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('index', value);
    router.replace(`?${params.toString()}`);
  };

  const itemSize = 35;
  const itemCount = elements ? elements.length : 0;
  return (
    <Select onValueChange={handleValueChange}>
      <SelectTrigger className="w-[100px] border-none bg-[#222]/80 font-semibold text-white focus-visible:ring-transparent">
        <SelectValue placeholder={index + 1}>{index + 1}</SelectValue>
      </SelectTrigger>
      <SelectContent
        side="top"
        align="center"
        className="border-none bg-[#222]/80 font-semibold text-white focus-visible:ring-transparent"
      >
        <SelectGroup>
          <SelectLabel>Select Location</SelectLabel>
          <FixedSizeList
            height={200}
            itemCount={itemCount}
            itemSize={itemSize}
            width="100%"
          >
            {({ index: listIndex, style }) => (
              <SelectItem
                key={elements[listIndex].id}
                value={listIndex.toString()}
                style={style}
              >
                {listIndex + 1}
              </SelectItem>
            )}
          </FixedSizeList>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
