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
import { motion, AnimatePresence } from "framer-motion";
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
  Package,
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
          s <= rating ? "text-amber-400 fill-amber-400" : "text-zinc-200"
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
      <span className="w-4 text-zinc-500 font-medium">{label}</span>
      <div className="flex-1 h-2 bg-zinc-100 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="h-full bg-amber-400 rounded-full"
        />
      </div>
      <span className="w-6 text-zinc-400 text-xs font-medium">{value}</span>
    </div>
  );
};

// ─── Review Card ──────────────────────────────────────────────────────────────
const ReviewCard = ({ review }) => {
  const [liked, setLiked] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="border border-zinc-100 rounded-2xl p-6 space-y-3 hover:shadow-md hover:shadow-zinc-100/50 transition-all duration-500"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-zinc-900 text-white flex items-center justify-center text-sm font-bold">
            {review.avatar}
          </div>
          <div>
            <p className="font-semibold text-sm tracking-tight">{review.name}</p>
            <p className="text-xs text-zinc-400">
              {review.date} · Size: {review.size}
            </p>
          </div>
        </div>
        <StarRow rating={review.rating} size={13} />
      </div>

      <p className="font-semibold text-sm tracking-tight">{review.title}</p>
      <p className="text-zinc-500 text-sm leading-relaxed">{review.body}</p>

      <Button
        variant="link"
        size="sm"
        onClick={() => setLiked((p) => !p)}
        className={`flex items-center gap-1.5 text-xs transition-colors px-0 ${
          liked ? "text-blue-600" : "text-zinc-400 hover:text-zinc-600"
        }`}
      >
        <ThumbsUp size={13} />
        Helpful ({liked ? review.helpful + 1 : review.helpful})
      </Button>
    </motion.div>
  );
};

// ─── Related Card ─────────────────────────────────────────────────────────────
const RelatedCard = ({ product, onNavigate }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="cursor-pointer group rounded-2xl overflow-hidden border border-zinc-100 hover:shadow-lg hover:shadow-zinc-100/50 transition-all duration-500"
      onClick={() => onNavigate(product.id)}
    >
      <div className="relative overflow-hidden aspect-[4/5] bg-zinc-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {product.discount && (
          <Badge variant="destructive" className="absolute top-3 left-3 text-[10px] font-semibold rounded-full">
            {product.discount}
          </Badge>
        )}
      </div>
      <div className="p-4 space-y-1.5">
        <p className="text-sm font-semibold line-clamp-1 tracking-tight">{product.name}</p>
        <div className="flex items-baseline gap-2">
          <span className="text-sm font-bold">₹{product.price}</span>
          {product.oldPrice && (
            <span className="text-xs line-through text-zinc-400">
              ₹{product.oldPrice}
            </span>
          )}
        </div>
      </div>
    </motion.div>
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
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col gap-4"
    >
      {/* Main Image */}
      <div
        ref={imgRef}
        className="relative overflow-hidden rounded-3xl bg-zinc-50 cursor-zoom-in select-none"
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
          <div className="absolute bottom-3 right-3 bg-white/80 backdrop-blur-sm text-zinc-600 text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm pointer-events-none">
            <ZoomIn size={12} />
            Hover to zoom
          </div>
        )}

        <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full pointer-events-none font-medium">
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
                  "relative block rounded-xl overflow-hidden transition-all duration-300 ease-out p-0",
                  activeIndex === i
                    ? "opacity-100 scale-105 shadow-sm ring-2 ring-zinc-900 ring-offset-2"
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
              </Button>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </motion.div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
const ProductDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { addToCart } = useCart();
  const handleBuyNow = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }

    addToCart(product, qty, selectedSize);
    navigate("/checkout");
  };  
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
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-4">
        <Package className="w-16 h-16 text-zinc-200" />
        <h2 className="text-xl font-semibold tracking-tight">Product not found</h2>
        <p className="text-zinc-400 text-sm">The item you're looking for doesn't exist.</p>
        <Button onClick={() => navigate("/")} className="mt-4 rounded-xl cursor-pointer">
          Go Home
        </Button>
      </div>
    );
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
    <div className="bg-white max-w-7xl mx-auto text-zinc-900 min-h-screen px-4 sm:px-6 md:px-16 py-8 md:py-12 space-y-16 md:space-y-20">

      {/* TOP: Images + Info + Price Card */}
      <div className="grid lg:grid-cols-3 gap-8 md:gap-12">

        {/* IMAGES */}
        <ImageGallery images={galleryImages} productName={product.name} />

        {/* INFO */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-7"
        >
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-zinc-400 font-semibold mb-2">
              {product.category || "Collection"}
            </p>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight">{product.name}</h1>
          </div>

          <div className="flex items-center gap-3">
            <StarRow rating={Math.round(Number(avgRating))} />
            <span className="text-zinc-400 text-sm font-medium">
              {avgRating} ({totalReviews} reviews)
            </span>
          </div>

          <Separator className="bg-zinc-100" />

          <p className="text-zinc-500 text-sm leading-relaxed">
            {product.description ||
              "Premium quality product designed for comfort and modern style. Crafted with attention to every detail."}
          </p>

          {/* BENEFITS */}
          <div>
            <h3 className="font-semibold mb-4 text-sm tracking-tight">Why you'll love it</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: <ShieldCheck size={18} className="text-emerald-500" />, text: "Premium Quality" },
                { icon: <Sparkles size={18} className="text-amber-500" />, text: "Modern Design" },
                { icon: <Truck size={18} className="text-blue-500" />, text: "Free Delivery" },
                { icon: <RefreshCcw size={18} className="text-violet-500" />, text: "7-Day Returns" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 bg-zinc-50/80 p-3.5 rounded-xl hover:bg-zinc-100/80 transition-colors duration-300"
                >
                  {item.icon}
                  <span className="text-sm font-medium text-zinc-700">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* SIZE SELECTOR */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold tracking-tight">Select Size</h3>
              <Button
                variant="link"
                size="sm"
                onClick={() => setShowSizeGuide((p) => !p)}
                className="text-zinc-500 hover:text-zinc-900 underline underline-offset-4 decoration-zinc-300 px-0 text-xs font-medium"
              >
                {showSizeGuide ? "Hide Guide" : "Size Guide"}
              </Button>
            </div>

            <div className="flex gap-2 flex-wrap">
              {availableSizes.map((size) => (
                <Button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  variant="outline"
                  className={cn(
                    "min-w-12 h-11 px-4 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer",
                    selectedSize === size
                      ? "border-zinc-900 bg-zinc-900 text-white shadow-md hover:bg-zinc-800 hover:text-white"
                      : "border-zinc-200 text-zinc-600 hover:border-zinc-400 hover:bg-zinc-50"
                  )}
                >
                  {size}
                </Button>
              ))}
            </div>

            <AnimatePresence>
              {showSizeGuide && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="mt-4 overflow-x-auto rounded-xl border border-zinc-200">
                    <table className="w-full text-xs text-center">
                      <thead className="bg-zinc-50">
                        <tr>
                          <th className="px-3 py-2.5 text-left font-semibold text-zinc-600">Size</th>
                          <th className="px-3 py-2.5 font-semibold text-zinc-600">Chest (in)</th>
                          <th className="px-3 py-2.5 font-semibold text-zinc-600">Waist (in)</th>
                          <th className="px-3 py-2.5 font-semibold text-zinc-600">Hip (in)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(SIZE_GUIDE).map(([sz, dims], i) => (
                          <tr
                            key={sz}
                            className={cn(
                              "transition-colors",
                              i % 2 === 0 ? "bg-white" : "bg-zinc-50/50",
                              selectedSize === sz && "bg-amber-50/80 font-semibold"
                            )}
                          >
                            <td className="px-3 py-2.5 text-left text-zinc-700 font-medium">{sz}</td>
                            <td className="px-3 py-2.5 text-zinc-500">{dims.chest}</td>
                            <td className="px-3 py-2.5 text-zinc-500">{dims.waist}</td>
                            <td className="px-3 py-2.5 text-zinc-500">{dims.hip}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {!selectedSize && (
              <p className="text-xs text-orange-500 mt-2 font-medium">
                * Please select a size to continue
              </p>
            )}
          </div>
        </motion.div>

        {/* PRICE CARD */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <Card className="p-0 rounded-2xl border border-zinc-100 shadow-lg shadow-zinc-100/50 overflow-hidden">
            <CardContent className="p-6 md:p-8 space-y-6">
              <div>
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-black tracking-tight">₹{product.price}</span>
                  {product.oldPrice && (
                    <>
                      <span className="line-through text-zinc-400 text-sm">
                        ₹{product.oldPrice}
                      </span>
                      <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 text-[10px] font-bold">
                        {product.discount}
                      </Badge>
                    </>
                  )}
                </div>
                <p className="text-emerald-600 text-sm font-semibold mt-1.5 flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                  In Stock
                </p>
              </div>

              <Separator className="bg-zinc-100" />

              <div className="text-sm space-y-3.5">
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-zinc-400 flex-shrink-0" />
                  <span className="text-zinc-600">Deliver to <span className="font-semibold text-zinc-900">Vadodara</span></span>
                </div>
                <div className="flex items-center gap-3">
                  <Truck className="w-4 h-4 text-zinc-400 flex-shrink-0" />
                  <span className="text-zinc-600">Free Standard Delivery</span>
                </div>
                <div className="flex items-center gap-3">
                  <CalendarDays className="w-4 h-4 text-zinc-400 flex-shrink-0" />
                  <span className="text-zinc-600">Delivery: <span className="font-semibold text-zinc-900">Tomorrow</span></span>
                </div>
              </div>

              <Separator className="bg-zinc-100" />

              <div>
                <h3 className="text-sm mb-3 font-semibold tracking-tight">Quantity</h3>
                <div className="flex items-center gap-0 border border-zinc-200 rounded-xl overflow-hidden w-fit">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setQty((p) => Math.max(1, p - 1))}
                    className="rounded-none h-10 w-10 hover:bg-zinc-50 cursor-pointer"
                  >
                    −
                  </Button>
                  <span className="w-10 text-center font-semibold text-sm tabular-nums">{qty}</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setQty((p) => p + 1)}
                    className="rounded-none h-10 w-10 hover:bg-zinc-50 cursor-pointer"
                  >
                    +
                  </Button>
                </div>
              </div>

              {selectedSize && (
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-zinc-400">Size:</span>
                  <span className="bg-zinc-900 text-white text-xs px-3 py-1 rounded-full font-semibold">
                    {selectedSize}
                  </span>
                </div>
              )}

              <div className="space-y-3 pt-2">
                <Button
                  className="w-full text-sm py-6 flex items-center justify-center gap-2.5 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl font-semibold cursor-pointer transition-colors"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="w-4 h-4" />
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  className="w-full text-sm py-6 border-2 border-zinc-900 hover:bg-zinc-900 hover:text-white rounded-xl font-semibold cursor-pointer transition-all duration-300"
                  onClick={handleBuyNow}
                >
                  Buy Now
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* REVIEWS & DETAILS TABS */}
      <div>
        <div className="flex gap-1 border-b border-zinc-200 mb-10">
          {["reviews", "details"].map((tab) => (
            <Button
              key={tab}
              variant="ghost"
              onClick={() => setActiveTab(tab)}
              className={`
                relative h-auto rounded-none px-6 py-3.5 text-sm font-semibold capitalize transition-all border-b-2 -mb-px cursor-pointer
                hover:bg-transparent
                ${
                  activeTab === tab
                    ? "border-zinc-900 text-zinc-900 opacity-100"
                    : "border-transparent text-zinc-400 hover:text-zinc-600 opacity-70"
                }
              `}
            >
              {tab === "reviews" ? `Reviews (${totalReviews})` : "Product Details"}
            </Button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "reviews" && (
            <motion.div
              key="reviews"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid md:grid-cols-3 gap-10"
            >
              <div className="space-y-6">
                <div className="text-center">
                  <p className="text-6xl font-black tracking-tight">{avgRating}</p>
                  <div className="flex justify-center mt-2">
                    <StarRow rating={Math.round(Number(avgRating))} size={20} />
                  </div>
                  <p className="text-sm text-zinc-400 mt-2 font-medium">{totalReviews} reviews</p>
                </div>
                <div className="space-y-2.5">
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
                  className="w-full rounded-xl py-6 text-sm font-bold border-2 border-zinc-900 hover:bg-zinc-900 hover:text-white transition-all duration-300 active:scale-[0.98] cursor-pointer"
                >
                  Write a Review
                </Button>
              </div>
              <div className="md:col-span-2 space-y-4">
                {MOCK_REVIEWS.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "details" && (
            <motion.div
              key="details"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid md:grid-cols-2 gap-6 text-sm"
            >
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
                  className="flex justify-between border-b border-zinc-100 pb-4 py-2"
                >
                  <span className="text-zinc-400 font-medium">{label}</span>
                  <span className="font-semibold text-right text-zinc-700">{value}</span>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* RELATED PRODUCTS */}
      {showRelated.length > 0 && (
        <div>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold tracking-tight">You may also like</h2>
             <button
              onClick={() => navigate("/productCollection")}
              className="text-sm text-zinc-400 cursor-pointer hover:text-zinc-900 transition-colors font-medium group flex items-center gap-1"
            >
              View All
              <span className="group-hover:translate-x-0.5 transition-transform">→</span>
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
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