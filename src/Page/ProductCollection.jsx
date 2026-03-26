import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { products } from "@/Data/Product";
import { ProductCard } from "@/components/ui/ProductCard";
import HeroSlider from "@/components/ui/HeroSlider";

import {
  Truck,
  RefreshCcw,
  ShieldCheck,
  Star,
  ArrowLeft,
} from "lucide-react";

import img1 from "@/assets/Image-1.jpg";
import img2 from "@/assets/Image-2.jpg";
import img3 from "@/assets/Image-3.jpg";
import img4 from "@/assets/Image-4.jpg";

const menImages = [img1, img2, img3, img4];
const womenImages = [img4, img3, img2, img1];

export const ProductCollection = () => {
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState("bags");
  const [page, setPage] = useState(1);

  // 🔥 FILTER STATES
  const [sort, setSort] = useState("");
  const [minRating, setMinRating] = useState(0);
  const [inStockOnly, setInStockOnly] = useState(false);

  const itemsPerPage = 4;

  const menProducts = products.filter((p) => p.category === "men");
  const womenProducts = products.filter((p) => p.category === "women");

  const otherProducts = products.filter(
    (p) => p.category !== "men" && p.category !== "women"
  );

  // 🔥 APPLY FILTERS
  let categoryProducts = otherProducts.filter(
    (p) => p.category === selectedCategory
  );

  if (minRating > 0) {
    categoryProducts = categoryProducts.filter(
      (p) => p.rating >= minRating
    );
  }

  if (inStockOnly) {
    categoryProducts = categoryProducts.filter((p) => p.stock > 0);
  }

  // 🔥 SORTING
  if (sort === "low") {
    categoryProducts.sort((a, b) => a.price - b.price);
  } else if (sort === "high") {
    categoryProducts.sort((a, b) => b.price - a.price);
  }

  const totalPages = Math.ceil(categoryProducts.length / itemsPerPage);

  const paginatedProducts = categoryProducts.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <section className="bg-white py-16 px-4 text-gray-900">
      <div className="max-w-7xl mx-auto">

        {/* BACK */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-gray-600 hover:text-orange-600 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Shop
        </button>

        {/* TITLE */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold">OUR COLLECTION</h1>
        </div>

        {/* MEN */}
        <h2 className="text-2xl font-bold mb-6">MEN COLLECTION</h2>
        <HeroSlider images={menImages} />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
          {menProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        {/* WOMEN */}
        <h2 className="text-2xl font-bold mt-16 mb-6">WOMEN COLLECTION</h2>
        <HeroSlider images={womenImages} />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
          {womenProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        {/* CATEGORY */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Explore Categories
          </h2>

          <div className="flex flex-wrap justify-center gap-3">
            {["bags", "sneakers", "baby", "accessories"].map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setPage(1);
                }}
                className={`px-5 py-2 rounded-full ${
                  selectedCategory === cat
                    ? "bg-black text-white"
                    : "bg-gray-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 🔥 FILTER BAR */}
        <div className="mt-10 flex flex-wrap gap-4 justify-between items-center bg-gray-50 p-4 rounded-xl">
          
          {/* SORT */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border px-3 py-2 rounded"
          >
            <option value="">Sort</option>
            <option value="low">Price: Low → High</option>
            <option value="high">Price: High → Low</option>
          </select>

          {/* RATING */}
          <select
            value={minRating}
            onChange={(e) => setMinRating(Number(e.target.value))}
            className="border px-3 py-2 rounded"
          >
            <option value={0}>All Ratings</option>
            <option value={3}>3★ & above</option>
            <option value={4}>4★ & above</option>
          </select>

          {/* STOCK */}
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
            />
            In Stock Only
          </label>
        </div>

        {/* PRODUCTS */}
        <div className="mt-10">
          <h3 className="text-xl font-bold mb-6 capitalize">
            {selectedCategory} Collection
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {paginatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* PAGINATION */}
          <div className="flex justify-center gap-2 mt-10">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="px-4 py-2 border rounded"
            >
              Prev
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`px-4 py-2 rounded ${
                  page === i + 1 ? "bg-black text-white" : "border"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className="px-4 py-2 border rounded"
            >
              Next
            </button>
          </div>
        </div>

        {/* TRUST */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 text-center text-sm">
          <div className="flex flex-col items-center gap-2">
            <Truck className="w-6 h-6" />
            Free Delivery
          </div>
          <div className="flex flex-col items-center gap-2">
            <RefreshCcw className="w-6 h-6" />
            Easy Returns
          </div>
          <div className="flex flex-col items-center gap-2">
            <ShieldCheck className="w-6 h-6" />
            Secure Payment
          </div>
          <div className="flex flex-col items-center gap-2">
            <Star className="w-6 h-6" />
            Premium Quality
          </div>
        </div>
      </div>
    </section>
  );
};