import React from "react";
import { Truck, RefreshCcw, ShieldCheck } from "lucide-react";

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
    <section className="bg-white text-black py-20 relative overflow-hidden">
      
      {/* 🔥 Soft Background Glow */}
      <div className="absolute inset-0 blur-3xl opacity-20 bg-orange-200 rounded-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4">

        {/* Heading */}
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-14">
          Why Choose Us
        </h2>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((item, i) => {
            const Icon = item.icon;

            return (
              <div
                key={i}
                className="group rounded-2xl p-[1px] bg-gradient-to-br from-orange-200 to-orange-400 hover:-translate-y-2 transition duration-300"
              >
                {/* Card */}
                <div className="bg-white rounded-2xl p-8 text-center h-full border border-gray-200 shadow-sm hover:shadow-lg transition">

                  {/* Icon */}
                  <div className="flex justify-center mb-5">
                    <div className="p-4 rounded-full bg-orange-100">
                      <Icon className="size-10 text-orange-500 group-hover:scale-110 transition-transform" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold mb-2 text-black">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {item.desc}
                  </p>

                  {/* Bottom line */}
                  <div className="mt-6 h-[2px] w-0 bg-orange-500 group-hover:w-full transition-all duration-300 mx-auto"></div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};