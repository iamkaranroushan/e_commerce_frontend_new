import Image from "next/image";
import { FaShoppingCart } from "react-icons/fa";
import { useState } from "react";
import { useSelector } from "react-redux";
import ExpandingModal from "../custom/expandedModal";
import { motion, AnimatePresence } from "framer-motion";

const ProductCard = ({ product, setIsLoginOpen }) => {
  const token = useSelector((state) => state.auth.token);
  const [selectedVariant] = useState(product.variants[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const isInStock = product.variants.some((v) => v.inStock);

  const handleView = () => {
    if (!isInStock) return;
    if (token) {
      setIsModalOpen(true);
    } else {
      setIsLoginOpen(true);
    }
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (!isInStock) return;
    if (token) {
      console.log("Added to cart:", product.name);
    } else {
      setIsLoginOpen(true);
    }
  };

  return (
    <>
      <div
        className={`w-full rounded-xl lg:rounded-3xl px-2 flex flex-col items-center ${
          !isInStock ? "opacity-50" : ""
        }`}
        onClick={handleView}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Section */}
        <div className="relative w-full aspect-square lg:h-[400px] cursor-pointer rounded-[clamp(1.5rem,3vw,4rem)] overflow-hidden flex items-center justify-center bg-gradient-to-tr  to-stone-200/20 from-stone-300/80">
          <Image
            src={product.imageUrl}
            alt={product.name}
            layout="fill"
            objectFit="cover"
            className="rounded-[clamp(1.2rem,3vw,3rem)]"
          />

          {/* Hover overlay */}
          <AnimatePresence>
            {isHovered && isInStock && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="absolute inset-0 bg-stone-600/70 flex items-center justify-center rounded-[clamp(1.2rem,3vw,3rem)]"
              >
                <motion.div
                  initial={{ y: 40 }}
                  animate={{ y: 0 }}
                  exit={{ y: 40 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="flex items-center gap-4 bg-stone-900/70 rounded-full px-4 py-2 shadow-lg"
                >
                  <button
                    onClick={handleAddToCart}
                    className="rounded-full p-2 flex items-center justify-center"
                  >
                    <FaShoppingCart className="w-5 h-5 text-stone-200" />
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Out of Stock Overlay */}
          {!isInStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-[clamp(1.2rem,3vw,3rem)] z-10">
              <span className="text-white text-sm font-semibold">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="mt-4 text-center flex flex-col items-center">
          <h2 className="text-[clamp(0.9rem,3vw,1.5rem)] font-bold text-stone-800">
            {product.name}
          </h2>
          
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <ExpandingModal product={product} onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
};

export default ProductCard;
