import { products } from "../components/ui/Product";
import { ProductCard } from "@/components/ui/ProductCard";
import HeroSlider from "../components/ui/HeroSlider";

const OverSizeImages = [
  "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=1600",
  "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1600",
  "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=1600",
  "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=1600",
];

export const OverSizeCollection = () => {
  const OversizeProducts = products.filter(
    (product) => product.category === "oversized",
  );

  return (
    <section className="bg-black py-10 px-4">
      <h2 className="text-4xl md:text-5xl font-[1000] tracking-tighter uppercase text-center text-white mb-10 ">
        Over-Size collection
      </h2>
      <HeroSlider
        images={OverSizeImages}
        title="Oversized Streetwear"
        subtitle="Bold fits made for comfort and style"
      />
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {OversizeProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};
