import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useOverpassState } from '@/hooks/use-overpass-state';
import { Element } from '@/lib/types';
import React from 'react';
import { FixedSizeList } from 'react-window';

type LocationSelectorProps = {
  elements: Element[];
};
export function LocationSelector({ elements }: LocationSelectorProps) {
  const { overpassState, setOverpassState } = useOverpassState();
  const { index } = overpassState;
  const itemSize = 35;
  const itemCount = elements ? elements.length : 0;
  return (
    <Select
      onValueChange={(value) => setOverpassState({ index: parseInt(value) })}
      value={index!.toString()}
    >
      <SelectTrigger className="w-[100px] border-none bg-[#222]/80 font-semibold text-white focus-visible:ring-transparent">
        <SelectValue>
          {elements[index!] ? index : 'Select by Location Index'}
        </SelectValue>
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
                {listIndex}
              </SelectItem>
            )}
          </FixedSizeList>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
