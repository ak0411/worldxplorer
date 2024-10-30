import { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Link from 'next/link';

interface ModeCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
  buttonText: string;
}

export function ModeCard({
  icon: Icon,
  title,
  description,
  href,
  buttonText,
}: ModeCardProps) {
  return (
    <Card className="bg-card/50 p-6 backdrop-blur transition-shadow duration-300 hover:shadow-md">
      <div className="flex h-full flex-col items-center gap-4 text-center">
        <div className="rounded-full bg-primary/10 p-3">
          <Icon className="h-8 w-8 text-primary" />
        </div>
        <h2 className="font-pixelated text-2xl font-semibold uppercase tracking-widest">
          {title}
        </h2>
        <p className="text-muted-foreground">{description}</p>
        <Link href={href}>
          <Button className="font-pixelated uppercase tracking-wide">
            {buttonText}
          </Button>
        </Link>
      </div>
    </Card>
  );
}
