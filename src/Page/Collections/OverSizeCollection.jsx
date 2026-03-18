import { products } from "../../components/ui/Product";
import { ProductCard } from "@/components/ui/ProductCard";
import HeroSlider from "../../components/ui/HeroSlider";

import img1 from "@/assets/Image-1.jpg";
import img2 from "@/assets/Image-2.jpg";
import img3 from "@/assets/Image-3.jpg";
import img4 from "@/assets/Image-4.jpg";

const OverSizeImages = [img1, img2, img3, img4];

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
