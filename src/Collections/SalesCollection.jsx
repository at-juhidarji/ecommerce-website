import { products } from "../components/ui/Product";
import { ProductCard } from "@/components/ui/ProductCard";
import HeroSlider from "../components/ui/HeroSlider";

const SalesImages = [
  "https://images.unsplash.com/photo-1520975916090-3105956dac38?w=1600",
  "https://images.unsplash.com/photo-1542060748-10c28b62716f?w=1600",
  "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=1600",
  "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=1600",
];

export const SalesCollection = () => {
  const SalesProducts = products.filter(
    (product) => product.category === "sale",
  );

  return (
    <section className="bg-black py-10 px-4">
      <h2 className="text-4xl md:text-5xl font-[1000] tracking-tighter uppercase text-center text-white mb-10 ">
        Sales collection
      </h2>
      <HeroSlider
        images={SalesImages}
        title="Sale Collection"
        subtitle="Limited-time deals on streetwear"
      />
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {SalesProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};
