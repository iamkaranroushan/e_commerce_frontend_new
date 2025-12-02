"use client";
import React from "react";

const ProductCarouselSkeleton = () => {
  // We show 1–3 placeholder slides depending on screen size
  const placeholders = [1, 2, 3];

  return (
    <div className="relative w-full h-full overflow-hidden">
      <div className="flex w-full h-full">
        {placeholders.map((i) => (
          <div
            key={i}
            className="w-full h-full flex-shrink-0 flex flex-col lg:flex-row animate-pulse"
          >
            {/* LEFT: Image skeleton */}
            <div
              className="
                w-full
                lg:w-1/2
                flex
                items-center
                justify-center
                px-6
                py-12
                md:py-16
              "
            >
              <div className="w-[55%] max-w-[320px] aspect-square bg-stone-200 rounded-xl"></div>
            </div>

            {/* RIGHT: Info skeleton */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center py-[clamp(4rem,5vw,2rem)] px-[clamp(1rem,5vw,3rem)]">
              {/* Title */}
              <div className="h-8 w-[60%] bg-stone-200 rounded-lg mb-4"></div>

              {/* Description lines */}
              <div className="h-4 w-[80%] bg-stone-200 rounded mb-2"></div>
              <div className="h-4 w-[70%] bg-stone-200 rounded mb-4"></div>

              {/* Price */}
              <div className="h-8 w-[120px] bg-stone-200 rounded mb-6"></div>

              {/* Button */}
              <div className="h-11 w-[160px] bg-stone-300 rounded-full"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCarouselSkeleton;
