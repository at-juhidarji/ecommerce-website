import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  Smartphone,
  CreditCard,
  Truck,
  ShieldCheck,
  Lock,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useCart } from "@/context/CartContext";
import { useNavigate } from "react-router-dom";

// Assets
import GooglePlayLogo from "@/assets/GooglePay.svg";
import PhonePeLogo from "@/assets/Phonepe.svg";
import PaytmLogo from "@/assets/Paytm.svg";
import VisaLogo from "@/assets/Visa.svg";
import MastercardLogo from "@/assets/MasterCard.svg";

const VastraCheckout = () => {
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [loading, setLoading] = useState(false);

  // ✅ FIXED: removed setCart
  const { cart, clearCart } = useCart();

  const navigate = useNavigate();

  // SAFE TOTAL (unchanged)
  const total = useMemo(() => {
    return cart.reduce((t, i) => t + i.price * (i.qty || 1), 0);
  }, [cart]);

  const paymentIcons = {
    upi: [
      { name: "GPay", icon: GooglePlayLogo },
      { name: "PhonePe", icon: PhonePeLogo },
      { name: "Paytm", icon: PaytmLogo },
    ],
    card: [
      { name: "Visa", icon: VisaLogo },
      { name: "Mastercard", icon: MastercardLogo },
    ],
  };

  // 🚀 FIXED ORDER FUNCTION (ONLY LOGIC FIXED)
  const placeOrder = (e) => {
    e.preventDefault();

    console.log("ORDER TRIGGERED");

    if (!cart || cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    setLoading(true);

    const newOrder = {
      id: "ORD" + Date.now(),
      date: new Date().toLocaleDateString(),
      status: "Processing",
      items: cart,
      total: total,
      trackingId: "TRK" + Math.floor(Math.random() * 1000000),
    };

    const existing = JSON.parse(localStorage.getItem("orders")) || [];

    localStorage.setItem("orders", JSON.stringify([newOrder, ...existing]));

    // ❌ OLD: setCart([])
    // ✅ FIXED:
    clearCart();

    setTimeout(() => {
      setLoading(false);

      console.log("NAVIGATING TO SUCCESS PAGE");

      navigate("/success", {
        state: { order: newOrder },
        replace: true,
      });
    }, 700);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 min-h-[calc(100vh-80px)]">
        {/* LEFT (UNCHANGED) */}
        <section className="lg:col-span-7 p-6 md:p-12 lg:p-16 lg:border-r border-border">
          <Button
            type="button"
            onClick={() => navigate(-1)}
            variant="ghost"
            size="sm"
            aria-label="Go back"
          >
            <ChevronLeft size={16} />
            Back
          </Button>

          <h1 className="text-3xl font-bold mb-6">Checkout</h1>

          <form onSubmit={placeOrder} className="space-y-10">
            {/* CONTACT */}
            <div>
              <h2 className="text-xs font-bold mb-3">Contact</h2>
              <Input type="email" placeholder="Email" />
            </div>

            {/* SHIPPING */}
            <div>
              <h2 className="text-xs font-bold mb-3">Shipping</h2>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <Input placeholder="First Name" />
                <Input placeholder="Last Name" />
              </div>

              <Input placeholder="Address" />

              <div className="grid grid-cols-3 gap-4 mt-4">
                <Input placeholder="City" />
                <Input placeholder="State" />
                <Input placeholder="Pincode" />
              </div>
            </div>

            {/* PAYMENT */}
            <div>
              <h2 className="text-xs font-bold mb-3">Payment</h2>

              {[
                {
                  id: "upi",
                  label: "UPI Payments",
                  icon: <Smartphone size={18} />,
                },
                {
                  id: "card",
                  label: "Card Payment",
                  icon: <CreditCard size={18} />,
                },
                {
                  id: "cod",
                  label: "Cash on Delivery",
                  icon: <Truck size={18} />,
                },
              ].map((method) => (
                <label
                  key={method.id}
                  className={`flex items-start gap-4 border p-4 rounded-lg mb-3 cursor-pointer ${
                    paymentMethod === method.id
                      ? "border-border bg-muted"
                      : "border-border"
                  }`}
                >
                  <Input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === method.id}
                    onChange={() => setPaymentMethod(method.id)}
                    className="mt-1.5 h-4 w-4 shrink-0 rounded-full border border-border p-0 accent-primary"
                  />

                  <div className="flex flex-col w-full">
                    <div className="flex items-center gap-3">
                      {method.icon}
                      <span className="font-medium">{method.label}</span>
                    </div>

                    {(method.id === "upi" || method.id === "card") && (
                      <div className="flex gap-3 mt-3 ml-6">
                        {paymentIcons[method.id].map((app) => (
                          <img
                            key={app.name}
                            src={app.icon}
                            className="h-5"
                            alt={app.name}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </label>
              ))}
            </div>

            {/* PAY BUTTON (UNCHANGED) */}
            <Button
              type="submit"
              disabled={loading}
              variant="default"
              size="lg"
              className="w-full"
              aria-label="Pay now"
            >
              <Lock className="mr-2 w-4 h-4" />
              {loading ? "Processing..." : `Pay ₹${total.toLocaleString()}`}
            </Button>

            {/* TRUST (UNCHANGED) */}
            <div className="flex justify-center gap-6 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <ShieldCheck size={14} /> Secure
              </div>
              <div className="flex items-center gap-1">
                <Truck size={14} /> Free Delivery
              </div>
              <div className="flex items-center gap-1">
                <Lock size={14} /> SSL Protected
              </div>
            </div>
          </form>
        </section>

        {/* RIGHT (UNCHANGED) */}
        <section className="lg:col-span-5 p-6 md:p-12 lg:p-16 bg-muted">
          <h2 className="text-sm font-bold mb-6">Order Summary</h2>

          {cart.length === 0 ? (
            <p className="text-muted-foreground text-sm">Cart is empty</p>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex gap-4 mb-4">
                <img
                  src={item.image}
                  className="w-16 h-20 object-cover rounded"
                />
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-muted-foreground">
                    ₹{item.price} × {item.qty}
                  </p>
                </div>
              </div>
            ))
          )}

          <div className="mt-6 border-t pt-4 flex justify-between font-bold">
            <span>Total</span>
            <span>₹{total.toLocaleString()}</span>
          </div>
        </section>
      </main>
    </div>
  );
};

export default VastraCheckout;
