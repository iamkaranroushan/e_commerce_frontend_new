"use client";
import React from "react";
import { motion } from "framer-motion";

const KnoxHeroCard = () => {
  return (
    <section className=" relative w-full h-screen flex items-center justify-center overflow-hidden bg-white">
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 0.1, y: 0 }}
        transition={{ duration: 1 }}
        className="noire-text absolute text-[clamp(8rem,20vw,60rem)] lg:text-[clamp(8rem,20vw,60rem)] font-extrabold tracking-tight text-stone-900 select-none leading-[0.8]  
        "
      >
       KNOX
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.8 }}
        className="absolute bottom-[10%] lg:bottom-[10%] text-center"
      >
        <h2 className="text-stone-700 lg:text-[clamp(0.5rem,2vw,1.8rem)] text-[clamp(1rem,2vw,2rem)] tracking-wide uppercase">
          WEBSITE UNDER DEVELOPEMENT
        </h2>
      </motion.div>
    </section>
  );
};

export default KnoxHeroCard;
