import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const BestProductsSection = ({ onAddToCart, onAddToFavorites, cartItems = [], favoriteItems = [] }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartAnim, setCartAnim] = useState(null);
  const [favAnim, setFavAnim] = useState(null);

  useEffect(() => {
    fetch("https://mern-backend-jsxn.onrender.com/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.slice(0, 4)); // Only use first 4 products
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (cartAnim !== null) {
      const timer = setTimeout(() => setCartAnim(null), 400);
      return () => clearTimeout(timer);
    }
  }, [cartAnim]);
  useEffect(() => {
    if (favAnim !== null) {
      const timer = setTimeout(() => setFavAnim(null), 400);
      return () => clearTimeout(timer);
    }
  }, [favAnim]);

  if (loading) {
    return <div className="text-center py-16">Loading...</div>;
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-12">
          <div className="relative flex items-center justify-center mb-4">
            <div className="relative inline-flex items-center">
              <div className="absolute -left-4 -right-4 top-1/2 -translate-y-1/2 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
              <div className="relative bg-white px-8">
                <div className="relative">
                  <h2 className="text-lg text-primary font-medium tracking-wider uppercase">
                    Our Selection
                  </h2>
                  <div className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-primary/20 via-primary to-primary/20"></div>
                </div>
              </div>
            </div>
          </div>
          <h3 className="text-4xl font-bold text-gray-900">Our Best Products</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => {
            const inCart = cartItems.some(item => item && item.product && item.product._id === product._id);
            const inFav = favoriteItems.some(item => item && item._id === product._id);

            return (
              <div className="group" key={product._id}>
                <div className="relative overflow-hidden rounded-lg mb-4">
                  <Link to={`/shop/${product._id}`}>
                    <img
                      src={
                        product.images && product.images.length > 0
                          ? product.images[0].url
                          : "https://via.placeholder.com/300x400"
                      }
                      alt={product.name}
                      className="w-full h-[350px] object-cover object-top transition-transform duration-300 group-hover:scale-105"
                    />
                  </Link>
                  {/* Add to Cart Icon */}
                  <button
                    type="button"
                    onClick={() => {
                      onAddToCart(product);
                      setCartAnim(product._id);
                    }}
                    className={`absolute top-4 right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300
                      ${cartAnim === product._id ? "scale-125 bg-green-100 text-green-600" : ""}
                    `}
                    title="Add to Cart"
                  >
                    <i className={`ri-shopping-bag-line ${inCart ? "text-green-600" : "text-gray-700"}`}></i>
                  </button>
                  {/* Add to Favorites Icon */}
                  <button
                    type="button"
                    onClick={() => {
                      onAddToFavorites(product);
                      setFavAnim(product._id);
                    }}
                    className={`absolute top-14 right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300
                      ${favAnim === product._id ? "scale-125 bg-pink-100 text-pink-600" : ""}
                    `}
                    title="Add to Favorites"
                  >
                    <i className={`ri-heart-line ${inFav ? "text-pink-600" : "text-gray-700"}`}></i>
                  </button>
                </div>
                <h4 className="text-gray-900 font-medium">{product.name}</h4>
                <p className="text-gray-700 mb-2">${product.price}</p>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <i
                      key={i}
                      className={
                        i < Math.round(product.rating)
                          ? "ri-star-fill text-yellow-400"
                          : "ri-star-line text-yellow-400"
                      }
                    ></i>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
  };

export default BestProductsSection;