// CheckoutForm.jsx
import React, { useState, useEffect } from "react";

export default function CheckoutForm({ onOrderPlaced, productId }) {
  // Example state for form fields (expand as needed)
  const [firstName, setFirstName] = useState("James");
  const [lastName, setLastName] = useState("Wilson");
  const [email, setEmail] = useState("james.wilson@example.com");
  const [phone, setPhone] = useState("(555) 123-4567");
  const [address, setAddress] = useState("1234 Market Street");
  const [city, setCity] = useState("San Francisco");
  const [state, setState] = useState("California");
  const [zip, setZip] = useState("94103");
  const [country, setCountry] = useState("US");
  const [paymentMethod, setPaymentMethod] = useState("Credit Card");
  const [orderNotes, setOrderNotes] = useState("");
  const [product, setProduct] = useState(null);

  // Quantity state
  const [quantity, setQuantity] = useState(1);
  const [paymentError, setPaymentError] = useState("");

  const deliveryFee = 10;
  const taxRate = 0.085;

  // Fetch product details when productId changes
  useEffect(() => {
    async function fetchProduct() {
      if (!productId) return;
      const res = await fetch(`https://mern-backend-jsxn.onrender.com/api/products/${productId}`);
      if (res.ok) {
        const data = await res.json();
        setProduct(data);
      }
    }
    fetchProduct();
  }, [productId]);

  // Calculate prices
  let subtotal = 0;
  let discount = 0;
  let tax = 0;
  let total = 0;

  if (product) {
    subtotal = product.price * quantity;
    discount =
      product.oldPrice && product.oldPrice > product.price
        ? (product.oldPrice - product.price) * quantity
        : 0;
    tax = subtotal * taxRate;
    total = subtotal + deliveryFee + tax - discount;
  }

  const handleQuantityChange = (type, value) => {
    if (!product) return;
    if (type === "increment") {
      setQuantity((q) => (q < (product.countInStock || 99) ? q + 1 : q));
    } else if (type === "decrement") {
      setQuantity((q) => (q > 1 ? q - 1 : q));
    } else if (type === "set") {
      const val = Math.max(1, Math.min(Number(value) || 1, product.countInStock || 99));
      setQuantity(val);
    }
  };

  // Simple payment validation (expand as needed)
  const validatePayment = () => {
    if (!paymentMethod) {
      setPaymentError("Please select a payment method.");
      return false;
    }
    // Example: If Credit Card, check for card fields (expand as needed)
    // You can add more checks for PayPal/Apple Pay if you implement those flows
    setPaymentError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validatePayment()) return;

    // Use the productId from props for the order
    const items = [{ product: productId, quantity }];

    const shippingAddress = {
      address,
      city,
      state,
      zip,
      country,
    };

    const orderData = {
      items,
      shippingAddress,
      paymentMethod,
      orderNotes,
    };

    // Send order to backend
    const response = await fetch("https://mern-backend-jsxn.onrender.com/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    });

    if (response.ok) {
      const createdOrder = await response.json();
      // Call parent to fetch and show order details
      if (onOrderPlaced) onOrderPlaced(createdOrder._id);
    } else {
      alert("Order failed!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-8">
      {/* Left: Form */}
      <div className="w-full lg:w-2/3 checkout-form-container" id="checkoutForm">
        {/* Shipping Information */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Shipping Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <input type="text" id="firstName" className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-primary" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <input type="text" id="lastName" className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-primary" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input type="email" id="email" className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-primary" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input type="tel" id="phone" className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-primary" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <input type="text" id="address" className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-primary" value={address} onChange={(e) => setAddress(e.target.value)} />
            </div>
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City</label>
              <input type="text" id="city" className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-primary" value={city} onChange={(e) => setCity(e.target.value)} />
            </div>
            <div>
              <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">State</label>
              <input type="text" id="state" className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-primary" value={state} onChange={(e) => setState(e.target.value)} />
            </div>
            <div>
              <label htmlFor="zip" className="block text-sm font-medium text-gray-700 mb-1">Zip Code</label>
              <input type="text" id="zip" className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-primary" value={zip} onChange={(e) => setZip(e.target.value)} />
            </div>
            <div>
              <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">Country</label>
              <div className="relative">
                <select id="country" className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-primary appearance-none pr-8" value={country} onChange={(e) => setCountry(e.target.value)}>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="UK">United Kingdom</option>
                  <option value="AU">Australia</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <i className="ri-arrow-down-s-line text-gray-400"></i>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <div className="custom-checkbox" id="saveAddress"></div>
            <label htmlFor="saveAddress" className="ml-2 text-sm text-gray-700 cursor-pointer">Save this address for future orders</label>
          </div>
        </div>
        {/* Payment Method */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Payment Method</h2>
          <div className="flex flex-col gap-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="paymentMethod"
                value="Credit Card"
                checked={paymentMethod === "Credit Card"}
                onChange={() => setPaymentMethod("Credit Card")}
                className="mr-2"
              />
              Credit Card
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="paymentMethod"
                value="PayPal"
                checked={paymentMethod === "PayPal"}
                onChange={() => setPaymentMethod("PayPal")}
                className="mr-2"
              />
              PayPal
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="paymentMethod"
                value="Apple Pay"
                checked={paymentMethod === "Apple Pay"}
                onChange={() => setPaymentMethod("Apple Pay")}
                className="mr-2"
              />
              Apple Pay
            </label>
          </div>
          {paymentError && (
            <div className="text-red-600 text-sm mt-2">{paymentError}</div>
          )}
        </div>
        {/* Additional Information */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Additional Information</h2>
          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">Order Notes (Optional)</label>
            <textarea id="notes" rows={3} className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-primary" placeholder="Special instructions for delivery" value={orderNotes} onChange={(e) => setOrderNotes(e.target.value)}></textarea>
          </div>
          <div className="mt-4 flex items-center">
            <div className="custom-checkbox" id="subscribe"></div>
            <label htmlFor="subscribe" className="ml-2 text-sm text-gray-700 cursor-pointer">Subscribe to our newsletter for exclusive offers</label>
          </div>
        </div>
      </div>
      {/* Right: Order Summary */}
      <div className="w-full lg:w-1/3 order-summary-container">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
          <div className="space-y-4 mb-6" id="orderItems">
            {/* Show real product details */}
            {product ? (
              <div className="flex items-center py-4 border-b border-gray-100">
                <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0 bg-gray-100">
                  <img
                    src={product.images?.[0]?.url || "https://via.placeholder.com/200"}
                    alt={product.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
                  <p className="text-xs text-gray-500">{product.description}</p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center">
                      <button
                        type="button"
                        className="w-8 h-8 border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50 rounded-l"
                        onClick={() => handleQuantityChange("decrement")}
                        disabled={quantity <= 1}
                      >
                        <i className="ri-subtract-line"></i>
                      </button>
                      <input
                        type="number"
                        className="quantity-input w-12 text-center border-y border-gray-300"
                        value={quantity}
                        min={1}
                        max={product.countInStock || 99}
                        onChange={(e) => handleQuantityChange("set", e.target.value)}
                      />
                      <button
                        type="button"
                        className="w-8 h-8 border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50 rounded-r"
                        onClick={() => handleQuantityChange("increment")}
                        disabled={quantity >= (product.countInStock || 99)}
                      >
                        <i className="ri-add-line"></i>
                      </button>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      ${product.price}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div>Loading product...</div>
            )}
          </div>
          <div className="space-y-2 py-4 border-t border-gray-200">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Subtotal</span>
              <span className="text-sm font-medium text-gray-900" id="subtotal">
                ${subtotal.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Shipping</span>
              <span className="text-sm font-medium text-gray-900" id="shipping">
                ${deliveryFee.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Tax (8.5%)</span>
              <span className="text-sm font-medium text-gray-900" id="tax">
                ${tax.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Discount</span>
              <span className="text-sm font-medium text-green-600" id="discount">
                -${discount.toFixed(2)}
              </span>
            </div>
          </div>
          <div className="flex justify-between py-4 border-t border-gray-200">
            <span className="text-base font-semibold text-gray-900">Total</span>
            <span className="text-base font-semibold text-gray-900" id="total">
              ${total.toFixed(2)}
            </span>
          </div>
          <div className="mt-6">
            <button
              id="placeOrderBtn"
              className="w-full py-3 bg-primary text-white font-medium rounded !rounded-button whitespace-nowrap transition-all hover:bg-primary/90 flex items-center justify-center"
            >
              <span>Place Order</span>
            </button>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-sm font-semibold text-gray-900 mb-2">Estimated Delivery</h2>
          <p className="text-sm text-gray-600">May 22 - May 25, 2025</p>
          <div className="mt-4">
            <h2 className="text-sm font-semibold text-gray-900 mb-2">We Accept</h2>
            <div className="flex space-x-3">
              <div className="w-8 h-8 flex items-center justify-center">
                <i className="ri-visa-fill text-blue-800"></i>
              </div>
              <div className="w-8 h-8 flex items-center justify-center">
                <i className="ri-mastercard-fill text-orange-500"></i>
              </div>
              <div className="w-8 h-8 flex items-center justify-center">
                <i className="ri-american-express-fill text-blue-500"></i>
              </div>
              <div className="w-8 h-8 flex items-center justify-center">
                <i className="ri-paypal-fill text-blue-700"></i>
              </div>
              <div className="w-8 h-8 flex items-center justify-center">
                <i className="ri-apple-fill text-black"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}