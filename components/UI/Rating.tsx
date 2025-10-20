import Image from 'next/image';

interface StarRatingProps {
  rating: number;
  single?: boolean;
}

export default function StarRating({ rating, single }: StarRatingProps) {
  const fullStars = Math.round(rating);

  if (single) {
    return (
      <>
        <Image src="/img/star.png" alt="star" width={16} height={16} />
      </>
    );
  }

  return (
    <div className="starsWrapper">
      {Array.from({ length: fullStars }, (_, i) => (
        <Image
          key={i}
          src="/img/star.png"
          alt="star"
          width={16}
          height={16}
          className="stars"
        />
      ))}
    </div>
  );
}
