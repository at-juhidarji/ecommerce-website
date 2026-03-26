import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/Page/CartContext";

import { Star, Heart, ShoppingBag } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [wished, setWished] = useState(false);
  const [adding, setAdding] = useState(false);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    setAdding(true);

    addToCart(product, 1, product.sizes?.[0] || "M");

    setTimeout(() => setAdding(false), 800);
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    setWished((prev) => !prev);
  };

  return (
    <div
      className="group cursor-pointer"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <Card className="relative overflow-hidden rounded-2xl border border-gray-100 shadow-sm">

        <CardContent className="p-0 relative">

          {/* IMAGE */}
          <div className="aspect-[3/4]  bg-gray-50 overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 scale-110 group-hover:scale-105"
            />

            {/* DARK OVERLAY */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition" />

            {/* QUICK ADD */}
            <div className="absolute bottom-3 left-3 right-3 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
              <button
                onClick={handleAddToCart}
                disabled={adding}
                className="w-full bg-black text-white text-xs py-2.5 rounded-xl flex items-center justify-center gap-2"
              >
                {adding ? (
                  <>
                    <span className="animate-spin w-3 h-3 border-2 border-white border-t-transparent rounded-full"></span>
                    Adding...
                  </>
                ) : (
                  <>
                    <ShoppingBag size={14} />
                    Quick Add
                  </>
                )}
              </button>
            </div>

            {/* WISHLIST */}
            <button
              onClick={handleWishlist}
              className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition"
            >
              <Heart
                size={16}
                className={wished ? "text-red-500 fill-red-500" : "text-gray-600"}
              />
            </button>

            {/* DISCOUNT */}
            {product.discount && (
              <span className="absolute top-3 left-3 text-xs bg-white px-2 py-1 rounded-full shadow">
                -{product.discount}
              </span>
            )}
          </div>
        </CardContent>
      </Card>

      {/* INFO */}
      <div className="mt-3 space-y-1">
        <h3 className="text-sm font-medium text-gray-900 line-clamp-1">
          {product.name}
        </h3>

        {/* RATING */}
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={12}
              className={
                star <= Math.round(product.rating)
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
              }
            />
          ))}
          <span className="text-xs text-gray-400 ml-1">
            ({product.rating})
          </span>
        </div>

        {/* PRICE */}
        <div className="flex items-center gap-2">
          <span className="font-bold text-gray-900">
            ₹{product.price}
          </span>

          {product.oldPrice && (
            <span className="text-xs text-gray-400 line-through">
              ₹{product.oldPrice}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};