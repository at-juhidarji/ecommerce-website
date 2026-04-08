import React, { useState, useMemo, useEffect } from "react";
import { products } from "@/Data/Product";
import { ProductCard } from "@/components/product/ProductCard";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

import {
  ShoppingBag,
  Footprints,
  Baby,
  Glasses,
  User,
  UserRound,
  Sparkles,
} from "lucide-react";

/* ✅ CATEGORY ICONS */
const CATEGORY_ICON = {
  bags: <ShoppingBag size={16} />,
  sneakers: <Footprints size={16} />,
  baby: <Baby size={16} />,
  accessories: <Glasses size={16} />,
  men: <User size={16} />,
  women: <UserRound size={16} />,
};

/* ✅ CATEGORY BUTTON */
const CatBtn = ({ cat, active, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm border transition-all duration-300 cursor-pointer ${
      active
        ? "bg-black text-white border-black shadow-md scale-105"
        : "bg-white text-gray-600 border-gray-200 hover:border-black hover:text-black hover:scale-105"
    }`}
  >
    {CATEGORY_ICON[cat]}
    {cat}
  </button>
);

export const ProductCollection = () => {
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState("bags");
  const [sort, setSort] = useState("");
  const [minRating, setMinRating] = useState(0);
  const [maxPrice, setMaxPrice] = useState(5000);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 4;

  /* ✅ DATA SPLIT */
  const menProducts = products.filter((p) => p.category === "men");
  const womenProducts = products.filter((p) => p.category === "women");
  const otherProducts = products.filter(
    (p) => p.category !== "men" && p.category !== "women"
  );

  /* ✅ FILTER LOGIC */
  const categoryProducts = useMemo(() => {
    let filtered = otherProducts.filter(
      (p) => p.category === selectedCategory
    );

    if (search) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (minRating > 0) {
      filtered = filtered.filter((p) => p.rating >= minRating);
    }

    filtered = filtered.filter((p) => p.price <= maxPrice);

    if (sort === "low") filtered.sort((a, b) => a.price - b.price);
    if (sort === "high") filtered.sort((a, b) => b.price - a.price);

    return filtered;
  }, [selectedCategory, sort, minRating, maxPrice, search, otherProducts]);

  /* ✅ PAGINATION LOGIC */
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = categoryProducts.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  /* ✅ RESET PAGE WHEN FILTER CHANGES */
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, sort, minRating, maxPrice, search]);

  return (
    <section className="bg-gradient-to-b from-white to-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">

        {/* 🔥 TITLE */}
        <div className="text-center mb-14">
          <h1 className="text-5xl font-semibold flex items-center justify-center gap-2">
            <Sparkles className="w-6 h-6" />
            Our Collection
          </h1>
          <p className="text-gray-500 mt-2 text-sm">
            Premium fashion curated for modern lifestyle
          </p>
        </div>

        {/* 👔 MEN */}
        <div className="mb-16">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Men</h2>
            <span
              onClick={() => navigate("/collections?category=men")}
              className="text-sm text-gray-400 cursor-pointer hover:text-black"
            >
              View All →
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {menProducts.slice(0, 4).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>

        {/* 👗 WOMEN */}
        <div className="mb-16">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Women</h2>
            <span
              onClick={() => navigate("/collections?category=women")}
              className="text-sm text-gray-400 cursor-pointer hover:text-black"
            >
              View All →
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {womenProducts.slice(0, 4).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>

        {/* 🔥 CATEGORY */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">
            Explore Categories
          </h2>

          {/* CATEGORY BUTTONS */}
          <div className="flex flex-wrap gap-3 mb-6">
            {["bags", "sneakers", "baby", "accessories"].map((cat) => (
              <CatBtn
                key={cat}
                cat={cat}
                active={selectedCategory === cat}
                onClick={() => setSelectedCategory(cat)}
              />
            ))}
          </div>

          {/* 🔍 FILTER */}
          <div className="bg-white border rounded-2xl p-5 mb-8 shadow-sm">
            <div className="flex flex-wrap justify-between items-end gap-4">

              {/* LEFT */}
              <div className="flex flex-wrap gap-6 items-end">

                <input
                  type="text"
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="border px-3 py-2 rounded-lg text-sm w-44 md:w-56"
                />

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
                  <option value={0}>All</option>
                  <option value={3}>3★+</option>
                  <option value={4}>4★+</option>
                </select>

                <div className="flex flex-col">
                  <label className="text-xs text-gray-500 mb-1">
                    Max Price: ₹{maxPrice}
                  </label>

                  <input
                    type="range"
                    min="500"
                    max="5000"
                    step="100"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="cursor-pointer"
                  />
                </div>
              </div>

              {/* RIGHT RESET */}
              <Button
                variant="outline"
                onClick={() => {
                  setSearch("");
                  setSort("");
                  setMinRating(0);
                  setMaxPrice(5000);
                }}
              >
                Reset
              </Button>

            </div>
          </div>

          {/* 📊 COUNT */}
          <p className="text-sm text-gray-500 mb-4">
            Showing {paginatedProducts.length} of {categoryProducts.length} products
          </p>

          {/* 🛍 PRODUCTS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {paginatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

          {/* 🔢 PAGINATION */}
          <div className="flex justify-center mt-8 gap-2 flex-wrap">
            {Array.from(
              { length: Math.ceil(categoryProducts.length / ITEMS_PER_PAGE) },
              (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 rounded-md border text-sm ${
                    currentPage === i + 1
                      ? "bg-black text-white"
                      : "bg-white text-gray-600"
                  }`}
                >
                  {i + 1}
                </button>
              )
            )}
          </div>

          {/* ❌ EMPTY */}
          {categoryProducts.length === 0 && (
            <p className="text-center mt-10 text-gray-500">
              No products found 😕
            </p>
          )}

        </div>
      </div>
    </section>
  );
};