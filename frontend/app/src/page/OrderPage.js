import React, { useEffect, useState } from "react";
import OrderCard from "../componets/Ordercard";
import Header from "../componets/Header";
import CartSidebar from "../componets/CartSidebar";
import FavoritesSidebar from "../componets/FavoritesSidebar";

export default function OrderPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sortOpen, setSortOpen] = useState(false);
  const [sortLabel, setSortLabel] = useState("Recent");
  const [cartOpen, setCartOpen] = useState(false);
  const [favoritesOpen, setFavoritesOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [favoriteItems, setFavoriteItems] = useState([]);

  // Fetch orders
  useEffect(() => {
    async function fetchOrders() {
      try {
        setLoading(true);
        setError("");
        const res = await fetch("https://mern-backend-jsxn.onrender.com/api/user/orders", {
          credentials: "include",
          headers: { "Content-Type": "application/json" }
        });
        if (!res.ok) throw new Error("Failed to fetch orders");
        const data = await res.json();

        // Map orders to include populated product details
        const mapped = data.map((order) => ({
          orderNumber: order._id.slice(-8).toUpperCase(),
          date: new Date(order.createdAt).toLocaleDateString(),
          status: order.status || "Processing",
          statusClass:
            order.status === "Delivered"
              ? "status-delivered"
              : order.status === "Shipped"
              ? "status-shipped"
              : order.status === "Cancelled"
              ? "status-cancelled"
              : order.status === "Returned"
              ? "status-returned"
              : "status-processing",
                  items: order.items.map((item) => ({
          product: item.product, // full product object
          options: item.options || "",
          price: item.product?.price?.toFixed(2) || "0.00",
        })),
          total: order.totalPrice?.toFixed(2) || "0.00",
          paymentMethod: order.paymentMethod,
          address: [
            order.shippingAddress?.address,
            order.shippingAddress?.city,
            order.shippingAddress?.state,
            order.shippingAddress?.zip,
            order.shippingAddress?.country,
          ]
            .filter(Boolean)
            .join(", "),
          tracking: order.trackingNumber,
          subtotal: order.subtotal?.toFixed(2) || order.totalPrice?.toFixed(2) || "0.00",
          shipping: order.shipping?.toFixed(2) || "0.00",
          tax: order.tax?.toFixed(2) || "0.00",
        }));

        setOrders(mapped);
      } catch (err) {
        setError("Could not load orders.");
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, []);

  // Fetch cart and favorites for sidebar counts
  useEffect(() => {
    fetch("https://mern-backend-jsxn.onrender.com/api/cart?userId=685d82e4ac8a33ee24385692")
      .then((res) => res.json())
      .then((data) => setCartItems(data.items || []));
    fetch("https://mern-backend-jsxn.onrender.com/api/favorites?userId=685d82e4ac8a33ee24385692")
      .then(res => res.json())
      .then(data => setFavoriteItems(data.products || []));
  }, []);

  const sortOptions = [
    "Recent",
    "Oldest",
    "Price: High to Low",
    "Price: Low to High"
  ];

  // Add to cart
  const handleAddToCart = (product) => {
    setCartItems((prev) => [...prev, product]);
    // Optionally, make API call to backend to persist
  };

  // Remove from cart
  const handleRemoveFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item._id !== productId));
    // Optionally, make API call to backend to persist
  };

  // Add to favorites
  const handleAddToFavorites = (product) => {
    setFavoriteItems((prev) => [...prev, product]);
    // Optionally, make API call to backend to persist
  };

  // Remove from favorites
  const handleRemoveFromFavorites = (productId) => {
    setFavoriteItems((prev) => prev.filter((item) => item._id !== productId));
    // Optionally, make API call to backend to persist
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header with sidebar triggers */}
      <Header
        onCartClick={() => setCartOpen(true)}
        onFavoritesClick={() => setFavoritesOpen(true)}
        cartCount={cartItems.length}
        favoritesCount={favoriteItems.length}
      />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 mb-20">
        {/* Top bar with sort */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-500">
            Showing <span className="font-medium text-gray-900">{orders.length}</span> orders
          </p>
          <div className="relative">
            <button
              id="sort-button"
              className="flex items-center px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-button hover:bg-gray-50 whitespace-nowrap"
              onClick={() => setSortOpen((v) => !v)}
            >
              <span>Sort by: {sortLabel}</span>
              <i className="ri-arrow-down-s-line ri-lg ml-1"></i>
            </button>
            {sortOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded shadow-lg z-10 border border-gray-200">
                <ul className="py-1">
                  {sortOptions.map((option) => (
                    <li
                      key={option}
                      className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setSortLabel(option);
                        setSortOpen(false);
                      }}
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* States */}
        {loading ? (
          <div className="p-8 text-center">Loading orders...</div>
        ) : error ? (
          <div className="p-8 text-center text-red-500">{error}</div>
        ) : !orders.length ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-24 h-24 flex items-center justify-center text-gray-400 mb-4">
              <i className="ri-shopping-bag-line ri-4x"></i>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Orders Yet</h3>
            <p className="text-gray-500 text-center mb-6 max-w-md">
              You haven't placed any orders yet. Start shopping to see your orders here.
            </p>
            <button className="bg-primary text-white py-2 px-6 rounded-button hover:bg-primary/90 transition-colors whitespace-nowrap">
              <i className="ri-shopping-cart-line mr-1"></i> Start Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order, idx) => (
              <OrderCard
                key={idx}
                order={order}
                onAddToCart={handleAddToCart}
                onRemoveFromCart={handleRemoveFromCart}
                onAddToFavorites={handleAddToFavorites}
                onRemoveFromFavorites={handleRemoveFromFavorites}
                cartItems={cartItems}
                favoriteItems={favoriteItems}
              />
            ))}
          </div>
        )}
      </main>

      {/* Sidebars */}
      <CartSidebar
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onRemoveFromCart={handleRemoveFromCart}
        onUpdateQuantity={
          (productId, amount, type) => {
            setCartItems(prev =>
              prev.map(item =>
                item.product && item.product._id === productId
                  ? {
                      ...item,
                      quantity:
                        type === "increment"
                          ? item.quantity + amount
                          : Math.max(1, item.quantity - amount),
                    }
                    : item
              )
            );
          }
        }
      />
      <FavoritesSidebar
        open={favoritesOpen}
        onClose={() => setFavoritesOpen(false)}
        favoriteItems={favoriteItems}
        onRemove={handleRemoveFromFavorites}
      />

      
    </div>
  );
}