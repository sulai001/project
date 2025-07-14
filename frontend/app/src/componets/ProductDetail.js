import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductDetail = ({
  productId,
  quantity,
  onQuantityChange,
  onAddToCart,
  onRemoveFromCart,
  onAddToFav,
  onRemoveFromFav,
  inCart,
  isFavorited
}) => {
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://mern-backend-jsxn.onrender.com/api/products/${productId}`);
        const text = await res.text();
        const data = JSON.parse(text);
        setProduct(data);
        setError(null);
      } catch (err) {
        console.error("Product fetch failed:", err);
        setError(err.message);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const handleThumbnailClick = (index) => {
    setSelectedImageIndex(index);
  };

  if (error) return <div className="text-red-600">{error}</div>;
  if (!product) return <div>Loading...</div>;

  return (
    <div className="flex flex-wrap -mx-4">
      {/* Product Images Section */}
      <div className="w-full lg:w-1/2 px-4 mb-8 lg:mb-0">
        <div className="relative product-image mb-4 overflow-hidden rounded-lg">
          <img
            id="main-image"
            src={product.images?.[selectedImageIndex]?.url || "https://via.placeholder.com/600"}
            alt={product.name || "Product image"}
            className="w-full h-96 object-cover"
            style={{ objectPosition: "top" }}
          />
        </div>

        <div className="flex -mx-2">
          {product.images?.slice(0, 5).map((img, i) => (
            <div className="px-2 w-1/5" key={i}>
              <button
                className={`thumbnail-btn w-full border-2 ${
                  i === selectedImageIndex ? "border-primary" : "border-transparent"
                } rounded-md overflow-hidden hover:border-gray-300 relative`}
                onClick={() => handleThumbnailClick(i)}
              >
                <img
                  src={img.url}
                  alt={`Thumbnail ${i + 1}`}
                  className="w-full h-auto object-cover"
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Product Info Section */}
      <div className="w-full lg:w-1/2 px-4">
        {product.brand && (
          <div className="mb-2">
            <span className="text-sm text-primary font-medium">{product.brand}</span>
          </div>
        )}
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>

        {/* Rating */}
        {product.rating && (
          <div className="flex items-center mb-4">
            <div className="flex text-yellow-400">
              {Array.from({ length: 5 }, (_, i) => (
                <i
                  key={i}
                  className={
                    i < Math.floor(product.rating)
                      ? "ri-star-fill"
                      : i < product.rating
                      ? "ri-star-half-fill"
                      : "ri-star-line"
                  }
                ></i>
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-600">
              {product.rating.toFixed(1)} ({product.numReviews || 0} reviews)
            </span>
          </div>
        )}

        {/* Price */}
        <div className="mb-6">
          <div className="flex items-baseline">
            <span className="text-3xl font-bold text-gray-900">${product.price}</span>
            {product.oldPrice && product.oldPrice > product.price && (
              <>
                <span className="ml-3 text-lg text-gray-500 line-through">${product.oldPrice}</span>
                <span className="ml-3 px-2 py-1 bg-red-100 text-red-700 text-sm font-medium rounded">
                  Save {Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
                </span>
              </>
            )}
          </div>
          <p className="text-sm text-green-600 mt-1">
            {product.countInStock > 0 ? "In stock - ships within 24 hours" : "Out of stock"}
          </p>
        </div>
        {product.sizes && product.sizes.length > 0 && (
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-gray-800 mb-3 uppercase tracking-wide">
              Select Size
            </h3>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 border rounded-md text-sm ${
                    selectedSize === size
                      ? "bg-primary text-white border-primary"
                      : "border-gray-300 text-gray-800"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}
        {/* Quantity Selector */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-900 mb-3">Quantity</h3>
          <div className="flex">
            {/* Decrease Button */}
            <button
              className="w-10 h-10 border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50 rounded-l-button !rounded-button"
              onClick={() => onQuantityChange("decrement")}
              disabled={quantity <= 1}
            >
              <i className="ri-subtract-line"></i>
            </button>

            {/* Quantity Input */}
            <input
              type="number"
              value={quantity}
              min={1}
              className="custom-number-input w-16 h-10 border-y border-gray-300 text-center focus:outline-none text-gray-900 border-none"
              onChange={(e) =>
                onQuantityChange("set", Math.max(1, parseInt(e.target.value) || 1))
              }
            />

            {/* Increase Button */}
            <button
              className="w-10 h-10 border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50 rounded-r-button !rounded-button"
              onClick={() => onQuantityChange("increment")}
              disabled={quantity >= (product.countInStock || 999)}
            >
              <i className="ri-add-line"></i>
            </button>
          </div>
        </div>

        {/* Cart Buttons */}
        <div className="flex flex-wrap -mx-2 mb-6">
          <div className="sm:w-1/2 px-2 mb-3 sm:mb-0">
            <button
              onClick={inCart ? onRemoveFromCart : onAddToCart}
              className="w-full py-3 bg-primary text-white font-medium rounded-button hover:bg-primary/90 transition whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={product.countInStock === 0}
            >
              {inCart ? "Remove from Cart" : "Add to Cart"}
            </button>
          </div>
          <div className="w-full sm:w-1/2 px-2">
            <Link to={`/shop/check/${product._id}`}>
              <button
                className="w-full py-3 bg-gray-900 text-white font-medium rounded-button hover:bg-gray-800 transition whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={product.countInStock === 0}
              >
                Buy Now
              </button>
            </Link>
          </div>
        </div>

        {/* Wishlist */}
        <div className="border-t border-b border-gray-200 py-4 mb-6">
          <button
            onClick={isFavorited ? onRemoveFromFav : onAddToFav}
            className="flex items-center text-gray-700 hover:text-primary"
          >
            <div className="w-5 h-5 flex items-center justify-center mr-2">
              <i className={isFavorited ? "ri-heart-fill text-red-500" : "ri-heart-line"}></i>
            </div>
            <span className="text-sm">
              {isFavorited ? "Remove from Wishlist" : "Add to Wishlist"}
            </span>
          </button>
        </div>

        {/* Highlights */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-900 mb-3">Highlights</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
            <li className="flex items-start">
              <div className="w-5 h-5 flex items-center justify-center text-primary mr-2 mt-0.5">
                <i className="ri-check-line"></i>
              </div>
              <span>Active Noise Cancellation</span>
            </li>
            <li className="flex items-start">
              <div className="w-5 h-5 flex items-center justify-center text-primary mr-2 mt-0.5">
                <i className="ri-check-line"></i>
              </div>
              <span>40-hour Battery Life</span>
            </li>
            <li className="flex items-start">
              <div className="w-5 h-5 flex items-center justify-center text-primary mr-2 mt-0.5">
                <i className="ri-check-line"></i>
              </div>
              <span>Hi-Fi Sound Quality</span>
            </li>
            <li className="flex items-start">
              <div className="w-5 h-5 flex items-center justify-center text-primary mr-2 mt-0.5">
                <i className="ri-check-line"></i>
              </div>
              <span>Quick Charge (10min = 5hrs)</span>
            </li>
          </ul>
        </div>
        <div className="flex flex-wrap -mx-2 mb-6">
          <div className="w-full sm:w-1/2 px-2 mb-3 sm:mb-0">
            <div className="flex items-center">
              <div className="w-10 h-10 flex items-center justify-center text-primary mr-3">
                <i className="ri-truck-line text-xl"></i>
              </div>
              <div>
                <h4 className="text-sm font-medium">Free Shipping</h4>
                <p className="text-xs text-gray-500">On orders over $50</p>
              </div>
            </div>
          </div>
          <div className="w-full sm:w-1/2 px-2">
            <div className="flex items-center">
              <div className="w-10 h-10 flex items-center justify-center text-primary mr-3">
                <i className="ri-refresh-line text-xl"></i>
              </div>
              <div>
                <h4 className="text-sm font-medium">30-Day Returns</h4>
                <p className="text-xs text-gray-500">Hassle-free returns</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600">Share:</span>
          <div className="flex space-x-2">
            <a href="#" className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition">
              <i className="ri-facebook-fill"></i>
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition">
              <i className="ri-twitter-x-fill"></i>
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition">
              <i className="ri-pinterest-fill"></i>
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition">
              <i className="ri-link"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;