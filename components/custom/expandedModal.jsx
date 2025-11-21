"use client";
import { motion, AnimatePresence } from "framer-motion";
import { RxCross1 } from "react-icons/rx";
import ProductCarousel from "@/components/custom/productCarousal";
import useProductsByCategory from "@/hooks/useProductsByCategory";

const ExpandingModal = ({ onClose }) => {
  const categoryId = "111";
  const { products, loading, error } = useProductsByCategory({ categoryId });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="fixed inset-0 z-[1000] flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.3 } }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/40"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0, transition: { duration: 0.3 } }}
        />

        {/* Modal Container */}
        <motion.div
          className="relative w-[90%] lg:w-[80%] max-w-6xl bg-stone-100 rounded-2xl shadow-xl overflow-hidden z-10"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{
            opacity: 0,
            scale: 0.92,
            y: 30,
            transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] },
          }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-stone-800 hover:text-black hover:bg-stone-300 inline-flex p-2 bg-stone-200 rounded-full transition-all z-20"
          >
            <RxCross1 size={22} />
          </button>

          {/* Product Carousel */}
          <div className="w-full h-[80vh]">
            <ProductCarousel products={products} />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ExpandingModal;
