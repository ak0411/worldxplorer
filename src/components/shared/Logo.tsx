import Image from 'next/image';
import globe from '@/public/assets/logo.png';

interface LogoProps {
  className?: string;
}

export function Logo({ className = 'h-16 w-16' }: LogoProps) {
  return (
    <div className={className}>
      <Image src={globe} alt="WorldXplorer Logo" priority />
    </div>
  );
}
