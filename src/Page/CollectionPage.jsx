import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { products } from "@/Data/Product";
import { collectionsData } from "@/Data/CollectionData";
import { CollectionLayout } from "@/components/product/CollectionLayout";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

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
    <div className="min-h-screen bg-white">
      {/* 🔥 Category Buttons */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-wrap gap-2.5 justify-center py-8"
        >
          {Object.keys(collectionsData).map((key) => (
            <Button
              variant="ghost"
              key={key}
              onClick={() => setActive(key)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                active === key
                  ? "bg-zinc-900 text-white shadow-lg shadow-zinc-900/20 hover:bg-zinc-800 hover:text-white"
                  : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
              }`}
            >
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </Button>
          ))}
        </motion.div>
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
