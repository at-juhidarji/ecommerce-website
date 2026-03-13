import { products } from "../components/ui/Product";
import { ProductCard } from "@/components/ui/ProductCard";
import  HeroSlider from "../components/ui/HeroSlider";

const womenImages = [
  "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600",
  "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=1600",
  "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1600",
  "https://images.unsplash.com/photo-1519741497674-611481863552?w=1600",
  "https://images.unsplash.com/photo-1520975922284-5c9c8c8b1b63?w=1600"
]
export const WomenCollection = () => {
  const womenProducts = products.filter(
    (product) => product.category === "women",
  );

  return (
    <section className="bg-black py-10 px-4">
      <h2 className="text-4xl md:text-5xl font-[1000] tracking-tighter uppercase text-center text-white mb-10 ">
        women collection
      </h2>

      <HeroSlider
        images={womenImages}
        title="Women's Fashion Collection"
        subtitle="Explore modern fashion & elegant styles"
      />
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {womenProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};
