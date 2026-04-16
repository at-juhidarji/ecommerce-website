import React from "react";
import { motion } from "framer-motion";
import { Package, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const orders = [
  {
    id: "ORD123456",
    date: "12 April 2026",
    status: "Delivered",
    total: 1299,
    items: 3,
  },
  {
    id: "ORD123457",
    date: "10 April 2026",
    status: "Shipped",
    total: 799,
    items: 2,
  },
];

const getStatusStyle = (status) => {
  switch (status) {
    case "Delivered":
      return "bg-green-100 text-green-700";
    case "Shipped":
      return "bg-orange-100 text-orange-700";
    case "Pending":
      return "bg-yellow-100 text-yellow-700";
    default:
      return "bg-zinc-100 text-zinc-600";
  }
};

const OrdersPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-orange-50 px-4 py-8">
      <div className="max-w-2xl mx-auto space-y-6">
        
        {/* 🧾 Heading */}
        <h1 className="text-2xl font-bold text-zinc-800">My Orders</h1>

        {/* 📦 Orders List */}
        {orders.map((order, index) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => navigate(`/orders/${order.id}`)}
            className="bg-white border border-orange-100 rounded-2xl p-5 cursor-pointer hover:shadow-lg hover:shadow-orange-100 transition-all"
          >
            <div className="flex justify-between items-center">
              
              {/* Left */}
              <div>
                <p className="text-sm text-zinc-500">{order.date}</p>
                <p className="font-semibold text-zinc-800">
                  Order #{order.id}
                </p>
              </div>

              {/* Status */}
              <span
                className={`text-xs px-3 py-1 rounded-full font-medium ${getStatusStyle(
                  order.status
                )}`}
              >
                {order.status}
              </span>
            </div>

            {/* Bottom */}
            <div className="mt-4 flex justify-between items-center">
              <div className="flex items-center gap-2 text-zinc-600 text-sm">
                <Package size={16} />
                {order.items} items
              </div>

              <div className="flex items-center gap-3">
                <span className="font-bold text-zinc-800">
                  ₹{order.total}
                </span>
                <ArrowRight size={18} className="text-orange-500" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;