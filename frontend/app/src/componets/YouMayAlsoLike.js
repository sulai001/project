import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const renderStars = (rating) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  return (
    <>
      {[...Array(fullStars)].map((_, i) => <i key={i} className="ri-star-fill" />)}
      {halfStar && <i className="ri-star-half-fill" />}
      {[...Array(5 - Math.ceil(rating))].map((_, i) => <i key={i + 10} className="ri-star-line" />)}
    </>
  );
};

const YouMayAlsoLike = ({
  onAddToCart,
  onRemoveFromCart,
  onAddToFavorites,
  onRemoveFromFavorites,
  favoriteItems,
  cartItems
}) => {
  const [topProducts, setTopProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        if (Array.isArray(data)) {
          const top = data
            .filter((p) => p.rating && p.rating > 0)
            .sort((a, b) => b.rating - a.rating)
            .slice(0, 4);
          setTopProducts(top);
        } else {
          console.error('Expected array from products API');
        }
      } catch (err) {
        console.error('Fetch failed:', err);
      }
    };

    fetchProducts();
  }, []);

  const isInFavorites = (id) => favoriteItems?.some((item) => item._id === id);
  const isInCart = (id) => cartItems?.some((item) => item && item.product && item.product._id === id);
  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8">You May Also Like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {topProducts.map((product) => (
            <div key={product._id} className="bg-white rounded shadow-sm overflow-hidden">
              <div className="relative">
                <Link to={`/shop/${product._id}`}>
                  <img
                    src={product.images[0]?.url || '/placeholder.jpg'}
                    alt={product.name}
                    className="w-full h-64 object-cover object-top"
                  />
                </Link>
                <div className="absolute top-2 right-2">
                  <button
                    onClick={() =>
                      isInFavorites(product._id)
                        ? onRemoveFromFavorites(product._id)
                        : onAddToFavorites(product._id)
                    }
                    className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-sm hover:bg-gray-100"
                  >
                    <i
                      className={
                        isInFavorites(product._id)
                          ? 'ri-heart-fill text-red-500'
                          : 'ri-heart-line text-gray-700'
                      }
                    />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-medium mb-1">{product.name}</h3>
                <div className="flex items-center mb-2">
                  <div className="flex text-yellow-400 text-xs">
                    {renderStars(product.rating)}
                  </div>
                  <span className="ml-1 text-xs text-gray-500">({product.numReviews})</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-bold">₹{product.price}</span>
                  {isInCart(product._id) ? (
                    <button
                      className="bg-red-500 text-white py-1.5 px-3 rounded text-sm hover:bg-red-600 whitespace-nowrap"
                      onClick={() => onRemoveFromCart(product._id)}
                    >
                      In cart
                    </button>
                  ) : (
                    <button
                      className="bg-primary text-white py-1.5 px-3 rounded text-sm hover:bg-primary/90 whitespace-nowrap"
                      onClick={() => onAddToCart({ productId: product._id, quantity: 1 })}
                    >
                      Add to Cart
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default YouMayAlsoLike;
