import { products } from "../components/ui/Product";
import { ProductCard } from "@/components/ui/ProductCard";
import HeroSlider from "../components/ui/HeroSlider";

const SneakersImages = [
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1600",
  "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=1600",
  "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=1600",
  "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=1600",
];

export const SneakersCollection = () => {
  const SneakersProducts = products.filter(
    (product) => product.category === "sneakers",
  );

  return (
    <section className="bg-black py-10 px-4">
      <h2 className="text-4xl md:text-5xl font-[1000] tracking-tighter uppercase text-center text-white mb-10 ">
        Sneakers collection
      </h2>
      <HeroSlider
        images={SneakersImages}
        title="Sneakers Collection"
        subtitle="Step into comfort & street style"
      />
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {SneakersProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};
