import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { products } from "@/Data/Product";
import { ProductCard } from "@/components/ui/ProductCard";
import HeroSlider from "@/components/ui/HeroSlider";

import { ArrowLeft } from "lucide-react";

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

  // ✅ FILTERS
  const menProducts = products.filter(p => p.category === "men");
  const womenProducts = products.filter(p => p.category === "women");

  const otherProducts = products.filter(
    p => p.category !== "men" && p.category !== "women"
  );

  const categoryProducts = otherProducts.filter(
    p => p.category === selectedCategory
  );

  const totalPages = Math.ceil(categoryProducts.length / itemsPerPage);

  const paginatedProducts = categoryProducts.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <section id="collection" className="bg-black py-14 px-4 text-white">

      <div className="max-w-7xl mx-auto">

        {/* 🔙 BACK */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-zinc-500 hover:text-orange-400 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Shop
        </button>

        {/* 🔥 MAIN TITLE */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-black">OUR COLLECTION</h1>
          <p className="text-gray-400 mt-2">Premium Fashion</p>
        </div>

        {/* ================= MEN ================= */}
        <h2 className="text-3xl font-bold mb-6">MEN COLLECTION</h2>

        <HeroSlider images={menImages} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
          {menProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* ================= WOMEN ================= */}
        <h2 className="text-3xl font-bold mt-16 mb-6">WOMEN COLLECTION</h2>

        <HeroSlider images={womenImages} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
          {womenProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* ================= CATEGORY CARDS ================= */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Explore More Categories
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {["bags", "sneakers", "baby", "accessories"].map((cat) => (
              <div
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setPage(1);
                }}
                className={`p-6 rounded-xl text-center cursor-pointer transition ${
                  selectedCategory === cat
                    ? "bg-orange-500"
                    : "bg-zinc-900 hover:bg-orange-500"
                }`}
              >
                <p className="font-semibold capitalize">{cat}</p>
              </div>
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
              <div key={product.id} className="relative group">

                {/* Badge */}
                {product.tag && (
                  <span className="absolute top-2 left-2 bg-orange-500 text-xs px-2 py-1 rounded">
                    {product.tag}
                  </span>
                )}

                <ProductCard product={product} />

                {/* Stock */}
                {product.stock < 10 && (
                  <p className="text-red-400 text-xs mt-1">
                    Only {product.stock} left!
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* 🔄 PAGINATION */}
          <div className="flex justify-center gap-3 mt-10">

            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="px-4 py-2 rounded-full border border-zinc-700"
            >
              Prev
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`px-4 py-2 rounded-full ${
                  page === i + 1
                    ? "bg-orange-500"
                    : "border border-zinc-700"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className="px-4 py-2 rounded-full border border-zinc-700"
            >
              Next
            </button>

          </div>
        </div>

        {/* ================= TRUST SECTION ================= */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 text-center text-sm text-gray-300">

          <div>🚚 Free Delivery</div>
          <div>🔄 Easy Returns</div>
          <div>🔒 Secure Payment</div>
          <div>⭐ Premium Quality</div>

        </div>

      </div>
    </section>
  );
};