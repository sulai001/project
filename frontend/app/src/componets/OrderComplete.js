// OrderComplete.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function OrderComplete({
  orderNumber = "#ORD-25519-7842",
  date = "May 19, 2025",
  total = "$715.22",
  paymentMethod = "Credit Card",
  email = "james.wilson@example.com",
}) {
  return (
    <div className="order-complete" id="orderComplete">
      <div className="bg-white rounded-lg shadow-sm p-8 max-w-2xl mx-auto text-center">
        <div className="success-checkmark">
          <div className="check-icon">
            <span className="icon-line line-tip"></span>
            <span className="icon-line line-long"></span>
            <div className="icon-circle"></div>
            <div className="icon-fix"></div>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mt-6 fade-in">
          Order Successfully Placed!
        </h2>
        <p className="text-gray-600 mt-2 fade-in">
          Thank you for your purchase. Your order has been received.
        </p>
        <div className="mt-6 bg-gray-50 rounded-lg p-4 text-left fade-in">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-600">Order Number:</span>
            <span className="text-sm font-medium text-gray-900">{orderNumber}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-600">Date:</span>
            <span className="text-sm font-medium text-gray-900">{date}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-600">Total Amount:</span>
            <span className="text-sm font-medium text-gray-900">{total}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Payment Method:</span>
            <span className="text-sm font-medium text-gray-900">{paymentMethod}</span>
          </div>
        </div>
        <p className="text-gray-600 mt-6 fade-in">
          A confirmation email has been sent to{" "}
          <span className="font-medium">{email}</span>
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center slide-up">
          <Link
            to={`/orders/`}
            className="px-6 py-3 bg-white border border-gray-300 text-gray-700 font-medium rounded !rounded-button whitespace-nowrap transition-all hover:bg-gray-50"
          >
            View Order Details
          </Link>
          <a
            href="/shop"
            className="px-6 py-3 bg-primary text-white font-medium rounded !rounded-button whitespace-nowrap transition-all hover:bg-primary/90"
          >
            Continue Shopping
          </a>
        </div>
      </div>
    </div>
  );
}