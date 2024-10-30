import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useStore } from '@/store';
import React from 'react';
import { FixedSizeList } from 'react-window';

export function LocationSelector() {
  const { elements, currentIndex, access } = useStore();

  const itemSize = 35;
  const itemCount = elements ? elements.length : 0;

  return (
    <Select
      onValueChange={(currentValue) => {
        access(parseInt(currentValue));
      }}
    >
      <SelectTrigger className="w-[100px] border-none bg-[#222]/80 font-semibold text-white">
        <SelectValue placeholder={currentIndex + 1}>
          {currentIndex + 1}
        </SelectValue>
      </SelectTrigger>
      <SelectContent
        side="top"
        align="center"
        className="border-none bg-[#222]/80 font-semibold text-white"
      >
        <SelectGroup>
          <SelectLabel>Select Location</SelectLabel>
          <FixedSizeList
            height={200}
            itemCount={itemCount}
            itemSize={itemSize}
            width="100%"
          >
            {({ index, style }) => (
              <SelectItem
                key={elements![index].id}
                value={index.toString()}
                style={style}
              >
                {index + 1}
              </SelectItem>
            )}
          </FixedSizeList>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
