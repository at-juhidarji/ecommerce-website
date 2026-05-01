import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, SlidersHorizontal, X, ChevronDown, Star, ShoppingBag } from "lucide-react";
import { ProductCard } from "@/components/product/ProductCard";
import HeroSlider from "@/components/ui/HeroSlider";
import { Button } from "../ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink,
  BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useState, useMemo, useCallback } from "react";

/* ─────────────────────────────────────────────
   CONSTANTS
───────────────────────────────────────────── */
const ITEMS_PER_PAGE = 8;

const PRICE_RANGES = [
  { label: "Under ₹500",       min: 0,    max: 500      },
  { label: "₹500 – ₹1,000",   min: 500,  max: 1000     },
  { label: "₹1,000 – ₹2,000", min: 1000, max: 2000     },
  { label: "₹2,000 – ₹3,500", min: 2000, max: 3500     },
  { label: "Over ₹3,500",      min: 3500, max: Infinity },
];

const BRANDS   = ["Nike", "Adidas", "Puma", "H&M", "Zara", "Levi's", "Reebok"];
const COLORS   = [
  { label: "Black", hex: "#1a1a1a" },
  { label: "White", hex: "#e5e5e5" },
  { label: "Brown", hex: "#8B5E3C" },
  { label: "Navy",  hex: "#1B2A6B" },
  { label: "Red",   hex: "#C0392B" },
  { label: "Pink",  hex: "#E91E8C" },
];
const DISCOUNTS = [
  { label: "10% or more", value: 10 },
  { label: "25% or more", value: 25 },
  { label: "50% or more", value: 50 },
];

