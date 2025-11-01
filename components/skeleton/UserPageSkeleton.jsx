"use client";
import { motion } from "framer-motion";
import React from "react";

const shimmer = {
  animate: {
    opacity: [0.6, 1, 0.6],
    transition: { duration: 1.2, repeat: Infinity },
  },
};

const SkeletonBox = ({ className }) => (
  <motion.div
    variants={shimmer}
    animate="animate"
    className={`bg-gray-200 rounded-md ${className}`}
  />
);

const UserPageSkeleton = () => {
  return (
    <div className="mt-14 px-4 py-4 space-y-6 md:grid md:gap-6 md:space-y-0 md:max-w-4xl md:mx-auto">
      {/* Left column */}
      <div className="space-y-4">
        <div className="bg-white p-6 space-y-3">
          <SkeletonBox className="h-6 w-1/3" />
          <SkeletonBox className="h-4 w-1/4" />
        </div>

        <div className="bg-white p-6 space-y-4">
          <SkeletonBox className="h-4 w-1/3" />
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                variants={shimmer}
                animate="animate"
                className="flex items-center justify-between p-3 rounded-lg border border-gray-100 bg-white shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <SkeletonBox className="w-10 h-10 rounded-full" />
                  <SkeletonBox className="h-4 w-24 sm:w-40" />
                </div>
                <SkeletonBox className="h-4 w-4 rounded" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Right column */}
      <div className="space-y-4">
        <div className="bg-white p-6 space-y-4">
          <SkeletonBox className="h-4 w-1/3" />
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                variants={shimmer}
                animate="animate"
                className="flex items-center justify-between p-3 rounded-lg border border-gray-100 bg-white shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <SkeletonBox className="w-10 h-10 rounded-full" />
                  <SkeletonBox className="h-4 w-24 sm:w-40" />
                </div>
                <SkeletonBox className="h-4 w-4 rounded" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPageSkeleton;
