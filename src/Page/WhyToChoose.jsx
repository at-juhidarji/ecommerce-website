import React from "react";
import { Truck, RefreshCcw, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Truck,
    title: "Free Shipping",
    desc: "Free delivery on all orders above ₹499",
  },
  {
    icon: RefreshCcw,
    title: "Easy Returns",
    desc: "7-day hassle-free returns & exchanges",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payment",
    desc: "100% secure and trusted payment methods",
  },
];

export const WhyChooseUs = () => {
  return (
    <section className="bg-black text-white py-20 relative overflow-hidden">
      
      {/* 🔥 Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-purple-500/10 blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4">

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-5xl font-bold text-center mb-14"
        >
          Why Choose Us
        </motion.h2>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((item, i) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                whileHover={{ y: -10 }}
                className="relative group rounded-2xl p-[1px] bg-gradient-to-br from-orange-500/30 to-purple-500/30"
              >
                {/* Glass Card */}
                <div className="bg-zinc-900/80 backdrop-blur-xl rounded-2xl p-8 text-center h-full transition duration-300 group-hover:bg-zinc-900">

                  {/* Icon with glow */}
                  <div className="flex justify-center mb-5">
                    <div className="p-4 rounded-full bg-orange-500/10 group-hover:bg-orange-500/20 transition">
                      <Icon className="size-10 text-orange-400 group-hover:scale-110 transition-transform" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold mb-2">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {item.desc}
                  </p>

                  {/* 🔥 Bottom glow line */}
                  <div className="mt-6 h-[2px] w-0 bg-orange-400 group-hover:w-full transition-all duration-300 mx-auto"></div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};