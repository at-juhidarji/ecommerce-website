import React from "react";
import { Star, StarHalf } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const products = [
  {
    id: 1,
    name: "T-shirt with Tape Details",
    price: 120,
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=500&auto=format&fit=crop&q=80",
  },
  {
    id: 2,
    name: "Skinny Fit Jeans",
    price: 240,
    oldPrice: 260,
    discount: "-20%",
    rating: 3.5,
    image:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&auto=format&fit=crop&q=80",
  },
  {
    id: 3,
    name: "Checkered Shirt",
    price: 180,
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&auto=format&fit=crop&q=80",
  },
  {
    id: 4,
    name: "Sleeve Striped T-shirt",
    price: 130,
    oldPrice: 160,
    discount: "-30%",
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1523381294911-8d3cead13475?w=500&auto=format&fit=crop&q=80",
  },
];

const Top = [
  {
    id: 1,
    name: "Vertical Striped Shirt",
    price: 212,
    oldPrice: 232,
    discount: "-20%",
    rating: 5.0,
    image:
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Courage Graphic T-shirt",
    price: 145,
    rating: 4.0,
    image:
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Loose Fit Bermuda Shorts",
    price: 80,
    rating: 3.0,
    image:
      "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Faded Skinny Jeans",
    price: 210,
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=600&auto=format&fit=crop",
  },
];

export const ProductCollection = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 bg-black">
      {/* NEW ARRIVALS SECTION */}
      <section className="py-16 border-b border-slate-800">
        <h2 className="text-4xl md:text-5xl font-[1000] tracking-tighter uppercase text-center text-white mb-12 ">
          New Arrivals
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="group cursor-pointer">
              {/* Product Card */}
              <Card className="border-none shadow-none bg-[#F0EEED] overflow-hidden rounded-[20px] aspect-[1/1.2] relative">
                <CardContent className="p-0 h-full relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 scale-115"
                  />
                  <div className="absolute top-3 left-3 bg-white text-black text-sm font-bold px-3 py-1 rounded-full tracking-tighter uppercase shadow-[0_4px_10px_rgba(0,0,0,0.6)]">
                    New Arrival
                  </div>
                  {/* Hover Buttons */}

                  <div className="absolute inset-0 bg-black/50 scale-115  flex flex-col items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition duration-300">
                    <Button className="bg-white text-black rounded-full px-4 py-2 tracking-tighter uppercase hover:bg-gray-200 font-bold ">
                      Add to Cart
                    </Button>

                    <Button className="bg-black text-white border tracking-tighter uppercase font-bold border-white rounded-full px-4 py-2 hover:bg-orange-400 ">
                      Buy Now
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Product Info */}
              <div className="mt-4 space-y-1">
                <h3 className="font-bold text-lg md:text-xl text-white truncate">
                  {product.name}
                </h3>

                <div className="flex items-center gap-1">
                  {[...Array(4)].map((_, i) => (
                    <Star
                      key={i}
                      className="size-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                  <StarHalf className="size-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm text-slate-400 ml-1">
                    {product.rating}/5
                  </span>
                </div>

                <div className="flex items-center gap-3 mt-1">
                  <span className="text-2xl font-bold text-white">
                    ${product.price}
                  </span>

                  {product.oldPrice && (
                    <>
                      <span className="text-2xl font-bold text-slate-400 line-through">
                        ${product.oldPrice}
                      </span>

                      <span className="bg-red-500/20 text-red-400 text-xs font-bold px-2 py-1 rounded-full">
                        {product.discount}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <Button
            variant="outline"
            className="rounded-full px-12 py-6 border-slate-600 text-black "
          >
            View All
          </Button>
        </div>
      </section>
    </div>
  );
};
