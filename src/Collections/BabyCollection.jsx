import { products } from "../components/ui/Product";
import { ProductCard } from "@/components/ui/ProductCard";
import HeroSlider from "../components/ui/HeroSlider";

const BabyImages = [
  "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1544126592-807ade215a0b?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1604917877934-07d8d248d396?auto=format&fit=crop&w=1600&q=80",
];

export const BabyCollection = () => {
  const BabyProducts = products.filter(
    (product) => product.category === "baby",
  );

  return (
    <section className="bg-black py-10 px-4">
      <h2 className="text-4xl md:text-5xl font-[1000] tracking-tighter uppercase text-center text-white mb-10 ">
        Baby collection
      </h2>
      <HeroSlider
        images={BabyImages}
        title="Baby Collection"
        subtitle="Soft, cute & comfy essentials for little ones"
      />
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {BabyProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};
