"use client";
import { motion, useMotionValue, animate, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useSelector } from "react-redux";
import useAddToCart from "@/hooks/useAddToCart";
import { ClipLoader } from "react-spinners";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import RouteLoader from "@/components/skeleton/RouteLoader";
import Login from "@/components/custom/login";
const ProductCarousel = ({products}) => {


  const token = useSelector((state) => state.auth.token);

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [wrapperWidth, setWrapperWidth] = useState(0);
  const [zoomStyle, setZoomStyle] = useState({ transform: "scale(1)" });
  const [loadingVariantId, setLoadingVariantId] = useState(null);
  const [addedVariants, setAddedVariants] = useState([]);

  const wrapperRef = useRef(null);     // the visible container whose width each slide should match
  const carouselRef = useRef(null);    // the sliding motion div (flex row)
  const x = useMotionValue(0);

  const { addToCart, loading } = useAddToCart();
  const cartId = useSelector((state) => state.auth.cartId);
  const role = useSelector((state) => state.auth.role);

  const [routeLoading, setRouteLoading] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  // Route navigation helper (keeps your existing behavior)
  const routeChange = (url) => {
    const currentUrl = window.location.pathname + window.location.search;
    if (url !== currentUrl) {
      setRouteLoading(true);
      router.push(url, { scroll: false });
    }
  };
  useEffect(() => {
    setRouteLoading(false);
  }, [pathname, searchParams]);

  // ---------- WIDTH MEASUREMENT & RESIZE OBSERVER ----------
  useEffect(() => {
    if (!wrapperRef.current) return;

    // update function
    const update = () => {
      const w = Math.round(wrapperRef.current.getBoundingClientRect().width);
      // Only update when changed (prevents unnecessary reflows)
      setWrapperWidth((prev) => {
        if (prev === w) return prev;
        // reposition to keep current slide on resize (no jump)
        animate(x, -currentIndex * w, { duration: 0 });
        return w;
      });
    };

    update(); // initial measurement

    // ResizeObserver to track modal/container resizes
    const ro = new ResizeObserver(update);
    ro.observe(wrapperRef.current);

    // fallback
    window.addEventListener("resize", update);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, products.length]);

  // Recalculate when images load (prevents layout jumps)
  useEffect(() => {
    if (!wrapperRef.current) return;
    const imgs = wrapperRef.current.querySelectorAll("img");
    if (!imgs || imgs.length === 0) return;

    let loaded = 0;
    const onLoad = () => {
      loaded++;
      if (loaded === imgs.length) {
        const w = Math.round(wrapperRef.current.getBoundingClientRect().width);
        setWrapperWidth(w);
        animate(x, -currentIndex * w, { duration: 0 });
      }
    };

    imgs.forEach((img) => {
      if (img.complete) onLoad();
      else img.addEventListener("load", onLoad, { once: true });
    });

    return () => {
      imgs.forEach((img) => img.removeEventListener("load", onLoad));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products]);

  // ---------- NAVIGATION (next / prev) ----------
  const handleNext = useCallback(() => {
    if (wrapperWidth === 0 || products.length === 0) return;
    const nextIndex = Math.min(products.length - 1, currentIndex + 1);
    setCurrentIndex(nextIndex);
    animate(x, -wrapperWidth * nextIndex, { duration: 0.45, ease: "easeInOut" });
  }, [currentIndex, products.length, wrapperWidth, x]);

  const handlePrev = useCallback(() => {
    if (wrapperWidth === 0 || products.length === 0) return;
    const prevIndex = Math.max(0, currentIndex - 1);
    setCurrentIndex(prevIndex);
    animate(x, -wrapperWidth * prevIndex, { duration: 0.45, ease: "easeInOut" });
  }, [currentIndex, wrapperWidth, x]);

  // ---------- DRAG END SNAP ----------
  const onDragEnd = () => {
    if (wrapperWidth === 0) return;
    const current = x.get(); // negative or zero
    const index = Math.round(-current / wrapperWidth);
    const clamped = Math.max(0, Math.min(products.length - 1, index));
    setCurrentIndex(clamped);
    animate(x, -clamped * wrapperWidth, { duration: 0.45, ease: "easeInOut" });
  };

  // ---------- ZOOM ON MOUSE (doesn't affect layout) ----------
  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const mx = ((e.clientX - left) / width) * 100;
    const my = ((e.clientY - top) / height) * 100;
    // transform applied to inner image wrapper only (no layout changes)
    setZoomStyle({
      transformOrigin: `${mx}% ${my}%`,
      transform: "scale(2)",
      transition: "transform 0.12s ease-out",
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({
      transform: "scale(1)",
      transition: "transform 0.28s ease-in-out",
    });
  };

  // ---------- CART HANDLERS ----------
  const handleAddToCart = async (product) => {
  // 🔐 If user is NOT logged in → open login modal
  if (!token) {
    setIsLoginOpen(true);
    return;
  }

  // 🛑 If admin → block action (button already disabled but double safety)
  if (role === "admin") return;

  const variant = product.variants?.[0];
  if (!variant) return alert("No variant available");

  setLoadingVariantId(variant.id);

  const response = await addToCart({
    cartId,
    productVariantId: variant.id,
    quantity: 1,
  });

  if (!response?.error) {
    setAddedVariants((prev) => [...prev, variant.id]);
  }

  setLoadingVariantId(null);
};

  const handleGoToCart = () => {
    routeChange("/cart");
  };

  // Compute drag constraints (left negative, right zero)
  const maxOffset = wrapperWidth * Math.max(0, products.length - 1);
  const dragConstraints = { left: -maxOffset, right: 0 };

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Navigation Buttons */}
      <button
        onClick={handlePrev}
        aria-label="Previous product"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-stone-200 hover:bg-stone-300 text-stone-800 p-3 rounded-full transition-all z-30"
      >
        <ChevronLeft size={20} />
      </button>

      <button
        onClick={handleNext}
        aria-label="Next product"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-stone-200 hover:bg-stone-300 text-stone-800 p-3 rounded-full transition-all z-30"
      >
        <ChevronRight size={20} />
      </button>

      {/* Visible wrapper (measure this width) */}
      <div ref={wrapperRef} className="relative w-full h-full">
        {/* Sliding strip (motion) */}
        <motion.div
          ref={carouselRef}
          drag="x"
          dragConstraints={dragConstraints}
          dragElastic={0.12}
          onDragEnd={onDragEnd}
          style={{ x }}
          className="flex w-full h-full will-change-transform"
        >
          {products.map((p) => {
            const variant = p.variants?.[0];
            const isAdded = variant && addedVariants.includes(variant.id);

            return (
              <div
                key={p.id}
                // each slide takes the full wrapper width
                className="min-w-full h-full flex-shrink-0 flex flex-col lg:flex-row"
              >
                {/* Left: Image with isolated zoom wrapper */}
                <div className="
                  w-full 
                  lg:w-1/2 
                  flex 
                  items-center 
                  justify-center 
                  overflow-hidden
                  relative 
                  px-6 
                  py-12
                  md:py-16
                ">
                  {!p.imageUrl ? (
                    <div className="w-[75%] max-w-[420px] aspect-square animate-pulse rounded-xl" />
                  ) : (
                    <div
                      className="
                        relative 
                        w-[75%] 
                        max-w-[480px] 
                        aspect-square 
                        transition-transform 
                        duration-300
                      "
                      onMouseMove={handleMouseMove}
                      onMouseLeave={handleMouseLeave}
                      style={zoomStyle}
                    >
                      <Image
                        src={p.imageUrl}
                        alt={p.name}
                        fill
                        sizes="(max-width: 1023px) 80vw, 50vw"
                        className="object-contain select-none"
                        priority
                      />
                    </div>
                  )}
                </div>


                {/* Right: Info */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center items-start py-[clamp(4rem,5vw,2rem)] px-[clamp(1rem,5vw,3rem)] bg-white">
                  
                  
                  <div>
                    <h1 className="lg:text-[clamp(2.8rem,4vw,4rem)] text-[clamp(2rem,5vw,4rem)] tracking-tight text-stone-900">
                      {p.name}
                    </h1>

                    <p className="text-stone-700 mb-6 leading-relaxed text-[clamp(0.8rem,2vw,1.2rem)] lg:text-[clamp(0.9rem,1vw,3rem)] max-w-[90%] sm:max-w-[480px]">
                      {p.description}
                    </p>

                    <div className="text-[clamp(1.6rem,5vw,2rem)]  lg:text-[clamp(0.5rem,3vw,2rem)] font-semibold text-stone-800 mb-6">
                      ₹{variant?.price ?? "--"}
                    </div>

                    {/* Button — fixed size to avoid layout shift */}
                    <div>
                      <button
                        disabled={role === "admin"}
                        onClick={isAdded ? handleGoToCart : () => handleAddToCart(p)}
                        className=" lg:py-[clamp(0.8rem,3vw,2rem)] py-[clamp(0.8rem,3vw,2rem)] px-[clamp(0.5rem,1vw,1rem)] text-[clamp(0.8rem,2vw,1rem)] rounded-full transition-all flex items-center justify-center gap-2 overflow-hidden relative bg-stone-900 hover:bg-stone-700 text-white"
                        style={{ minWidth: 160, height: 44 }}
                      >
                        <div className="relative w-full h-full">
                          <AnimatePresence mode="wait">
                            {!isAdded && (
                              <motion.div
                                key="add"
                                initial={{ y: 16, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -16, opacity: 0 }}
                                transition={{ duration: 0.28, ease: "easeOut" }}
                                className="absolute inset-0 flex items-center justify-center"
                              >
                                {loadingVariantId === variant?.id ? (
                                  <ClipLoader size={16} color="#fff" />
                                ) : (
                                  "Add to Cart"
                                )}
                              </motion.div>
                            )}

                            {isAdded && (
                              <motion.div
                                key="go"
                                initial={{ y: 16, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -16, opacity: 0 }}
                                transition={{ duration: 0.28, ease: "easeOut" }}
                                className="absolute inset-0 flex items-center justify-center"
                              >
                                Go to Cart
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </button>
                    </div>

                  </div>

                 

                  
                  

                </div>
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* Route loader overlay */}
      {routeLoading && (
        <div className="fixed inset-0 z-[9999]">
          <RouteLoader />
        </div>
      )}
      {isLoginOpen && <Login setIsLoginOpen={setIsLoginOpen} onClose={() => setIsLoginOpen(false)} />}
    </div>
  );
};

export default ProductCarousel;
