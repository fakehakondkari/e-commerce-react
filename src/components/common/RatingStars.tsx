interface RatingStarsProps {
  rating: number;
}

export function RatingStars({ rating }: RatingStarsProps) {
  const stars = Array.from({ length: 5 }, (_, index) => index + 1);
  return (
    <div className="flex items-center gap-1 text-amber-500">
      {stars.map((value) => (
        <span key={value} className={value <= rating ? 'text-amber-500' : 'text-slate-300'}>★</span>
      ))}
      <span className="ml-2 text-sm text-slate-500">{rating.toFixed(1)}</span>
    </div>
  );
}
