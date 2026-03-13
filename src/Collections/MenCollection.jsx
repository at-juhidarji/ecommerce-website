import { products } from "../components/ui/Product";
import { ProductCard } from "@/components/ui/ProductCard";
import  HeroSlider  from "../components/ui/HeroSlider";

const menImages = [
  "https://images.unsplash.com/photo-1516826957135-700dedea698c?w=1600",
  "https://images.unsplash.com/photo-1520975661595-6453be3f7070?w=1600",
  "https://images.unsplash.com/photo-1523381294911-8d3cead13475?w=1600",
  "https://images.unsplash.com/photo-1544441893-675973e31985?w=1600",
];

export const MenCollection = () => {
  const menProducts = products.filter((product) => product.category === "men");

  return (
    <section className="bg-black py-10 px-4">
      <h2 className="text-4xl md:text-5xl font-[1000] tracking-tighter uppercase text-center text-white mb-10 ">
        Men collection
      </h2>
      <HeroSlider
        images={menImages}
        title="Men's Street Collection"
        subtitle="Discover oversized & streetwear fits"
      />
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {menProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};
