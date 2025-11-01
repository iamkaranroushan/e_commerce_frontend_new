"use client";
import React from "react";
import { motion } from "framer-motion";

const shimmer = {
  hidden: { opacity: 0.6 },
  visible: {
    opacity: [0.6, 1, 0.6],
    transition: {
      duration: 1.2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const OrderDetailSkeleton = () => {
  return (
    <div className="p-4 mt-10 lg:mt-20 max-w-4xl lg:mx-auto space-y-6">
      {/* Order Summary Skeleton */}
      <motion.div
        variants={shimmer}
        initial="hidden"
        animate="visible"
        className="p-6 bg-white/60 backdrop-blur-sm border border-gray-200 rounded-lg space-y-4 shadow-sm"
      >
        <div className="h-6 w-48 rounded-md bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
        <div className="space-y-2">
          <div className="h-4 w-40 rounded-md bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
          <div className="h-4 w-32 rounded-md bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
          <div className="h-4 w-44 rounded-md bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
        </div>
      </motion.div>

      {/* Order Status Skeleton */}
      <motion.div
        variants={shimmer}
        initial="hidden"
        animate="visible"
        className="bg-white/60 backdrop-blur-sm border border-gray-200 rounded-lg px-6 pt-6 pb-4 space-y-4 shadow-sm"
      >
        <div className="h-5 w-32 rounded-md bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
        <div className="flex items-center justify-between mt-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center flex-1">
              <div className="w-5 h-5 rounded-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 mb-2" />
              <div className="h-3 w-10 rounded-md bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
            </div>
          ))}
        </div>
      </motion.div>

      {/* Order Items Skeleton */}
      <motion.div
        variants={shimmer}
        initial="hidden"
        animate="visible"
        className="p-4 bg-white/60 backdrop-blur-sm border border-gray-200 rounded-lg shadow-sm space-y-4"
      >
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="flex items-start gap-4 border-b border-gray-100 pb-4 last:border-b-0"
          >
            <div className="w-20 h-20 rounded-md bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-3/4 rounded-md bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
              <div className="h-3 w-1/2 rounded-md bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
              <div className="h-3 w-1/3 rounded-md bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
            </div>
            <div className="h-4 w-10 rounded-md bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default OrderDetailSkeleton;
