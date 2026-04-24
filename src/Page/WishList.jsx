import { useNavigate } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import { ProductCard } from "../components/product/ProductCard";
import { Button } from "../components/ui/button";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";

export const WishlistPage = () => {
  const { wishlist } = useWishlist();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* HEADER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-14">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground font-semibold mb-2">
            Your Favourites
          </p>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Wishlist
          </h1>
          <p className="text-muted-foreground mt-1.5 text-sm">
            {wishlist.length > 0
              ? `${wishlist.length} item${wishlist.length > 1 ? "s" : ""} saved`
              : "Save your favorite items and shop later"}
          </p>
        </motion.div>
      </div>

      {/* EMPTY STATE */}
      {wishlist.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="flex flex-col items-center justify-center py-20 text-center px-4"
        >
          <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-6">
            <Heart className="w-8 h-8 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-semibold mb-2 tracking-tight">
            Your wishlist is empty
          </h2>
          <p className="text-muted-foreground mb-8 text-sm max-w-xs">
            Browse our collections and tap the heart icon to save items you love
          </p>

          <Button
            onClick={() => navigate("/collections")}
            variant="default"
            size="lg"
          >
            Explore Collections
          </Button>
        </motion.div>
      ) : (
        /* PRODUCT GRID */
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
            {wishlist.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
