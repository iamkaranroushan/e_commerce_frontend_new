"use client";
import React from "react";
import { motion } from "framer-motion";

export const OrderCardSkeleton = () => {
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

  return (
    <div className="space-y-6 animate-none">
      {Array.from({ length: 3 }).map((_, i) => (
        <motion.div
          key={i}
          variants={shimmer}
          initial="hidden"
          animate="visible"
          className="bg-white/60 backdrop-blur-sm border border-gray-200 rounded-xl p-5 shadow-sm"
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 rounded-md bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
              <div className="h-5 w-32 rounded-md bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
            </div>
            <div className="h-5 w-20 rounded-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
            <div className="h-5 w-40 rounded-md bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
            <div className="h-5 w-44 rounded-md bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
            <div className="hidden md:block h-5 w-36 rounded-md bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
          </div>
        </motion.div>
      ))}
    </div>
  );
};
    