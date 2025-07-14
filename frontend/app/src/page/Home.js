import React, { useState, useEffect } from 'react';
import '../assets/css/Home.css'
import Header from '../componets/Header';
import HeroSection from '../componets/Hero_section';
import Catagoryselection from '../componets/Catagory_selection';
import SaleBanner from '../componets/Salebanner';
import BestProductsSection from '../componets/BestProductsSection';
import CollectionBanners from '../componets/CollectionBanners';
import InstagramSection from '../componets/InstagramSection';
import Footer from '../componets/Footer';
import CartSidebar from '../componets/CartSidebar';
import FavoritesSidebar from '../componets/FavoritesSidebar';
import ScrollToTop from '../componets/ScrollToTop';

function Home() {
  const [cartOpen, setCartOpen] = useState(false);
  const [favoritesOpen, setFavoritesOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [favoriteItems, setFavoriteItems] = useState([]);

  useEffect(() => {
    fetch("https://mern-backend-jsxn.onrender.com/api/cart?userId=685d82e4ac8a33ee24385692")
      .then((res) => res.json())
      .then((data) => setCartItems(data.items || []));
  }, []);

  useEffect(() => {
    // Replace USER_ID with actual user id
    fetch("https://mern-backend-jsxn.onrender.com/api/favorites?userId=685d82e4ac8a33ee24385692")
      .then(res => res.json())
      .then(data => setFavoriteItems(data.products || []));
  }, []);

  // Add to cart handler
  const handleAddToCart = (product) => {
    fetch("https://mern-backend-jsxn.onrender.com/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: "685d82e4ac8a33ee24385692",
        productId: product._id,
        quantity: 1 // Always 1 for add-to-cart button
      })
    })
      .then(res => res.json())
      .then(data => setCartItems(data.items || []));
  };

  // Remove from cart handler
  const handleRemoveFromCart = (productId) => {
    fetch("https://mern-backend-jsxn.onrender.com/api/cart", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: "685d82e4ac8a33ee24385692", // Replace with actual user ID
        productId
      })
    })
      .then(res => res.json())
      .then(data => setCartItems(data.items || []));
  };

  // Add to favorites handler
  const handleAddToFavorites = (product) => {
    fetch("https://mern-backend-jsxn.onrender.com/api/favorites", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: "685d82e4ac8a33ee24385692", // Replace with actual user ID
        productId: product._id
      })
    })
      .then(res => res.json())
      .then(data => setFavoriteItems(data.products || []));
  };

  // Remove from favorites handler
  const handleRemoveFromFavorites = (productId) => {
    fetch("https://mern-backend-jsxn.onrender.com/api/favorites", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: "685d82e4ac8a33ee24385692", // Replace with actual user ID
        productId
      })
    })
      .then(res => res.json())
      .then(data => setFavoriteItems(data.products || []));
  };

const handleUpdateQuantity = async (productId, quantity, action) => {
  console.log("Updating quantity:", { productId, quantity, action });

  try {
    const response = await fetch("https://mern-backend-jsxn.onrender.com/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: "685d82e4ac8a33ee24385692",
        productId,
        quantity,
        action,
      }),
    });

    const data = await response.json();
    console.log("Cart response:", data);
    setCartItems(data.items || []);
  } catch (err) {
    console.error("Failed to update cart", err);
  }
};

  // Example function to add a category to the database
  const handleAddCategory = async (categoryName) => {
    try {
      const response = await fetch("https://mern-backend-jsxn.onrender.com/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: categoryName })
      });
      const data = await response.json();
      if (response.ok) {
        alert("Category added!");
        // Optionally update your UI here
      } else {
        alert(data.message || "Failed to add category");
      }
    } catch (err) {
      alert("Error adding category");
    }
  };

  return (
    <>
      <ScrollToTop />
      <Header 
        onCartClick={() => setCartOpen(true)} 
        onFavoritesClick={() => setFavoritesOpen(true)}
        cartCount={cartItems.length}
        favoritesCount={favoriteItems.length}
      />
      <HeroSection />
      <Catagoryselection/>
      <SaleBanner/>
      <BestProductsSection
        onAddToCart={handleAddToCart}
        onAddToFavorites={handleAddToFavorites}
        cartItems={cartItems}
        favoriteItems={favoriteItems}
      />
      <CollectionBanners />
      <InstagramSection />
      <Footer/>
      <CartSidebar
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onRemoveFromCart={handleRemoveFromCart}
        onUpdateQuantity={handleUpdateQuantity}
      />
      <FavoritesSidebar
        open={favoritesOpen}
        onClose={() => setFavoritesOpen(false)}
        favoriteItems={favoriteItems}
        onRemoveFromFavorites={handleRemoveFromFavorites}
      />
    </>
  );
}

export default Home;
