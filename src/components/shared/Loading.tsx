import React from 'react';
import { Button } from '../ui/button';
import { Logo } from './Logo';

const Loading = () => {
  return (
    <Button disabled variant="secondary">
      <Logo className="mr-2 size-5 animate-spin" />
      Loading...
    </Button>
  );
};

export default Loading;
