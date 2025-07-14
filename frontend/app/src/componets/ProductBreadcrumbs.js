// ProductBreadcrumbs.js
import React from 'react';
import { Link } from 'react-router-dom';

const ProductBreadcrumbs = () => {
  return (
    <div className="my-6">
      <ul className="flex text-sm text-gray-500">
        <li className="after:content-['/'] after:mx-2">
          <Link to="/" className="hover:text-primary">Home</Link>
        </li>
        <li className="after:content-['/'] after:mx-2">
          <Link to="/Shop" className="hover:text-primary">Shop</Link>
        </li>
        <li className="after:content-['/'] after:mx-2">
          <Link to="/" className="hover:text-primary">Current product name</Link>
        </li>
      </ul>
    </div>
  );
};

export default ProductBreadcrumbs;