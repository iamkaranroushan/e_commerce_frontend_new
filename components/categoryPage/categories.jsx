'use client';

import useCategories from "@/hooks/useCategories";
import ProductCard from "@/components/categoryPage/ProductsForShop";
import RouteLoader from "@/components/skeleton/RouteLoader";
import { FiBox } from "react-icons/fi";
import React, { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import CategoryHeaderSkeleton from "@/components/skeleton/CategoryHeaderSkeleton";
import ProductCardSkeleton from "@/components/skeleton/ProductCard2Skeleton";

const Categories = ({ setIsLoginOpen }) => {
  const { categories, loading, error } = useCategories();
  const [pageLoading, setPageLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  useEffect(() => {
    setPageLoading(false);
  }, [pathname, searchParams]);

  const handleCategoryClick = (categoryId) => {
    setPageLoading(true);
    router.push(`/categories/${categoryId}`);
  };

  // Skeleton UI while loading
  if (loading ) {
    return (
      <div className="flex flex-col gap-12 px-[clamp(0.5rem,5vw,10rem)] my-[clamp(4.5rem,5vw,10rem)]">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex flex-col gap-4">
            <CategoryHeaderSkeleton />
            <div className="flex items-start gap-6 overflow-x-auto hide-scrollbar py-4">
              {[...Array(3)].map((_, j) => (
                <ProductCardSkeleton key={j} />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }



  if ( pageLoading) {
    return <RouteLoader />
  }
  if (error) {
    return <div className="text-center text-red-500 mt-10">Error: {error}</div>;
  }

  return (
    <div className="flex flex-col gap-12 px-[clamp(0.5rem,5vw,10rem)] my-[clamp(4.5rem,5vw,10rem)]">
      {categories.map((category) => (
        <div key={category.id} className="flex flex-col gap-4">
          {/* Category Header with See More */}
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-stone-900 text-[clamp(1.5rem,2vw,3rem)] tracking-tight">
              {category.name}
            </h2>
            <Button
              onClick={() => handleCategoryClick(category.id)}
              variant="seeMore"
              size="seeMore"
            >
              See more
            </Button>
          </div>

          {/* Horizontal Scroll Section */}
          {category.products && category.products.length > 0 ? (
            <div className="flex items-start gap-6 overflow-x-auto hide-scrollbar py-4">
              {category.products.map((product) => (
                <div
                  key={product.id}
                  className="min-w-[220px] sm:min-w-[250px] md:min-w-[280px]"
                >
                  <ProductCard
                    product={product}
                    setIsLoginOpen={setIsLoginOpen}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-10 text-stone-500">
              <FiBox className="text-4xl mb-2" />
              <p className="text-sm">No products available</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Categories;
