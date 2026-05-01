import React, { useState, useRef } from "react";
import { products } from "@/Data/Product";
import { useCart } from "@/context/CartContext";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ProductCard } from "@/components/product/ProductCard";
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
  ZoomIn,
  Package,
  Plus,
  Minus,
} from "lucide-react";

// ── Mock Reviews ──────────────────────────────────────────────────────────────
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

// ── Size Data ─────────────────────────────────────────────────────────────────
const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];
const SIZE_GUIDE = {
  XS: { chest: "32–34", waist: "26–28", hip: "34–36" },
  S: { chest: "34–36", waist: "28–30", hip: "36–38" },
  M: { chest: "36–38", waist: "30–32", hip: "38–40" },
  L: { chest: "38–40", waist: "32–34", hip: "40–42" },
  XL: { chest: "40–42", waist: "34–36", hip: "42–44" },
  XXL: { chest: "42–44", waist: "36–38", hip: "44–46" },
};

// ── StarRow ───────────────────────────────────────────────────────────────────
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

// ── RatingBar ─────────────────────────────────────────────────────────────────
const RatingBar = ({ label, value, total }) => {
  const pct = total > 0 ? Math.round((value / total) * 100) : 0;
  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="w-3 text-muted-foreground font-medium text-xs">
        {label}
      </span>
      <div className="flex-1 h-2 bg-zinc-100 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="h-full bg-amber-400 rounded-full"
        />
      </div>
      <span className="w-4 text-muted-foreground text-xs font-medium text-right">
        {value}
      </span>
    </div>
  );
};

// ── ReviewCard ────────────────────────────────────────────────────────────────
const ReviewCard = ({ review }) => {
  const [liked, setLiked] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      // FIX: p-6 → p-4 on small screens, gap tight
      className="border border-border rounded-2xl p-4 sm:p-6 space-y-3 hover:shadow-md hover:shadow-zinc-100/50 transition-all duration-500"
    >
      {/* FIX: header wraps on very small screens */}
      <div className="flex items-start justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-9 h-9 rounded-full bg-zinc-900 text-destructive-foreground flex items-center justify-center text-xs font-bold shrink-0">
            {review.avatar}
          </div>
          <div className="min-w-0">
            {/* FIX: truncate long name */}
            <p className="font-semibold text-sm tracking-tight truncate">
              {review.name}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {review.date} · Size: {review.size}
            </p>
          </div>
        </div>
        <StarRow rating={review.rating} size={12} />
      </div>

      <p className="font-semibold text-sm tracking-tight">{review.title}</p>
      <p className="text-muted-foreground text-sm leading-relaxed">
        {review.body}
      </p>

      <Button
        onClick={() => setLiked((p) => !p)}
        className={cn(
          "flex items-center gap-1.5 text-xs transition-colors bg-transparent border-none cursor-pointer p-0",
          liked
            ? "text-blue-600"
            : "text-muted-foreground hover:text-foreground",
        )}
      >
        <ThumbsUp size={12} />
        Helpful ({liked ? review.helpful + 1 : review.helpful})
      </Button>
    </motion.div>
  );
};



// ── ImageGallery ──────────────────────────────────────────────────────────────
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
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col gap-3"
    >
      {/* Main Image — FIX: aspect ratio adjusted for tiny screens */}
      <div
        ref={imgRef}
        className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-muted cursor-zoom-in select-none aspect-square sm:aspect-4/5"
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
          // FIX: hide zoom hint on very small screens (too cramped)
          <div className="hidden sm:flex absolute bottom-3 right-3 bg-surface/80 backdrop-blur-sm text-muted-foreground text-xs px-2.5 py-1 rounded-full items-center gap-1.5 shadow-sm pointer-events-none">
            <ZoomIn size={11} />
            Hover to zoom
          </div>
        )}

        {/* FIX: smaller counter on mobile */}
        <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-black/50 backdrop-blur-sm text-destructive-foreground text-[10px] sm:text-xs px-2 py-1 rounded-full pointer-events-none font-medium">
          {activeIndex + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnails — FIX: smaller thumbs on 320px */}
      <div className="mt-1">
        <Swiper
          modules={[FreeMode]}
          spaceBetween={8}
          slidesPerView="auto"
          freeMode
          grabCursor
          className="pb-1!"
        >
          {images.map((img, i) => (
            <SwiperSlide key={i} style={{ width: "auto" }}>
              <Button
                onClick={() => handleThumbnailClick(i)}
                className={cn(
                  "relative block rounded-lg overflow-hidden transition-all duration-300 ease-out p-0 border-2 border-transparent",
                  activeIndex === i
                    ? "opacity-100 scale-105 shadow-sm ring-2 ring-zinc-900 ring-offset-1"
                    : "opacity-40 hover:opacity-70 scale-100",
                )}
                // FIX: smaller thumbs on tiny screens via inline style with clamp equivalent
                style={{ width: 56, height: 70 }}
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

// ── Main Component ────────────────────────────────────────────────────────────
const ProductDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { addToCart } = useCart();

  const product = products.find((item) => item.id === Number(id));

  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] ?? null);
  const [qty, setQty] = useState(1);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [activeTab, setActiveTab] = useState("reviews");

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-4 px-4 text-center">
        <Package className="w-14 h-14 text-zinc-200" />
        <h2 className="text-lg font-semibold tracking-tight">
          Product not found
        </h2>
        <p className="text-muted-foreground text-sm">
          The item you're looking for doesn't exist.
        </p>
        <Button variant="default" onClick={() => navigate("/")}>
          Go Home
        </Button>
      </div>
    );
  }

  const galleryImages =
    product.images?.length > 0
      ? product.images
      : [product.image, product.image, product.image, product.image];

  const availableSizes = product.sizes?.length > 0 ? product.sizes : SIZES;

  const handleAddToCart = () => {
    if (!selectedSize) return alert("Please select a size");
    addToCart(product, qty, selectedSize);
  };

  const handleBuyNow = () => {
    if (!selectedSize) return alert("Please select a size");
    addToCart(product, qty, selectedSize);
    navigate("/checkout");
  };

  const relatedRaw = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4);
  const showRelated =
    relatedRaw.length > 0
      ? relatedRaw
      : products.filter((p) => p.id !== product.id).slice(0, 4);

  const totalReviews = MOCK_REVIEWS.length;
  const avgRating = (
    MOCK_REVIEWS.reduce((s, r) => s + r.rating, 0) / totalReviews
  ).toFixed(1);
  const ratingCounts = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: MOCK_REVIEWS.filter((r) => r.rating === star).length,
  }));

  const BENEFITS = [
    {
      icon: <ShieldCheck size={16} className="text-emerald-500 shrink-0" />,
      text: "Premium Quality",
    },
    {
      icon: <Sparkles size={16} className="text-amber-500 shrink-0" />,
      text: "Modern Design",
    },
    {
      icon: <Truck size={16} className="text-blue-500 shrink-0" />,
      text: "Free Delivery",
    },
    {
      icon: <RefreshCcw size={16} className="text-violet-500 shrink-0" />,
      text: "7-Day Returns",
    },
  ];

  const DETAILS = [
    { label: "Material", value: "100% Premium Cotton" },
    { label: "Fit", value: "Regular Fit" },
    { label: "Care", value: "Machine wash cold, tumble dry low" },
    { label: "Origin", value: "Made in India" },
    { label: "SKU", value: `PRD-${product.id}-${selectedSize || "XXX"}` },
    { label: "Available Sizes", value: availableSizes.join(", ") },
  ];

  return (
    // FIX: min px-3 so content never touches edges at 320px
    <div className="bg-surface max-w-7xl mx-auto text-foreground min-h-screen px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12 space-y-12 md:space-y-20">
      <div className="space-y-6 sm:space-y-8">
        {/* ── BREADCRUMB ──────────────────────────────────────────────────────── */}
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/collections">Collections</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="line-clamp-1 max-w-37.5 sm:max-w-xs md:max-w-sm">
                {product.name}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* ── TOP GRID ──────────────────────────────────────────────────────── */}
        {/* FIX: single column until lg, stack naturally */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
          {/* Gallery */}
          <ImageGallery images={galleryImages} productName={product.name} />

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.15,
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="space-y-5 sm:space-y-7"
          >
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-semibold mb-1.5">
                {product.category || "Collection"}
              </p>
              {/* FIX: clamp title font so it doesn't overflow at 320px */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight leading-tight wrap-break-word">
                {product.name}
              </h1>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <StarRow rating={Math.round(Number(avgRating))} />
              <span className="text-muted-foreground text-xs sm:text-sm font-medium">
                {avgRating} ({totalReviews} reviews)
              </span>
            </div>

            <Separator className="bg-zinc-100" />

            <p className="text-muted-foreground text-sm leading-relaxed">
              {product.description ||
                "Premium quality product designed for comfort and modern style. Crafted with attention to every detail."}
            </p>

            {/* Benefits — FIX: 1 col on very small, 2 col from sm */}
            <div>
              <h3 className="font-semibold mb-3 text-sm tracking-tight">
                Why you'll love it
              </h3>
              <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 gap-2">
                {BENEFITS.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2.5 bg-muted/80 px-3 py-3 rounded-xl hover:bg-zinc-100/80 transition-colors duration-300"
                  >
                    {item.icon}
                    <span className="text-xs sm:text-sm font-medium text-foreground">
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div>
              <div className="flex items-center justify-between mb-3 gap-2">
                <h3 className="text-sm font-semibold tracking-tight">
                  Select Size
                </h3>
                <Button
                  onClick={() => setShowSizeGuide((p) => !p)}
                  className="text-zinc-500 hover:text-foreground underline underline-offset-4 decoration-zinc-300 text-xs font-medium bg-transparent border-none cursor-pointer transition-colors whitespace-nowrap"
                >
                  {showSizeGuide ? "Hide Guide" : "Size Guide"}
                </Button>
              </div>

              {/* FIX: size Buttons smaller on mobile, wrap naturally */}
              <div className="flex gap-1.5 sm:gap-2 flex-wrap">
                {availableSizes.map((size) => (
                  <Button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={cn(
                      "min-w-10 h-9 sm:h-11 px-2.5 sm:px-4 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer border",
                      selectedSize === size
                        ? "border-zinc-900 bg-zinc-900 text-destructive-foreground shadow-md hover:bg-zinc-800"
                        : "border-zinc-200 bg-surface text-muted-foreground hover:border-zinc-400 hover:bg-muted",
                    )}
                    aria-pressed={selectedSize === size}
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
                    {/* FIX: overflow-x-auto so table scrolls horizontally on 320px */}
                    <div className="mt-3 overflow-x-auto rounded-xl border border-zinc-200">
                      <table className="min-w-full text-[11px] sm:text-xs text-center">
                        <thead className="bg-muted">
                          <tr>
                            <th className="px-2 sm:px-3 py-2 text-left font-semibold text-muted-foreground whitespace-nowrap">
                              Size
                            </th>
                            <th className="px-2 sm:px-3 py-2 font-semibold text-muted-foreground whitespace-nowrap">
                              Chest (in)
                            </th>
                            <th className="px-2 sm:px-3 py-2 font-semibold text-muted-foreground whitespace-nowrap">
                              Waist (in)
                            </th>
                            <th className="px-2 sm:px-3 py-2 font-semibold text-muted-foreground whitespace-nowrap">
                              Hip (in)
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {Object.entries(SIZE_GUIDE).map(([sz, dims], i) => (
                            <tr
                              key={sz}
                              className={cn(
                                "transition-colors",
                                i % 2 === 0 ? "bg-surface" : "bg-muted/50",
                                selectedSize === sz &&
                                  "bg-amber-50/80 font-semibold",
                              )}
                            >
                              <td className="px-2 sm:px-3 py-2 text-left text-foreground font-medium">
                                {sz}
                              </td>
                              <td className="px-2 sm:px-3 py-2 text-zinc-500">
                                {dims.chest}
                              </td>
                              <td className="px-2 sm:px-3 py-2 text-zinc-500">
                                {dims.waist}
                              </td>
                              <td className="px-2 sm:px-3 py-2 text-zinc-500">
                                {dims.hip}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {!selectedSize && (
                <p className="text-xs text-primary mt-2 font-medium">
                  * Please select a size to continue
                </p>
              )}
            </div>
          </motion.div>

          {/* Price Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Card className="rounded-2xl border border-border shadow-lg shadow-zinc-100/50 overflow-hidden">
              {/* FIX: tighter padding on small screens */}
              <CardContent className="p-4 sm:p-6 md:p-8 space-y-5">
                {/* Price */}
                <div>
                  <div className="flex items-baseline gap-2 flex-wrap">
                    {/* FIX: font size down on tiny screen */}
                    <span className="text-2xl sm:text-3xl font-black tracking-tight">
                      ₹{product.price}
                    </span>
                    {product.oldPrice && (
                      <>
                        <span className="line-through text-muted-foreground text-xs sm:text-sm">
                          ₹{product.oldPrice}
                        </span>
                        <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 text-[10px] font-bold">
                          {product.discount}
                        </Badge>
                      </>
                    )}
                  </div>
                  <p className="text-emerald-600 text-xs sm:text-sm font-semibold mt-1.5 flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shrink-0" />
                    In Stock
                  </p>
                </div>

                <Separator className="bg-zinc-100" />

                {/* Delivery Meta */}
                <div className="text-xs sm:text-sm space-y-3">
                  <div className="flex items-center gap-2.5">
                    <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground shrink-0" />
                    <span className="text-muted-foreground">
                      Deliver to{" "}
                      <span className="font-semibold text-foreground">
                        Vadodara
                      </span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Truck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground shrink-0" />
                    <span className="text-muted-foreground">
                      Free Standard Delivery
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CalendarDays className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground shrink-0" />
                    <span className="text-muted-foreground">
                      Delivery:{" "}
                      <span className="font-semibold text-foreground">
                        Tomorrow
                      </span>
                    </span>
                  </div>
                </div>

                <Separator className="bg-zinc-100" />

                {/* Quantity */}
                <div>
                  <h3 className="text-xs sm:text-sm mb-2.5 font-semibold tracking-tight">
                    Quantity
                  </h3>
                  <div className="flex items-center border border-zinc-200 rounded-xl overflow-hidden w-fit">
                    <Button
                      onClick={() => setQty((p) => Math.max(1, p - 1))}
                      className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-muted-foreground hover:bg-muted transition-colors cursor-pointer bg-transparent border-none"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="w-9 sm:w-10 text-center font-semibold text-sm tabular-nums">
                      {qty}
                    </span>
                    <Button
                      onClick={() => setQty((p) => p + 1)}
                      className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-muted-foreground hover:bg-muted transition-colors cursor-pointer bg-transparent border-none"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {selectedSize && (
                  <div className="flex items-center gap-2 text-xs sm:text-sm">
                    <span className="text-muted-foreground">Size:</span>
                    <span className="bg-zinc-900 text-destructive-foreground text-xs px-2.5 py-0.5 rounded-full font-semibold">
                      {selectedSize}
                    </span>
                  </div>
                )}

                {/* CTA Buttons — FIX: full-width stacked, always readable */}
                <div className="space-y-2.5 pt-1">
                  <Button
                    variant="default"
                    size="lg"
                    className="w-full gap-2 text-sm sm:text-base h-10 sm:h-11"
                    onClick={handleAddToCart}
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Add to Cart
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full text-sm sm:text-base h-10 sm:h-11"
                    onClick={handleBuyNow}
                  >
                    Buy Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* ── TABS ──────────────────────────────────────────────────────────── */}
      <div>
        {/* FIX: tabs scroll horizontally if they overflow */}
        <div className="flex border-b border-zinc-200 mb-8 ">
          {["reviews", "details"].map((tab) => (
            <Button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                // FIX: smaller px on mobile, nowrap
                "px-3 sm:px-6 py-3 text-xs sm:text-sm font-semibold capitalize transition-all border-b-2 -mb-px cursor-pointer bg-transparent rounded-none whitespace-nowrap shrink-0",
                activeTab === tab
                  ? "border-zinc-900 text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground",
              )}
              aria-pressed={activeTab === tab}
            >
              {tab === "reviews"
                ? `Reviews (${totalReviews})`
                : "Product Details"}
            </Button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* Reviews */}
          {activeTab === "reviews" && (
            <motion.div
              key="reviews"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              // FIX: stack on mobile, side-by-side from md
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {/* Summary */}
              <div className="space-y-5">
                <div className="text-center">
                  {/* FIX: large number smaller on 320px */}
                  <p className="text-5xl sm:text-6xl font-black tracking-tight">
                    {avgRating}
                  </p>
                  <div className="flex justify-center mt-2">
                    <StarRow rating={Math.round(Number(avgRating))} size={18} />
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-2 font-medium">
                    {totalReviews} reviews
                  </p>
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
                  className="w-full rounded-xl py-5 text-xs sm:text-sm font-bold border-2 border-zinc-900 hover:bg-zinc-900 hover:text-destructive-foreground transition-all duration-300 cursor-pointer"
                >
                  Write a Review
                </Button>
              </div>

              {/* Review Cards */}
              <div className="md:col-span-2 space-y-3">
                {MOCK_REVIEWS.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
            </motion.div>
          )}

          {/* Details */}
          {activeTab === "details" && (
            <motion.div
              key="details"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              // FIX: 1 col on mobile, 2 col from sm
              className="grid grid-cols-1 sm:grid-cols-2 gap-0 text-sm"
            >
              {DETAILS.map(({ label, value }) => (
                <div
                  key={label}
                  // FIX: wrap value on tiny screens
                  className="flex justify-between items-start gap-4 border-b border-border py-3.5"
                >
                  <span className="text-muted-foreground font-medium text-xs sm:text-sm shrink-0">
                    {label}
                  </span>
                  <span className="font-semibold text-right text-foreground text-xs sm:text-sm wrap-break-word">
                    {value}
                  </span>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── RELATED PRODUCTS ──────────────────────────────────────────────── */}
      {showRelated.length > 0 && (
        <div>
          <div className="flex justify-between items-center mb-5 sm:mb-8 gap-2">
            {/* FIX: title smaller on mobile */}
            <h2 className="text-base sm:text-xl font-bold tracking-tight">
              You may also like
            </h2>
            <Button
              onClick={() => navigate("/productcollection")}
              variant="ghost"
              size="sm"
              aria-label="View all men's products"
            >
              View All
              <span className="group-hover:translate-x-0.5 transition-transform">
                →
              </span>
            </Button>
          </div>
          {/* FIX: 2 cols always, 4 from md */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5">
            {showRelated.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onClick={() => navigate(`/product/${p.id}`)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
