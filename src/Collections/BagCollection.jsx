import { products } from "../components/ui/Product";
import { ProductCard } from "@/components/ui/ProductCard";
import HeroSlider from "../components/ui/HeroSlider";

const BagsImages = [
  "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=1600",
  "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=1600",
  "https://images.unsplash.com/photo-1581605405669-fcdf81165afa?w=1600",
  "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=1600",
];

export const BagCollection = () => {
  const BagProducts = products.filter((product) => product.category === "bags");

  return (
    <section className="bg-black py-10 px-4">
      <h2 className="text-4xl md:text-5xl font-[1000] tracking-tighter uppercase text-center text-white mb-10 ">
        Bags collection
      </h2>
      <HeroSlider
        images={BagsImages}
        title="Bags Collection"
        subtitle="Carry style everywhere you go"
      />
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {BagProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};
