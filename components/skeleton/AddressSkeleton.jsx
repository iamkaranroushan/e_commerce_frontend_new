    "use client";
import { motion } from "framer-motion";
import React from "react";

const pulse = {
  animate: {
    opacity: [0.6, 1, 0.6],
    transition: { duration: 1.2, repeat: Infinity },
  },
};

const SkeletonBox = ({ className }) => (
  <motion.div
    variants={pulse}
    animate="animate"
    className={`bg-gray-200 rounded-md ${className}`}
  />
);

const AddressSkeleton = () => {
  return (
    <div className="py-4 max-w-md mx-auto space-y-4 mt-10 px-4">
      {/* Title */}
      <SkeletonBox className="h-6 w-1/3" />

      {/* Create button placeholder */}
      <SkeletonBox className="h-10 w-full rounded-lg" />

      {/* Address Cards */}
      <div className="space-y-4 mt-6">
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            variants={pulse}
            animate="animate"
            className="p-4 border rounded-lg bg-white shadow-sm space-y-3"
          >
            <SkeletonBox className="h-4 w-5/6" />
            <SkeletonBox className="h-4 w-3/4" />
            <SkeletonBox className="h-4 w-1/2" />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AddressSkeleton;
