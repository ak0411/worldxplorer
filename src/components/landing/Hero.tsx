import React from 'react';
import { Logo } from '@/components/shared/Logo';
import Image from 'next/image';
import worldMap from '@/public/world_map.svg';

const Hero = () => {
  return (
    <div className="relative">
      <Image src={worldMap} alt="world map" className="absolute opacity-20" />
      <div className="relative mx-auto py-20 text-center sm:px-6 lg:px-8">
        <div className="mt-6 flex items-center justify-center font-pixelated text-4xl font-bold tracking-widest text-foreground sm:text-6xl">
          <span>World</span>
          <div className="flex flex-col gap-0">
            <span className="animate-bounce text-6xl sm:text-7xl">X</span>
            <Logo className="size-32" />
          </div>
          <span>plorer</span>
        </div>
        <p className="mx-auto mt-4 max-w-3xl text-xl text-muted-foreground">
          <b>Discover the World, Right From Your Screen</b>
          <br />
          Travel to random places, explore specific locations, and uncover
          hidden gems — all through immersive, interactive street views.
        </p>
      </div>
    </div>
  );
};

export default Hero;
