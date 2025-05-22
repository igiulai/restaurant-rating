import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getRestaurants, updateRestaurantRating } from './api';
import Logo from './components/Logo';
import Avatar from './components/Avatar';
import SearchBar from './components/SearchBar';
import Sorting from './components/Sorting';
import RestaurantCard from './components/RestaurantCard';
import './styles.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Access the queryClient instance
  const queryClient = useQueryClient(); // Now correctly imported

  // Fetch restaurants using useQuery
  const {
    data: restaurants = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['restaurants'], // Unique key for this query
    queryFn: getRestaurants, // Function to fetch data
  });

  // Update restaurant rating using useMutation
  const mutation = useMutation({
    mutationFn: updateRestaurantRating, // Function to update rating
    onSuccess: () => {
      // Invalidate the 'restaurants' query to refetch data
      queryClient.invalidateQueries({ queryKey: ['restaurants'] }); // Use queryClient instance
    },
  });

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSort = () => {
    setSortOrder(prevOrder => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  const handleRate = (id: string, newRating: number) => {
    mutation.mutate({ id, rating: newRating }); // Trigger the mutation
  };

  // Filter and sort restaurants based on search term and sort order
  const filteredRestaurants = restaurants
    .filter(restaurant => restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => (sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)));

  // Show loading state if data is being fetched
  if (isLoading) {
    return <p className="loading-message">Please wait...</p>;
  }

  // Show error state if there's an error
  if (isError) {
    return <p className="error-message">Failed to load restaurants. Please try again later.</p>;
  }

  return (
    <>
      <header>
        <Logo />
        <Avatar />
      </header>
      <main>
        <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />
        <Sorting sortOrder={sortOrder} onSort={handleSort} />

        {/* Render restaurant cards */}
        <section className="restaurant-list">
          {filteredRestaurants.map(restaurant => (
            <RestaurantCard
              key={restaurant.id}
              restaurant={restaurant}
              onRate={handleRate}
            />
          ))}
        </section>
      </main>
      <footer>
        <p>Privacy Policy</p>
        <p className="corporation">2022 Eats</p>
        <p>Terms Of Service</p>
      </footer>
    </>
  );
}

export default App;