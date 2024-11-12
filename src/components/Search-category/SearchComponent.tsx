import React, { useState, ChangeEvent } from 'react';

interface SearchComponentProps {
  onSearch: (term: string) => void;
  onCategoryChange: (category: string) => void;
}

function SearchComponent({ onSearch, onCategoryChange }: SearchComponentProps) {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [category, setCategory] = useState<string>('');

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);
    onSearch(term);
  };

  const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = event.target.value;
    setCategory(selectedCategory);
    onCategoryChange(selectedCategory);
  };

  return (
    <div className="mx-[70px] my-4">
      <div className="flex flex-col sm:flex-row">
        <div className="w-full sm:w-1/3 mb-4 sm:mb-0 sm:mr-4">
          <input
            type="text"
            className="w-full h-10 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-full focus:outline-none focus:border-blue-500 pl-10"
            aria-label="Search products"
            onChange={handleSearch}
            value={searchTerm}
            placeholder="Search products..."
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' class='bi bi-search' viewBox='0 0 16 16'%3E%3Cpath d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z'%3E%3C/path%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: '13px center'
            }}
          />
        </div>

        <div className="w-full sm:w-1/3">
          <select
            className="w-full h-10 px-4 py-2 text-lg text-gray-700 bg-white border-b-2 border-gray-300 rounded focus:outline-none"
            onChange={handleCategoryChange}
            value={category}
          >
            <option value="">All Categories</option>
            <option value="men's clothing">Men's Clothing</option>
            <option value="jewelery">Jewelery</option>
            <option value="electronics">Electronics</option>
            <option value="women's clothing">Women's Clothing</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default SearchComponent;