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

  const containerVars = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };

  const itemVars = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  };

  // Shared input classes for premium underline-style inputs
  const inputClasses = "w-full border-b border-zinc-200 py-3 text-sm focus:border-zinc-900 outline-none transition-colors duration-300 placeholder:text-zinc-300 bg-transparent";

  return (
    <div className="min-h-screen bg-white text-black font-sans antialiased">

      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 min-h-[calc(100vh-80px)]">

        {/* Left: Form Fields (7 Columns) */}
        <section className="lg:col-span-7 p-6 md:p-12 lg:p-16 lg:border-r border-zinc-100">
          <motion.div
            variants={containerVars}
            initial="hidden"
            animate="visible"
            className="max-w-xl ml-auto"
          >
            {/* Back button */}
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-zinc-400 hover:text-zinc-700 text-sm mb-10 transition-colors cursor-pointer"
            >
              <ChevronLeft size={16} />
              Back 
            </button>

            <div className="mb-12">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
                Checkout
              </h1>
              <p className="text-zinc-400 text-sm">
                Complete your order with secure payment.
              </p>
            </div>

            <form className="space-y-12" onSubmit={(e) => e.preventDefault()}>

              {/* Contact */}
              <motion.div variants={itemVars}>
               <h2 className=" text-[10px] uppercase tracking-[0.25em] font-bold inline-block bg-[#ffdbac] text-zinc-900 mb-5 px-2 py-1">
  Contact
</h2>
                <input
                  type="email"
                  placeholder="Email for order tracking"
                  className={inputClasses}
                />
              </motion.div>

              {/* Shipping */}
              <motion.div variants={itemVars}>
                <h2 className="text-[10px] uppercase tracking-[0.25em] font-bold bg-[#ffdbac] inline-block text-zinc-900 px-2 py-1  mb-5">
                  Shipping Address
                </h2>
                <div className="grid grid-cols-2 gap-6 mb-5">
                  <input
                    type="text"
                    placeholder="First Name"
                    className={inputClasses}
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    className={inputClasses}
                  />
                </div>
                <input
                  type="text"
                  placeholder="Flat, House no., Building, Company, Apartment"
                  className={`${inputClasses} mb-5`}
                />
                <div className="grid grid-cols-3 gap-6">
                  <input
                    type="text"
                    placeholder="City"
                    className={inputClasses}
                  />
                  <input
                    type="text"
                    placeholder="State"
                    className={inputClasses}
                  />
                  <input
                    type="text"
                    placeholder="Pincode"
                    className={inputClasses}
                  />
                </div>
              </motion.div>

              {/* Payment */}
              <motion.div variants={itemVars} layout className="space-y-4">
                <h2 className="text-[10px] uppercase tracking-[0.25em] font-bold  bg-[#ffdbac] inline-block text-zinc-900 px-2 py-1 mb-5">
                  Payment Method
                </h2>

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
                  <div
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id)}
                    className={`group relative flex flex-col p-5 border cursor-pointer transition-all duration-300 rounded-xl ${
                      paymentMethod === method.id
                        ? "border-zinc-900 bg-zinc-50/80"
                        : "border-zinc-100 hover:border-zinc-300"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-4">
                        <span
                          className={`transition-colors duration-300 ${
                            paymentMethod === method.id
                              ? "text-zinc-900"
                              : "text-zinc-300"
                          }`}
                        >
                          {method.icon}
                        </span>
                        <span className="text-sm font-semibold tracking-tight">
                          {method.label}
                        </span>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                          paymentMethod === method.id
                            ? "border-zinc-900"
                            : "border-zinc-200"
                        }`}
                      >
                        <motion.div
                          initial={false}
                          animate={{
                            scale: paymentMethod === method.id ? 1 : 0,
                          }}
                          transition={{ duration: 0.2 }}
                          className="w-2.5 h-2.5 bg-zinc-900 rounded-full"
                        />
                      </div>
                    </div>

                    {/* Payment logos */}
                    <div className="flex gap-4 items-center ml-9">
                      {(method.id === "upi" || method.id === "card") &&
                        paymentIcons[method.id].map((app) => (
                          <img
                            key={app.name}
                            src={app.icon}
                            alt={app.name}
                            className={`h-3.5 md:h-4 w-auto transition-all duration-300 ${
                              paymentMethod === method.id
                                ? "grayscale-0 opacity-100"
                                : "grayscale opacity-30"
                            }`}
                          />
                        ))}
                    </div>
                  </div>
                ))}

                <AnimatePresence mode="wait">
                  {paymentMethod === "card" && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 bg-zinc-50/80 border border-zinc-100 rounded-xl space-y-5">
                        <input
                          type="text"
                          placeholder="Card number"
                          className={inputClasses}
                        />
                        <div className="grid grid-cols-2 gap-6">
                          <input
                            type="text"
                            placeholder="Expiry MM/YY"
                            className={inputClasses}
                          />
                          <input
                            type="text"
                            placeholder="CVV"
                            className={inputClasses}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              <motion.div variants={itemVars} className="space-y-4">
                <Button
                  variant="default"
                  type="submit"
                  className="w-full bg-zinc-900 cursor-pointer text-white hover:bg-zinc-800 rounded-xl uppercase tracking-[0.15em] text-xs h-13 font-semibold transition-colors"
                >
                  <Lock size={14} className="mr-2" />
                  Complete Purchase — ₹{totalPrice.toLocaleString()}
                </Button>

                {/* Trust signals */}
                <div className="flex items-center justify-center gap-6 pt-2">
                  {[
                    { icon: <ShieldCheck size={14} />, text: "Secure" },
                    { icon: <Truck size={14} />, text: "Free Shipping" },
                    { icon: <Lock size={14} />, text: "SSL Encrypted" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-zinc-400">
                      {item.icon}
                      <span className="text-[10px] tracking-wide font-medium">{item.text}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </form>
          </motion.div>
        </section>

        {/* Right: Summary (5 Columns) */}
        <section className="lg:col-span-5 bg-zinc-50/30 p-6 md:p-12 lg:p-16">
          <div className="sticky top-28 max-w-sm mx-auto">
            <h2 className="text-[10px] uppercase tracking-[0.25em] font-bold  bg-[#ffdbac] inline-block text-zinc-900 px-2 py-1 mb-8">
              Your Selection
            </h2>

            {cart.length === 0 && (
              <div className="text-center py-12">
                <p className="text-zinc-400 text-sm mb-4">Your cart is empty</p>
                <Button
                  variant="outline"
                  onClick={() => navigate("/collections")}
                  className="rounded-xl cursor-pointer"
                >
                  Browse Collections
                </Button>
              </div>
            )}

            {cart.map((item) => (
              <motion.div
                key={item.id + item.size}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-5 mb-8 pb-8 border-b border-zinc-100"
              >
                <div className="relative overflow-hidden bg-white border border-zinc-100 rounded-xl p-1.5 flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-26 object-cover rounded-lg"
                  />
                </div>

                <div className="flex flex-col justify-center">
                  <h3 className="text-base font-bold tracking-tight leading-tight mb-1">
                    {item.name}
                  </h3>

                  <p className="text-zinc-400 text-sm">Size {item.size}</p>

                  <p className="mt-1.5 font-mono text-[10px] tracking-widest text-zinc-300">
                    ITEM #{item.id}
                  </p>

                  <p className="mt-2 font-bold text-sm tabular-nums">
                    ₹{item.price.toLocaleString()} × {item.quantity || item.qty}
                  </p>
                </div>
              </motion.div>
            ))}

            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-400 font-medium">Subtotal</span>
                <span className="font-bold tabular-nums">₹{totalPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-400 font-medium">
                  Standard Shipping
                </span>
                <span className="text-emerald-600 font-bold uppercase text-[10px] tracking-[0.15em]">
                  Complimentary
                </span>
              </div>
              <div className="flex justify-between text-xl font-black pt-6 border-t border-zinc-200 tracking-tight">
                <span>Total</span>
                <span className="tabular-nums">₹{totalPrice.toLocaleString()}</span>
              </div>
            </div>

            <div className="mt-10 p-4 bg-white border border-dashed border-zinc-200 text-center rounded-xl">
              <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 font-bold">
                Estimated Delivery: 3–5 Business Days
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default VastraCheckout;
