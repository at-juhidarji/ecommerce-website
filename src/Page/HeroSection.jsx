import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone } from "lucide-react";
import { ProductCollection } from "./ProductCollection";
import LogoSlider from "./Cursor";
import { WhyChooseUs } from "./WhyToChoose";
import AutoReviewSlider from "./Review";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-black text-white overflow-hidden">
      {/* HERO */}
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* IMAGE */}
        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="lg:col-span-2 relative rounded-2xl overflow-hidden h-[350px] md:h-[450px] lg:h-[520px] group"
        >
          <img
            src="https://images.unsplash.com/photo-1745503319272-41c3bc777762?q=80&w=687&auto=format&fit=crop"
            className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
          />

          {/* 🔥 Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

          {/* CTA */}
          <div className="absolute bottom-6 left-6 flex gap-3 flex-wrap">
            <Button className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 rounded-full px-5">
              Shop Now <ArrowRight className="w-4 h-4" />
            </Button>

            <Button className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-5 hover:bg-white/20">
              Contact <Phone className="w-4 h-4" />
            </Button>
          </div>
        </motion.div>

        {/* TEXT */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col justify-center"
        >
          <div className="py-6">
            {/* Heading */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight mb-4">
              FIND CLOTHES THAT MATCHES YOUR STYLE
            </h1>

            {/* Subtext */}
            <p className="text-gray-400 mb-6">
              Discover premium fashion curated for your individuality.
            </p>

            {/* CTA */}
            <Button
              onClick={() => {
                document.getElementById("collection")?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
              className="bg-orange-500 hover:bg-orange-600 rounded-full px-6 mb-8"
            >
              Explore Collection
            </Button>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 border-t border-white/10 pt-6">
              {[
                { value: "200+", label: "Brands" },
                { value: "2K+", label: "Products" },
                { value: "30K+", label: "Customers" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.2 }}
                >
                  <h3 className="text-xl font-bold">{item.value}</h3>
                  <p className="text-gray-500 text-sm">{item.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* 🔥 CATEGORY CARDS */}
      <div className="max-w-7xl mx-auto px-4 pb-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            img: "https://plus.unsplash.com/premium_photo-1732563562540-6522555874e6?q=80&w=687",
            tag: "#TRENDING",
          },
          {
            img: "https://images.unsplash.com/photo-1734805077914-bbc92d9b56a8?q=80&w=736",
            tag: "#CLASSIC",
          },
          {
            img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600",
            tag: "#WOMEN",
          },
          {
            img: "https://images.unsplash.com/photo-1520975661595-6453be3f7070?w=600",
            tag: "#STREET",
          },
        ].map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            className="relative h-[260px] rounded-2xl overflow-hidden group cursor-pointer"
          >
            <img
              src={card.img}
              className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition"></div>

            {/* Text */}
            <div className="absolute bottom-4 left-4 text-white text-xl font-bold">
              {card.tag}
            </div>
          </motion.div>
        ))}
      </div>

      {/* SECTIONS */}
      <WhyChooseUs />
      <AutoReviewSlider />
      <LogoSlider />
      <ProductCollection />
    </div>
  );
};

export default HeroSection;
