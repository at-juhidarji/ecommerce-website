import { products } from "../../components/ui/Product";
import { ProductCard } from "@/components/ui/ProductCard";
import HeroSlider from "../../components/ui/HeroSlider";

import img1 from "@/assets/Image-1.jpg";
import img2 from "@/assets/Image-2.jpg";
import img3 from "@/assets/Image-3.jpg";
import img4 from "@/assets/Image-4.jpg";

const womenImages = [img1, img2, img3, img4];

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
