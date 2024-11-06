import { MapProvider } from '@/providers/map-provider';
import React from 'react';

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return <MapProvider>{children}</MapProvider>;
}
