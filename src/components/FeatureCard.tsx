'use client';

type FeatureCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => (
  <div className="rounded-lg bg-background p-6 text-center shadow-md">
    <div className="flex justify-center">{icon}</div>
    <h3 className="mb-2 mt-4 text-xl font-semibold">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </div>
);

export default FeatureCard;
