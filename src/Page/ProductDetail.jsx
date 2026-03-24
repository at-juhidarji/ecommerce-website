import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { products } from "@/Data/Product";

// shadcn components
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// icons
import {
  ShieldCheck,
  Truck,
  RefreshCcw,
  Sparkles,
  MapPin,
  CalendarDays,
} from "lucide-react";

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((item) => item.id === Number(id));

  const [mainImage, setMainImage] = useState(product?.image);
  const [selectedSize, setSelectedSize] = useState(null);
  const [qty, setQty] = useState(1);

  if (!product) {
    return <div className="text-white p-10">Product not found</div>;
  }

  const galleryImages = product.images || [
    product.image,
    product.image,
    product.image,
  ];

  const reviews = [
    {
      id: 1,
      name: "Rahul Sharma",
      avatar: "https://i.pravatar.cc/100?img=1",
      rating: 5,
      comment: "Amazing quality! Totally worth it.",
    },
    {
      id: 2,
      name: "Priya Patel",
      avatar: "https://i.pravatar.cc/100?img=5",
      rating: 4,
      comment: "Very comfortable & stylish.",
    },
    {
      id: 3,
      name: "Amit Verma",
      avatar: "https://i.pravatar.cc/100?img=8",
      rating: 5,
      comment: "Best purchase ever!",
    },
  ];

  return (
    <div className="bg-black max-w-7xl mx-auto  text-white min-h-screen px-6 md:px-16 py-10">
      {/* 3-COLUMN GRID */}
      <div className="grid lg:grid-cols-3 gap-10">
        {/* COLUMN 1 - IMAGES */}
        <div>
          <div className="overflow-hidden rounded-2xl group">
            <img
              src={mainImage}
              alt={product.name}
              className="w-full object-cover transition duration-500 group-hover:scale-110"
            />
          </div>

          {/* Thumbnails */}
          <div className="flex gap-3 mt-4">
            {galleryImages.map((img, i) => (
              <img
                key={i}
                src={img}
                alt="thumb"
                onClick={() => setMainImage(img)}
                className={`w-20 h-20 object-cover rounded-md cursor-pointer border ${
                  mainImage === img ? "border-white" : "border-zinc-700"
                }`}
              />
            ))}
          </div>
        </div>

        {/* COLUMN 2 - PRODUCT INFO */}
        <div className="space-y-6">
          <h1 className="text-3xl md:text-4xl font-bold leading-tight">
            {product.name}
          </h1>

          <div className="flex items-center gap-2">
            <span className="text-yellow-400">★★★★★</span>
            <span className="text-gray-400 text-sm">
              ({product.rating} reviews)
            </span>
          </div>

          <Separator />

          <p className="text-gray-400 text-sm leading-relaxed">
            {product.description ||
              "Crafted with precision and designed for modern lifestyle. Experience unmatched comfort and premium quality."}
          </p>

          {/* BENEFITS */}
          <div>
            <h3 className="font-semibold mb-4 text-lg">Why you'll love it</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 bg-zinc-900 p-4 rounded-xl hover:bg-zinc-800 transition">
                <ShieldCheck className="w-6 h-6 text-green-400" />
                <span className="text-sm">Premium Quality</span>
              </div>

              <div className="flex items-center gap-3 bg-zinc-900 p-4 rounded-xl hover:bg-zinc-800 transition">
                <Sparkles className="w-6 h-6 text-yellow-400" />
                <span className="text-sm">Modern Design</span>
              </div>

              <div className="flex items-center gap-3 bg-zinc-900 p-4 rounded-xl hover:bg-zinc-800 transition">
                <Truck className="w-6 h-6 text-blue-400" />
                <span className="text-sm">Free Delivery</span>
              </div>

              <div className="flex items-center gap-3 bg-zinc-900 p-4 rounded-xl hover:bg-zinc-800 transition">
                <RefreshCcw className="w-6 h-6 text-purple-400" />
                <span className="text-sm">7-Day Returns</span>
              </div>
            </div>
          </div>

          {/* SIZE SELECTION */}
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

        {/* COLUMN 3 - PRICING CARD */}
        <div>
          <Card className="p-6 rounded-2xl border border-zinc-800 shadow-lg">
            <CardContent className="space-y-5">
              {/* PRICE */}
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-bold">₹{product.price}</span>
                  {product.oldPrice && (
                    <>
                      <span className="line-through text-gray-500 text-sm">
                        ₹{product.oldPrice}
                      </span>
                      <Badge variant="destructive">{product.discount}</Badge>
                    </>
                  )}
                </div>
                <p className="text-green-400 text-sm font-medium">
                  In Stock ✅
                </p>
              </div>

              <Separator />

              {/* DELIVERY INFO */}
              <div className="text-sm space-y-2 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-red-500" />
                  <p>
                    Deliver to <span className="font-medium">Vadodara</span>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Truck className="w-5 h-5 text-blue-400" />
                  <p>Free Delivery</p>
                </div>

                <div className="flex items-center gap-2">
                  <CalendarDays className="w-5 h-5 text-green-400" />
                  <p>
                    Estimated Delivery:{" "}
                    <span className="text-white">Tomorrow</span>
                  </p>
                </div>
              </div>

              <Separator />

              {/* TRUST INFO
              <div className="text-sm space-y-2">
                <p>
                  Sold by <span className="font-medium">Vastra.co</span>
                </p>
                <p className="text-gray-400">
                  ✔ Secure Payment | ✔ Genuine Product
                </p>
              </div>

              <Separator /> */}

              {/* QUANTITY */}
              <div>
                <h3 className="text-sm mb-2">Quantity</h3>
                <div className="flex items-center gap-3">
                  <Button
                    size="sm"
                    onClick={() => setQty(qty > 1 ? qty - 1 : 1)}
                  >
                    -
                  </Button>
                  <span>{qty}</span>
                  <Button size="sm" onClick={() => setQty(qty + 1)}>
                    +
                  </Button>
                </div>
              </div>

              {/* BUTTONS */}
              <div className="space-y-3">
                <Button className="w-full text-lg py-6">Add to Cart</Button>
                <Button variant="outline" className="w-full text-lg py-6">
                  Buy Now
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CUSTOMER REVIEWS */}
      <div className="mt-20 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-8 text-center">
          Customer Reviews
        </h2>
        <div className="space-y-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="flex gap-4 border-b border-zinc-800 pb-6"
            >
              <img
                src={review.avatar}
                alt={review.name}
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1">
                <div className="flex justify-between">
                  <h4 className="font-medium text-sm">{review.name}</h4>
                  <span className="text-yellow-400 text-sm">
                    {"★".repeat(review.rating)}
                  </span>
                </div>
                <p className="text-gray-400 text-sm mt-1">{review.comment}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