/* ─────────────────────────────────────────────
   REUSABLE PRIMITIVES  (copied from ProductCollection)
───────────────────────────────────────────── */
const FilterSection = ({ title, children, defaultOpen = true }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-border py-1">
      <Button onClick={() => setOpen(!open)} variant="ghost" size="sm">
        {title} <ChevronDown size={14} />
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

const CheckRow = ({ label, checked, onChange, swatch }) => (
  <label className="flex items-center gap-2.5 cursor-pointer group">
    <span className="relative shrink-0 w-3.5 h-3.5">
      <Input type="checkbox" checked={checked} onChange={onChange} className="hidden peer" />
      <span className="absolute inset-0 rounded border border-border bg-surface peer-checked:bg-primary peer-checked:border-primary transition-colors duration-150" />
      <svg viewBox="0 0 10 8" className="absolute inset-0 w-full h-full p-0.5 text-primary-foreground opacity-0 peer-checked:opacity-100 transition-opacity duration-150 pointer-events-none" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="1,4 3.8,7 9,1" />
      </svg>
    </span>
    {swatch && <span className="w-3.5 h-3.5 rounded-full border border-border shrink-0" style={{ background: swatch }} />}
    <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors leading-tight">
      {label}
    </span>
  </label>
);

const FilterTag = ({ label, onRemove }) => (
  <span className="inline-flex items-center gap-1 bg-muted border border-primary text-primary text-xs px-2.5 py-1 rounded-full">
    {label}
    <Button onClick={onRemove} variant="ghost" size="icon" className="w-4 h-4">
      <X size={10} />
    </Button>
  </span>
);

const MobileFilterDrawer = ({ open, onClose, children }) => (
  <AnimatePresence>
    {open && (
      <>
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={onClose}
        />
        <motion.div
          initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed left-0 top-0 bottom-0 w-72 bg-surface z-50 overflow-y-auto shadow-xl md:hidden"
        >
          <div className="flex items-center justify-between p-4 border-b border-border">
            <span className="font-semibold text-foreground">Filters</span>
            <Button onClick={onClose} variant="ghost" size="icon"><X size={18} /></Button>
          </div>
          <div className="p-4">{children}</div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

/* ─────────────────────────────────────────────
   SIDEBAR
───────────────────────────────────────────── */
const FilterSidebar = ({ filters, setters, productCount }) => {
  const {
    selectedPriceRanges, minRating, selectedBrands,
    selectedColors, selectedDiscount, sort,
  } = filters;
  const {
    setSelectedPriceRanges, setMinRating, setSelectedBrands,
    setSelectedColors, setSelectedDiscount, setSort, clearAll,
  } = setters;

  const toggle = (setter, arr, val) =>
    setter(arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val]);

  const activeTags = [
    ...selectedPriceRanges.map((r) => ({ label: r,           onRemove: () => toggle(setSelectedPriceRanges, selectedPriceRanges, r) })),
    ...selectedBrands.map((b)      => ({ label: b,           onRemove: () => toggle(setSelectedBrands, selectedBrands, b) })),
    ...selectedColors.map((c)      => ({ label: c,           onRemove: () => toggle(setSelectedColors, selectedColors, c) })),
    ...selectedDiscount.map((d)    => ({ label: `${d}%+ off`,onRemove: () => toggle(setSelectedDiscount, selectedDiscount, d) })),
    ...(minRating > 0 ? [{ label: `${minRating}★ & up`, onRemove: () => setMinRating(0) }] : []),
  ];

  return (
    <aside className="w-56 shrink-0">
      {/* Header */}
      <div className="flex items-center justify-between py-3 border-b border-border mb-1">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <SlidersHorizontal size={14} className="text-muted-foreground" />
          Filters
        </h3>
        {activeTags.length > 0 && (
          <Button onClick={clearAll} variant="ghost" size="sm">Clear all</Button>
        )}
      </div>

      {/* Active tags */}
      {activeTags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pb-3 border-b border-border">
          {activeTags.map((t) => <FilterTag key={t.label} label={t.label} onRemove={t.onRemove} />)}
        </div>
      )}

      {/* Result count */}
      <p className="text-xs text-muted-foreground py-2 border-b border-border">
        {productCount} result{productCount !== 1 ? "s" : ""}
      </p>

      {/* Sort */}
      <FilterSection title="Sort by">
        {[
          { val: "",       label: "Featured" },
          { val: "low",    label: "Price: Low → High" },
          { val: "high",   label: "Price: High → Low" },
          { val: "rating", label: "Avg. Customer Review" },
        ].map((opt) => (
          <label key={opt.val} className="flex items-center gap-2.5 cursor-pointer group">
            <span className="relative shrink-0 w-3.5 h-3.5">
              <Input type="radio" name="sort" checked={sort === opt.val} onChange={() => setSort(opt.val)} className="hidden peer" />
              <span className="absolute inset-0 rounded-full border border-border bg-surface peer-checked:border-primary transition-colors duration-150" />
              <span className="absolute inset-0.75 rounded-full bg-primary scale-0 peer-checked:scale-100 transition-transform duration-150 origin-center" />
            </span>
            <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{opt.label}</span>
          </label>
        ))}
      </FilterSection>

      {/* Rating */}
      <FilterSection title="Customer Rating">
        {[4, 3, 2].map((r) => (
          <label key={r} className="flex items-center gap-2.5 cursor-pointer group">
            <span className="relative shrink-0 w-3.5 h-3.5">
              <Input type="radio" name="rating" checked={minRating === r} onChange={() => setMinRating(minRating === r ? 0 : r)} className="hidden peer" />
              <span className="absolute inset-0 rounded-full border border-border bg-surface peer-checked:border-primary transition-colors duration-150" />
              <span className="absolute inset-0.75 rounded-full bg-primary scale-0 peer-checked:scale-100 transition-transform duration-150 origin-center" />
            </span>
            <span className="flex items-center gap-1 text-sm text-muted-foreground group-hover:text-foreground transition-colors">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={11} className={i < r ? "fill-primary text-primary" : "text-muted-foreground"} />
              ))}
              <span className="text-xs ml-0.5">& up</span>
            </span>
          </label>
        ))}
      </FilterSection>

      {/* Price */}
      <FilterSection title="Price">
        {PRICE_RANGES.map((range) => (
          <CheckRow key={range.label} label={range.label}
            checked={selectedPriceRanges.includes(range.label)}
            onChange={() => toggle(setSelectedPriceRanges, selectedPriceRanges, range.label)}
          />
        ))}
      </FilterSection>

      {/* Brand */}
      <FilterSection title="Brand">
        {BRANDS.map((b) => (
          <CheckRow key={b} label={b}
            checked={selectedBrands.includes(b)}
            onChange={() => toggle(setSelectedBrands, selectedBrands, b)}
          />
        ))}
      </FilterSection>

      {/* Color */}
      <FilterSection title="Color">
        {COLORS.map((c) => (
          <CheckRow key={c.label} label={c.label} swatch={c.hex}
            checked={selectedColors.includes(c.label)}
            onChange={() => toggle(setSelectedColors, selectedColors, c.label)}
          />
        ))}
      </FilterSection>

      {/* Discount */}
      <FilterSection title="Discount">
        {DISCOUNTS.map((d) => (
          <CheckRow key={d.value} label={d.label}
            checked={selectedDiscount.includes(d.value)}
            onChange={() => toggle(setSelectedDiscount, selectedDiscount, d.value)}
          />
        ))}
      </FilterSection>
    </aside>
  );
};

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export const CollectionLayout = ({
  title,
  subtitle,
  images,
  products,
  glowColor = "bg-warning",
}) => {
  /* ── Filter state ── */
  const [sort,                 setSort]                 = useState("");
  const [minRating,            setMinRating]            = useState(0);
  const [selectedPriceRanges,  setSelectedPriceRanges]  = useState([]);
  const [selectedBrands,       setSelectedBrands]       = useState([]);
  const [selectedColors,       setSelectedColors]       = useState([]);
  const [selectedDiscount,     setSelectedDiscount]     = useState([]);
  const [search,               setSearch]               = useState("");
  const [currentPage,          setCurrentPage]          = useState(1);
  const [mobileFiltersOpen,    setMobileFiltersOpen]    = useState(false);

  /* ── Clear all ── */
  const clearAll = useCallback(() => {
    setSort(""); setMinRating(0); setSelectedPriceRanges([]);
    setSelectedBrands([]); setSelectedColors([]); setSelectedDiscount([]);
    setSearch(""); setCurrentPage(1);
  }, []);

  /* ── Filtered + sorted products ── */
  const filteredProducts = useMemo(() => {
    let list = [...products];

    if (search)
      list = list.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));

    if (minRating > 0)
      list = list.filter((p) => (p.rating ?? 0) >= minRating);

    if (selectedPriceRanges.length > 0)
      list = list.filter((p) =>
        selectedPriceRanges.some((label) => {
          const r = PRICE_RANGES.find((r) => r.label === label);
          return r && p.price >= r.min && p.price <= r.max;
        })
      );

    if (selectedBrands.length > 0)
      list = list.filter((p) => selectedBrands.includes(p.brand));

    if (selectedColors.length > 0)
      list = list.filter((p) => selectedColors.includes(p.color));

    if (selectedDiscount.length > 0) {
      const minD = Math.min(...selectedDiscount);
      list = list.filter((p) => (p.discount ?? 0) >= minD);
    }

    if (sort === "low")    list.sort((a, b) => a.price - b.price);
    if (sort === "high")   list.sort((a, b) => b.price - a.price);
    if (sort === "rating") list.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));

    return list;
  }, [products, search, minRating, selectedPriceRanges, selectedBrands, selectedColors, selectedDiscount, sort]);

  /* ── Pagination ── */
  const totalPages       = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const filters = { sort, minRating, selectedPriceRanges, selectedBrands, selectedColors, selectedDiscount, search };
  const setters = { setSort, setMinRating, setSelectedPriceRanges, setSelectedBrands, setSelectedColors, setSelectedDiscount, setSearch, clearAll };

  const sidebarNode = (
    <FilterSidebar filters={filters} setters={setters} productCount={filteredProducts.length} />
  );

  return (
    <section className="bg-surface py-6 text-foreground" role="region" aria-labelledby={`${title}-heading`}>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto mb-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="capitalize">{title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        className="text-center mb-14"
      >
        <h1 id={`${title}-heading`} className="text-4xl md:text-5xl font-black uppercase tracking-tight">
          {title}
        </h1>
        <p className="text-muted-foreground mt-3 uppercase tracking-[0.2em] text-xs font-medium">{subtitle}</p>
        <div className="w-16 h-1 bg-foreground mx-auto mt-5 rounded-full" />
      </motion.div>

      {/* Slider */}
      <div className="relative mb-16">
        <div className={`absolute inset-0 blur-3xl opacity-10 ${glowColor} rounded-3xl`} />
        <HeroSlider images={images} />
      </div>

      {/* Search + mobile filter toggle */}
      <div className="max-w-7xl mx-auto flex items-center gap-3 mb-6">
        <Input
          type="text"
          placeholder={`Search in ${title}...`}
          value={search}
          onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
          className="flex-1 max-w-xs"
        />
        <Button onClick={() => setMobileFiltersOpen(true)} variant="outline" size="sm" className="md:hidden">
          <SlidersHorizontal size={14} /> Filters
        </Button>
      </div>

      {/* Sidebar + Grid */}
      <div className="max-w-7xl mx-auto flex gap-8 items-start">

        {/* Desktop sidebar */}
        <div className="hidden md:block sticky top-6">{sidebarNode}</div>

        {/* Products */}
        <div className="flex-1 min-w-0">
          {/* Result info */}
          <div className="flex items-center justify-between mb-5 pb-3 border-b border-border">
            <p className="text-sm text-muted-foreground">
              Showing{" "}
              <span className="font-medium text-foreground">
                {Math.min((currentPage - 1) * ITEMS_PER_PAGE + 1, filteredProducts.length) || 0}
                –{Math.min(currentPage * ITEMS_PER_PAGE, filteredProducts.length)}
              </span>{" "}
              of <span className="font-medium text-foreground">{filteredProducts.length}</span> results
            </p>
          </div>

          {/* Grid or empty state */}
          {paginatedProducts.length > 0 ? (
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
              className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
            >
              {paginatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <ShoppingBag className="w-7 h-7 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold tracking-tight mb-1">No products found</h3>
              <p className="text-muted-foreground text-sm mb-4">Try adjusting your filters</p>
              <Button onClick={clearAll} variant="ghost" size="sm">Clear all filters</Button>
            </motion.div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-10 gap-2 flex-wrap">
              <Button variant="ghost" size="sm" onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1}>
                ← Prev
              </Button>
              {Array.from({ length: totalPages }, (_, i) => (
                <Button
                  key={i} size="sm"
                  variant={currentPage === i + 1 ? "default" : "ghost"}
                  onClick={() => setCurrentPage(i + 1)}
                  className={currentPage === i + 1 ? "" : "text-muted-foreground"}
                >
                  {i + 1}
                </Button>
              ))}
              <Button variant="ghost" size="sm" onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>
                Next →
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile drawer */}
      <MobileFilterDrawer open={mobileFiltersOpen} onClose={() => setMobileFiltersOpen(false)}>
        {sidebarNode}
      </MobileFilterDrawer>
    </section>
  );
};