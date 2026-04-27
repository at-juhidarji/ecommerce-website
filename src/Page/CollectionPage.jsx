import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { products } from "@/Data/Product";
import { collectionsData } from "@/Data/CollectionData";
import { CollectionLayout } from "@/components/product/CollectionLayout";
import { Button } from "@/components/ui/button";

export const CollectionsPage = () => {
  const [searchParams] = useSearchParams();
  const categoryFromURL = searchParams.get("category") || "men";

  const [active, setActive] = useState(categoryFromURL);

  // update when URL changes
  useEffect(() => {
    setActive(categoryFromURL);
  }, [categoryFromURL]);

  const current = collectionsData[active];

  const filteredProducts = products.filter((p) => p.category === active);

  return (
    <div className="min-h-screen bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
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
    </div>
  );
};
