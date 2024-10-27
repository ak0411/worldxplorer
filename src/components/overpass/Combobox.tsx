'use client';

import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useElementStore } from '@/store';

const frameworks = [
  {
    value: 'next.js',
    label: 'Next.js',
  },
  {
    value: 'sveltekit',
    label: 'SvelteKit',
  },
  {
    value: 'nuxt.js',
    label: 'Nuxt.js',
  },
  {
    value: 'remix',
    label: 'Remix',
  },
  {
    value: 'astro',
    label: 'Astro',
  },
];

export function Combobox({ placeholder }: { placeholder: string }) {
  const { elements, currentIndex, access } = useElementStore();

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<number>(currentIndex);

  React.useEffect(() => {
    setValue(currentIndex);
  }, [currentIndex]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value + 1 || placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" side="top">
        <Command>
          <CommandInput placeholder={placeholder} />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {elements?.map((item, index) => (
                <CommandItem
                  key={item.id}
                  value={index.toString()}
                  onSelect={(currentValue) => {
                    setValue(
                      currentValue === value.toString()
                        ? currentIndex
                        : parseInt(currentValue)
                    );
                    setOpen(false);
                    access(parseInt(currentValue));
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      value === index ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  {index + 1}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
