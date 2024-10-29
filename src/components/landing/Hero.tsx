import Image from 'next/image';
import React from 'react';
import { Logo } from '@/components/shared/Logo';
import backgroundImg from '@/public/hero.png';

const Hero = () => {
  return (
    <div className="relative">
      <div className="absolute inset-0 z-0 h-[500px] opacity-20">
        <Image
          src={backgroundImg}
          alt="Landing Background"
          layout="fill"
          priority
        />
      </div>
      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-16 pt-20 text-center sm:px-6 lg:px-8">
        <div className="font-pixelated mt-6 flex items-center justify-center text-4xl font-bold tracking-widest text-primary sm:text-6xl">
          <span>World</span>
          <div className="flex flex-col gap-0">
            <span className="animate-bounce text-6xl sm:text-7xl">X</span>
            <Logo className="size-32" />
          </div>
          <span>plorer</span>
        </div>
        <p className="mx-auto mt-4 max-w-2xl text-xl text-muted-foreground">
          Embark on virtual journeys across the globe. Discover random locations
          or explore specific places through custom queries.
        </p>
      </div>
    </div>
  );
};

export default Hero;
