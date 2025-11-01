"use client";

import { useParams } from "next/navigation";
import useProductsByCategory from "@/hooks/useProductsByCategory";
import { useState } from "react";
import ProductCard from "@/components/categoryPage/productCard";
import Login from "@/components/custom/login";
import { ProductCard1Skeleton } from "@/components/skeleton/productCardSkeleton";

const ProductsPage = () => {
  const { categoryId } = useParams();
  const { products, loading, error } = useProductsByCategory({ categoryId });
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  // 🦴 Show Skeleton Loader when loading
  if (loading) {
    return (
      <div className="mt-6 lg:mt-10 lg:px-20 px-3">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Limit to 8 skeletons (2 rows on large screens) */}
          {Array(8)
            .fill(0)
            .map((_, i) => (
              <ProductCard1Skeleton
                key={i}
                className="w-full h-60 lg:h-80 rounded-lg"
              />
            ))}
        </div>
      </div>
    );
  }

  // 🧨 Handle error
  if (error)
    return (
      <div className="flex justify-center items-center h-[70vh] text-red-600 font-medium">
        Error: {error}
      </div>
    );

  // ✅ Main Product Grid
  return (
    <>
      {isLoginOpen && (
        <Login
          setIsLoginOpen={setIsLoginOpen}
          onClose={() => setIsLoginOpen(false)}
        />
      )}

      <div
        className={`mt-6 lg:mt-10 lg:px-20 px-3 transition-all duration-300 ${
          isLoginOpen ? "blur-sm" : ""
        }`}
      >
        {products.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                setIsLoginOpen={setIsLoginOpen}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center h-[60vh] text-neutral-500">
            <p className="text-lg font-medium">No products found</p>
            <p className="text-sm text-neutral-400">
              Try exploring another category.
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductsPage;
