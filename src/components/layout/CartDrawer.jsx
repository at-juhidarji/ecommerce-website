import React from "react";
import { Trash2, ArrowLeft, ShoppingBag, Plus, Minus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { Button } from "../ui/button";
import { motion, AnimatePresence } from "framer-motion";

const CartDrawer = () => {
  const navigate = useNavigate();

  const { cart, removeFromCart, increaseQty, decreaseQty, totalPrice } =
    useCart();

  const totalItems = cart.reduce((t, i) => t + i.qty, 0);

  return (
    <div className="min-h-screen bg-background text-foreground pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* 🔙 BACK */}

        {/* 🧾 TITLE */}
        <div className="mb-10 sm:mb-14">
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            YOUR <span className="text-primary">BAG</span>
          </h1>
          <p className="text-muted text-sm mt-2">
            {cart.length > 0
              ? `${totalItems} item${totalItems > 1 ? "s" : ""} in your bag`
              : "Your bag is empty"}
          </p>
        </div>

        {/* 🔥 EMPTY CART */}
        {cart.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center min-h-[60vh] text-center"
          >
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-6">
              <ShoppingBag className="w-8 h-8 text-muted-foreground" />
            </div>

            <h2 className="text-xl font-semibold mb-2 tracking-tight">
              Your bag is empty
            </h2>

            <p className="text-muted-foreground text-sm mb-8">
              Looks like you haven't added anything yet
            </p>

            <Button
              onClick={() => navigate("/collections")}
              variant="default"
              size="lg"
            >
              Start Shopping
            </Button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12">
            {/* 🛍️ LEFT */}
            <div className="lg:col-span-8">
              <AnimatePresence>
                {cart.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex flex-col sm:grid sm:grid-cols-4 gap-4 sm:gap-6 border-b border-border py-6 first:pt-0"
                  >
                    {/* PRODUCT */}
                    <div className="flex gap-4 sm:col-span-2">
                      <div className="w-20 h-24 sm:w-24 sm:h-32 rounded-xl overflow-hidden bg-muted">
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
                          <p className="text-muted text-sm">
                            ₹{item.price.toLocaleString()}
                          </p>
                        </div>

                        {/* REMOVE */}
                        <Button
                          variant="ghost"
                          onClick={() => removeFromCart(item.id)}
                          size="sm"
                          className="flex items-center gap-1.5 text-muted-foreground hover:text-danger w-fit px-0 h-auto"
                          aria-label={`Remove ${item.name} from cart`}
                        >
                          <Trash2 className="w-3 h-3" />
                          Remove
                        </Button>
                      </div>
                    </div>

                    {/* QTY */}
                    <div className="flex justify-between sm:justify-center items-center">
                      <span className="text-sm sm:hidden text-muted-foreground">
                        Qty:
                      </span>

                      <div className="flex items-center border border-border rounded-xl overflow-hidden">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => decreaseQty(item.id)}
                          className="rounded-none h-10 w-10 flex items-center justify-center p-0"
                          aria-label={`Decrease quantity of ${item.name}`}
                        >
                          <Minus className="w-4 h-4" />
                        </Button>

                        <span className="w-10 text-center font-semibold text-sm tabular-nums">
                          {item.qty}
                        </span>

                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => increaseQty(item.id)}
                          className="rounded-none h-10 w-10 flex items-center justify-center p-0"
                          aria-label={`Increase quantity of ${item.name}`}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {/* PRICE */}
                    <div className="flex justify-between sm:block sm:text-right font-semibold text-sm sm:text-base items-center">
                      <span className="sm:hidden text-muted">Total:</span>₹
                      {(item.price * item.qty).toLocaleString()}
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
                className="bg-surface-light p-6 sm:p-8 rounded-2xl border border-border sticky top-24"
              >
                <h2 className="text-lg font-bold mb-6">Order Summary</h2>

                <div className="space-y-4 text-sm">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span className="font-medium">
                      ₹{totalPrice.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between text-muted-foreground">
                    <span>Shipping</span>
                    <span className="text-success font-semibold">Free</span>
                  </div>

                  <div className="border-t border-border pt-4 flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>₹{totalPrice.toLocaleString()}</span>
                  </div>
                </div>

                <Button
                  onClick={() => navigate("/checkout")}
                  variant="default"
                  size="lg"
                  className="w-full uppercase text-xs"
                  aria-label="Proceed to checkout"
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
