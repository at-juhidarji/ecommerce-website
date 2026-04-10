import React from "react";
import { Trash2, Plus, Minus, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

const CartDrawer = () => {
  const navigate = useNavigate();

  const { cart, removeFromCart, increaseQty, decreaseQty, totalPrice } =
    useCart();

  return (
    <div className="min-h-screen bg-white text-black pb-24">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-10">
        
        {/* 🔙 BACK */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-gray-500 hover:text-orange-500 mb-4 text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        {/* 🧾 TITLE */}
        <h1 className="text-3xl sm:text-5xl font-black mb-6 sm:mb-10">
          YOUR <span className="text-orange-500">BAG</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10">
          
          {/* 🛍️ LEFT */}
          <div className="lg:col-span-8 space-y-5">
            {cart.length === 0 ? (
              <p className="text-gray-400 text-center sm:text-left">
                Your cart is empty
              </p>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:grid sm:grid-cols-4 gap-4 sm:gap-6 border-b border-gray-200 pb-4"
                >
                  {/* PRODUCT */}
                  <div className="flex gap-3 sm:col-span-2">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-24 sm:w-24 sm:h-32 object-cover rounded-md"
                    />
                    <div className="flex flex-col justify-between">
                      <div>
                        <h3 className="font-semibold text-sm sm:text-lg">
                          {item.name}
                        </h3>
                        <p className="text-gray-500 text-xs sm:text-sm">
                          ₹{item.price}
                        </p>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="flex items-center gap-1 text-red-500 text-xs hover:underline"
                      >
                        <Trash2 className="w-3 h-3" /> Remove
                      </button>
                    </div>
                  </div>

                  {/* QTY */}
                  <div className="flex justify-between sm:justify-center items-center">
                    <span className="text-sm sm:hidden">Qty:</span>

                    <div className="flex items-center border border-gray-300 rounded-md px-2">
                      <button
                        onClick={() => decreaseQty(item.id)}
                        className="p-1 hover:bg-gray-100"
                      >
                        <Minus size={14} />
                      </button>

                      <span className="px-3 text-sm">{item.qty}</span>

                      <button
                        onClick={() => increaseQty(item.id)}
                        className="p-1 hover:bg-gray-100"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>

                  {/* PRICE */}
                  <div className="flex justify-between sm:block sm:text-right font-semibold text-sm sm:text-base">
                    <span className="sm:hidden">Total:</span>
                    ₹{item.price * item.qty}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* 💰 RIGHT */}
          <div className="lg:col-span-4">
            <div className="bg-gray-50 p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200 sticky bottom-0 sm:static">
              
              <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">
                Summary
              </h2>

              <div className="flex justify-between mb-3 text-gray-600 text-sm sm:text-base">
                <span>Subtotal</span>
                <span>₹{totalPrice}</span>
              </div>

              <div className="flex justify-between mb-3 text-gray-600 text-sm sm:text-base">
                <span>Shipping</span>
                <span className="text-green-500 font-medium">Free</span>
              </div>

              <div className="border-t border-gray-300 pt-3 flex justify-between text-base sm:text-lg font-bold">
                <span>Total</span>
                <span>₹{totalPrice}</span>
              </div>

              <button className="w-full mt-4 sm:mt-6 bg-orange-500 hover:bg-orange-600 text-white py-2.5 sm:py-3 rounded-lg font-bold transition text-sm sm:text-base">
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 🔥 MOBILE STICKY CHECKOUT */}
      {cart.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-3 flex justify-between items-center sm:hidden">
          <span className="font-bold">₹{totalPrice}</span>
          <button className="bg-orange-500 text-white px-5 py-2 rounded-lg text-sm font-semibold">
            Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default CartDrawer;