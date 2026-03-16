import { products } from "../components/ui/Product";
import { ProductCard } from "@/components/ui/ProductCard";
import HeroSlider from "../components/ui/HeroSlider";

const MoreImages = [
  "https://images.unsplash.com/photo-1516826957135-700dedea698c?w=1600",
  "https://images.unsplash.com/photo-1520975661595-6453be3f7070?w=1600",
  "https://images.unsplash.com/photo-1523381294911-8d3cead13475?w=1600",
  "https://images.unsplash.com/photo-1544441893-675973e31985?w=1600",
];

export const MoreCollection = () => {
  const MoreProducts = products.filter(
    (product) => product.category === "more",
  );

  return (
    <section className="bg-black py-10 px-4">
      <h2 className="text-4xl md:text-5xl font-[1000] tracking-tighter uppercase text-center text-white mb-10 ">
        More collection
      </h2>
      <HeroSlider
        images={MoreImages}
        title="More Essentials"
        subtitle="Discover belts, hats, scarves & everyday accessories"
      />
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {MoreProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};
