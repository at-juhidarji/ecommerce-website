import React, { useState, useEffect, useRef } from "react";
import { products } from "@/Data/Product";
import { useCart } from "@/context/CartContext";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Swiper, SwiperSlide } from "swiper/react";
import { cn } from "@/lib/utils";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import {
  ShieldCheck,
  Truck,
  RefreshCcw,
  Sparkles,
  MapPin,
  CalendarDays,
  ShoppingCart,
  Star,
  ThumbsUp,
  ChevronRight,
  ZoomIn,
} from "lucide-react";

// ─── Mock Reviews Data ────────────────────────────────────────────────────────
const MOCK_REVIEWS = [
  {
    id: 1,
    name: "Arjun Mehta",
    avatar: "AM",
    rating: 5,
    date: "March 20, 2025",
    title: "Absolutely love it!",
    body: "The quality is top-notch. Fits perfectly in size M. Would definitely recommend to anyone looking for premium comfort.",
    helpful: 24,
    size: "M",
  },
  {
    id: 2,
    name: "Priya Sharma",
    avatar: "PS",
    rating: 4,
    date: "February 14, 2025",
    title: "Great product, fast delivery",
    body: "Delivery was super fast and the packaging was neat. The fabric feels premium. Went with L and it fits true to size.",
    helpful: 17,
    size: "L",
  },
  {
    id: 3,
    name: "Rohan Gupta",
    avatar: "RG",
    rating: 5,
    date: "January 5, 2025",
    title: "Worth every rupee",
    body: "Bought the XL for my dad and he loved it. The stitching quality is excellent. Will be ordering more.",
    helpful: 11,
    size: "XL",
  },
];

// ─── Size Guide ───────────────────────────────────────────────────────────────
const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

const SIZE_GUIDE = {
  XS: { chest: "32–34", waist: "26–28", hip: "34–36" },
  S: { chest: "34–36", waist: "28–30", hip: "36–38" },
  M: { chest: "36–38", waist: "30–32", hip: "38–40" },
  L: { chest: "38–40", waist: "32–34", hip: "40–42" },
  XL: { chest: "40–42", waist: "34–36", hip: "42–44" },
  XXL: { chest: "42–44", waist: "36–38", hip: "44–46" },
};

// ─── Star Row ─────────────────────────────────────────────────────────────────
const StarRow = ({ rating, size = 16 }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((s) => (
      <Star
        key={s}
        size={size}
        className={
          s <= rating ? "text-amber-400 fill-amber-400" : "text-gray-300"
        }
      />
    ))}
  </div>
);

// ─── Rating Bar ───────────────────────────────────────────────────────────────
const RatingBar = ({ label, value, total }) => {
  const pct = total > 0 ? Math.round((value / total) * 100) : 0;
  return (
    <div className="flex items-center gap-3 text-sm">
      <span className="w-4 text-gray-600">{label}</span>
      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-amber-400 rounded-full transition-all duration-700"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="w-6 text-gray-500 text-xs">{value}</span>
    </div>
  );
};

// ─── Review Card ──────────────────────────────────────────────────────────────
const ReviewCard = ({ review }) => {
  const [liked, setLiked] = useState(false);
  return (
    <div className="border border-gray-100 rounded-2xl p-5 space-y-3 hover:shadow-sm transition">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center text-sm font-bold">
            {review.avatar}
          </div>
          <div>
            <p className="font-semibold text-sm">{review.name}</p>
            <p className="text-xs text-gray-400">
              {review.date} · Size: {review.size}
            </p>
          </div>
        </div>
        <StarRow rating={review.rating} size={13} />
      </div>

      <p className="font-semibold text-sm">{review.title}</p>
      <p className="text-gray-500 text-sm leading-relaxed">{review.body}</p>

      <Button
        variant="link"
        size="sm"
        onClick={() => setLiked((p) => !p)}
        className={`flex items-center gap-1.5 text-xs transition ${
          liked ? "text-blue-600" : "text-gray-400 hover:text-gray-600"
        }`}
      >
        <ThumbsUp size={13} />
        Helpful ({liked ? review.helpful + 1 : review.helpful})
      </Button>
    </div>
  );
};

