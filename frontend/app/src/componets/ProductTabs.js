import React, { useState, useEffect } from 'react';

const ProductTabs = ({ product, productId }) => {
  const [activeTab, setActiveTab] = useState('description');
  const [reviews, setReviews] = useState([]);
  console.log('Fetching top products...');
  const [topProducts, setTopProducts] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const res = await fetch(`https://mern-backend-jsxn.onrender.com/api/reviews/${productId}`);
      const data = await res.json();
      setReviews(data.reviews || []);
    };
    fetchReviews();
  }, [productId]);

  const renderTabContent = () => {
    if (activeTab === 'description') {
      return (
        <div className="max-w-3xl space-y-4">
          <h3 className="text-xl font-semibold text-gray-800">Product Description</h3>
          <p className="text-gray-600 leading-relaxed">
            {product?.description || 'No description available.'}
          </p>
        </div>
      );
    }

    if (activeTab === 'reviews') {
      return (
        <div className="max-w-3xl space-y-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Customer Reviews</h3>
          {reviews.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {reviews.map((r, i) => (
                <li key={i} className="py-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700 font-medium">{r?.user?.name || 'User'}</span>
                    <span className="text-xs text-yellow-500 font-semibold">★ {r.rating}/5</span>
                  </div>
                  <p className="mt-1 text-gray-600 text-sm">{r.comment}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-sm">No reviews yet for this product.</p>
          )}
        </div>
      );
    }
  };

  return (
    <div className="my-16">
      <div className="flex space-x-4 border-b border-gray-200 mb-6 bg-gray-50 rounded-t-lg px-4 py-2 shadow-sm">
        <button
          onClick={() => setActiveTab('description')}
          className={`mr-2 px-5 py-2 rounded-t-lg font-semibold text-base transition-all duration-200
          ${activeTab === 'description'
            ? 'bg-primary text-white shadow border-b-2 border-primary'
            : 'bg-white text-gray-600 hover:bg-gray-100 hover:text-primary border-b-2 border-transparent'
          }`}
        >
          Description
        </button>
        <button
          onClick={() => setActiveTab('reviews')}
          className={`px-5 py-2 rounded-t-lg font-semibold text-base transition-all duration-200
          ${activeTab === 'reviews'
            ? 'bg-primary text-white shadow border-b-2 border-primary'
            : 'bg-white text-gray-600 hover:bg-gray-100 hover:text-primary border-b-2 border-transparent'
          }`}
        >
          Reviews ({reviews.length})
        </button>
      </div>
      <div className="bg-white rounded-b-lg shadow p-6">{renderTabContent()}</div>
    </div>
  );
};

export default ProductTabs;
