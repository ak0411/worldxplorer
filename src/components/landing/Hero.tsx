import React from 'react';
import { Logo } from '@/components/shared/Logo';

const Hero = () => {
  return (
    <div className="relative mx-auto p-4 text-center">
      <div className="flex items-center justify-center font-pixelated text-5xl font-bold tracking-widest text-foreground md:pt-8 md:text-7xl">
        <span>World</span>
        <div className="flex flex-col items-center">
          <span className="animate-bounce">X</span>
          <Logo className="size-32" />
        </div>
        <span>plorer</span>
      </div>
      <p className="mx-auto my-8 max-w-3xl text-muted-foreground md:text-xl">
        <b>Discover the World, Right From Your Screen</b>
        <br />
        Travel to random places, explore specific locations, and uncover hidden
        gems — all through immersive, interactive street views.
      </p>
    </div>
  );
};

export default Hero;
