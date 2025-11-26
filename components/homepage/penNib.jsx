"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";

const PenNib = () => {
  return (
    <section
  className="
    h-screen
    flex flex-col lg:grid lg:grid-cols-2
    bg-white
    px-6 lg:px-20
    relative

 
  "
>
  {/* ⭐ MOBILE PEN — TOUCHES TOP OF SECTION */}
  <motion.div
    initial={{ opacity: 0, y: -40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true }}
    className="
    block lg:hidden
    absolute 
    top-0 
    left-0 
    w-full 
    flex 
    justify-center
    pb-0
    overflow-hidden  
    "
  >
    <div
      className="
        w-full                 
        max-w-[550px]
        flex justify-center
        overflow-hidden
      "
    >
      <Image
        src="/Hero_image.png"
        width={1200}
        height={1200}
        alt="Pen nib"
        className="
          w-full
          h-auto
          scale-[2]
          translate-y-[-25vh]  
        "
      />
    </div>
  </motion.div>


      {/* Desktop left empty area */}
      <div className="hidden lg:block" />

      {/* ⭐ TEXT — BOTTOM in mobile, center in desktop */}
      <motion.div
        className="
          flex flex-col
          justify-end lg:justify-center
          text-left
          space-y-4 
          pb-10
          flex-1
        "
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-semibold text-stone-900 leading-tight">
          Precision in Every Stroke
        </h2>

        <p className="max-w-xl text-stone-600 text-[clamp(1rem,1.5vw,1.2rem)] leading-relaxed">
          Engineered to deliver a{" "}
          <span className="font-bold text-stone-800">flawlessly balanced</span> writing
          experience. Crafted from high-density alloy and finished with
          micro-polished precision for{" "}
          <span className="font-bold text-stone-800">smooth, uninterrupted ink flow</span>.
        </p>
      </motion.div>
    </section>
  );
};

export default PenNib;
