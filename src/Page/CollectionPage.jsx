import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { products } from "@/Data/Product";
import { collectionsData } from "@/Data/CollectionData";
import { CollectionLayout } from "@/components/product/CollectionLayout";

export const CollectionsPage = () => {
  const [searchParams] = useSearchParams();
  const categoryFromURL = searchParams.get("category") || "men";

  const [active, setActive] = useState(categoryFromURL);

  // update when URL changes
  useEffect(() => {
    setActive(categoryFromURL);
  }, [categoryFromURL]);

  const current = collectionsData[active];

  const filteredProducts = products.filter(
    (p) => p.category === active
  );

  return (
    <div>
      {/* 🔥 Category Buttons */}
      <div className="flex flex-wrap gap-3 justify-center py-6">
        {Object.keys(collectionsData).map((key) => (
          <button
            key={key}
            onClick={() => setActive(key)}
            className={`px-4 py-2 rounded-full ${
              active === key
                ? "bg-black text-white"
                : "bg-gray-200"
            }`}
          >
            {key.toUpperCase()}
          </button>
        ))}
      </div>

      {/* 🔥 Layout */}
      <CollectionLayout
        title={current.title}
        subtitle={current.subtitle}
        images={current.images}
        products={filteredProducts}
        glowColor={current.glowColor}
        showBackButton={false}
      />
    </div>
  );
};