const API_URL = 'http://localhost:3000';

export interface Restaurant {
  id: string;
  name: string;
  description: string;
  rating: number;
  url: string;
}

export const getRestaurants = async (): Promise<Restaurant[]> => {
  const response = await fetch(`${API_URL}/restaurants`);
  if (!response.ok) {
    throw new Error('Failed to fetch restaurants');
  }
  return response.json();
};

interface UpdateRestaurantRatingArgs {
  id: Restaurant['id'];
  rating: Restaurant['rating'];
}

export const updateRestaurantRating = async ({
  id,
  rating,
}: UpdateRestaurantRatingArgs): Promise<Restaurant> => {
  const response = await fetch(`${API_URL}/restaurants/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ rating }),
  });
  if (!response.ok) {
    throw new Error('Failed to update restaurant rating');
  }
  return response.json();
};