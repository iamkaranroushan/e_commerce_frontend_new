import { motion } from "framer-motion";

export const ProductCard1Skeleton = () => {
  return (
    <div className="w-full rounded-xl lg:rounded-3xl p-2">
      {/* Image Section with padded frame */}
      <div className="relative w-full aspect-square lg:h-[400px] rounded-[clamp(1.5rem,3vw,4rem)] overflow-hidden">
        <div className="bg-gray-300 p-[clamp(0.5rem,2vw,1rem)] h-full w-full relative rounded-[clamp(1.5rem,3vw,4rem)]">
          <div className="relative w-full h-full rounded-[clamp(1.2rem,3vw,3rem)] overflow-hidden bg-gray-300">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </div>
      </div>

      {/* Product Details */}
      <div className="mt-8 space-y-2">
        {/* Top Row: weight + product name + price block */}
        <div className="flex justify-between items-end mb-2">
          <div className="flex flex-col items-start space-y-2">
            {/* Weight chip */}
            <div className="h-4 w-8 bg-gray-300 rounded-sm"></div>
            {/* Product Name */}
            <div className="h-5 w-20 lg:w-48 bg-gray-300 rounded"></div>
          </div>

          <div className="flex flex-col items-end space-y-2">
            {/* Discount / Save % */}
            <div className="h-4 w-8 bg-gray-300 rounded"></div>
            {/* Price row */}
            <div className="h-5 w-10 bg-gray-300 rounded"></div>
          </div>

        </div>

        {/* Description */}
        <div className="h-3 w-35 lg:w-64 bg-gray-300 rounded mb-4"></div>

        {/* Add button & variant count */}
        <div className="flex flex-col gap-2 py-2">
          <div className="h-9 w-full bg-gray-300 rounded-md lg:rounded-xl"></div>
          <div className="h-3 w-24 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );
};
