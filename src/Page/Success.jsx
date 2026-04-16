import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const OrderSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50 px-4">
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-3xl shadow-xl p-8 max-w-md w-full text-center border border-orange-100"
      >
        
        {/* ✅ Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="flex justify-center mb-4"
        >
          <div className="bg-orange-100 p-4 rounded-full">
            <CheckCircle className="text-orange-500" size={40} />
          </div>
        </motion.div>

        {/* 🎉 Heading */}
        <h1 className="text-2xl font-bold text-zinc-800">
          Order Placed Successfully!
        </h1>

        {/* 📦 Message */}
        <p className="text-sm text-zinc-500 mt-2">
          Thank you for your purchase. Your order has been confirmed and will be shipped soon.
        </p>

        {/* 🧾 Order Details */}
        <div className="mt-6 bg-orange-50 rounded-xl p-4 border border-orange-100 text-left">
          <p className="text-xs text-zinc-500">Order ID</p>
          <p className="font-semibold text-sm text-zinc-800">#ORD123456</p>

          <p className="text-xs text-zinc-500 mt-3">Estimated Delivery</p>
          <p className="font-semibold text-sm text-zinc-800">
            3 - 5 Business Days
          </p>
        </div>

        {/* 🚀 Buttons */}
        <div className="mt-6 space-y-3">
          
          <button
            onClick={() => navigate("/orders")}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2.5 rounded-xl font-medium transition-all flex items-center justify-center gap-2"
          >
            View Orders <ArrowRight size={16} />
          </button>

          <button
            onClick={() => navigate("/")}
            className="w-full border border-orange-200 text-orange-600 py-2.5 rounded-xl font-medium hover:bg-orange-50 transition"
          >
            Continue Shopping
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default OrderSuccess;