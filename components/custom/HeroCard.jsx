"use client";
import React from "react";
import { motion } from "framer-motion";

const HeroCard = () => {
  return (
    <section className=" relative w-full h-screen flex items-center justify-center overflow-hidden bg-white">
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 0.1, y: 0 }}
        transition={{ duration: 1 }}
        className="absolute text-[clamp(6rem,18vw,25rem)] font-extrabold tracking-tight text-stone-900 select-none leading-[0.8]"
      >
        NOIRĒ
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.8 }}
        className="absolute bottom-[10%] text-center"
      >
        <h2 className="text-stone-700 text-[clamp(1rem,2vw,1.2rem)] tracking-wide uppercase">
          The ZoiF Collection
        </h2>
      </motion.div>
    </section>
  );
};

export default HeroCard;
