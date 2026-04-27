import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { ProductCard } from "@/components/product/ProductCard";
import HeroSlider from "@/components/ui/HeroSlider";
import { Button } from "../ui/button";
import { motion } from "framer-motion";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export const CollectionLayout = ({
  title,
  subtitle,
  images,
  products,
  glowColor = "bg-warning",
}) => {
  const navigate = useNavigate();

  return (
    <section
      className="bg-surface py-6 px-4 sm:px-6 text-foreground"
      role="region"
      aria-labelledby={`${title}-heading`}
    >
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto mb-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">Home</Link>
              </BreadcrumbLink>
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
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-14"
      >
        <h1
          id={`${title}-heading`}
          className="text-4xl md:text-5xl font-black uppercase tracking-tight"
        >
          {title}
        </h1>
        <p className="text-muted-foreground mt-3 uppercase tracking-[0.2em] text-xs font-medium">
          {subtitle}
        </p>
        <div className="w-16 h-1 bg-foreground mx-auto mt-5 rounded-full" />
      </motion.div>

      {/* Slider */}
      <div className="relative mb-16">
        <div
          className={`absolute inset-0 blur-3xl opacity-10 ${glowColor} rounded-3xl`}
        />

        <HeroSlider images={images} />
      </div>

      {/* Products */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8 pb-12">
        {products.map((product) => (
          <div key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
};
