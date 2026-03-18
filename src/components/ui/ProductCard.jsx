import { Star, StarHalf } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const ProductCard = ({ product }) => {
  const navigate = useNavigate(); // 👈 ADD THIS

  return (
    <div
      className="group cursor-pointer"
      onClick={() => navigate(`/product/${product.id}`)} // 👈 ADD THIS
    >
      <Card className="relative border-none shadow-none bg-zinc-900 overflow-hidden rounded-[20px] aspect-[1/1.2]">
      
        <CardContent className="p-0 h-full">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 scale-110 group-hover:scale-100"
          />

          {/* Hover buttons */}
          <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition">
            <Button
              onClick={(e) => e.stopPropagation()} // 👈 PREVENT NAVIGATION
              className="bg-white font-[1000] tracking-tighter uppercase text-black rounded-full px-4 py-2 font-bold"
            >
              Add to Cart
            </Button>

            <Button
              onClick={(e) => e.stopPropagation()} // 👈 PREVENT NAVIGATION
              className="bg-black font-[1000] tracking-tighter uppercase text-white border border-white rounded-full px-4 py-2"
            >
              Buy Now
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Product info */}
      <div className="mt-4 space-y-2">
        <h3 className="font-bold text-lg text-white truncate">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1">
          {[...Array(4)].map((_, i) => (
            <Star key={i} className="size-4 fill-yellow-400 text-yellow-400" />
          ))}
          <StarHalf className="size-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm text-gray-400 ml-1">
            {product.rating}/5
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-3">
          <span className="text-xl font-bold text-white">
            ${product.price}
          </span>

          {product.oldPrice && (
            <>
              <span className="text-lg text-gray-500 line-through">
                ${product.oldPrice}
              </span>

              <span className="bg-red-500/20 text-red-400 text-xs px-2 py-1 rounded-full">
                {product.discount}
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};