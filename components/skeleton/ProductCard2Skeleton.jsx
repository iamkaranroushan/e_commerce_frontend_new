import React from "react";

const ProductCardSkeleton = () => {
  return (
    <div className="min-w-[220px] sm:min-w-[250px] md:min-w-[280px] flex flex-col items-center animate-pulse">
      {/* Image skeleton */}
      <div className="w-full aspect-square lg:h-[400px] bg-stone-300 rounded-[clamp(1.5rem,3vw,4rem)]"></div>
      
      {/* Product name skeleton */}
      <div className="mt-4 h-5 w-[60%] bg-stone-300 rounded-full"></div>
    </div>
  );
};

export default ProductCardSkeleton;
