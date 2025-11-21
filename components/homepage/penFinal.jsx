"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import ExpandingModal from "@/components/custom/expandedModal";

const PenFinal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBuyNow = () => setIsModalOpen(true);

  return (
    <section
      className="
        relative
        h-screen w-full 
        overflow-hidden 
        flex flex-col items-center justify-center
      "
    >
      {/* ⭐ BACKGROUND PHEONIX */}
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 0.1, y: 0 }}
        transition={{ duration: 1 }}
        className="
          noire-text 
          absolute 
          text-[clamp(8rem,20vw,60rem)]
          font-extrabold 
          text-stone-900 
          select-none 
          leading-[0.8]
        "
      >
        PHEONIX
      </motion.h1>

      {/* ⭐ PEN + CTA WRAPPER (centered on all sizes) */}
      <div
        className="
          relative z-20
          flex flex-col items-center justify-center
          w-full 
          h-[75vh]         /* ensures perfect mobile centering */
        "
      >
        {/* ⭐ PEN AREA */}
        <div
          className="
            flex items-center justify-center
            w-full
            h-[40vh] md:h-[50vh] lg:h-[60vh]
          "
        >
          {/* Your pen image/component renders externally */}
        </div>

        {/* ⭐ CTA AREA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="flex flex-col items-center space-y-4 mt-[clamp(42rem,50vw,50rem)]"
        >
        {/* BUY BUTTON */}
          <motion.button
           
            onClick={handleBuyNow}
            className="
              px-[clamp(2rem,4vw,3rem)]
              py-[clamp(0.8rem,1vw,1rem)]
              bg-stone-900 text-white 
              rounded-full 
              text-[clamp(0.8rem,1.2vw,1rem)]
              shadow-lg
              hover:bg-stone-800 transition-all
          
            "
          >
            Shop Pheonix
          </motion.button>
          {/* FREE SHIPPING */}
          <p className="
            text-center 
            text-[clamp(0.55rem,0.9vw,0.85rem)] 
            text-stone-600 
            tracking-wide
            px-6
             max-w-[480px] 
          ">
            Free Shipping • 7-Day Return Policy • 1-Year Warranty • Secure Payments • *Terms & Conditions Apply
          </p>
        </motion.div>
      </div>

      {/* MODAL */}
      {isModalOpen && <ExpandingModal onClose={() => setIsModalOpen(false)} />}
    </section>
  );
};

export default PenFinal;
