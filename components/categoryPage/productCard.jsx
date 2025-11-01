import Image from "next/image";
import { FaShoppingCart, FaEuroSign } from "react-icons/fa";
import { useState } from "react";
import { useSelector } from "react-redux";
import ExpandingModal from "../custom/expandedModal";
import { motion, AnimatePresence } from "framer-motion";

const ProductCard = ({ product, setIsLoginOpen }) => {
  const token = useSelector((state) => state.auth.token);
  const [selectedVariant] = useState(product?.variants?.[0] || {});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const isInStock = product?.variants?.some((v) => v.inStock) ?? false;

  const handleView = () => {
    if (!isInStock) return;
    if (token) setIsModalOpen(true);
    else setIsLoginOpen(true);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (!isInStock) return;
    if (token) console.log("Added to cart:", product.name);
    else setIsLoginOpen(true);
  };

  if (!product) return null;

  return (
    <>
      <div
        className={`w-full rounded-3xl px-2 relative ${
          !isInStock ? "opacity-50" : ""
        }`}
        onClick={handleView}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image section */}
        <div className="relative w-full aspect-square lg:h-[400px] cursor-pointer rounded-[clamp(1.5rem,3vw,4rem)] overflow-hidden flex items-center justify-center bg-gradient-to-tr  to-stone-200/20 from-stone-300/80">

          <div className="p-[clamp(0.3rem,1vw,0.6rem)] h-full w-full relative overflow-hidden rounded-[clamp(1.2rem,3vw,3rem)] ">
            {/* Smoothly scaling image only */}
            <motion.div
              animate={{ scale: isHovered ? 1.07 : 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative w-full h-full"
            >
              <Image
                src={product.imageUrl}
                alt={product.name}
                layout="fill"
                objectFit="cover"
              />
            </motion.div>

            {/* Hover overlay */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="absolute inset-0 bg-stone-600/60 flex items-center justify-center"
                >
                  <motion.div
                    initial={{ y: 40 }}
                    animate={{ y: 0 }}
                    exit={{ y: 40 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="flex items-center gap-4 bg-stone-900/70 rounded-full px-4 py-2 shadow-lg"
                  >
                    <button
                      onClick={handleView}
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
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
                <span className="text-white text-xs lg:text-sm font-semibold">
                  Out of Stock
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Product Details (centered) */}
        <div className="mt-6 flex flex-col items-center justify-center text-center space-y-2">
          <span className="text-[clamp(0.6rem,1.5vw,0.9rem)] bg-stone-800/60 rounded-md px-2 py-[2px] text-white">
            {selectedVariant?.weight || "N/A"}
          </span>

          <h2 className="text-[clamp(1rem,3vw,1.6rem)] font-bold text-stone-800">
            {product.name}
          </h2>

          

          <div className="flex items-center justify-center gap-1">
            
            <FaEuroSign className="text-[clamp(0.8rem,2vw,1.2rem)]" />
            <span className="text-[clamp(1rem,2vw,1.5rem)] font-semibold text-stone-900">
              {selectedVariant?.price || "--"}
            </span>
          </div>
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
