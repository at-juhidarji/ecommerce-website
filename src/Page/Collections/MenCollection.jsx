import { products } from "../../Data/Product";
import { ProductCard } from "@/components/ui/ProductCard";
import HeroSlider from "../../components/ui/HeroSlider";

import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import img1 from "@/assets/Image-1.jpg";
import img2 from "@/assets/Image-2.jpg";
import img3 from "@/assets/Image-3.jpg";
import img4 from "@/assets/Image-4.jpg";

const menImages = [img1, img2, img3, img4];

export const MenCollection = () => {
  const navigate = useNavigate(); // ✅ FIX

  const menProducts = products.filter((product) => product.category === "men");

  return (
    <section className="bg-black py-14 px-4">
      <div className="max-w-7xl mx-auto">
        {/* 🔙 Back Button */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-zinc-500 hover:text-orange-400 transition-all mb-4 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-bold uppercase tracking-widest">
            Back to Shop
          </span>
        </button>
      </div>
      {/* 🔥 Heading */}
      <div className="text-center mb-12">
        <h2 className="text-5xl md:text-6xl font-black tracking-tight text-white">
          MEN COLLECTION
        </h2>
        <p className="text-gray-400 mt-2 text-sm tracking-widest uppercase">
          Streetwear • Oversized • Minimal
        </p>

        <div className="w-24 h-1 bg-orange-400 mx-auto mt-4 rounded-full" />
      </div>

      {/* 🔥 Slider */}
      <div className="relative mb-14">
        <div className="absolute inset-0 blur-3xl opacity-50 bg-orange-500 rounded-3xl"></div>

        <HeroSlider
          images={menImages}
          title="Men's Street Collection"
          subtitle="Discover oversized & streetwear fits"
        />
      </div>

      {/* 🔥 Products */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {menProducts.map((product) => (
          <div
            key={product.id}
            className="transform transition duration-300 hover:-translate-y-2 hover:scale-[1.02]"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
};
