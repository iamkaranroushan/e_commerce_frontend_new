import { motion } from "framer-motion";

export const SkeletonDiv = ({ className }) => (
  <motion.div
    className={`bg-gray-300 animate-pulse rounded ${className}`}
    initial={{ opacity: 0.5 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
  />
);