// ─── Related Card (FIX: was missing, now defined) ─────────────────────────────
const RelatedCard = ({ product, onNavigate }) => {
  return (
    <div
      className="cursor-pointer group rounded-2xl overflow-hidden border border-gray-100 hover:shadow-md transition"
      onClick={() => onNavigate(product.id)}
    >
      <div className="relative overflow-hidden aspect-[4/5] bg-gray-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {product.discount && (
          <Badge variant="destructive" className="absolute top-2 left-2 text-xs">
            {product.discount}
          </Badge>
        )}
      </div>
      <div className="p-3 space-y-1">
        <p className="text-sm font-semibold line-clamp-1">{product.name}</p>
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold">₹{product.price}</span>
          {product.oldPrice && (
            <span className="text-xs line-through text-gray-400">
              ₹{product.oldPrice}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── Image Gallery ────────────────────────────────────────────────────────────
const ImageGallery = ({ images, productName }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isTransitioning, setIsTransitioning] = useState(false);
  const imgRef = useRef(null);

  const handleThumbnailClick = (index) => {
    if (index === activeIndex) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveIndex(index);
      setIsTransitioning(false);
    }, 180);
  };

  const handleMouseMove = (e) => {
    if (!imgRef.current) return;
    const rect = imgRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image */}
      <div
        ref={imgRef}
        className="relative overflow-hidden rounded-3xl bg-gray-50 shadow-lg cursor-zoom-in select-none"
        style={{ aspectRatio: "4/5" }}
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
        onMouseMove={handleMouseMove}
      >
        <img
          src={images[activeIndex]}
          alt={`${productName} – view ${activeIndex + 1}`}
          className="w-full h-full object-cover"
          style={{
            opacity: isTransitioning ? 0 : 1,
            transform: isZoomed
              ? `scale(1.55) translate(${(50 - mousePos.x) * 0.25}%, ${(50 - mousePos.y) * 0.25}%)`
              : "scale(1)",
            transformOrigin: `${mousePos.x}% ${mousePos.y}%`,
            transition: isTransitioning
              ? "opacity 0.18s ease"
              : "opacity 0.18s ease, transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          }}
          draggable={false}
        />

        {!isZoomed && (
          <div className="absolute bottom-3 right-3 bg-white/80 backdrop-blur-sm text-gray-600 text-xs px-2.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm pointer-events-none">
            <ZoomIn size={12} />
            Hover to zoom
          </div>
        )}

        <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full pointer-events-none">
          {activeIndex + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnail Strip */}
      <div className="relative mt-2">
        <Swiper
          modules={[FreeMode]}
          spaceBetween={12}
          slidesPerView="auto"
          freeMode={true}
          grabCursor={true}
          className="!pb-2"
        >
          {images.map((img, i) => (
            <SwiperSlide key={i} style={{ width: "auto" }}>
              <Button
                onClick={() => handleThumbnailClick(i)}
                variant="ghost"
                className={cn(
                  "relative block rounded-xl overflow-hidden transition-all duration-300 ease-in-out p-0",
                  activeIndex === i
                    ? "opacity-100 scale-105 shadow-sm"
                    : "opacity-40 hover:opacity-70 scale-100"
                )}
                style={{ width: 72, height: 90 }}
                aria-label={`View image ${i + 1}`}
                aria-pressed={activeIndex === i}
              >
                <img
                  src={img}
                  alt={`${productName} thumbnail ${i + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                {activeIndex === i && (
                  <span className="absolute bottom-0 left-0 w-full h-1 bg-black/80" />
                )}
              </Button>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
const ProductDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { addToCart } = useCart();

  const product = products.find((item) => item.id === Number(id));

  const [selectedSize, setSelectedSize] = useState(null);
  const [qty, setQty] = useState(1);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [activeTab, setActiveTab] = useState("reviews");

  useEffect(() => {
    if (product) {
      setSelectedSize(null);
      setQty(1);
    }
  }, [product]);

  if (!product) {
    return <div className="text-black p-10">Product not found</div>;
  }

  const galleryImages =
    product.images && product.images.length > 0
      ? product.images
      : [product.image, product.image, product.image, product.image];

  const availableSizes =
    product.sizes && product.sizes.length > 0 ? product.sizes : SIZES;

  const handleAddToCart = () => {
    if (!selectedSize) return alert("Please select a size");
    addToCart(product, qty, selectedSize);
  };

  const relatedProducts = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  const showRelated =
    relatedProducts.length > 0
      ? relatedProducts
      : products.filter((p) => p.id !== product.id).slice(0, 4);

  const totalReviews = MOCK_REVIEWS.length;
  const avgRating = (
    MOCK_REVIEWS.reduce((s, r) => s + r.rating, 0) / totalReviews
  ).toFixed(1);
  const ratingCounts = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: MOCK_REVIEWS.filter((r) => r.rating === star).length,
  }));

  return (
    <div className="bg-white max-w-7xl mx-auto text-black min-h-screen px-6 md:px-16 py-10 space-y-16">

      {/* TOP: Images + Info + Price Card */}
      <div className="grid lg:grid-cols-3 gap-10">

        {/* IMAGES */}
        <ImageGallery images={galleryImages} productName={product.name} />

        {/* INFO */}
        <div className="space-y-6">
          <h1 className="text-3xl md:text-4xl font-bold">{product.name}</h1>

          <div className="flex items-center gap-2">
            <StarRow rating={Math.round(Number(avgRating))} />
            <span className="text-gray-500 text-sm">
              {avgRating} ({totalReviews} reviews)
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
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: <ShieldCheck className="text-green-500" />, text: "Premium Quality" },
                { icon: <Sparkles className="text-yellow-500" />, text: "Modern Design" },
                { icon: <Truck className="text-blue-500" />, text: "Free Delivery" },
                { icon: <RefreshCcw className="text-purple-500" />, text: "7-Day Returns" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl hover:bg-gray-100 transition"
                >
                  {item.icon}
                  <span className="text-sm">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* SIZE SELECTOR */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold">Select Size</h3>
              <Button
                variant="link"
                size="sm"
                onClick={() => setShowSizeGuide((p) => !p)}
                className="text-blue-600 hover:text-blue-800 underline underline-offset-2 px-0"
              >
                {showSizeGuide ? "Hide" : "Size Guide"}
              </Button>
            </div>

            <div className="flex gap-2 flex-wrap">
              {availableSizes.map((size) => (
                <Button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  variant="outline"
                  className={cn(
                    "min-w-12 h-10 px-3 rounded-lg text-sm font-medium transition-all duration-150",
                    selectedSize === size
                      ? "border-black bg-black text-white shadow hover:bg-black"
                      : "border-gray-200 text-gray-700 hover:border-gray-400"
                  )}
                >
                  {size}
                </Button>
              ))}
            </div>

            {showSizeGuide && (
              <div className="mt-4 overflow-x-auto rounded-xl border border-gray-200">
                <table className="w-full text-xs text-center">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 py-2 text-left font-semibold text-gray-700">Size</th>
                      <th className="px-3 py-2 font-semibold text-gray-700">Chest (in)</th>
                      <th className="px-3 py-2 font-semibold text-gray-700">Waist (in)</th>
                      <th className="px-3 py-2 font-semibold text-gray-700">Hip (in)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(SIZE_GUIDE).map(([sz, dims], i) => (
                      <tr
                        key={sz}
                        className={`${i % 2 === 0 ? "bg-white" : "bg-gray-50"} ${
                          selectedSize === sz ? "bg-amber-50 font-semibold" : ""
                        }`}
                      >
                        <td className="px-3 py-2 text-left text-gray-700 font-medium">{sz}</td>
                        <td className="px-3 py-2 text-gray-600">{dims.chest}</td>
                        <td className="px-3 py-2 text-gray-600">{dims.waist}</td>
                        <td className="px-3 py-2 text-gray-600">{dims.hip}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {!selectedSize && (
              <p className="text-xs text-red-400 mt-1">
                * Please select a size to continue
              </p>
            )}
          </div>
        </div>

        {/* PRICE CARD */}
        <div>
          <Card className="p-6 rounded-2xl border border-gray-200 shadow-md">
            <CardContent className="space-y-5">
              <div>
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-bold">₹{product.price}</span>
                  {product.oldPrice && (
                    <>
                      <span className="line-through text-gray-400 text-sm">
                        ₹{product.oldPrice}
                      </span>
                      <Badge variant="destructive">{product.discount}</Badge>
                    </>
                  )}
                </div>
                <p className="text-green-600 text-sm font-medium">In Stock</p>
              </div>

              <Separator />

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

              <div>
                <h3 className="text-sm mb-2 font-medium">Quantity</h3>
                <div className="flex items-center gap-3">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setQty((p) => Math.max(1, p - 1))}
                  >
                    −
                  </Button>
                  <span className="w-6 text-center font-semibold">{qty}</span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setQty((p) => p + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>

              {selectedSize && (
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-gray-500">Size:</span>
                  <span className="bg-black text-white text-xs px-2.5 py-1 rounded-full font-medium">
                    {selectedSize}
                  </span>
                </div>
              )}

              <div className="space-y-3">
                <Button
                  className="w-full text-base py-6 flex items-center justify-center gap-2 bg-gray-900 hover:bg-black text-white"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  className="w-full text-base py-6 border-2 border-gray-900 hover:bg-gray-900 hover:text-white transition"
                    onClick={() => navigate("/checkout")}
                >
                  Buy Now
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* REVIEWS & DETAILS TABS */}
      <div>
        <div className="flex gap-1 border-b border-gray-200 mb-8">
          {["reviews", "details"].map((tab) => (
            <Button
              key={tab}
              variant="ghost"
              onClick={() => setActiveTab(tab)}
              className={`
                relative h-auto rounded-none px-6 py-3 text-sm font-semibold capitalize transition-all border-b-2 -mb-px
                hover:bg-transparent
                ${
                  activeTab === tab
                    ? "border-black text-black opacity-100"
                    : "border-transparent text-gray-400 hover:text-gray-600 opacity-70"
                }
              `}
            >
              {tab === "reviews" ? `Reviews (${totalReviews})` : "Product Details"}
            </Button>
          ))}
        </div>

        {activeTab === "reviews" && (
          <div className="grid md:grid-cols-3 gap-10">
            <div className="space-y-5">
              <div className="text-center">
                <p className="text-6xl font-black">{avgRating}</p>
                <StarRow rating={Math.round(Number(avgRating))} size={20} />
                <p className="text-sm text-gray-400 mt-1">{totalReviews} reviews</p>
              </div>
              <div className="space-y-2">
                {ratingCounts.map(({ star, count }) => (
                  <RatingBar
                    key={star}
                    label={star}
                    value={count}
                    total={totalReviews}
                  />
                ))}
              </div>
              <Button
                variant="outline"
                className="w-full rounded-xl py-6 text-sm font-bold border-2 border-black hover:bg-black hover:text-white transition-all active:scale-[0.98]"
              >
                Write a Review
              </Button>
            </div>
            <div className="md:col-span-2 space-y-4">
              {MOCK_REVIEWS.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          </div>
        )}

        {activeTab === "details" && (
          <div className="grid md:grid-cols-2 gap-8 text-sm">
            {[
              { label: "Material", value: "100% Premium Cotton" },
              { label: "Fit", value: "Regular Fit" },
              { label: "Care", value: "Machine wash cold, tumble dry low" },
              { label: "Origin", value: "Made in India" },
              { label: "SKU", value: `PRD-${product.id}-${selectedSize || "XXX"}` },
              { label: "Available Sizes", value: availableSizes.join(", ") },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="flex justify-between border-b border-gray-100 pb-3"
              >
                <span className="text-gray-500">{label}</span>
                <span className="font-medium text-right">{value}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* RELATED PRODUCTS */}
      {showRelated.length > 0 && (
        <div>
          <div className="flex justify-between mb-6">
            <h2 className="text-xl font-bold">You may also like</h2>
            <Button
              variant="ghost"
              onClick={() => navigate("/productCollection")}
              className="text-sm font-semibold flex items-center gap-1 px-2 hover:bg-transparent hover:text-black/70 transition-all group"
            >
              View all
              <ChevronRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {showRelated.map((p) => (
              <RelatedCard
                key={p.id}
                product={p}
                onNavigate={(id) => navigate(`/product/${id}`)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;