// ✅ CartDrawer.jsx (Fully Dynamic Connected to CartContext)
import React from "react";
import { Trash2, Plus, Minus, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../CartContext";

const CartDrawer = () => {
  const navigate = useNavigate();

  // ✅ CONNECT TO CONTEXT
  const {
    cart,
    removeFromCart,
    increaseQty,
    decreaseQty,
    totalPrice,
  } = useCart();

  return (
    <div className="min-h-screen bg-black text-white pb-20">
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-16">
        {/* 🔙 BACK */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-zinc-500 hover:text-orange-400 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Shop
        </button>

        <h1 className="text-5xl font-black mb-10">
          YOUR <span className="text-orange-500">BAG</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* 🛍️ LEFT: ITEMS */}
          <div className="lg:col-span-8 space-y-6">
            {cart.length === 0 ? (
              <p className="text-gray-400">Your cart is empty</p>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="grid md:grid-cols-4 gap-6 items-center border-b border-zinc-800 pb-6"
                >
                  {/* Product */}
                  <div className="md:col-span-2 flex gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-32 object-cover"
                    />
                    <div>
                      <h3 className="font-bold">{item.name}</h3>
                      <p className="text-gray-400 text-sm">
                        ₹{item.price}
                      </p>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="flex items-center gap-1 text-red-400 text-xs mt-2"
                      >
                        <Trash2 className="w-3 h-3" /> Remove
                      </button>
                    </div>
                  </div>

                  {/* Qty */}
                  <div className="flex justify-center">
                    <div className="flex items-center border border-zinc-700 px-2">
                      <button onClick={() => decreaseQty(item.id)}>
                        <Minus />
                      </button>
                      <span className="px-4">{item.qty}</span>
                      <button onClick={() => increaseQty(item.id)}>
                        <Plus />
                      </button>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="text-right font-bold">
                    ₹{item.price * item.qty}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* 💰 RIGHT: SUMMARY */}
          <div className="lg:col-span-4">
            <div className="bg-zinc-900 p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-6">Summary</h2>

              <div className="flex justify-between mb-4">
                <span>Subtotal</span>
                <span>₹{totalPrice}</span>
              </div>

              <div className="flex justify-between mb-4">
                <span>Shipping</span>
                <span className="text-green-500">Free</span>
              </div>

              <div className="border-t border-zinc-700 pt-4 flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>₹{totalPrice}</span>
              </div>

              <button className="w-full mt-6 bg-orange-500 py-3 font-bold">
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;