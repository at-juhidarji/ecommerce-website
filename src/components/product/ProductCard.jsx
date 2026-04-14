import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { Star, Heart, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export const ProductCard = ({ product, listMode = false }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [adding, setAdding] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const fullStars = Math.round(product.rating || 0);

  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : null;

  // ✅ ADD TO CART
  const handleAddToCart = (e) => {
    e.stopPropagation();
    setAdding(true);

    addToCart(product, 1, product.sizes?.[0] || "M");

    toast.success("Added to Cart", {
      description: product.name,
    });

    setTimeout(() => setAdding(false), 700);
  };

  // ✅ WISHLIST FIXED
  const handleWishlist = (e) => {
    e.stopPropagation();

    const alreadyInWishlist = isInWishlist(product.id);
    toggleWishlist(product);

    toast(alreadyInWishlist ? "Removed from Wishlist" : "Saved to Wishlist", {
      description: product.name,
    });
  };

  // ⭐ STAR RATING
  const StarRating = () => (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={12}
          className={
            s <= fullStars ? "text-amber-400 fill-amber-400" : "text-gray-200"
          }
        />
      ))}
      <span className="text-xs text-gray-400 ml-1">
        ({product.rating || 0})
      </span>
    </div>
  );

  // ================= LIST MODE =================
  if (listMode) {
    return (
      <div
        onClick={() => navigate(`/product/${product.id}`)}
        className="group cursor-pointer flex gap-4 bg-white border rounded-2xl p-3 hover:shadow-md transition"
      >
        <div className="w-24 h-24 rounded-xl overflow-hidden bg-gray-100">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition"
          />
        </div>

        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-semibold line-clamp-1">
              {product.name}
            </h3>
            <StarRating />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex gap-2 items-center">
              <span className="font-bold">₹{product.price}</span>

              {product.oldPrice && (
                <span className="text-xs line-through text-gray-400">
                  ₹{product.oldPrice}
                </span>
              )}

              {discount && (
                <span className="text-xs text-green-600 font-semibold">
                  {discount}% off
                </span>
              )}
            </div>

            <Button
              variant="default"
              onClick={handleAddToCart}
              className="text-xs bg-black text-white px-3 py-1.5 rounded-lg flex items-center gap-1"
            >
              <ShoppingBag size={12} />
              {adding ? "Adding…" : "Add"}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // ================= GRID MODE =================
  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className="group cursor-pointer"
    >
      {/* IMAGE */}
      <div className="relative rounded-2xl overflow-hidden bg-gray-100 aspect-[3/4]">
        {!imgLoaded && (
          <div className="absolute inset-0 animate-pulse bg-gray-200" />
        )}

        <img
          src={product.image}
          alt={product.name}
          onLoad={() => setImgLoaded(true)}
          className={`w-full h-full object-cover transition duration-500 group-hover:scale-105 ${
            imgLoaded ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* BADGES */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {discount && (
            <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-full">
              -{discount}%
            </span>
          )}
          {product.isNew && (
            <span className="text-xs bg-white px-2 py-1 rounded-full">New</span>
          )}
        </div>

        {/* ❤️ WISHLIST */}
        <Button
          variant="default"
          onClick={handleWishlist}
          className="absolute top-2 right-2"
        >
          <Heart
            className={`w-5 h-5 transition ${
              isInWishlist(product.id)
                ? "fill-red-500 text-red-500 scale-110"
                : "text-white"
            }`}
          />
        </Button>

        {/* QUICK ADD */}
        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition">
          <Button
            variant="default"
            onClick={handleAddToCart}
            className="w-full bg-white text-black text-sm py-2 rounded-xl flex justify-center gap-2"
          >
            <ShoppingBag size={14} />
            {adding ? "Adding…" : "Quick Add"}
          </Button>
        </div>

        {/* SIZES */}
        {product.sizes?.length > 0 && (
          <div className="absolute bottom-12 left-3 right-3 flex justify-center gap-1 opacity-0 group-hover:opacity-100 transition">
            {product.sizes.slice(0, 5).map((sz) => (
              <span
                key={sz}
                className="text-[10px] bg-white px-2 py-0.5 rounded"
              >
                {sz}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* INFO */}
      <div className="mt-3 space-y-1">
        <h3 className="text-sm font-semibold line-clamp-1">{product.name}</h3>

        <StarRating />

        <div className="flex items-center gap-2">
          <span className="font-bold">₹{product.price}</span>

          {product.oldPrice && (
            <span className="text-xs line-through text-gray-400">
              ₹{product.oldPrice}
            </span>
          )}

          {discount && (
            <span className="text-xs text-green-600 ml-auto">
              {discount}% off
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
