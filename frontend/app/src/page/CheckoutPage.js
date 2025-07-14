import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ShippingProgress from "../componets/ShippingProgress";
import CheckoutForm from "../componets/CheckoutForm";
import OrderComplete from "../componets/OrderComplete";
import Header from '../componets/Header';
import Footer from '../componets/Footer';

export default function CheckoutPage() {
  const { id } = useParams(); // <-- this gets the :id from the URL
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  // Called after order is placed, with new order ID
  const handleOrderPlaced = async (orderId) => {
    setOrderPlaced(true);
    try {
      const res = await fetch(`/api/orders/${orderId}`);
      if (!res.ok) throw new Error("Failed to fetch order");
      const data = await res.json();
      setOrderDetails(data);
    } catch (err) {
      alert("Failed to fetch order details");
    }
  };

  return (
    <div>
      <Header className="bg-white shadow" />
      <div className="bg-gray-50">
        <div className="container mx-auto px-4 py-8 ">
          {!orderPlaced ? (
            <>
              <ShippingProgress currentStep={3} />
              <CheckoutForm onOrderPlaced={handleOrderPlaced} productId={id} />
            </>
          ) : (
            orderDetails && (
              <OrderComplete
                orderNumber={orderDetails._id}
                date={new Date(orderDetails.createdAt).toLocaleDateString()}
                total={`$${orderDetails.totalPrice.toFixed(2)}`}
                paymentMethod={orderDetails.paymentMethod}
                email={orderDetails.shippingAddress?.email}
              />
            )
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}