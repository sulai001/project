import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CartSidebar = ({
  open,
  onClose,
  cartItems: initialCartItems = [],
  onRemoveFromCart,
  onUpdateQuantity, // <-- Add this prop
}) => {
  const [cartItems, setCartItems] = useState(initialCartItems);

  useEffect(() => {
    async function populateCartProducts() {
      const updatedCart = await Promise.all(
        initialCartItems.map(async (item) => {
          if (!item.product && item._id) {
            const res = await fetch(`https://mern-backend-jsxn.onrender.com/api/products/${item._id}`);
            const product = await res.json();
            // If product is invalid, skip this item
            if (!product || !product._id) return null;
            return { ...item, product };
          }
          return item;
        })
      );
      // Remove any nulls from the cart
      setCartItems(updatedCart.filter(Boolean));
    }
    if (initialCartItems.some((item) => !item.product)) {
      populateCartProducts();
    } else {
      setCartItems(initialCartItems);
    }
  }, [initialCartItems]);

  // Calculate subtotal
  const subtotal = cartItems.reduce(
    (sum, item) =>
      item.product && item.product.price
        ? sum + item.product.price * item.quantity
        : sum,
    0
  );
  const shipping = 0;
  const total = subtotal + shipping;

  return (
    <div
      className={`fixed top-0 right-0 w-[400px] h-full bg-white shadow-2xl transform ${
        open ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300 z-50`}
      style={{ willChange: "transform" }}
      tabIndex={-1}
      aria-modal="true"
      role="dialog"
    >
      <div className="h-full flex flex-col">
        <div className="p-8 border-b">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">
              Shopping Cart ({cartItems.length})
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <i className="ri-close-line text-2xl"></i>
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-8 space-y-10">
          {cartItems.length === 0 ? (
            <div className="text-center text-gray-500">Your cart is empty.</div>
          ) : (
            cartItems.map((item) => {
              if (!item.product) return null; // Skip if product is null
              return (
                <div
                  className="flex items-start gap-8 pb-8 border-b"
                  key={item.product._id}
                >
                  <Link to={`/shop/${item.product._id}`} onClick={onClose}>
                    <img
                      src={
                        item.product.images && item.product.images.length > 0
                          ? item.product.images[0].url
                          : "https://via.placeholder.com/300x400"
                      }
                      alt={item.product.name}
                      className="w-20 h-24 object-cover rounded hover:shadow-lg transition"
                    />
                  </Link>
                  <div className="flex-1">
                    <Link
                      to={`/shop/${item.product._id}`}
                      onClick={onClose}
                      className="hover:underline text-gray-900"
                    >
                      <h3 className="text-sm font-medium mb-1">
                        {item.product.name}
                      </h3>
                    </Link>
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 mb-2">
                      <button
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                        onClick={() =>
                          onUpdateQuantity(item.product._id, 1, "decrement")
                        }
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="text-gray-700">{item.quantity}</span>
                      <button
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                        onClick={() =>
                          onUpdateQuantity(item.product._id, 1, "increment")
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </p>
                    <button
                      className="text-gray-400 hover:text-red-500 mt-2"
                      onClick={() => onRemoveFromCart(item.product._id)}
                    >
                      <i className="ri-delete-bin-line"></i>
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
        <div className="p-8 border-t bg-gray-50">
          <div className="flex justify-between mb-6">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-medium">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-6">
            <span className="text-gray-600">Shipping</span>
            <span className="font-medium">Free</span>
          </div>
          <div className="flex justify-between mb-10">
            <span className="text-lg font-bold">Total</span>
            <span className="text-lg font-bold">${total.toFixed(2)}</span>
          </div>
          
        </div>
      </div>
      {/* Overlay for closing when clicking outside */}
      {open && (
        <div
          className="fixed inset-0  bg-opacity-30 z-[-1]"
          onClick={onClose}
          tabIndex={-1}
          aria-hidden="true"
        />
      )}
    </div>
  );
};

export default CartSidebar;