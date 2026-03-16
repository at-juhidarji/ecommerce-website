import { products } from "../components/ui/Product";
import { ProductCard } from "@/components/ui/ProductCard";
import HeroSlider from "../components/ui/HeroSlider";

const AccessoriesImages = [
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1600",
  "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=1600",
  "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=1600",
  "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1600",
];

export const AccessoriesCollection = () => {
  const AccessoriesProducts = products.filter(
    (product) => product.category === "accessories",
  );

  return (
    <section className="bg-black py-10 px-4">
      <h2 className="text-4xl md:text-5xl font-[1000] tracking-tighter uppercase text-center text-white mb-10 ">
        Accessories collection
      </h2>
      <HeroSlider
        images={AccessoriesImages}
        title="Accessories Collection"
        subtitle="Complete your look with premium accessories"
      />
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {AccessoriesProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};
