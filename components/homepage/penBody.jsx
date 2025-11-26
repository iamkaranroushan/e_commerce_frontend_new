"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const PenBody = () => {
  return (
    <section
      className="
        h-screen 
        grid grid-cols-1 lg:grid-cols-2 
        bg-white 
        relative
        px-6 lg:px-20
        pt-20 lg:pt-0
      "
    >

      {/* LEFT SIDE (Desktop pen placeholder) */}
      {/* ❗ ONLY visible on desktop */}
      <div className="hidden lg:flex items-center justify-center">
        {/* Desktop pen is fixed globally, so we keep this empty intentionally */}
      </div>

      {/* RIGHT SIDE TEXT */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="
          flex flex-col 
          justify-start 
          space-y-4 
          lg:justify-center  
        
        "
      >
        <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-semibold text-stone-900 leading-tight">
          Sculpted from Strength
        </h2>

        <p className="max-w-xl text-stone-600 text-[clamp(1rem,1.5vw,1.2rem)] leading-relaxed">
          Sculpted from <span className="font-bold text-stone-800">aerospace-grade aluminum</span>,
          offering unmatched strength with feather-light precision. Every contour
          and curve is engineered for balance and durability.
        </p>
      </motion.div>

      {/* ⭐ MOBILE PEN (BOTTOM) */}
      {/* Only visible on mobile */}
      {/* ⭐ MOBILE PEN (BOTTOM) */}
<motion.div
  initial={{ opacity: 0, y: 80 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 1, ease: "easeOut" }}
  viewport={{ once: true }}
  className="
    block lg:hidden
    absolute 
    bottom-0 
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
      h-auto   
      overflow-hidden   
      flex 
      justify-center
    "
  >
    <Image
      src="/Hero_image.png"
      alt="Pen body"
      width={1200}
      height={1200}
      className="
        w-full
        h-auto
        scale-[2]      /* ⬅ increased scaling */
        translate-y-[30vh] /* ⬅ move pen UP */
      "
      priority
    />
  </div>
</motion.div>


    </section>
  );
};

export default PenBody;
