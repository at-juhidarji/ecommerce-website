import React, { useState, useMemo } from "react";
import { products } from "@/Data/Product";
import { ProductCard } from "@/components/product/ProductCard";

import {
  ShoppingBag,
  Footprints,
  Baby,
  Glasses,
  User,
  UserRound,
  Sparkles,
} from "lucide-react";

const CATEGORY_ICON = {
  bags: <ShoppingBag size={16} />,
  sneakers: <Footprints size={16} />,
  baby: <Baby size={16} />,
  accessories: <Glasses size={16} />,
  men: <User size={16} />,
  women: <UserRound size={16} />,
};

const SLIDE_COLORS = ["#f5f3ff", "#eef2ff", "#ecfeff", "#fef3c7"];

const SlideRail = ({ products }) => (
  <div className="flex gap-4 overflow-x-auto pb-3 scrollbar-hide">
    {products.map((p, i) => (
      <div
        key={p.id}
        style={{ background: SLIDE_COLORS[i % SLIDE_COLORS.length] }}
        className="min-w-[220px] h-52 rounded-2xl p-4 flex flex-col justify-between shadow-sm hover:shadow-md transition"
      >
        <span className="text-xs text-gray-400">0{i + 1}</span>
        <span className="text-sm font-medium text-gray-800">
          {p.name}
        </span>
      </div>
    ))}
  </div>
);

const CatBtn = ({ cat, active, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm border transition ${
      active
        ? "bg-black text-white border-black"
        : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
    }`}
  >
    {CATEGORY_ICON[cat]}
    {cat}
  </button>
);

export const ProductCollection = () => {
  const [selectedCategory, setSelectedCategory] = useState("bags");
  const [sort, setSort] = useState("");
  const [minRating, setMinRating] = useState(0);

  const ITEMS_PER_PAGE = 4;

  const menProducts = products.filter((p) => p.category === "men");
  const womenProducts = products.filter((p) => p.category === "women");
  const otherProducts = products.filter(
    (p) => p.category !== "men" && p.category !== "women"
  );

  const categoryProducts = useMemo(() => {
    let filtered = otherProducts.filter(
      (p) => p.category === selectedCategory
    );

    if (minRating > 0) {
      filtered = filtered.filter((p) => p.rating >= minRating);
    }

    const sorted = [...filtered];

    if (sort === "low") sorted.sort((a, b) => a.price - b.price);
    if (sort === "high") sorted.sort((a, b) => b.price - a.price);

    return sorted;
  }, [selectedCategory, sort, minRating, otherProducts]);

  return (
    <section className="bg-gradient-to-b from-white to-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Title */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-semibold flex items-center justify-center gap-2">
            <Sparkles className="w-6 h-6" />
            Our Collection
          </h1>
          <p className="text-gray-500 mt-2 text-sm">
            Premium fashion curated for modern lifestyle
          </p>
        </div>

        {/* MEN */}
        <h2 className="text-2xl font-semibold mb-6">Men</h2>
        <SlideRail products={menProducts} />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
          {menProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        {/* WOMEN */}
        <h2 className="text-2xl font-semibold mt-16 mb-6">Women</h2>
        <SlideRail products={womenProducts} />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
          {womenProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        {/* CATEGORY */}
        <h2 className="text-2xl font-semibold mt-16 mb-6">
          Explore
        </h2>
        <div className="flex flex-wrap gap-3 mb-10">
          {["bags", "sneakers", "baby", "accessories"].map((cat) => (
            <CatBtn
              key={cat}
              cat={cat}
              active={selectedCategory === cat}
              onClick={() => setSelectedCategory(cat)}
            />
          ))}
        </div>

        {/* FILTER */}
        <div className="flex gap-4 mb-10">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border px-3 py-2 rounded-lg text-sm"
          >
            <option value="">Sort</option>
            <option value="low">Low → High</option>
            <option value="high">High → Low</option>
          </select>

          <select
            value={minRating}
            onChange={(e) => setMinRating(Number(e.target.value))}
            className="border px-3 py-2 rounded-lg text-sm"
          >
            <option value={0}>All ratings</option>
            <option value={3}>3★+</option>
            <option value={4}>4★+</option>
          </select>
        </div>

        {/* PRODUCTS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categoryProducts.slice(0, ITEMS_PER_PAGE).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

      </div>
    </section>
  );
};