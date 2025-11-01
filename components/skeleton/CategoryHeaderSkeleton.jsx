import React from "react";

const CategoryHeaderSkeleton = () => {
  return (
    <div className="flex items-center justify-between animate-pulse">
      {/* Category name skeleton */}
      <div className="h-8 w-[40%] bg-stone-300 rounded-lg"></div>
      
      {/* See More button skeleton */}
      <div className="h-8 w-24 bg-stone-300 rounded-full"></div>
    </div>
  );
};

export default CategoryHeaderSkeleton;
