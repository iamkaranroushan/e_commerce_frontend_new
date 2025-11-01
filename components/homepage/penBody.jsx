"use client";
import { motion } from "framer-motion";

const PenBody = () => {
  return (
    <section className="h-screen grid grid-cols-2 items-center bg-white relative px-20">
      {/* Left side (empty for pen visual balance) */}
      <div></div>

      {/* Right side (text content) */}
      <motion.div
        className="flex flex-col items-start justify-center space-y-4"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay:0.4, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-semibold text-stone-900 leading-tight">
          Crafted for Precision
        </h2>
        <p className="max-w-xl text-stone-600 text-[clamp(1rem,1.5vw,1.2rem)] leading-relaxed">
          The body of Noirē is sculpted from <span className="font-bold text-stone-800">aerospace-grade aluminum</span>,
          offering unmatched strength with feather-light precision. Every contour
          and curve has been engineered for balance, comfort, and durability —
          refined through the same processes used to shape modern aircraft.
        </p>
      </motion.div>
    </section>
  );
};

export default PenBody;
