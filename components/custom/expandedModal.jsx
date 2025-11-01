"use client";
import { motion, AnimatePresence } from "framer-motion";
import { RxCross1 } from "react-icons/rx";
import { FaEuroSign } from "react-icons/fa";
import { ClipLoader } from "react-spinners";
import { Button } from "../ui/button";
import useAddToCart from "@/hooks/useAddToCart";
import { useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { IoBagOutline, IoBagCheckOutline } from "react-icons/io5";
import RouteLoader from "@/components/skeleton/RouteLoader";

const ExpandingModal = ({ product, initialVariantId = null, onClose }) => {
  if (!product || !product.variants || product.variants.length === 0) return null;

  const cartId = useSelector((state) => state.auth.cartId);
  const role = useSelector((state) => state.auth.role);
  const { addToCart } = useAddToCart();

  const initialVariant = useMemo(() => {
    if (initialVariantId) {
      return product.variants.find((v) => v.id === initialVariantId) || product.variants[0];
    }
    return product.variants[0];
  }, [initialVariantId, product.variants]);

  const [selectedVariant, setSelectedVariant] = useState(initialVariant);
  const [loadingVariantId, setLoadingVariantId] = useState(null);
  const [addedVariants, setAddedVariants] = useState([]);
  const [routeLoading, setRouteLoading] = useState(false);
  useEffect(() => {
    setSelectedVariant(initialVariant);
  }, [initialVariant]);

  const handleAddToCart = async (variantId) => {
    setLoadingVariantId(variantId);
    const response = await addToCart({ cartId, productVariantId: variantId, quantity: 1 });
    if (!response?.error) {
      setAddedVariants((prev) => [...prev, variantId]);
    } else {
      console.error("Add to cart error:", response.error);
    }
    setLoadingVariantId(null);
  };

  const item = (delay = 0) => ({
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.35, delay } },
  });

  const [zoomStyle, setZoomStyle] = useState({ transform: "scale(1)" });

const handleMouseMove = (e) => {
  const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
  const x = ((e.clientX - left) / width) * 100;
  const y = ((e.clientY - top) / height) * 100;
  setZoomStyle({
    transformOrigin: `${x}% ${y}%`,
    transform: "scale(3)", // adjust zoom level
  });
};

const handleMouseLeave = () => {
  setZoomStyle({ transform: "scale(1)" });
};

const handleCartClick = async () => {
  if (addedVariants.includes(selectedVariant.id)) {
    // show loader before navigating
    setRouteLoading(true);
    setTimeout(() => {
      window.location.href = "/cart";
    }, 700); // match your RouteLoader duration
    return;
  }
  await handleAddToCart(selectedVariant.id);
};


  return (
    <>
      {routeLoading && <RouteLoader />}
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[1000]  flex items-center justify-center "
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* backdrop */}
        <motion.div
          className="absolute  inset-0 bg-black/40"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
        />

        {/* modal container */}
        <motion.div
          layoutId={`view-pill-${product.id}`}
          className="relative w-[90%] lg:w-[80%] max-w-6xl   bg-stone-100 rounded-2xl shadow-xl flex flex-col lg:flex-row overflow-hidden z-10"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.28 }}
        >
          {/* close button - relative to modal */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-stone-800 hover:text-black hover:bg-stone-300 inline-flex p-2 bg-stone-200 rounded-lg transition-all z-20"
          >
            <RxCross1 size={22} />
          </button>

          {/* LEFT: image */}
          <motion.div
            className="w-full lg:w-1/2 flex items-center justify-center bg-white p-4"
            layoutId={`image-${product.id}`}
          >
            <img
              src={product.imageUrl}
              alt={product.name}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                transition: "transform 0.3s ease",
                ...zoomStyle,
              }}
              className="w-auto max-h-[clamp(18rem,50vw,20rem)] lg:max-h-[36em] object-contain"
            />
          </motion.div>

          {/* RIGHT: details */}
          <motion.div
            className="w-full lg:w-1/2 bg-stone-100 px-6 py-[clamp(1rem,10vw,20rem)] overflow-y-auto relative"
            variants={item(0.08)}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {/* Title */}
            <div className="flex justify-between items-center py-6">
              <motion.h1
                className="text-[clamp(1.4rem,2vw,2.2rem)] font-bold"
                variants={item(0.16)}
              >
                {product.name}
              </motion.h1>
            </div>

            {/* Description */}
            <motion.p
              className="text-[clamp(0.7rem,3vw,1.05rem)] text-stone-600 mb-6 leading-relaxed line-clamp-2 md:line-clamp-none"
              variants={item(0.2)}
            >
              {product.description}
            </motion.p>

            {/* Price + Add to Cart */}
            <motion.div className="flex flex-col gap-6" variants={item(0.28)}>
              <div className="flex items-center gap-2">
                <FaEuroSign className="text-[clamp(1rem,5vw,1.6rem)]" />
                <span className="text-[clamp(1rem,5vw,1.8rem)] font-bold">
                  {selectedVariant.price?.toFixed?.(2) ?? selectedVariant.price}
                </span>
              </div>

              <Button
              onClick={handleCartClick}
              disabled={role === "admin" || loadingVariantId === selectedVariant.id}
              className="w-full flex items-center justify-center gap-2 overflow-hidden relative"
              variant="addToCart"
              size="addToCart"
            >
              {loadingVariantId === selectedVariant.id ? (
                <ClipLoader size={16} color="#fff" />
              ) : (
                <motion.span
                  key={addedVariants.includes(selectedVariant.id) ? "go-to-cart" : "add-to-cart"}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-2"
                >
                  {addedVariants.includes(selectedVariant.id) ? (
                    <>
                      Go to Cart <IoBagCheckOutline size={18} />
                    </>
                  ) : (
                    <>
                      Add To Cart <IoBagOutline size={18} />
                    </>
                  )}
                </motion.span>
              )}
            </Button>

            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  </>
  );
};

export default ExpandingModal;
