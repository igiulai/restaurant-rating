import React from 'react';

interface SearchBarProps {
  searchTerm: string;
  onSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar = ({ searchTerm, onSearch }: SearchBarProps) => {
  return (
    <div className="search-bar">
      <input
        placeholder="Search for restaurants"
        value={searchTerm}
        onChange={onSearch}
      />
    </div>
  );
};

export default SearchBar;