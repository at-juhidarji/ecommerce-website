import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── helpers ──────────────────────────────────────────────────────────────────

const MOCK_ORDERS = [
  {
    id: "ORD-4821",
    date: "21 Apr 2026",
    status: "Delivered",
    total: 3499,
    items: [
      { name: "Mango Pickle – Rajasthani", qty: 2, price: 349, image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=120&q=80" },
      { name: "Cold-Pressed Mustard Oil", qty: 1, price: 599, image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=120&q=80" },
      { name: "Organic Turmeric Powder", qty: 3, price: 249, image: "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=120&q=80" },
    ],
  },
  {
    id: "ORD-4799",
    date: "18 Apr 2026",
    status: "Shipped",
    total: 1850,
    items: [
      { name: "Khakhra – Methi Masala", qty: 4, price: 199, image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=120&q=80" },
      { name: "Jaggery Block – Sugarcane", qty: 2, price: 299, image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=120&q=80" },
    ],
  },
  {
    id: "ORD-4754",
    date: "10 Apr 2026",
    status: "Pending",
    total: 920,
    items: [
      { name: "Basmati Rice – Premium", qty: 1, price: 699, image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=120&q=80" },
      { name: "Cardamom Pods", qty: 2, price: 110, image: "https://images.unsplash.com/photo-1638179440888-1e553d8c7879?w=120&q=80" },
    ],
  },
];

const STATUS = {
  Delivered: {
    label: "Delivered",
    dot: "#22c55e",
    pill: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
    track: ["Order Placed", "Packed", "Shipped", "Out for Delivery", "Delivered"],
    step: 5,
  },
  Shipped: {
    label: "Shipped",
    dot: "#f97316",
    pill: "bg-orange-50 text-orange-700 ring-1 ring-orange-200",
    track: ["Order Placed", "Packed", "Shipped", "Out for Delivery", "Delivered"],
    step: 3,
  },
  Pending: {
    label: "Pending",
    dot: "#eab308",
    pill: "bg-yellow-50 text-yellow-700 ring-1 ring-yellow-200",
    track: ["Order Placed", "Packed", "Shipped", "Out for Delivery", "Delivered"],
    step: 1,
  },
};

// ── sub-components ────────────────────────────────────────────────────────────

const Pill = ({ status }) => {
  const s = STATUS[status] || STATUS.Pending;
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full ${s.pill}`}>
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: s.dot }} />
      {s.label}
    </span>
  );
};

const Tracker = ({ status }) => {
  const s = STATUS[status] || STATUS.Pending;
  return (
    <div className="mt-6">
      <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-3">Tracking</p>
      <div className="relative flex items-center justify-between">
        {/* progress bar */}
        <div className="absolute inset-x-0 top-3 h-0.5 bg-zinc-100" />
        <motion.div
          className="absolute left-0 top-3 h-0.5 bg-gradient-to-r from-amber-400 to-orange-500"
          initial={{ width: 0 }}
          animate={{ width: `${((s.step - 1) / (s.track.length - 1)) * 100}%` }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
        />

        {s.track.map((label, i) => {
          const done = i < s.step;
          const active = i === s.step - 1;
          return (
            <div key={label} className="relative flex flex-col items-center gap-1.5 z-10">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border-2
                  ${active ? "border-orange-500 bg-orange-500 text-white shadow-lg shadow-orange-200"
                    : done ? "border-amber-400 bg-amber-400 text-white"
                    : "border-zinc-200 bg-white text-zinc-300"}`}
              >
                {done && !active ? "✓" : i + 1}
              </motion.div>
              <span className={`text-[9px] font-medium text-center leading-tight max-w-[44px]
                ${active ? "text-orange-600" : done ? "text-zinc-600" : "text-zinc-300"}`}>
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ── card ──────────────────────────────────────────────────────────────────────

const OrderCard = ({ order, index, onClick }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.08, type: "spring", stiffness: 200, damping: 22 }}
    onClick={onClick}
    className="group relative bg-white rounded-3xl border border-zinc-100 p-5 cursor-pointer
               hover:border-orange-200 hover:shadow-2xl hover:shadow-orange-100/60 transition-all duration-300"
  >
    {/* subtle gradient accent top-right */}
    <div className="absolute top-0 right-0 w-28 h-28 rounded-3xl bg-gradient-to-br from-orange-50 to-amber-50 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

    <div className="relative">
      {/* header row */}
      <div className="flex justify-between items-start">
        <div>
          <p className="text-[11px] font-medium text-zinc-400 tracking-wider uppercase">{order.date}</p>
          <p className="mt-0.5 text-base font-bold text-zinc-800 font-mono">{order.id}</p>
        </div>
        <Pill status={order.status} />
      </div>

      {/* product images */}
      <div className="mt-4 flex gap-2">
        {order.items.slice(0, 4).map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -3, scale: 1.05 }}
            className="relative"
            style={{ zIndex: order.items.length - i }}
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-14 h-14 rounded-2xl object-cover border-2 border-white shadow-md"
            />
          </motion.div>
        ))}
        {order.items.length > 4 && (
          <div className="w-14 h-14 rounded-2xl bg-zinc-100 border-2 border-white flex items-center justify-center text-xs font-bold text-zinc-500">
            +{order.items.length - 4}
          </div>
        )}
      </div>

      {/* footer row */}
      <div className="mt-4 flex justify-between items-center border-t border-zinc-50 pt-4">
        <p className="text-xs text-zinc-400">
          <span className="font-semibold text-zinc-600">{order.items.length}</span> item{order.items.length > 1 ? "s" : ""}
        </p>
        <div className="flex items-baseline gap-0.5">
          <span className="text-xs text-zinc-400 font-medium">₹</span>
          <span className="text-xl font-black text-zinc-800 tabular-nums">{order.total.toLocaleString()}</span>
        </div>
      </div>
    </div>
  </motion.div>
);

