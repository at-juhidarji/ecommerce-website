import React from "react";
import SectionContainer from "@/components/ui/SectionContainer";
import { products } from "@/Data/Product";
import { ProductCard } from "@/components/product/ProductCard";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export const ProductCollection = () => {

  const newArrivals = products.slice(0, 8);
  const recentlyViewed = products.slice(4, 12);
  const wishlist = products.slice(8, 16);

  const SectionBlock = ({ title, subtitle, data }) => (
    <div className="mb-14">
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


      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6">
        {data.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );

  return (
    <section className="bg-surface py-8">
      <SectionContainer>
       

       
        <SectionBlock
          title="New Arrivals"
          subtitle="Fresh styles just dropped"
          data={newArrivals}
        />

      
        <SectionBlock
          title="Recently Viewed"
          subtitle="Pick up where you left off"
          data={recentlyViewed}
        />

        <SectionBlock
          title="Wishlist"
          subtitle="Your saved favorites"
          data={wishlist}
        />
      </SectionContainer>
    </section>
  );
};