
import React from "react";
import { Skeleton } from "@/components/ui/Skeleton";

const CheckoutSkeleton = () => {
  return (
    <div className="mt-10 lg:mt-16 max-w-7xl lg:mx-auto lg:px-4">
      <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-6">
        
        {/* LEFT SECTION: Address + Payment */}
        <div className="lg:p-6 space-y-6">
          {/* Address Section */}
          <div className="bg-white px-4 py-6 rounded-xl shadow-sm">
            <Skeleton className="h-7 w-48 mb-8" /> {/* Title */}
            <div className="space-y-3">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-5 w-1/2" />
              <Skeleton className="h-5 w-2/3" />
              <Skeleton className="h-10 w-full mt-4 rounded-lg" /> {/* Add/Edit button */}
            </div>
          </div>

          {/* Payment Section */}
          <div className="bg-white px-4 py-6 rounded-xl shadow-sm">
            <Skeleton className="h-7 w-48 mb-8" /> {/* Title */}
            <div className="space-y-4">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-5 w-1/2" />
              <Skeleton className="h-10 w-full mt-4 rounded-lg" /> {/* Checkout button */}
            </div>
          </div>
        </div>

        {/* RIGHT SECTION: Order Summary */}
        <div className="bg-white p-4 sm:p-6 space-y-6 rounded-xl shadow-sm">
          <Skeleton className="h-8 w-48 mb-8" /> {/* Title */}

          {/* Cart Items (3 placeholder products) */}
          <div className="space-y-5 max-h-[400px] overflow-y-auto pr-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="flex items-start gap-4 border-b pb-4 border-stone-200"
              >
                <Skeleton className="w-24 h-24 rounded-md" /> {/* Product Image */}
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-5 w-3/4" /> {/* Product Name */}
                  <Skeleton className="h-4 w-1/2" /> {/* Description */}
                  <Skeleton className="h-4 w-1/3" /> {/* Price */}
                </div>
              </div>
            ))}
          </div>

          {/* Price Breakdown */}
          <div className="space-y-3 border-t pt-6">
            <div className="flex justify-between items-center">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-5 w-16" />
            </div>
            <div className="flex justify-between items-center">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-5 w-20" />
            </div>
            <div className="flex justify-between items-center border-t pt-4">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-6 w-20" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CheckoutSkeleton;
