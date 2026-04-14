import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { ProductCard } from "@/components/product/ProductCard";
import HeroSlider from "@/components/ui/HeroSlider";
import { Button } from "../ui/button";

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
      className="bg-white py-4 px-4 text-gray-900"
      role="region"
      aria-labelledby={`${title}-heading`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Back */}
        <Button
          variant="default"
          onClick={() => navigate("/")}
          aria-label="Go back to shop"
          className="flex items-center gap-2 text-gray-600 hover:text-orange-600 mb-4 rounded"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          Back to Shop
        </Button  >
      </div>

      {/* Heading */}
      <div className="text-center mb-12">
        <h1 id={`${title}-heading`} className="text-5xl font-black uppercase">
          {title}
        </h1>
        <p className="text-gray-600 mt-2 uppercase tracking-widest text-sm">
          {subtitle}
        </p>
        <div className="w-24 h-1 bg-orange-500 mx-auto mt-4 rounded-full" />
      </div>

      {/* Slider */}
      <div className="relative mb-14">
        <div
          className={`absolute inset-0 blur-3xl opacity-20 ${glowColor} rounded-3xl`}
        />

        <HeroSlider images={images} />
      </div>

      {/* Products */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {products.map((product) => (
          <div
            key={product.id}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
};
