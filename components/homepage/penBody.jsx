"use client";
import { motion } from "framer-motion";

const PenBody = () => {
  return (
    <section
      className="
        h-screen 
        grid grid-cols-1 lg:grid-cols-2 
        bg-white relative 
        px-6 lg:px-20
      "
    >
      {/* LEFT SIDE (Desktop pen area) */}
      <div className="hidden lg:block"></div>

      {/* RIGHT SIDE TEXT */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        viewport={{ once: true }}
        className="
          flex flex-col 
          space-y-4
          
          /* ⭐ MOBILE: push text UP */
          justify-start pt-20    

          /* ⭐ DESKTOP: center text perfectly */
          lg:justify-center lg:pt-0
        "
      >
        <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-semibold text-stone-900 leading-tight">
          Sculpted from Strength
        </h2>

        <p className="max-w-xl text-stone-600 text-[clamp(1rem,1.5vw,1.2rem)] leading-relaxed">
          Sculpted from <span className="font-bold text-stone-800">aerospace-grade aluminum</span>,
          offering unmatched strength with feather-light precision. Every contour
          and curve has been engineered for balance, comfort, and durability —
          refined through the same processes used to shape modern aircraft.
        </p>
      </motion.div>
    </section>
  );
};

export default PenBody;
