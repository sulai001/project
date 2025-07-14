import React, { useState } from "react";

const PLACEHOLDER_IMG = "/placeholder.png";

export default function OrderCard({ order }) {
  const [open, setOpen] = useState(false);
  console.log(order.items);
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
      <div
        className="p-4 cursor-pointer order-card"
        onClick={() => setOpen((v) => !v)}
      >
        <div className="flex justify-between items-start mb-3">
          <div>
            <p className="text-sm text-gray-500">Order #{order.orderNumber}</p>
            <p className="text-xs text-gray-400">{order.date}</p>
          </div>
          <span className={`px-3 py-1 text-xs font-medium rounded-full ${order.statusClass}`}>
            {order.status}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="flex -space-x-2 mr-3">
              {order.items.map((item,idx) => (
                <img
                  key={item.product?._id || idx}
                  src={item.product?.images?.[0]?.url }
                  alt={item.product?.name || "Product"}
                  className="w-12 h-12 rounded-md object-cover border border-gray-200"
                  
                />
              ))}
            </div>
            <span className="text-sm text-gray-500">
              {order.items.length} item{order.items.length > 1 ? "s" : ""}
            </span>
          </div>
          <div className="text-right">
            <p className="text-lg font-semibold text-gray-900">
              ${Number(order.total).toFixed(2)}
            </p>
            <p className="text-xs text-gray-500">Paid with {order.paymentMethod}</p>
          </div>
        </div>
      </div>
      {open && (
        <div className="order-details bg-gray-50 p-4 border-t border-gray-100">
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Delivery Address:</span>
              <span className="text-gray-700 text-right">{order.address}</span>
            </div>
            {order.tracking && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Tracking Number:</span>
                <span className="text-primary font-medium">{order.tracking}</span>
              </div>
            )}
            <div className="border-t border-gray-200 pt-3 mt-3">
              <h4 className="font-medium text-gray-900 mb-2">Order Items</h4>
              <div className="space-y-3">
                {order.items.map((item, idx) => (
                  <div className="flex justify-between" key={item.product?._id || idx}>
                    <div className="flex">
                      <img
                        src={item.product?.images?.[0]?.url || PLACEHOLDER_IMG}
                        alt={item.product?.name || "Product"}
                        className="w-12 h-12 rounded-md object-cover border border-gray-200 mr-3"
                        
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{item.product?.name || "Product"}</p>
                        <p className="text-xs text-gray-500">{item.options}</p>
                      </div>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      ${Number(item.price).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="border-t border-gray-200 pt-3 mt-3">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-500">Subtotal:</span>
                <span className="text-gray-700">${Number(order.subtotal).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-500">Shipping:</span>
                <span className="text-gray-700">${Number(order.shipping).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-500">Tax:</span>
                <span className="text-gray-700">${Number(order.tax).toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-medium text-base mt-2">
                <span className="text-gray-900">Total:</span>
                <span className="text-gray-900">${Number(order.total).toFixed(2)}</span>
              </div>
            </div>
            <div className="flex space-x-3 mt-4">
              <button className="flex-1 bg-primary text-white py-2 px-4 rounded-button hover:bg-primary/90 transition-colors whitespace-nowrap">
                <i className="ri-repeat-line mr-1"></i> Reorder
              </button>
              <button className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-button hover:bg-gray-50 transition-colors whitespace-nowrap">
                <i className="ri-customer-service-2-line mr-1"></i> Support
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}