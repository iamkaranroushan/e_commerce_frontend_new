"use client";
import { motion } from "framer-motion";
import React from "react";

const PenNib = () => {
  return (
    <section className="h-screen grid grid-cols-2 items-center bg-white relative px-20">
      {/* Left side (empty for pen) */}
      <div></div>

      {/* Right side (text content) */}
      <motion.div
        className="flex flex-col items-start justify-center space-y-4"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8,delay:0.4, ease: 'easeOut' }}
        viewport={{ once: true }}
      >
        <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-semibold text-stone-900 leading-tight">
          Precision in Every Stroke
        </h2>
         <p className="max-w-xl text-stone-600 text-[clamp(1rem,1.5vw,1.2rem)] leading-relaxed">
          The nib of Noirē is engineered to deliver a <span className="font-bold text-stone-800">flawlessly balanced</span> writing
          experience. Crafted from high-density alloy and finished with
          micro-polished precision, it ensures <span className="font-bold text-stone-800">smooth, uninterrupted ink flow</span> —
          gliding effortlessly with every stroke.
        </p>
      </motion.div>
    </section>
  );
};

export default PenNib;
