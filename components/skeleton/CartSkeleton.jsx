import React from "react";
import { Skeleton } from "@/components/ui/Skeleton";

const CartSkeleton = () => {
  return (
    <div className="flex flex-col h-[100dvh] lg:h-auto">
      {/* Scrollable Cart Section */}
      <div className="flex-1 overflow-y-auto px-4 lg:pt-6 pb-36 lg:pb-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1px_1fr] gap-8">
          
          {/* 🛒 Left Section - Cart Items */}
          <div className="lg:space-y-6">
            <Skeleton className="h-8 w-48 mb-6" /> {/* Shopping Bag title */}
            {Array.from({ length: 3 }).map((_, idx) => (
              <div
                key={idx}
                className="flex flex-col lg:flex-row gap-4 border-b border-gray-200 pb-4"
              >
                <Skeleton className="w-full lg:w-[160px] h-[160px] rounded-xl" />
                <div className="flex flex-col flex-1 space-y-3">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-8 w-24 mt-2" />
                </div>
              </div>
            ))}
          </div>

          {/* 🧱 Divider */}
          <div className="hidden lg:block h-full bg-gray-300 w-[1px] mx-auto" />

          {/* 💳 Right Section - Order Summary */}
          <div className="hidden lg:block relative">
            <div className="fixed top-20 bg-white p-6 w-[450px] rounded-xl shadow-sm">
              <Skeleton className="h-7 w-40 mb-10" /> {/* Order Summary title */}
              <div className="space-y-4">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-5 w-2/3" />
                <Skeleton className="h-10 w-full mt-6 rounded-lg" /> {/* Checkout button */}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CartSkeleton;
