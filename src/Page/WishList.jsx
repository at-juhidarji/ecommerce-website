import { useNavigate } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import { ProductCard } from "../components/product/ProductCard";
import { Button } from "../components/ui/button";
export const WishlistPage = () => {
  const { wishlist } = useWishlist();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">

      {/* HEADER */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-3xl md:text-4xl font-bold">
          Your Wishlist ❤️
        </h1>
        <p className="text-gray-500 mt-1">
          Save your favorite items and shop later
        </p>
      </div>

      {/* EMPTY STATE */}
      {wishlist.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <h2 className="text-xl font-semibold mb-2">
            Your wishlist is empty 💔
          </h2>
          <p className="text-gray-500 mb-6">
            Start adding products you love
          </p>

          <Button
            onClick={() => navigate("/collections")}
            className="bg-black text-white px-6 py-2 rounded-lg cursor-pointer"
          >
            Explore Collections
          </Button>
        </div>
      ) : (
        /* PRODUCT GRID */
        <div className="max-w-7xl mx-auto px-4 pb-16">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlist.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};