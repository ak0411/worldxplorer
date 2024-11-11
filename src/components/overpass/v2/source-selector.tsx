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

type Props = {
  className?: string;
};

export default function StreetViewSourceSelector({ className }: Props) {
  const { overpassState, setOverpassState } = useOverpassState();

  return (
    <div className={className}>
      <Select
        value={overpassState.source}
        onValueChange={(value) =>
          setOverpassState({ source: value as google.maps.StreetViewSource })
        }
      >
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
