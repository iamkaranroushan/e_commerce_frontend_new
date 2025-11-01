"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import useCategories from "@/hooks/useCategories";
import useProductsByCategory from "@/hooks/useProductsByCategory";
import ProductCard from "@/components/categoryPage/productCard";
import { Provider } from "react-redux";
import { store, persistor } from "@/features/auth/authStore";
import { PersistGate } from "redux-persist/integration/react";
import { FiBox } from "react-icons/fi";
import { SkeletonDiv } from "../skeleton/skeletonDiv";
import { ProductCard1Skeleton } from "../skeleton/productCardSkeleton";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { NavigateButtonSkeleton } from "../skeleton/navigateButtonSkeleton";

const FeaturedProducts = ({ setIsLoginOpen }) => {
  const { categories, loading: catLoading, error: catError } = useCategories();
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const categoryRefs = useRef({});

  // Artificial delay for skeleton
  const [artificialLoading, setArtificialLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setArtificialLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Set first category as selected when loaded
  useEffect(() => {
    if (!catLoading && categories.length > 0 && !selectedCategoryId) {
      setSelectedCategoryId(categories[0].id);
    }
  }, [catLoading, categories]);

  const { products, loading: productsLoading, error: productsError } =
    useProductsByCategory({ categoryId: selectedCategoryId });

  const isLoadingCategories = catLoading || artificialLoading;
  const isLoadingProducts = productsLoading || artificialLoading;

  // Scroll to active category when selected
  useEffect(() => {
    if (selectedCategoryId && categoryRefs.current[selectedCategoryId]) {
      categoryRefs.current[selectedCategoryId].scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [selectedCategoryId]);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <motion.div
          className="flex flex-col px-2 pb-12 rounded-b-lg bg-white px-[clamp(0.2rem,4vw,30rem)] min-h-[60vh] md:min-h-[70vh] lg:min-h-[80vh]"
        >
          {/* Section Title */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center gap-[clamp(0.5rem,2vw,1rem)] py-[clamp(2rem,5vw,4rem)]"
          >
            <span className="font-bold text-[clamp(1.5rem,10vw,4rem)] text-stone-900 tracking-tight leading-[1]">
              Featured Products
            </span>
          </motion.div>

          {/* Category Selector */}
          <div className="relative flex items-center mb-2">
            {/* Left Arrow */}
            {isLoadingCategories ? (
              <div className="px-2">
                <NavigateButtonSkeleton className="rounded-sm h-8 w-8" />
              </div>
            ) : (
              <button
                onClick={() => {
                  const container = document.getElementById("category-scroll");
                  container.scrollBy({ left: -200, behavior: "smooth" });
                }}
                className="bg-white hover:bg-stone-300 rounded-sm p-2 z-10"
              >
                <MdNavigateBefore />
              </button>
            )}

            {/* Scrollable Categories */}
            <div
              id="category-scroll"
              className="overflow-x-auto scroll-smooth whitespace-nowrap hide-scrollbar flex-1 px-4"
            >
              <div className="inline-flex gap-4 w-max">
                {isLoadingCategories
                  ? Array(6)
                      .fill(0)
                      .map((_, i) => (
                        <SkeletonDiv
                          key={i}
                          className="w-20 h-6 rounded-md"
                        />
                      ))
                  : categories.map((cat) => (
                      <motion.button
                        key={cat.id}
                        ref={(el) => (categoryRefs.current[cat.id] = el)}
                        onClick={() => setSelectedCategoryId(cat.id)}
                        animate={{
                          backgroundColor:
                            selectedCategoryId === cat.id
                              ? "rgba(0,0,0,0.5)"
                              : "#fff",
                          color:
                            selectedCategoryId === cat.id ? "#fff" : "#9ca3af",
                        }}
                        transition={{ ease: "easeInOut" }}
                        className="px-3 py-1 text-[clamp(0.8rem,2.5vw,1.1rem)] font-medium rounded-md cursor-pointer whitespace-nowrap border border-stone-300"
                      >
                        {cat.name}
                      </motion.button>
                    ))}
              </div>
            </div>

            {/* Right Arrow */}
            {isLoadingCategories ? (
              <div className="px-2">
                <NavigateButtonSkeleton className="rounded-sm h-8 w-8" />
              </div>
            ) : (
              <button
                onClick={() => {
                  const container = document.getElementById("category-scroll");
                  container.scrollBy({ left: 200, behavior: "smooth" });
                }}
                className="bg-white hover:bg-stone-300 rounded-sm p-2 z-10"
              >
                <MdNavigateNext />
              </button>
            )}
          </div>

          {/* Product Grid */}
          {isLoadingProducts ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {Array(4)
                .fill(0)
                .map((_, i) => (
                  <ProductCard1Skeleton
                    key={i}
                    className="w-full h-60 lg:h-80 rounded-lg"
                  />
                ))}
            </div>
          ) : productsError ? (
            <div className="text-center text-red-500">
              Error loading products: {productsError}
            </div>
          ) : products.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center py-12 text-stone-500"
            >
              <FiBox className="text-5xl lg:text-7xl mb-4 text-stone-400" />
              <p className="text-base lg:text-xl font-medium">
                No products found
              </p>
              <p className="text-xs lg:text-sm text-stone-400">
                Try another category or check back later
              </p>
            </motion.div>
          ) : (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.1 } },
              }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-[clamp(1rem,3vw,2rem)]"
            >
              {products.map((product) => (
                <motion.div
                  key={product.id}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <ProductCard
                    product={product}
                    setIsLoginOpen={setIsLoginOpen}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </PersistGate>
    </Provider>
  );
};

export default FeaturedProducts;
