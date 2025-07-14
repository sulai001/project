import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductTabs from '../componets/ProductTabs';
import YouMayAlsoLike from '../componets/YouMayAlsoLike';
import ProductBreadcrumbs from '../componets/ProductBreadcrumbs';
import ProductDetail from '../componets/ProductDetail';
import Footer from '../componets/Footer';
import Header from '../componets/Header';
import ScrollToTop from '../componets/ScrollToTop';
import CartSidebar from '../componets/CartSidebar';
import FavoritesSidebar from '../componets/FavoritesSidebar';

const Products = () => {
  const { id: productId } = useParams();
  const userId = '685d82e4ac8a33ee24385692';

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState(null);
  const [inCart, setInCart] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  const [cartOpen, setCartOpen] = useState(false);
  const [favoritesOpen, setFavoritesOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [favoriteItems, setFavoriteItems] = useState([]);

  useEffect(() => {
    if (productId) {
      fetchProduct();
      fetchCartItems();
      fetchFavoriteItems();
    }
  }, [productId]);

  const fetchProduct = async () => {
    try {
      const res = await fetch(`https://mern-backend-jsxn.onrender.com/api/products/${productId}`);
      if (!res.ok) throw new Error(`Error: ${res.status}`);
      const data = await res.json();
      setProduct(data);
      checkCartStatus(data);
      checkFavoriteStatus(data);
    } catch (err) {
      console.error('Product fetch failed:', err);
      setError(err.message);
    }
  };

  const fetchCartItems = async () => {
    try {
      const res = await fetch(`https://mern-backend-jsxn.onrender.com/api/cart?userId=${userId}`);
      const data = await res.json();
      setCartItems(data.items || []);
    } catch (err) {
      console.error('Cart fetch failed:', err);
    }
  };

  const fetchFavoriteItems = async () => {
    try {
      const res = await fetch(`https://mern-backend-jsxn.onrender.com/api/favorites?userId=${userId}`);
      const data = await res.json();
      const items = Array.isArray(data.products) ? data.products : [];
      setFavoriteItems(items);
    } catch (err) {
      console.error('Favorites fetch failed:', err);
    }
  };

  React.useEffect(() => {
    if (product) {
      const exists = cartItems.some(item => item && item.product && item.product._id === product._id);
      setInCart(exists);
    }
  }, [cartItems, product]);

  React.useEffect(() => {
    if (product) {
      const exists = favoriteItems.some(item => item && item._id === product._id);
      setIsFavorited(exists);
    }
  }, [favoriteItems, product]);

  const checkCartStatus = (productData) => {
    const exists = cartItems.some(item => item && item.product && item.product._id === productData._id);
    setInCart(exists);
  };

  const checkFavoriteStatus = (productData) => {
    const exists = favoriteItems.some(item => item && item._id === productData._id);
    setIsFavorited(exists);
  };

  const handleQuantityChange = (type) => {
    setQuantity(prev => (type === 'decrement' ? Math.max(1, prev - 1) : prev + 1));
  };

  const addToCart = async ({ productId, quantity, action = 'set' }) => {
    try {
      const res = await fetch('https://mern-backend-jsxn.onrender.com/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, productId, quantity, action }),
      });
      if (!res.ok) throw new Error('Add to cart failed');
      setInCart(true);
      fetchCartItems();
    } catch (err) {
      console.error(err);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const res = await fetch('https://mern-backend-jsxn.onrender.com/api/cart', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, productId }),
      });
      if (!res.ok) throw new Error('Remove from cart failed');
      setInCart(false);
      fetchCartItems();
    } catch (err) {
      console.error(err);
    }
  };

  const addToFavorites = async (productId) => {
    try {
      const res = await fetch('https://mern-backend-jsxn.onrender.com/api/favorites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, productId }),
      });
      if (!res.ok) throw new Error('Add to favorites failed');
      if (productId === product?._id) setIsFavorited(true);
      fetchFavoriteItems();
    } catch (err) {
      console.error(err);
    }
  };

  const removeFromFavorites = async (productId) => {
    try {
      const res = await fetch('https://mern-backend-jsxn.onrender.com/api/favorites', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, productId }),
      });
      if (!res.ok) throw new Error('Remove from favorites failed');
      if (productId === product?._id) setIsFavorited(false);
      fetchFavoriteItems();
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateQuantity = async (productId, quantity, action) => {
    try {
      const response = await fetch('https://mern-backend-jsxn.onrender.com/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, productId, quantity, action }),
      });
      const data = await response.json();
      setCartItems(data.items || []);
    } catch (err) {
      console.error('Failed to update cart', err);
    }
  };

  return (
    <>
      <ScrollToTop />
      <Header
        onCartClick={() => setCartOpen(true)}
        onFavoritesClick={() => setFavoritesOpen(true)}
      />
      <div className="mx-10 px-4">
        <ProductBreadcrumbs />
        {error ? (
          <div className="text-red-600">{error}</div>
        ) : product ? (
        <div>
          <ProductDetail
            productId={productId}
            product={product}
            quantity={quantity}
            onQuantityChange={handleQuantityChange}
            onAddToCart={() => addToCart({ productId, quantity })}
            onRemoveFromCart={() => removeFromCart(productId)}
            onAddToFav={() => addToFavorites(productId)}
            onRemoveFromFav={() => removeFromFavorites(productId)}
            inCart={inCart}
            isFavorited={isFavorited}
          />
          <ProductTabs product={product} productId={productId} userId={userId} />
        </div>
      ) : (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
          <span className="ml-4 text-lg text-gray-600">Loading...</span>
        </div>
      )}
      </div>

      <YouMayAlsoLike
        onAddToCart={addToCart}
        onRemoveFromCart={removeFromCart}
        onAddToFavorites={addToFavorites}
        onRemoveFromFavorites={removeFromFavorites}
        favoriteItems={favoriteItems}
        cartItems={cartItems}
      />

      <Footer />

      <CartSidebar
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onRemoveFromCart={removeFromCart}
        onUpdateQuantity={handleUpdateQuantity}
      />
      <FavoritesSidebar
        open={favoritesOpen}
        onClose={() => setFavoritesOpen(false)}
        favoriteItems={favoriteItems}
        onRemoveFromFavorites={removeFromFavorites}
      />
    </>
  );
};

export default Products;
