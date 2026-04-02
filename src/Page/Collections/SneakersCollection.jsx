import { products } from "../../Data/Product";
import { CollectionLayout } from "@/components/product/CollectionLayout";
import img1 from "@/assets/Image-1.jpg";
import img2 from "@/assets/Image-2.jpg";
import img3 from "@/assets/Image-3.jpg";
import img4 from "@/assets/Image-4.jpg";

const SneakersImages = [img1, img2, img3, img4];

export const SneakersCollection = () => {
  const SneakersProducts = products.filter((p) => p.category === "sale");

  return (
    <CollectionLayout
      title="Sneakers Collection"
      subtitle="Streetwear • Oversized • Minimal"
      images={SneakersImages}
      products={SneakersProducts}
      glowColor="bg-orange-400"
    />
  );
};
