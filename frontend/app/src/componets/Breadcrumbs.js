import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Breadcrumbs = ({ favoriteItems, product }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <div className="mb-6">
      <div className="mb-6">
        <div className="flex items-center text-sm text-gray-500">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/products" className="hover:text-primary">All Products</Link>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">All Products</h1>
          <p className="text-gray-500 mt-1">Showing 1-16 of 124 products</p>
        </div>
       
      </div>
      {favoriteItems && product && favoriteItems.some(item => item._id === product._id) && (
        <div className="text-green-500 text-sm mt-2">
          This product is in your favorites!
        </div>
      )}
    </div>
  );
};

export default Breadcrumbs;
