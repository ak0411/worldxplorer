import AsciiEarth from '@/components/AsciiEarth';
import Image from 'next/image';
import React from 'react';
import globe from '@/public/globe_texture.jpg';

type Props = {};

const GlobePage = (props: Props) => {
  return (
    <div
      className="box-border flex min-h-screen items-center justify-center"
      style={{
        backgroundImage: 'radial-gradient(circle, #000 25vmin, #024 100vmax)',
      }}
    >
      <AsciiEarth />
    </div>
  );
};

export default GlobePage;
