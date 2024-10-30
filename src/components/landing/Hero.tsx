import React from 'react';
import { Logo } from '@/components/shared/Logo';
import Image from 'next/image';
import worldMap from '@/public/assets/world_map.svg';

const Hero = () => {
  return (
    <div className="relative">
      <Image
        src={worldMap}
        alt="world map"
        className="absolute opacity-20"
        priority
      />
      <div className="relative mx-auto text-center sm:px-6 lg:px-8">
        <div className="flex items-center justify-center pt-20 font-pixelated text-4xl font-bold tracking-widest text-foreground sm:text-6xl">
          <span>World</span>
          <div className="flex flex-col items-center">
            <span className="animate-bounce text-6xl sm:text-7xl">X</span>
            <Logo className="size-32" />
          </div>
          <span>plorer</span>
        </div>
        <p className="mx-auto my-12 max-w-3xl text-xl text-muted-foreground">
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
