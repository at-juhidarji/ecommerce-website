import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { products } from "@/components/ui/Product";
import { Button } from "@/components/ui/button";

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((item) => item.id === Number(id));

  const [selectedSize, setSelectedSize] = useState(null);

  if (!product) {
    return <div className="text-white p-10">Product not found</div>;
  }

  return (
 <div className="bg-black text-white min-h-screen px-6 md:px-16 py-10">
  <div className="grid md:grid-cols-2 gap-14 items-center">

    {/* IMAGE SECTION */}
    <div className="flex justify-center">
      <div className="overflow-hidden rounded-3xl group">
        <img
          src={product.image}
          alt={product.name}
          className="w-full max-w-md object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
    </div>

    {/* DETAILS SECTION */}
    <div className="space-y-6">

      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-black leading-tight">
        {product.name}
      </h1>

      {/* Rating */}
      <div className="flex items-center gap-2">
        <span className="text-yellow-400 text-lg">★★★★★</span>
        <span className="text-gray-400 text-sm">
          ({product.rating} rating)
        </span>
      </div>

      {/* Price */}
      <div className="flex items-center gap-4">
        <span className="text-3xl font-bold text-white">
          ₹{product.price}
        </span>

        {product.oldPrice && (
          <>
            <span className="text-lg text-gray-500 line-through">
              ₹{product.oldPrice}
            </span>
            <span className="bg-red-500/20 text-red-400 text-sm px-3 py-1 rounded-full">
              {product.discount}
            </span>
          </>
        )}
      </div>

      {/* Divider */}
      <div className="h-[1px] bg-zinc-800"></div>

      {/* Description */}
      <p className="text-gray-400 leading-relaxed">
        {product.description || "Premium quality product with aesthetic design and perfect fit for modern style."}
      </p>

      {/* Size Selection */}
      {product.sizes && (
        <div>
          <h3 className="mb-3 text-sm text-gray-400 uppercase tracking-wide">
            Select Size
          </h3>

          <div className="flex gap-3">
            {product.sizes.map((size) => (
              <button
                key={size}
                className="px-4 py-2 border border-zinc-700 rounded-lg hover:bg-white hover:text-black transition"
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Buttons */}
      <div className="flex flex-col gap-4 pt-4">
        <Button className="w-full bg-white text-black text-lg py-6 rounded-xl hover:bg-gray-200 transition">
          Add to Cart
        </Button>

        <Button className="w-full bg-transparent border border-white text-white text-lg py-6 rounded-xl hover:bg-white hover:text-black transition">
          Buy Now
        </Button>
      </div>

    </div>
  </div>
</div>
  );
};

export default ProductDetail;