import { products } from "../../Data/Product";
import { CollectionLayout } from "@/components/ui/CollectionLayout";
import img1 from "@/assets/Image-1.jpg";
import img2 from "@/assets/Image-2.jpg";
import img3 from "@/assets/Image-3.jpg";
import img4 from "@/assets/Image-4.jpg";

const MoreImages = [img1, img2, img3, img4];

export const MoreCollection = () => {
  const MoreProducts = products.filter(
    (p) => p.category === "more"
  );

  return (
    <CollectionLayout
      title="More Collection"
      subtitle="Streetwear • Oversized • Minimal"
      images={MoreImages}
      products={MoreProducts}
      glowColor="bg-orange-400"
    />
  );
};