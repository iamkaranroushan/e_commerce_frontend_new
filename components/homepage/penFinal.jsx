"use client";
import { motion } from "framer-motion";

const PenFinal = () => {
  return (
    <section className="h-screen grid grid-cols-2 justify-center ">
      {/* LEFT COLUMN */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
        viewport={{ once: true }}
        className="flex flex-col justify-center items-start space-y-4  h-full w-full  px-[clamp(2rem,6vw,4rem)]"
      >
        <h1 className="text-[clamp(3rem,6vw,6rem)] font-extrabold text-stone-900 tracking-tight leading-tight">
          NOIRĒ
        </h1>
        <p className="text-stone-500 max-w-md leading-relaxed">
          Crafted with precision. Designed for creators. Built for flow.
        </p>

        <motion.button
          className="px-8 py-4 bg-stone-900 text-white rounded-full text-[clamp(0.7rem,2vw,1rem)] tracking-wider hover:bg-stone-800 transition-all"
        >
          Explore collection
        </motion.button>
      </motion.div>

      {/* RIGHT COLUMN */}
      <div className="relative flex justify-center items-center h-full w-full">
        {/* You can later add the pen animation here */}
      </div>
    </section>
  );
};

export default PenFinal;
