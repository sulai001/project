import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProductGrid from '../componets/ProductGrid';
import Header from '../componets/Header';
import Breadcrumbs from '../componets/Breadcrumbs';
import FilterSection from '../componets/FilterSection';
import Pagination from '../componets/Pagination';
import Footer from '../componets/Footer';
import CartSidebar from '../componets/CartSidebar';
import FavoritesSidebar from '../componets/FavoritesSidebar';
import ScrollToTop from '../componets/ScrollToTop';

const ProductPage = () => {
  const [page, setPage] = useState(1);
  const [cartOpen, setCartOpen] = useState(false);
  const [favoritesOpen, setFavoritesOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [favoriteItems, setFavoriteItems] = useState([]);
  const [filters, setFilters] = useState({});
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState('');
  const location = useLocation();
  const userId = "685d82e4ac8a33ee24385692";

  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('search') || '';
  const category = searchParams.get('category') || '';

  useEffect(() => {
    fetch(`http://localhost:5000/api/cart?userId=${userId}`)
      .then(res => res.json())
      .then(data => setCartItems(data.items || []));
  }, []);

  useEffect(() => {
    fetch(`http://localhost:5000/api/favorites?userId=${userId}`)
      .then(res => res.json())
      .then(data => setFavoriteItems(data.products || []));
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then(res => res.json())
      .then(data => {
        let filtered = data;

        if (category) {
          filtered = filtered.filter(p =>
            p.category && p.category.toLowerCase() === category.toLowerCase()
          );
        }

        if (searchQuery.trim()) {
          filtered = filtered.filter(p =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }

        setProducts(filtered);
      });
  }, [searchQuery, category]);

  const handleAddToCart = (product) => {
    fetch("http://localhost:5000/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, productId: product._id, quantity: 1 })
    })
      .then(res => res.json())
      .then(data => setCartItems(data.items || []));
  };

  const handleRemoveFromCart = (productId) => {
    fetch("http://localhost:5000/api/cart", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, productId })
    })
      .then(res => res.json())
      .then(data => setCartItems(data.items || []));
  };

  const handleUpdateQuantity = (productId, quantity, action) => {
    fetch("http://localhost:5000/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, productId, quantity, action })
    })
      .then(res => res.json())
      .then(data => setCartItems(data.items || []));
  };

  const handleAddToFavorites = (product) => {
    fetch("http://localhost:5000/api/favorites", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, productId: product._id })
    })
      .then(res => res.json())
      .then(data => setFavoriteItems(data.products || []));
  };

  const handleRemoveFromFavorites = (productId) => {
    fetch("http://localhost:5000/api/favorites", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, productId })
    })
      .then(res => res.json())
      .then(data => setFavoriteItems(data.products || []));
  };

  // Filter products by search text
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <>
      <ScrollToTop />
      <Header 
        onCartClick={() => setCartOpen(true)} 
        onFavoritesClick={() => setFavoritesOpen(true)} 
      />
      <div className="bg-gray-50 pb-8">
        <div className="mx-20 py-4">
          <Breadcrumbs />
          <FilterSection filters={filters} setFilters={setFilters} />
          
          <ProductGrid
            products={filteredProducts}
            onAddToCart={handleAddToCart}
            onRemoveFromCart={handleRemoveFromCart}
            onAddToFavorites={handleAddToFavorites}
            onRemoveFromFavorites={handleRemoveFromFavorites}
            cartItems={cartItems}
            favoriteItems={favoriteItems}
          />
          <Pagination currentPage={page} totalPages={8} onPageChange={setPage} />
        </div>
      </div>
      <Footer />
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
};

export default ProductPage;
