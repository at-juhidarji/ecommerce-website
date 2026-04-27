import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, Truck, Package, Home, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const OrderSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const order =
    location.state?.order || JSON.parse(localStorage.getItem("orders"))?.[0];

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>No order found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-muted to-background flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-surface w-full max-w-5xl rounded-2xl shadow-xl border border-border p-6 md:p-10"
      >
        {/* HEADER */}
        <div className="text-center">
          <div className="mx-auto w-16 h-16 rounded-full bg-surface flex items-center justify-center">
            <CheckCircle className="text-success w-10 h-10" />
          </div>

          <h1 className="text-2xl font-bold mt-4">Order Confirmed</h1>

          <p className="text-sm text-muted-foreground mt-1">
            Thank you! Your order has been placed successfully
          </p>
        </div>

        {/* ORDER INFO CARD */}
        <div className="mt-6 rounded-xl border bg-muted p-4 text-sm space-y-1">
          <p>
            <span className="font-semibold">Order ID:</span> {order.id}
          </p>
          <p>
            <span className="font-semibold">Tracking ID:</span>{" "}
            {order.trackingId}
          </p>
          <p>
            <span className="font-semibold">Date:</span> {order.date}
          </p>
        </div>

        {/* ITEMS */}
        <div className="mt-6">
          <h2 className="font-semibold mb-3">Items Ordered</h2>

          <div className="space-y-3">
            {order.items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 items-center border rounded-xl p-3 hover:bg-muted transition"
              >
                <img
                  src={item.image}
                  className="w-14 h-14 object-cover rounded-lg"
                />

                <div className="flex-1">
                  <p className="font-medium text-sm">{item.name}</p>
                  <p className="text-xs text-muted-foreground">
                    Qty: {item.qty} • ₹{item.price}
                  </p>
                </div>

                <p className="font-semibold text-sm">
                  ₹{item.price * item.qty}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* TRACKING TIMELINE */}
        <div className="mt-8">
          <h2 className="font-semibold mb-3">Order Tracking</h2>

          <div className="space-y-4 text-sm">
            <div className="flex items-center gap-3 text-success">
              <CheckCircle size={18} />
              <span>Order Confirmed</span>
            </div>

            <div className="flex items-center gap-3 text-warning">
              <Package size={18} />
              <span>Packed & Ready</span>
            </div>

            <div className="flex items-center gap-3 text-muted-foreground">
              <Truck size={18} />
              <span>Out for Delivery</span>
            </div>
          </div>
        </div>

        {/* TOTAL */}
        <div className="mt-6 border-t pt-4 flex justify-between font-bold">
          <span>Total Paid</span>
          <span>₹{order.total.toLocaleString()}</span>
        </div>

        {/* BUTTONS */}
        <div className="mt-6 grid gap-3">

          <div className="grid grid-cols-2 gap-3">
            <Button  aria-label="View your orders" variant="outline" onClick={() => navigate("/orders")}>
              View Orders
            </Button>

            <Button aria-label="Return to home" onClick={() => navigate("/")} variant="default">
              <Home className="w-4 h-4 mr-2" />
              Home
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default OrderSuccess;
