import Image from 'next/image';
import appLogo from '@/public/logo.png';

interface LogoProps {
  className?: string;
}

export function Logo({ className = 'h-16 w-16' }: LogoProps) {
  return (
    <div className={`relative ${className}`}>
      <Image
        src={appLogo}
        alt="WorldXplorer Logo"
        placeholder="blur"
        blurDataURL=""
      />
    </div>
  );
}
