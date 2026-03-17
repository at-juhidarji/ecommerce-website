import React from "react";
import { Trash2, Plus, Minus, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
const CartDrawer = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-black text-white pb-20 selection:bg-orange-500/30">
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-16">
        {/* Header Section */}
        <div className="mb-10">
          <button
              onClick={() => navigate("/")}
          className="flex items-center gap-2 text-zinc-500 hover:text-orange-400 transition-all mb-4 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-bold uppercase tracking-widest">
              Back to Shop
            </span>
          </button>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none">
            YOUR{" "}
            <span className="text-orange-500 drop-shadow-[0_0_15px_rgba(249,115,22,0.3)]">
              BAG
            </span>
          </h1>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* LEFT: Product List */}
          <div className="lg:col-span-8 space-y-4">
            {/* Desktop Table Header */}
            <div className="hidden md:grid grid-cols-4 pb-6 border-b border-zinc-800 text-[10px] uppercase tracking-[0.3em] font-black text-zinc-600">
              <div className="col-span-2">Item Details</div>
              <div className="text-center">Qty</div>
              <div className="text-right">Price</div>
            </div>

            {/* Individual Item Row */}
            {[1,2].map((item) => (
              <div
                key={item}
                className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center py-10 border-b border-zinc-900 group"
              >
                {/* Product Info */}
                <div className="col-span-1 md:col-span-2 flex gap-6">
                  <div className="w-28 h-36 bg-zinc-900 rounded-sm overflow-hidden flex-shrink-0 border border-zinc-800 group-hover:border-orange-500/50 transition-colors">
                    <img
                      src="https://images.unsplash.com/photo-1696357096028-2a62d7add125?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt="Product"
                      className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                    />
                  </div>
                  <div className="flex flex-col justify-between py-1">
                    <div>
                      <h3 className="font-black text-xl uppercase tracking-tight group-hover:text-orange-400 transition-colors">
                        Oversized Graphic Tee
                      </h3>
                      <p className="text-zinc-500 text-xs mt-2 uppercase tracking-widest font-bold">
                        Size: XL <span className="mx-2">|</span> Color: Phantom
                        Black
                      </p>
                    </div>
                    <button className="flex items-center gap-2 text-zinc-600 hover:text-red-500 text-[10px] font-black tracking-tighter uppercase transition-colors">
                      <Trash2 className="w-3.5 h-3.5" /> Remove Item
                    </button>
                  </div>
                </div>

                {/* Quantity Controller */}
                <div className="flex justify-start md:justify-center">
                  <div className="flex items-center bg-zinc-900 border border-zinc-800 p-1 rounded-sm">
                    <button className="p-2 hover:text-orange-500 transition-colors">
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-5 font-black text-lg">1</span>
                    <button className="p-2 hover:text-orange-500 transition-colors">
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Price */}
                <div className="text-left md:text-right">
                  <p className="text-2xl font-black tracking-tighter">$49.00</p>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT: Summary Sidebar */}
          <div className="lg:col-span-4 lg:sticky lg:top-24">
            <div className="bg-zinc-900/50 p-8 border border-zinc-800 backdrop-blur-md">
              <h2 className="text-2xl font-black uppercase tracking-tighter mb-8 border-b border-zinc-800 pb-4">
                Summary
              </h2>

              <div className="space-y-5 mb-10">
                <div className="flex justify-between text-zinc-400 uppercase text-xs font-bold tracking-widest">
                  <span>Subtotal</span>
                  <span className="text-white">$98.00</span>
                </div>
                <div className="flex justify-between text-zinc-400 uppercase text-xs font-bold tracking-widest">
                  <span>Shipping</span>
                  <span className="text-green-500 font-black">
                    COMPLIMENTARY
                  </span>
                </div>
                <div className="pt-6 border-t border-zinc-800 flex justify-between items-end">
                  <span className="font-black uppercase text-sm tracking-widest">
                    Total Pay
                  </span>
                  <div className="text-right">
                    <p className="text-4xl font-black tracking-tighter text-white">
                      $98.00
                    </p>
                    <p className="text-[9px] text-zinc-600 uppercase font-bold mt-1">
                      VAT Included
                    </p>
                  </div>
                </div>
              </div>

              <button className="w-full bg-white text-black py-5 font-black uppercase tracking-[0.3em] text-sm hover:bg-orange-500 hover:text-white transition-all duration-300 transform active:scale-[0.98]">
                Secure Checkout
              </button>

              <div className="mt-16 pt-8 border-t border-zinc-800 grid grid-cols-3 gap-4 opacity-30 hover:opacity-100 transition-all duration-500 cursor-default">
                <div className="flex items-center justify-center py-2 px-1 bg-zinc-900 border border-zinc-800 rounded-sm text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 hover:text-white hover:border-zinc-600 transition-colors">
                  Mastercard
                </div>
                <div className="flex items-center justify-center py-2 px-1 bg-zinc-900 border border-zinc-800 rounded-sm text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 hover:text-white hover:border-zinc-600 transition-colors">
                  Visa
                </div>
                <div className="flex items-center justify-center py-2 px-1 bg-zinc-900 border border-zinc-800 rounded-sm text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 hover:text-white hover:border-zinc-600 transition-colors">
                  UPI
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