// ── modal ─────────────────────────────────────────────────────────────────────

const OrderModal = ({ order, onClose }) => (
  <motion.div
    className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    {/* backdrop */}
    <motion.div
      className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    />

    <motion.div
      initial={{ y: 60, opacity: 0, scale: 0.97 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      exit={{ y: 60, opacity: 0, scale: 0.97 }}
      transition={{ type: "spring", stiffness: 280, damping: 28 }}
      className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden"
    >
      {/* colorful top band */}
      <div className="h-1.5 w-full bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400" />

      <div className="p-6">
        {/* header */}
        <div className="flex justify-between items-start">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-zinc-400">{order.date}</p>
            <h2 className="text-xl font-black text-zinc-900 font-mono mt-0.5">{order.id}</h2>
          </div>
          <div className="flex items-center gap-2">
            <Pill status={order.status} />
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-zinc-100 hover:bg-zinc-200 flex items-center justify-center transition-colors"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M1 1l10 10M11 1L1 11" stroke="#52525b" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        </div>

        {/* tracker */}
        <Tracker status={order.status} />

        {/* divider */}
        <div className="my-5 border-t border-dashed border-zinc-100" />

        {/* items */}
        <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-3">Items</p>
        <div className="space-y-3 max-h-64 overflow-y-auto pr-1 scrollbar-thin">
          {order.items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 + i * 0.07 }}
              className="flex items-center gap-3 p-2 rounded-2xl hover:bg-zinc-50 transition-colors"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-14 h-14 rounded-xl object-cover border border-zinc-100 shadow-sm"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-zinc-800 truncate">{item.name}</p>
                <p className="text-xs text-zinc-400 mt-0.5">Qty: {item.qty}</p>
              </div>
              <p className="text-sm font-bold text-zinc-800 shrink-0">₹{item.price}</p>
            </motion.div>
          ))}
        </div>

        {/* total */}
        <div className="mt-5 bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl px-4 py-3 flex justify-between items-center">
          <span className="text-sm font-semibold text-zinc-500">Order Total</span>
          <div className="flex items-baseline gap-0.5">
            <span className="text-sm text-orange-500 font-medium">₹</span>
            <span className="text-2xl font-black text-zinc-900 tabular-nums">{order.total.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </motion.div>
  </motion.div>
);

// ── main page ─────────────────────────────────────────────────────────────────

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    // Try localStorage first, fall back to mock data
    try {
      const stored = JSON.parse(localStorage.getItem("orders"));
      setOrders(stored?.length ? stored : MOCK_ORDERS);
    } catch {
      setOrders(MOCK_ORDERS);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#fafaf9]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800;900&family=DM+Mono:wght@500;600&display=swap');
        * { font-family: 'DM Sans', sans-serif; }
        .font-mono { font-family: 'DM Mono', monospace !important; }
        .scrollbar-thin::-webkit-scrollbar { width: 4px; }
        .scrollbar-thin::-webkit-scrollbar-track { background: transparent; }
        .scrollbar-thin::-webkit-scrollbar-thumb { background: #e4e4e7; border-radius: 99px; }
      `}</style>

      {/* top bar */}
      <div className="sticky top-0 z-40 bg-[#fafaf9]/80 backdrop-blur-md border-b border-zinc-100">
        <div className="max-w-lg mx-auto px-5 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-md shadow-orange-200">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M3 9h18M9 9V4m6 5V4M5 20h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2v9a2 2 0 002 2z" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
              </svg>
            </div>
            <span className="text-sm font-bold text-zinc-800">My Orders</span>
          </div>
          <span className="text-xs font-semibold text-zinc-400 bg-zinc-100 px-2.5 py-1 rounded-full">
            {orders.length} order{orders.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {/* content */}
      <div className="max-w-lg mx-auto px-5 py-8 space-y-4">
        {orders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <div className="w-20 h-20 mx-auto bg-orange-50 rounded-3xl flex items-center justify-center mb-4">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
                <path d="M3 9h18M9 9V4m6 5V4M5 20h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2v9a2 2 0 002 2z" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <p className="font-bold text-zinc-700 text-lg">No orders yet</p>
            <p className="text-sm text-zinc-400 mt-1">Your orders will appear here once you shop</p>
          </motion.div>
        ) : (
          orders.map((order, i) => (
            <OrderCard key={order.id} order={order} index={i} onClick={() => setSelectedOrder(order)} />
          ))
        )}
      </div>

      {/* modal */}
      <AnimatePresence>
        {selectedOrder && (
          <OrderModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default OrdersPage;