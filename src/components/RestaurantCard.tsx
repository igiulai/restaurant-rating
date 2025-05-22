import Rating from './Rating';

interface RestaurantCardProps {
  restaurant: {
    id: string;
    name: string;
    description: string;
    rating: number;
    url: string;
  };
  onRate: (id: string, newRating: number) => void;
}

const RestaurantCard = ({ restaurant, onRate }: RestaurantCardProps) => {
  return (
    <div className="restaurant-card">
      <img src={restaurant.url} alt={restaurant.name} className="restaurant-image" />
      <h2>{restaurant.name}</h2>
      <p>{restaurant.description}</p>
      <Rating rating={restaurant.rating} onRate={(newRating) => onRate(restaurant.id, newRating)} />
    </div>
  );
};

export default RestaurantCard;