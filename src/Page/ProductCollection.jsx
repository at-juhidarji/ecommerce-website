import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { products } from "@/Data/Product";
import { ProductCard } from "@/components/ui/ProductCard";
import HeroSlider from "@/components/ui/HeroSlider";
import { Truck, RefreshCcw, ShieldCheck, Star, ArrowLeft } from "lucide-react";
// images
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

  const itemsPerPage = 4;

  const menProducts = products.filter((p) => p.category === "men");
  const womenProducts = products.filter((p) => p.category === "women");

  const otherProducts = products.filter(
    (p) => p.category !== "men" && p.category !== "women",
  );

  const categoryProducts = otherProducts.filter(
    (p) => p.category === selectedCategory,
  );

  const totalPages = Math.ceil(categoryProducts.length / itemsPerPage);

  const paginatedProducts = categoryProducts.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage,
  );

  return (
   <section
  id="collection"
  role="region"
  aria-labelledby="collection-heading"
  className="bg-white py-14 px-4 text-gray-900"
>
  <div className="max-w-7xl mx-auto">

    {/* 🔙 BACK */}
    <button
      aria-label="Back to shop"
      onClick={() => navigate("/")}
      className="flex items-center gap-2 text-gray-600 hover:text-orange-600 mb-6 focus:outline-none focus:ring-2 focus:ring-orange-500 rounded"
    >
      <ArrowLeft className="w-4 h-4" aria-hidden="true" />
      Back to Shop
    </button>

    {/*  MAIN TITLE */}
    <div className="text-center mb-16">
      <h1
        id="collection-heading"
        className="text-5xl font-extrabold tracking-tight"
      >
        OUR COLLECTION
      </h1>
      <p className="text-gray-600 mt-2">Premium Fashion</p>
    </div>

    {/* ================= MEN ================= */}
    <h2 className="text-3xl font-bold mb-6">MEN COLLECTION</h2>

    <HeroSlider images={menImages} />

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
      {menProducts.map((product) => (
        <div key={product.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-2">
          <ProductCard product={product} />
        </div>
      ))}
    </div>

    {/* ================= WOMEN ================= */}
    <h2 className="text-3xl font-bold mt-16 mb-6">WOMEN COLLECTION</h2>

    <HeroSlider images={womenImages} />

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
      {womenProducts.map((product) => (
        <div key={product.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-2">
          <ProductCard product={product} />
        </div>
      ))}
    </div>

    {/* ================= CATEGORY CARDS ================= */}
    <div className="mt-20">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Explore More Categories
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {["bags","sneakers","baby","accessories","sale","more","oversized"].map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              setPage(1);
            }}
            aria-pressed={selectedCategory === cat}
            className={`p-6 rounded-xl text-center transition border focus:outline-none focus:ring-2 focus:ring-orange-500 ${
              selectedCategory === cat
                ? "bg-orange-500 text-white border-orange-500"
                : "bg-gray-100 hover:bg-orange-100 border-gray-200"
            }`}
          >
            <span className="font-semibold capitalize">{cat}</span>
          </button>
        ))}
      </div>
    </div>

    {/* ================= SELECTED CATEGORY ================= */}
    <div className="mt-16">
      <h3 className="text-2xl font-bold mb-6 capitalize">
        {selectedCategory} Collection
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {paginatedProducts.map((product) => (
          <div key={product.id} className="relative bg-white rounded-xl shadow-sm hover:shadow-md transition p-2">
            
            {/* Badge */}
            {product.tag && (
              <span className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-1 rounded">
                {product.tag}
              </span>
            )}

            <ProductCard product={product} />

            {/* Stock */}
            {product.stock < 10 && (
              <p className="text-red-600 text-xs mt-1">
                Only {product.stock} left!
              </p>
            )}
          </div>
        ))}
      </div>

      {/* 🔄 PAGINATION */}
      <nav
        className="flex justify-center gap-3 mt-10"
        aria-label="Pagination"
      >
        <button
          aria-label="Previous page"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-4 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100 disabled:opacity-50 focus:ring-2 focus:ring-orange-500"
        >
          Prev
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            aria-current={page === i + 1 ? "page" : undefined}
            onClick={() => setPage(i + 1)}
            className={`px-4 py-2 rounded-full focus:ring-2 focus:ring-orange-500 ${
              page === i + 1
                ? "bg-orange-500 text-white"
                : "border border-gray-300 text-gray-700 hover:bg-gray-100"
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          aria-label="Next page"
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100 disabled:opacity-50 focus:ring-2 focus:ring-orange-500"
        >
          Next
        </button>
      </nav>
    </div>

    {/* ================= TRUST SECTION ================= */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 text-center text-sm text-gray-700">
      <div className="flex flex-col items-center gap-2">
        <Truck className="w-6 h-6" aria-hidden="true" />
        <span>Free Delivery</span>
      </div>

      <div className="flex flex-col items-center gap-2">
        <RefreshCcw className="w-6 h-6" aria-hidden="true" />
        <span>Easy Returns</span>
      </div>

      <div className="flex flex-col items-center gap-2">
        <ShieldCheck className="w-6 h-6" aria-hidden="true" />
        <span>Secure Payment</span>
      </div>

      <div className="flex flex-col items-center gap-2">
        <Star className="w-6 h-6" aria-hidden="true" />
        <span>Premium Quality</span>
      </div>
    </div>

  </div>
</section>
  );
};
