import React, { useState } from 'react';

const categories = ["All Categories", "Dresses", "Tops", "Bottoms", "Outerwear", "Accessories"];
const brands = ["Elegance", "Chic Couture", "Urban Styles", "Luxe Fashion", "Trendsetter"];
const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
const colors = [
  { name: "Black", class: "bg-black" },
  { name: "White", class: "bg-white border border-gray-300" },
  { name: "Red", class: "bg-red-500" },
  { name: "Blue", class: "bg-blue-500" },
  { name: "Green", class: "bg-green-500" },
  { name: "Yellow", class: "bg-yellow-400" },
];

const FilterSection = () => {
  const [activeFilters, setActiveFilters] = useState({
    size: "M",
    color: "Blue",
  });

  const clearAll = () => setActiveFilters({});

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm mb-6 hidden md:block">
      <div className="flex flex-wrap items-center p-4 gap-4">

        {/* Categories Filter */}
        <Dropdown title="Categories">
          {categories.map((cat) => (
            <Checkbox key={cat} label={cat} checked={cat === "All Categories"} />
          ))}
        </Dropdown>

        {/* Price Filter */}
        <Dropdown title="Price">
          <div className="p-4">
            <div className="flex justify-between text-sm text-gray-700 mb-2">
              <span>$0</span><span>$500</span>
            </div>
            <input type="range" min="0" max="500" defaultValue="500" className="price-range-slider w-full" />
            <div className="flex justify-between mt-4 gap-2">
              <button className="text-sm border px-3 py-1 rounded-button">Reset</button>
              <button className="text-sm bg-primary text-white px-3 py-1 rounded-button">Apply</button>
            </div>
          </div>
        </Dropdown>

        {/* Brand Filter */}
        <Dropdown title="Brand">
          {brands.map((brand) => (
            <Checkbox key={brand} label={brand} />
          ))}
        </Dropdown>

        {/* Size Filter */}
        <Dropdown title="Size">
          <div className="grid grid-cols-4 gap-2 p-3">
            {sizes.map((size) => (
              <button key={size} className={`w-10 h-10 flex items-center justify-center border rounded text-sm ${size === activeFilters.size ? 'border-primary text-primary' : 'border-gray-200 hover:border-primary hover:text-primary'}`}>
                {size}
              </button>
            ))}
          </div>
        </Dropdown>

        {/* Color Filter */}
        <Dropdown title="Color">
          <div className="grid grid-cols-6 gap-2 p-3">
            {colors.map((c) => (
              <button
                key={c.name}
                className={`w-8 h-8 rounded-full ${c.class} border-2 ${activeFilters.color === c.name ? 'border-primary' : 'border-transparent hover:border-gray-300'}`}
                title={c.name}
              />
            ))}
          </div>
        </Dropdown>

        {/* Sort By */}
        <Dropdown title="Sort By" alignRight>
          <div className="p-2 text-sm">
            {["Featured", "Newest", "Price: Low to High", "Price: High to Low", "Customer Rating"].map((sort, i) => (
              <button key={i} className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700">
                {sort}
              </button>
            ))}
          </div>
        </Dropdown>

        {/* View Toggle Icons */}
        <div className="ml-auto flex items-center space-x-2">
          <button className="w-9 h-9 flex items-center justify-center rounded-button border border-primary bg-primary/10 text-primary">
            <i className="ri-layout-grid-line"></i>
          </button>
          <button className="w-9 h-9 flex items-center justify-center rounded-button border border-gray-200 text-gray-500 hover:border-primary hover:text-primary">
            <i className="ri-list-check"></i>
          </button>
        </div>
      </div>

      {/* Active Filters */}
      <div className="px-4 pb-4 flex flex-wrap items-center gap-2">
        <span className="text-sm text-gray-500">Active Filters:</span>
        {Object.entries(activeFilters).map(([key, val]) => (
          <div key={key} className="flex items-center bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700">
            {key.charAt(0).toUpperCase() + key.slice(1)}: {val}
            <button className="ml-2 text-gray-500 hover:text-gray-700" onClick={() => {
              const newFilters = { ...activeFilters };
              delete newFilters[key];
              setActiveFilters(newFilters);
            }}>
              <i className="ri-close-line"></i>
            </button>
          </div>
        ))}
        {Object.keys(activeFilters).length > 0 && (
          <button className="text-primary text-sm hover:underline ml-auto" onClick={clearAll}>Clear All</button>
        )}
      </div>
    </div>
  );
};

// Helper Components
const Dropdown = ({ title, children, alignRight = false }) => (
  <div className="group relative">
    <button className="flex items-center border border-gray-200 px-4 py-2 rounded-button text-gray-700 font-medium group-hover:border-primary group-hover:text-primary transition-colors">
      {title} <i className="ri-arrow-down-s-line ml-2"></i>
    </button>
    <div className={`absolute ${alignRight ? 'right-0' : 'left-0'}  bg-white shadow-lg rounded-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible z-50 min-w-[200px]`}>
      {children}
    </div>
  </div>
);

const Checkbox = ({ label, checked = false }) => (
  <label className="flex items-center p-2 text-sm text-gray-700 cursor-pointer">
    <div className={`custom-checkbox ${checked ? 'checked' : ''}`}></div>
    {label}
  </label>
);

export default FilterSection;
