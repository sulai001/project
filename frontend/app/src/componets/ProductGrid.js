import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ProductGrid = ({
  products = [],
  onAddToCart,
  onRemoveFromCart,
  onAddToFavorites,
  onRemoveFromFavorites,
  cartItems = [],
  favoriteItems = [],
}) => {
  const [searchText, setSearchText] = useState('');

  const renderStars = (rating) => {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;
    return (
      <>
        {[...Array(full)].map((_, i) => (
          <i key={`full-${i}`} className="ri-star-fill text-xs text-yellow-400"></i>
        ))}
        {half && <i className="ri-star-half-fill text-xs text-yellow-400"></i>}
        {[...Array(5 - full - (half ? 1 : 0))].map((_, i) => (
          <i key={`empty-${i}`} className="ri-star-line text-xs text-yellow-400"></i>
        ))}
      </>
    );
  };

  const isInCart = (productId) =>
    cartItems.some((item) => item.product?._id === productId || item._id === productId);

  const isFavorite = (productId) =>
    favoriteItems.some((item) => item._id === productId);

  // Filter products by search text
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <>
      <div className="flex justify-end mb-4">
        <input
          type="text"
          placeholder="Search products..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 w-full max-w-xs"
        />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {filteredProducts.map((product) => (
          <div key={product._id} className="product-card bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="relative group">
              <Link to={`/shop/${product._id}`}>
                <img
                  src={product.images?.[0]?.url || '/placeholder.jpg'}
                  alt={product.name}
                  className="w-full h-80 object-cover object-top"
                />
              </Link>
              {/* Badge */}
              {product.badge && (
                <div className="absolute top-3 left-3">
                  <span className="bg-primary text-white text-xs px-2 py-1 rounded">{product.badge}</span>
                </div>
              )}

              {/* Favorite Button */}
              <div className="absolute top-3 right-3">
                <button
                  onClick={() =>
                    isFavorite(product._id)
                      ? onRemoveFromFavorites(product._id)
                      : onAddToFavorites(product)
                  }
                  className={`w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-md transition-colors ${
                    isFavorite(product._id) ? 'text-red-500' : 'text-gray-400 hover:text-primary'
                  }`}
                >
                  <i className={isFavorite(product._id) ? 'ri-heart-fill' : 'ri-heart-line'}></i>
                </button>
              </div>

              {/* Cart Button */}
              <div className="quick-actions absolute bottom-0 left-0 right-0 bg-white bg-opacity-90 py-3 px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={() =>
                    isInCart(product._id)
                      ? onRemoveFromCart(product._id)
                      : onAddToCart(product)
                  }
                  className={`w-full py-2 rounded-button font-medium transition-colors ${
                    isInCart(product._id)
                      ? 'bg-red-500 text-white hover:bg-red-600'
                      : 'bg-primary text-white hover:bg-primary/90'
                  }`}
                >
                  {isInCart(product._id) ? 'Remove from Cart' : 'Add to Cart'}
                </button>
              </div>
            </div>

            {/* Info */}
            <div className="p-4">
              <div className="flex items-center mb-1">
                <div className="flex">{renderStars(product.rating || 0)}</div>
                <span className="text-xs text-gray-500 ml-1">({product.reviews?.length || 0})</span>
              </div>
              <h3 className="font-medium text-gray-900 mb-1">{product.name}</h3>
              <div className="flex items-center">
                <span className="text-primary font-medium">${product.price?.toFixed(2)}</span>
                {product.oldPrice && (
                  <span className="text-gray-500 line-through text-sm ml-2">${product.oldPrice.toFixed(2)}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductGrid;