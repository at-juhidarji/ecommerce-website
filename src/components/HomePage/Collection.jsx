import React, { useState, useMemo, useEffect, useCallback } from "react";
import { products } from "@/Data/Product";
import { ProductCard } from "@/components/product/ProductCard";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag,
  Footprints,
  Baby,
  Glasses,
  User,
  UserRound,
  ChevronDown,
  X,
  SlidersHorizontal,
  Star,
} from "lucide-react";

/* ─────────────────────────────────────────────
   CONSTANTS
───────────────────────────────────────────── */
const ITEMS_PER_PAGE = 8;

const CATEGORY_TABS = [
  { key: "bags", label: "Bags", icon: <ShoppingBag size={14} /> },
  { key: "sneakers", label: "Sneakers", icon: <Footprints size={14} /> },
  { key: "baby", label: "Baby", icon: <Baby size={14} /> },
  { key: "accessories", label: "Accessories", icon: <Glasses size={14} /> },
];

const PRICE_RANGES = [
  { label: "Under ₹500", min: 0, max: 500 },
  { label: "₹500 – ₹1,000", min: 500, max: 1000 },
  { label: "₹1,000 – ₹2,000", min: 1000, max: 2000 },
  { label: "₹2,000 – ₹3,500", min: 2000, max: 3500 },
  { label: "Over ₹3,500", min: 3500, max: Infinity },
];

const BRANDS = ["Nike", "Adidas", "Puma", "H&M", "Zara", "Levi's", "Reebok"];

const COLORS = [
  { label: "Black", hex: "#1a1a1a" },
  { label: "White", hex: "#e5e5e5" },
  { label: "Brown", hex: "#8B5E3C" },
  { label: "Navy", hex: "#1B2A6B" },
  { label: "Red", hex: "#C0392B" },
  { label: "Pink", hex: "#E91E8C" },
];

const DISCOUNTS = [
  { label: "10% or more", value: 10 },
  { label: "25% or more", value: 25 },
  { label: "50% or more", value: 50 },
];

/* ─────────────────────────────────────────────
   ACCORDION SECTION
───────────────────────────────────────────── */
const FilterSection = ({ title, children, defaultOpen = true }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-zinc-100 py-1">
      <Button
        onClick={() => setOpen(!open)}
        variant="ghost">
        {title}
        <ChevronDown
          size={14}
        />
      </Button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pb-3 flex flex-col gap-2">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ─────────────────────────────────────────────
   CHECKBOX ROW
───────────────────────────────────────────── */
const CheckRow = ({ label, checked, onChange, swatch, count }) => (
  <label className="flex items-center gap-2.5 cursor-pointer group">
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="w-3.5 h-3.5 rounded border-zinc-300 accent-orange-500 cursor-pointer flex-shrink-0"
    />
    {swatch && (
      <span
        className="w-3.5 h-3.5 rounded-full border border-zinc-200 flex-shrink-0"
        style={{ background: swatch }}
      />
    )}
    <span className="text-sm text-zinc-600 group-hover:text-zinc-900 transition-colors leading-tight">
      {label}
      {count !== undefined && (
        <span className="text-zinc-400 ml-1 text-xs">({count})</span>
      )}
    </span>
  </label>
);

/* ─────────────────────────────────────────────
   ACTIVE FILTER TAGS
───────────────────────────────────────────── */
const FilterTag = ({ label, onRemove }) => (
  <span className="inline-flex items-center gap-1 bg-orange-50 border border-orange-200 text-orange-700 text-xs px-2.5 py-1 rounded-full">
    {label}
    <Button onClick={onRemove} variant="ghost" >
      <X size={10} />
    </Button>
  </span>
);

/* ─────────────────────────────────────────────
   SIDEBAR FILTER PANEL
───────────────────────────────────────────── */
const FilterSidebar = ({ filters, setters, productCount }) => {
  const {
    selectedPriceRanges,
    minRating,
    selectedBrands,
    selectedColors,
    selectedDiscount,
    sort,
    search,
  } = filters;

  const {
    setSelectedPriceRanges,
    setMinRating,
    setSelectedBrands,
    setSelectedColors,
    setSelectedDiscount,
    setSort,
    setSearch,
    clearAll,
  } = setters;

  const toggle = (setter, arr, val) =>
    setter(arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val]);

  // Collect all active tag labels for the top pill strip
  const activeTags = [
    ...selectedPriceRanges.map((r) => ({ label: r, onRemove: () => toggle(setSelectedPriceRanges, selectedPriceRanges, r) })),
    ...selectedBrands.map((b) => ({ label: b, onRemove: () => toggle(setSelectedBrands, selectedBrands, b) })),
    ...selectedColors.map((c) => ({ label: c, onRemove: () => toggle(setSelectedColors, selectedColors, c) })),
    ...selectedDiscount.map((d) => ({ label: `${d}%+ off`, onRemove: () => toggle(setSelectedDiscount, selectedDiscount, d) })),
    ...(minRating > 0 ? [{ label: `${minRating}★ & up`, onRemove: () => setMinRating(0) }] : []),
  ];

  const hasFilters = activeTags.length > 0;

  return (
    <aside className="w-56 shrink-0">
      {/* Header */}
      <div className="flex items-center justify-between py-3 border-b border-zinc-200 mb-1">
        <h3 className="text-sm font-semibold text-zinc-900 flex items-center gap-2">
          <SlidersHorizontal size={14} className="text-zinc-400" />
          Filters
        </h3>
        {hasFilters && (
          <Button
            onClick={clearAll}
            variant="ghost">
            Clear all
          </Button>
        )}
      </div>

      {/* Active tags */}
      {hasFilters && (
        <div className="flex flex-wrap gap-1.5 pb-3 border-b border-zinc-100">
          {activeTags.map((t) => (
            <FilterTag key={t.label} label={t.label} onRemove={t.onRemove} />
          ))}
        </div>
      )}

      {/* Result count */}
      <p className="text-xs text-zinc-400 py-2 border-b border-zinc-100">
        {productCount} result{productCount !== 1 ? "s" : ""}
      </p>

      {/* ── Sort ── */}
      <FilterSection title="Sort by">
        {[
          { val: "", label: "Featured" },
          { val: "low", label: "Price: Low → High" },
          { val: "high", label: "Price: High → Low" },
          { val: "rating", label: "Avg. Customer Review" },
        ].map((opt) => (
          <label key={opt.val} className="flex items-center gap-2.5 cursor-pointer group">
            <input
              type="radio"
              name="sort"
              checked={sort === opt.val}
              onChange={() => setSort(opt.val)}
              className="w-3.5 h-3.5 accent-orange-500 cursor-pointer"
            />
            <span className="text-sm text-zinc-600 group-hover:text-zinc-900 transition-colors">
              {opt.label}
            </span>
          </label>
        ))}
      </FilterSection>

      {/* ── Customer Rating ── */}
      <FilterSection title="Customer Rating">
        {[4, 3, 2].map((r) => (
          <label key={r} className="flex items-center gap-2.5 cursor-pointer group">
            <input
              type="radio"
              name="rating"
              checked={minRating === r}
              onChange={() => setMinRating(minRating === r ? 0 : r)}
              className="w-3.5 h-3.5 accent-orange-500 cursor-pointer"
            />
            <span className="flex items-center gap-1 text-sm text-zinc-600 group-hover:text-zinc-900 transition-colors">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={11}
                  className={i < r ? "fill-orange-400 text-orange-400" : "text-zinc-200 fill-zinc-200"}
                />
              ))}
              <span className="text-zinc-400 text-xs ml-0.5">& up</span>
            </span>
          </label>
        ))}
      </FilterSection>

      {/* ── Price ── */}
      <FilterSection title="Price">
        {PRICE_RANGES.map((range) => (
          <CheckRow
            key={range.label}
            label={range.label}
            checked={selectedPriceRanges.includes(range.label)}
            onChange={() => toggle(setSelectedPriceRanges, selectedPriceRanges, range.label)}
          />
        ))}
      </FilterSection>

      {/* ── Brand ── */}
      <FilterSection title="Brand">
        {BRANDS.map((b) => (
          <CheckRow
            key={b}
            label={b}
            checked={selectedBrands.includes(b)}
            onChange={() => toggle(setSelectedBrands, selectedBrands, b)}
          />
        ))}
      </FilterSection>

      {/* ── Color ── */}
      <FilterSection title="Color">
        {COLORS.map((c) => (
          <CheckRow
            key={c.label}
            label={c.label}
            swatch={c.hex}
            checked={selectedColors.includes(c.label)}
            onChange={() => toggle(setSelectedColors, selectedColors, c.label)}
          />
        ))}
      </FilterSection>

      {/* ── Discount ── */}
      <FilterSection title="Discount">
        {DISCOUNTS.map((d) => (
          <CheckRow
            key={d.value}
            label={d.label}
            checked={selectedDiscount.includes(d.value)}
            onChange={() => toggle(setSelectedDiscount, selectedDiscount, d.value)}
          />
        ))}
      </FilterSection>
    </aside>
  );
};

