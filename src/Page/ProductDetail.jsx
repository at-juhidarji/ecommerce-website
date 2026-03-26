import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { products } from "@/Data/Product";
import { useCart } from "./CartContext";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import {
  ShieldCheck,
  Truck,
  RefreshCcw,
  Sparkles,
  MapPin,
  CalendarDays,
  ShoppingCart,
} from "lucide-react";

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();

  const product = products.find((item) => item.id === Number(id));

  const [mainImage, setMainImage] = useState("");
  const [selectedSize, setSelectedSize] = useState(null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    if (product) {
      setMainImage(product.image);
      setSelectedSize(null);
      setQty(1);
    }
  }, [product]);

  if (!product) {
    return <div className="text-black p-10">Product not found</div>;
  }

  const galleryImages = product.images || [
    product.image,
    product.image,
    product.image,
  ];

  // ✅ HANDLE ADD TO CART
  const handleAddToCart = () => {
    if (product.sizes && !selectedSize) {
      return alert("Please select size");
    }

    addToCart(product, qty, selectedSize);
  };

  return (
    <div className="bg-white max-w-7xl mx-auto text-black min-h-screen px-6 md:px-16 py-10">
      
      <div className="grid lg:grid-cols-3 gap-10">

        {/* IMAGES */}
        <div>
          <div className="overflow-hidden rounded-2xl group shadow-md">
            <img
              src={mainImage}
              alt={product.name}
              className="w-full object-cover transition duration-500 group-hover:scale-105"
            />
          </div>

          <div className="flex gap-3 mt-4">
            {galleryImages.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`${product.name} ${i}`}
                onClick={() => setMainImage(img)}
                className={`w-20 h-20 object-cover rounded-md cursor-pointer border transition ${
                  mainImage === img
                    ? "border-black scale-105"
                    : "border-gray-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* INFO */}
        <div className="space-y-6">
          <h1 className="text-3xl md:text-4xl font-bold">
            {product.name}
          </h1>

          <div className="flex items-center gap-2">
            <span className="text-yellow-500">★★★★★</span>
            <span className="text-gray-500 text-sm">
              ({product.rating} reviews)
            </span>
          </div>

          <Separator />

          <p className="text-gray-600 text-sm leading-relaxed">
            {product.description ||
              "Premium quality product designed for comfort and modern style."}
          </p>

          {/* BENEFITS */}
          <div>
            <h3 className="font-semibold mb-4 text-lg">Why you'll love it</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  icon: <ShieldCheck className="text-green-500" />,
                  text: "Premium Quality",
                },
                {
                  icon: <Sparkles className="text-yellow-500" />,
                  text: "Modern Design",
                },
                {
                  icon: <Truck className="text-blue-500" />,
                  text: "Free Delivery",
                },
                {
                  icon: <RefreshCcw className="text-purple-500" />,
                  text: "7-Day Returns",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl hover:bg-gray-100 transition"
                >
                  {item.icon}
                  <span className="text-sm">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* SIZE */}
          {product.sizes && (
            <div>
              <h3 className="text-sm mb-2">Select Size</h3>
              <div className="flex gap-2 flex-wrap">
                {product.sizes.map((size) => (
                  <Button
                    key={size}
                    variant={selectedSize === size ? "default" : "outline"}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* PRICE CARD */}
        <div>
          <Card className="p-6 rounded-2xl border border-gray-200 shadow-md">
            <CardContent className="space-y-5">

              {/* PRICE */}
              <div>
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-bold">₹{product.price}</span>

                  {product.oldPrice && (
                    <>
                      <span className="line-through text-gray-400 text-sm">
                        ₹{product.oldPrice}
                      </span>
                      <Badge variant="destructive">
                        {product.discount}
                      </Badge>
                    </>
                  )}
                </div>

                <p className="text-green-600 text-sm font-medium">
                  In Stock
                </p>
              </div>

              <Separator />

              {/* DELIVERY */}
              <div className="text-sm space-y-3">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-red-500" />
                  Deliver to <span className="font-medium">Vadodara</span>
                </div>

                <div className="flex items-center gap-2">
                  <Truck className="w-5 h-5 text-blue-500" />
                  Free Delivery
                </div>

                <div className="flex items-center gap-2">
                  <CalendarDays className="w-5 h-5 text-green-500" />
                  Delivery: Tomorrow
                </div>
              </div>

              <Separator />

              {/* QTY */}
              <div>
                <h3 className="text-sm mb-2">Quantity</h3>
                <div className="flex items-center gap-3">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setQty((prev) => Math.max(1, prev - 1))}
                  >
                    -
                  </Button>
                  <span>{qty}</span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setQty((prev) => prev + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>

              {/* ✅ ACTION BUTTONS */}
              <div className="space-y-3">
                <Button
                variant="secondary"
                  className="w-full text-lg py-6 flex items-center justify-center gap-2"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </Button>

                <Button
                  variant="secondary"
                  className="w-full text-lg py-6"
                >
                  Buy Now
                </Button>
              </div>

            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;