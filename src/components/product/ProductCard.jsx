import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { Star, Heart, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

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
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={11}
          className={
            s <= fullStars ? "text-amber-400 fill-amber-400" : "text-zinc-200"
          }
        />
      ))}
      <span className="text-[11px] text-zinc-400 ml-1.5 font-medium">
        ({product.rating || 0})
      </span>
    </div>
  );

  // ================= LIST MODE =================
  if (listMode) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        onClick={() => navigate(`/product/${product.id}`)}
        className="group cursor-pointer flex gap-4 bg-white border border-zinc-100 rounded-2xl p-3 hover:shadow-lg hover:shadow-zinc-100/80 transition-all duration-500"
      >
        <div className="w-24 h-24 rounded-xl overflow-hidden bg-zinc-50">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        </div>

        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-semibold line-clamp-1 tracking-tight">
              {product.name}
            </h3>
            <StarRating />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex gap-2 items-baseline">
              <span className="font-bold text-zinc-900">₹{product.price}</span>

              {product.oldPrice && (
                <span className="text-xs line-through text-zinc-400">
                  ₹{product.oldPrice}
                </span>
              )}

              {discount && (
                <span className="text-[11px] text-emerald-600 font-semibold">
                  {discount}% off
                </span>
              )}
            </div>

            <Button
              variant="default"
              onClick={handleAddToCart}
              className="text-xs bg-zinc-900 text-white px-3.5 py-1.5 rounded-xl flex items-center gap-1.5 hover:bg-zinc-800 transition-colors"
            >
              <ShoppingBag size={12} />
              {adding ? "Adding…" : "Add"}
            </Button>
          </div>
        </div>
      </motion.div>
    );
  }

  // ================= GRID MODE =================
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      onClick={() => navigate(`/product/${product.id}`)}
      className="group cursor-pointer"
    >
      {/* IMAGE */}
      <div className="relative rounded-2xl overflow-hidden bg-zinc-50 aspect-[3/4]">
        {!imgLoaded && (
          <div className="absolute inset-0 animate-pulse bg-zinc-100 rounded-2xl" />
        )}

        <img
          src={product.image}
          alt={product.name}
          onLoad={() => setImgLoaded(true)}
          className={`w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105 ${
            imgLoaded ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* BADGES */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {discount && (
            <span className="text-[10px] font-semibold bg-emerald-500 text-white px-2.5 py-1 rounded-full tracking-wide uppercase">
              -{discount}%
            </span>
          )}
          {product.isNew && (
            <span className="text-[10px] font-semibold bg-white/90 backdrop-blur-sm text-zinc-800 px-2.5 py-1 rounded-full tracking-wide uppercase shadow-sm">
              New
            </span>
          )}
        </div>

        {/* ❤️ WISHLIST */}
        <Button
          variant="ghost"
          size="icon"
          onClick={handleWishlist}
          className="absolute top-2.5 right-2.5 w-9 h-9 rounded-full bg-white/70 backdrop-blur-sm hover:bg-white/90 shadow-sm transition-all duration-300"
        >
          <Heart
            className={`w-4 h-4 transition-all duration-300 ${
              isInWishlist(product.id)
                ? "fill-red-500 text-red-500 scale-110"
                : "text-zinc-600"
            }`}
          />
        </Button>

        {/* QUICK ADD - slides up on hover */}
        <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]">
          <Button
            variant="default"
            onClick={handleAddToCart}
            className="w-full bg-white/90 backdrop-blur-md text-zinc-900 text-sm py-2.5 rounded-xl flex justify-center gap-2 hover:bg-white shadow-lg border border-zinc-100/50 font-medium transition-colors"
          >
            <ShoppingBag size={14} />
            {adding ? "Adding…" : "Quick Add"}
          </Button>
        </div>

        {/* SIZES - visible on hover above quick add */}
        {product.sizes?.length > 0 && (
          <div className="absolute bottom-14 left-3 right-3 flex justify-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-75 translate-y-3 group-hover:translate-y-0">
            {product.sizes.slice(0, 5).map((sz) => (
              <span
                key={sz}
                className="text-[10px] font-medium bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full shadow-sm text-zinc-700"
              >
                {sz}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* INFO */}
      <div className="mt-3.5 space-y-1.5">
        <h3 className="text-sm font-semibold line-clamp-1 tracking-tight text-zinc-900">
          {product.name}
        </h3>

        <StarRating />

        <div className="flex items-baseline gap-2">
          <span className="font-bold text-zinc-900">₹{product.price}</span>

          {product.oldPrice && (
            <span className="text-xs line-through text-zinc-400">
              ₹{product.oldPrice}
            </span>
          )}

          {discount && (
            <span className="text-[11px] text-emerald-600 font-semibold ml-auto">
              {discount}% off
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};
