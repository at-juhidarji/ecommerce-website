import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { ProductCard } from "@/components/product/ProductCard";
import HeroSlider from "@/components/ui/HeroSlider";
import { Button } from "../ui/button";
import { motion } from "framer-motion";

export const CollectionLayout = ({
  title,
  subtitle,
  images,
  products,
  glowColor = "bg-orange-400",
}) => {
  const navigate = useNavigate();

  return (
    <section
      className="bg-white py-6 px-4 sm:px-6 text-zinc-900"
      role="region"
      aria-labelledby={`${title}-heading`}
    >
    

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-14"
      >
        <h1 id={`${title}-heading`} className="text-4xl md:text-5xl font-black uppercase tracking-tight">
          {title}
        </h1>
        <p className="text-zinc-400 mt-3 uppercase tracking-[0.2em] text-xs font-medium">
          {subtitle}
        </p>
        <div className="w-16 h-1 bg-zinc-900 mx-auto mt-5 rounded-full" />
      </motion.div>

      {/* Slider */}
      <div className="relative mb-16">
        <div
          className={`absolute inset-0 blur-3xl opacity-10 ${glowColor} rounded-3xl`}
        />

        <HeroSlider images={images} />
      </div>

      {/* Products */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8 pb-12">
        {products.map((product) => (
          <div key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
};
