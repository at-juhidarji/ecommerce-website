import { products } from "../../Data/Product";
import { ProductCard } from "@/components/ui/ProductCard";
import HeroSlider from "../../components/ui/HeroSlider";

import img1 from "@/assets/Image-1.jpg";
import img2 from "@/assets/Image-2.jpg";
import img3 from "@/assets/Image-3.jpg";
import img4 from "@/assets/Image-4.jpg";

const SalesImages = [img1, img2, img3, img4];

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
