import StarIcon from '../assets/star.svg?react';

interface RatingProps {
  rating: number;
  onRate: (newRating: number) => void;
}

const Rating = ({ rating, onRate }: RatingProps) => {
  return (
    <div className="rating">
      {[...Array(5)].map((_, index) => (
        <StarIcon
          key={index}
          className={index < rating ? 'filled' : ''}
          onClick={() => onRate(index + 1)}
        />
      ))}
    </div>
  );
};

export default Rating;