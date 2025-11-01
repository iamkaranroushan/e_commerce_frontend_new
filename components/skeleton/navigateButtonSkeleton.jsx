import { motion } from "framer-motion";

export const NavigateButtonSkeleton = ({ className}) => {
  return (
    <div
      className={`bg-gray-300 animate-pulse p-2 ${className}`}
    />
  );
};
