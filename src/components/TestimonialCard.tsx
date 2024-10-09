import { Star } from 'lucide-react';

type TestimonialCardProps = {
  quote: string;
  author: string;
};

const TestimonialCard = ({ quote, author }: TestimonialCardProps) => (
  <div className="rounded-lg bg-background p-6 shadow-md">
    <Star className="mb-4 h-8 w-8 text-yellow-400" />
    <p className="mb-4 italic">{quote}</p>
    <p className="font-semibold">{author}</p>
  </div>
);

export default TestimonialCard;
