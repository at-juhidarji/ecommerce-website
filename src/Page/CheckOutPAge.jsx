import React, { useState } from "react";
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
import { useCart } from "@/context/CartContext";
import { useNavigate } from "react-router-dom";

// Assets
import GooglePlayLogo from "@/assets/GooglePay.svg";
import PhonePeLogo from "@/assets/Phonepe.svg";
import PaytmLogo from "@/assets/Paytm.svg";
import VisaLogo from "@/assets/Visa.svg";
import MastercardLogo from "@/assets/MasterCard.svg";
import { Input } from "@/components/ui/input";

const VastraCheckout = () => {
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const { cart, totalPrice } = useCart();
  const navigate = useNavigate();

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

  const handlePlaceOrder = () => {
    if (cart.length === 0) return;

    const orderId = "ORD" + Math.floor(Math.random() * 1000000);

    navigate("/success", {
      state: {
        orderId,
        deliveryDate: "3 - 5 Business Days",
      },
    });
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 min-h-[calc(100vh-80px)]">
        
        {/* LEFT */}
        <section className="lg:col-span-7 p-6 md:p-12 lg:p-16 lg:border-r border-zinc-100">
          <div className="max-w-7xl ml-auto">

            {/* Back */}
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-zinc-400 hover:text-zinc-700 text-sm mb-10"
            >
              <ChevronLeft size={16} />
              Back
            </button>

            <h1 className="text-3xl font-bold mb-6">Checkout</h1>

            <form className="space-y-10">

              {/* Contact */}
              <div>
                <h2 className="text-xs font-bold mb-3">Contact</h2>
                <Input type="email" placeholder="Email" />
              </div>

              {/* Shipping */}
              <div>
                <h2 className="text-xs font-bold mb-3">Shipping</h2>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <Input type="text" placeholder="First Name" />
                  <Input type="text" placeholder="Last Name" />
                </div>
                <Input type="text" placeholder="Address" />
                <div className="grid grid-cols-3 gap-4 mt-4">
                  <Input type="text" placeholder="City" />
                  <Input type="text" placeholder="State" />
                  <Input type="text" placeholder="Pincode" />
                </div>
              </div>

              {/* PAYMENT SECTION */}
              <div>
                <h2 className="text-xs font-bold mb-3">Payment</h2>

                {[
                  {
                    id: "upi",
                    label: "UPI (Google Pay, PhonePe, Paytm)",
                    icon: <Smartphone size={18} />,
                  },
                  {
                    id: "card",
                    label: "Credit / Debit Card",
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
                        ? "border-black bg-zinc-50"
                        : "border-zinc-200"
                    }`}
                  >
                    {/* RADIO */}
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === method.id}
                      onChange={() => setPaymentMethod(method.id)}
                    />

                    <div className="flex flex-col w-full">

                      {/* Label */}
                      <div className="flex items-center gap-3">
                        {method.icon}
                        <span className="font-medium">{method.label}</span>
                      </div>

                      {/* ICONS */}
                      {(method.id === "upi" || method.id === "card") && (
                        <div className="flex gap-3 mt-3 ml-6 items-center">
                          {paymentIcons[method.id].map((app) => (
                            <img
                              key={app.name}
                              src={app.icon}
                              alt={app.name}
                              className="h-5 object-contain"
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </label>
                ))}

                {/* CARD INPUTS */}
                <AnimatePresence>
                  {paymentMethod === "card" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="space-y-3 mt-4">
                        <Input type="text" placeholder="Card Number" />
                        <div className="grid grid-cols-2 gap-4">
                          <Input type="text" placeholder="Expiry" />
                          <Input type="text" placeholder="CVV" />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* BUTTON */}
              <Button
                onClick={handlePlaceOrder}
                className="w-full bg-black text-white"
              >
                <Lock size={14} className="mr-2" />
                Pay ₹{totalPrice.toLocaleString()}
              </Button>

              {/* TRUST */}
              <div className="flex justify-center gap-6 text-xs text-zinc-400">
                <div className="flex items-center gap-1">
                  <ShieldCheck size={14} /> Secure
                </div>
                <div className="flex items-center gap-1">
                  <Truck size={14} /> Free Shipping
                </div>
                <div className="flex items-center gap-1">
                  <Lock size={14} /> SSL
                </div>
              </div>

            </form>
          </div>
        </section>

        {/* RIGHT */}
        <section className="lg:col-span-5 p-6 md:p-12 lg:p-16 bg-zinc-50">
          <h2 className="text-sm font-bold mb-6">Order Summary</h2>

          {cart.map((item) => (
            <div key={item.id} className="flex gap-4 mb-4">
              <img src={item.image} className="w-16 h-20 object-cover" />
              <div>
                <p>{item.name}</p>
                <p className="text-sm text-zinc-500">
                  ₹{item.price} × {item.quantity || item.qty}
                </p>
              </div>
            </div>
          ))}

          <div className="mt-6 border-t pt-4 flex justify-between font-bold">
            <span>Total</span>
            <span>₹{totalPrice.toLocaleString()}</span>
          </div>
        </section>
      </main>
    </div>
  );
};

export default VastraCheckout;