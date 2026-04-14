import React from "react";
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { Button } from "../ui/button";
import { motion, AnimatePresence } from "framer-motion";

const CartDrawer = () => {
  const navigate = useNavigate();

  const { cart, removeFromCart, increaseQty, decreaseQty, totalPrice } =
    useCart();

  return (
    <div className="min-h-screen bg-white text-zinc-900 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">

        {/* 🔙 BACK */}
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-zinc-500 hover:text-zinc-900 mb-6 text-sm font-medium -ml-2 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Shop
        </Button>

        {/* 🧾 TITLE */}
        <div className="mb-10 sm:mb-14">
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            YOUR <span className="text-orange-500">BAG</span>
          </h1>
          <p className="text-zinc-400 text-sm mt-2">
            {cart.length > 0
              ? `${cart.reduce((t, i) => t + i.qty, 0)} item${
                  cart.reduce((t, i) => t + i.qty, 0) > 1 ? "s" : ""
                } in your bag`
              : "Your bag is empty"}
          </p>
        </div>

        {/* 🔥 EMPTY CART CENTER FIX */}
        {cart.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center min-h-[60vh] text-center"
          >
            <div className="w-20 h-20 rounded-full bg-zinc-50 flex items-center justify-center mb-6">
              <ShoppingBag className="w-8 h-8 text-zinc-300" />
            </div>
            <h2 className="text-xl font-semibold mb-2 tracking-tight">
              Your bag is empty
            </h2>
            <p className="text-zinc-400 text-sm mb-8">
              Looks like you haven't added anything yet
            </p>
            <Button
              onClick={() => navigate("/collections")}
              className="bg-zinc-900 text-white px-8 py-3 rounded-xl hover:bg-zinc-800"
            >
              Start Shopping
            </Button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12">

            {/* 🛍️ LEFT */}
            <div className="lg:col-span-8 space-y-0">
              <AnimatePresence>
                {cart.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex flex-col sm:grid sm:grid-cols-4 gap-4 sm:gap-6 border-b border-zinc-100 py-6 first:pt-0"
                  >
                    {/* PRODUCT */}
                    <div className="flex gap-4 sm:col-span-2">
                      <div className="w-20 h-24 sm:w-24 sm:h-32 rounded-xl overflow-hidden bg-zinc-50">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex flex-col justify-between py-0.5">
                        <div>
                          <h3 className="font-semibold text-sm sm:text-base">
                            {item.name}
                          </h3>
                          <p className="text-zinc-400 text-sm">
                            ₹{item.price.toLocaleString()}
                          </p>
                        </div>

                        {/* ✅ SHADCN REMOVE */}
                        <Button
                          variant="ghost"
                          onClick={() => removeFromCart(item.id)}
                          className="flex items-center gap-1.5 text-zinc-400 text-xs hover:text-red-500 w-fit px-0 h-auto"
                        >
                          <Trash2 className="w-3 h-3" /> Remove
                        </Button>
                      </div>
                    </div>

                    {/* QTY */}
                    <div className="flex justify-between sm:justify-center items-center">
                      <span className="text-sm sm:hidden text-zinc-400">
                        Qty:
                      </span>

                      <div className="flex items-center border border-zinc-200 rounded-xl overflow-hidden">
                        <Button
                          variant="ghost"
                          onClick={() => decreaseQty(item.id)}
                          className="p-2.5"
                        >
                          <Minus size={14} />
                        </Button>

                        <span className="px-4 text-sm font-semibold">
                          {item.qty}
                        </span>

                        <Button
                          variant="ghost"
                          onClick={() => increaseQty(item.id)}
                          className="p-2.5"
                        >
                          <Plus size={14} />
                        </Button>
                      </div>
                    </div>

                    {/* PRICE */}
                    <div className="flex justify-between sm:block sm:text-right font-semibold text-sm sm:text-base items-center">
                      <span className="sm:hidden text-zinc-400">
                        Total:
                      </span>
                      ₹{(item.price * item.qty).toLocaleString()}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* 💰 RIGHT */}
            <div className="lg:col-span-4">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-zinc-50/80 p-6 sm:p-8 rounded-2xl border border-zinc-100 sticky top-24"
              >
                <h2 className="text-lg font-bold mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4 text-sm">
                  <div className="flex justify-between text-zinc-500">
                    <span>Subtotal</span>
                    <span className="font-medium">
                      ₹{totalPrice.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between text-zinc-500">
                    <span>Shipping</span>
                    <span className="text-green-600 font-semibold">
                      Free
                    </span>
                  </div>

                  <div className="border-t pt-4 flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>
                      ₹{totalPrice.toLocaleString()}
                    </span>
                  </div>
                </div>

                <Button
                  onClick={() => navigate("/checkout")}
                  className="w-full bg-zinc-900 text-white hover:bg-zinc-800 rounded-xl uppercase text-xs h-12 mt-8"
                >
                  Proceed to Checkout
                </Button>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;