/* ─────────────────────────────────────────────
   CATEGORY TAB Button
───────────────────────────────────────────── */
const CatBtn = ({ cat, active, onClick }) => (
  <Button
    variant="ghost"
    onClick={onClick}
    className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium border transition-all duration-300 cursor-pointer ${
      active
        ? "bg-zinc-900 text-white border-zinc-900 shadow-lg shadow-zinc-900/20"
        : "bg-white text-zinc-600 border-zinc-200 hover:border-zinc-400 hover:text-zinc-900"
    }`}
  >
    {cat.icon}
    <span className="capitalize">{cat.label}</span>
  </Button>
);

/* ─────────────────────────────────────────────
   MOBILE FILTER DRAWER
───────────────────────────────────────────── */
const MobileFilterDrawer = ({ open, onClose, children }) => (
  <AnimatePresence>
    {open && (
      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={onClose}
        />
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed left-0 top-0 bottom-0 w-72 bg-white z-50 overflow-y-auto shadow-xl md:hidden"
        >
          <div className="flex items-center justify-between p-4 border-b border-zinc-100">
            <span className="font-semibold text-zinc-900">Filters</span>
            <Button onClick={onClose} className="text-zinc-400 hover:text-zinc-900">
              <X size={18} />
            </Button>
          </div>
          <div className="p-4">{children}</div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export const ProductCollection = () => {
  const navigate = useNavigate();

  /* ── Tab state ── */
  const [selectedCategory, setSelectedCategory] = useState("bags");

  /* ── Filter state ── */
  const [sort, setSort] = useState("");
  const [minRating, setMinRating] = useState(0);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedDiscount, setSelectedDiscount] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  /* ── Data splits ── */
  const menProducts = products.filter((p) => p.category === "men");
  const womenProducts = products.filter((p) => p.category === "women");
  const otherProducts = products.filter(
    (p) => p.category !== "men" && p.category !== "women"
  );

  /* ── Clear all ── */
  const clearAll = useCallback(() => {
    setSort("");
    setMinRating(0);
    setSelectedPriceRanges([]);
    setSelectedBrands([]);
    setSelectedColors([]);
    setSelectedDiscount([]);
    setSearch("");
  }, []);

  /* ── Filter + sort logic ── */
  const categoryProducts = useMemo(() => {
    let filtered = otherProducts.filter((p) => p.category === selectedCategory);

    if (search) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (minRating > 0) {
      filtered = filtered.filter((p) => (p.rating ?? 0) >= minRating);
    }

    if (selectedPriceRanges.length > 0) {
      filtered = filtered.filter((p) =>
        selectedPriceRanges.some((label) => {
          const range = PRICE_RANGES.find((r) => r.label === label);
          return range && p.price >= range.min && p.price <= range.max;
        })
      );
    }

    if (selectedBrands.length > 0) {
      filtered = filtered.filter((p) =>
        selectedBrands.includes(p.brand)
      );
    }

    if (selectedColors.length > 0) {
      filtered = filtered.filter((p) =>
        selectedColors.includes(p.color)
      );
    }

    if (selectedDiscount.length > 0) {
      const minDiscount = Math.min(...selectedDiscount);
      filtered = filtered.filter((p) => (p.discount ?? 0) >= minDiscount);
    }

    if (sort === "low") filtered = [...filtered].sort((a, b) => a.price - b.price);
    if (sort === "high") filtered = [...filtered].sort((a, b) => b.price - a.price);
    if (sort === "rating") filtered = [...filtered].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));

    return filtered;
  }, [
    selectedCategory,
    sort,
    minRating,
    selectedPriceRanges,
    selectedBrands,
    selectedColors,
    selectedDiscount,
    search,
    otherProducts,
  ]);

  /* ── Pagination ── */
  const totalPages = Math.ceil(categoryProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = categoryProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  /* ── Reset page on filter change ── */
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, sort, minRating, selectedPriceRanges, selectedBrands, selectedColors, selectedDiscount, search]);

  const filters = { sort, minRating, selectedPriceRanges, selectedBrands, selectedColors, selectedDiscount, search };
  const setters = { setSort, setMinRating, setSelectedPriceRanges, setSelectedBrands, setSelectedColors, setSelectedDiscount, setSearch, clearAll };

  const sidebarNode = (
    <FilterSidebar
      filters={filters}
      setters={setters}
      productCount={categoryProducts.length}
    />
  );

  return (
    <section id="collection" className="bg-white py-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">

        {/* ── TITLE ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 font-semibold mb-3">
            Curated for You
          </p>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Our Collection
          </h1>
          <p className="text-zinc-400 mt-3 text-sm max-w-md mx-auto">
            Premium fashion curated for modern lifestyle
          </p>
        </motion.div>

        {/* ── MEN ── */}
        <div className="mb-14">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Men</h2>
              <p className="text-zinc-400 text-sm mt-0.5">Essentials for him</p>
            </div>
            <Button
              onClick={() => navigate("/collections?category=men")}
              className="text-sm text-zinc-400 cursor-pointer hover:text-zinc-900 transition-colors font-medium group flex items-center gap-1"
            >
              View All
              <span className="group-hover:translate-x-0.5 transition-transform">→</span>
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6">
            {menProducts.slice(0, 4).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>

        {/* ── WOMEN ── */}
        <div className="mb-14">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Women</h2>
              <p className="text-zinc-400 text-sm mt-0.5">Curated essentials for her</p>
            </div>
            <Button
              onClick={() => navigate("/collections?category=women")}
              className="text-sm text-zinc-400 cursor-pointer hover:text-zinc-900 transition-colors font-medium group flex items-center gap-1"
            >
              View All
              <span className="group-hover:translate-x-0.5 transition-transform">→</span>
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6">
            {womenProducts.slice(0, 4).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>

        {/* ── EXPLORE CATEGORIES ── */}
        <div className="mb-12">
          <div className="mb-6">
            <h2 className="text-2xl font-bold tracking-tight">Explore Categories</h2>
            <p className="text-zinc-400 text-sm mt-0.5">Browse by category</p>
          </div>

          {/* Category tabs */}
          <div className="flex flex-wrap gap-2.5 mb-6">
            {CATEGORY_TABS.map((cat) => (
              <CatBtn
                key={cat.key}
                cat={cat}
                active={selectedCategory === cat.key}
                onClick={() => setSelectedCategory(cat.key)}
              />
            ))}
          </div>

          {/* Search bar + mobile filter toggle */}
          <div className="flex items-center gap-3 mb-6">
            <input
              type="text"
              placeholder={`Search in ${selectedCategory}...`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 max-w-xs border border-zinc-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-zinc-400 transition-colors placeholder-zinc-300"
            />
            {/* Mobile filter Button */}
            <Button
              onClick={() => setMobileFiltersOpen(true)}
              className="md:hidden flex items-center gap-2 px-4 py-2.5 border border-zinc-200 rounded-xl text-sm text-zinc-600 hover:border-zinc-400 transition-colors"
            >
              <SlidersHorizontal size={14} />
              Filters
            </Button>
          </div>

          {/* Layout: sidebar + grid */}
          <div className="flex gap-8 items-start">

            {/* ── Desktop Sidebar ── */}
            <div className="hidden md:block sticky top-6">
              {sidebarNode}
            </div>

            {/* ── Products ── */}
            <div className="flex-1 min-w-0">

              {/* Result info */}
              <div className="flex items-center justify-between mb-5 pb-3 border-b border-zinc-100">
                <p className="text-sm text-zinc-500">
                  Showing{" "}
                  <span className="font-medium text-zinc-800">
                    {Math.min((currentPage - 1) * ITEMS_PER_PAGE + 1, categoryProducts.length) || 0}–
                    {Math.min(currentPage * ITEMS_PER_PAGE, categoryProducts.length)}
                  </span>{" "}
                  of{" "}
                  <span className="font-medium text-zinc-800">
                    {categoryProducts.length}
                  </span>{" "}
                  results
                </p>
              </div>

              {/* Grid */}
              {paginatedProducts.length > 0 ? (
                <motion.div
                  key={selectedCategory + currentPage}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
                >
                  {paginatedProducts.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center py-20 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-zinc-50 flex items-center justify-center mb-4">
                    <ShoppingBag className="w-7 h-7 text-zinc-300" />
                  </div>
                  <h3 className="text-lg font-semibold tracking-tight mb-1">
                    No products found
                  </h3>
                  <p className="text-zinc-400 text-sm mb-4">
                    Try adjusting your filters
                  </p>
                  <Button
                    onClick={clearAll}
                    className="text-sm text-orange-500 hover:text-orange-700 font-medium transition-colors"
                  >
                    Clear all filters
                  </Button>
                </motion.div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-10 gap-2 flex-wrap">
                  <Button
                    variant="ghost"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-3 h-10 rounded-xl text-sm text-zinc-500 disabled:opacity-30 cursor-pointer"
                  >
                    ← Prev
                  </Button>
                  {Array.from({ length: totalPages }, (_, i) => (
                    <Button
                      key={i}
                      variant="ghost"
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-10 h-10 rounded-xl text-sm font-medium cursor-pointer transition-all duration-200 ${
                        currentPage === i + 1
                          ? "bg-zinc-900 text-white shadow-md hover:bg-zinc-800 hover:text-white"
                          : "bg-zinc-50 text-zinc-500 hover:bg-zinc-100"
                      }`}
                    >
                      {i + 1}
                    </Button>
                  ))}
                  <Button
                    variant="ghost"
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="px-3 h-10 rounded-xl text-sm text-zinc-500 disabled:opacity-30 cursor-pointer"
                  >
                    Next →
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile Filter Drawer ── */}
      <MobileFilterDrawer
        open={mobileFiltersOpen}
        onClose={() => setMobileFiltersOpen(false)}
      >
        {sidebarNode}
      </MobileFilterDrawer>
    </section>
  );
};