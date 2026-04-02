import { products } from "../../Data/Product";
import { CollectionLayout } from "@/components/product/CollectionLayout";
import img1 from "@/assets/Image-1.jpg";
import img2 from "@/assets/Image-2.jpg";
import img3 from "@/assets/Image-3.jpg";
import img4 from "@/assets/Image-4.jpg";

const WomenImages = [img1, img2, img3, img4];

export const WomenCollection = () => {
  const WomenProducts = products.filter((p) => p.category === "women");

  return (
    <CollectionLayout
      title="Women Collection"
      subtitle="Streetwear • Oversized • Minimal"
      images={WomenImages}
      products={WomenProducts}
      glowColor="bg-orange-400"
    />
  );
};
