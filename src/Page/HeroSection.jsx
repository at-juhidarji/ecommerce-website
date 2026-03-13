import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ShoppingCart, ArrowRight, Phone } from "lucide-react";
import { ProductCollection } from "./ProductCollection";

const HeroSection = () => {
  return (
    <div className="bg-black text-white">

      <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* HERO IMAGE */}
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="lg:col-span-2 relative rounded-xl overflow-hidden h-[350px] md:h-[450px] lg:h-[520px]"
        >
          <img
            src="https://images.unsplash.com/photo-1745503319272-41c3bc777762?q=80&w=687&auto=format&fit=crop"
            alt="fashion"
            className="w-full h-full object-cover"
          />

          {/* BUTTONS */}
          <div className="absolute bottom-4 left-4 flex gap-3 flex-wrap">
            <Button className="flex items-center gap-2 bg-white text-black rounded-full px-4">
              Learn More
              <ArrowRight className="w-4 h-4" />
            </Button>

            <Button className="flex items-center gap-2 bg-white text-black rounded-full px-4">
              Contact Us
              <Phone className="w-4 h-4" />
            </Button>
          </div>
        </motion.div>

        {/* TEXT SECTION */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center"
        >
          <div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight mb-4">
              FIND CLOTHES <br />
              THAT MATCHES <br />
              YOUR STYLE
            </h1>

            <p className="text-gray-400 mb-6 text-sm md:text-base">
              Browse through our diverse range of garments designed to bring
              out your individuality.
            </p>

            <div className="flex gap-3 flex-wrap">
              <Button className="flex items-center gap-2 bg-white text-black">
                <ShoppingCart className="w-4 h-4" />
                Shop Now
              </Button>

              <Button className="flex items-center gap-2 bg-white text-black">
                Explore
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* PRODUCT CARDS */}
      <div className="max-w-7xl mx-auto px-4 pb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        {/* CARD 1 */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-xl overflow-hidden relative h-[260px]"
        >
          <img
            src="https://plus.unsplash.com/premium_photo-1732563562540-6522555874e6?q=80&w=687&auto=format&fit=crop"
            className="w-full h-full object-cover"
          />

          <div className="absolute bottom-3 left-3 text-white font-bold text-xl">
            #TRENDING2026
          </div>
        </motion.div>

        {/* CARD 2 */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-xl overflow-hidden relative h-[260px]"
        >
          <img
            src="https://images.unsplash.com/photo-1734805077914-bbc92d9b56a8?q=80&w=736&auto=format&fit=crop"
            className="w-full h-full object-cover"
          />

          <div className="absolute bottom-3 left-3 text-white font-bold text-xl">
            #OLDISGOLD
          </div>
        </motion.div>

        {/* CARD 3 */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="rounded-xl overflow-hidden relative h-[260px]"
        >
          <img
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600"
            className="w-full h-full object-cover"
          />

          <div className="absolute bottom-3 left-3 text-white font-bold text-xl">
            #WOMENSTYLE
          </div>
        </motion.div>

        {/* CARD 4 */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="rounded-xl overflow-hidden relative h-[260px]"
        >
          <img
            src="https://images.unsplash.com/photo-1520975661595-6453be3f7070?w=600"
            className="w-full h-full object-cover"
          />

          <div className="absolute bottom-3 left-3 text-white font-bold text-xl">
            #STREETWEAR
          </div>
        </motion.div>

      </div>

      <ProductCollection />

    </div>
  );
};

export default HeroSection;