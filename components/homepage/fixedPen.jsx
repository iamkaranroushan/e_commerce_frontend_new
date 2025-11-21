"use client";
import Image from "next/image";

const FixedPen = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-20">
      <div className="pen relative w-[clamp(40rem,40vw,45rem)] h-[clamp(60rem,70vw,50rem)]">
        <Image
          src="/Hero_image.png"
          alt="Noirē Pen"
          fill
          priority
          className="object-contain drop-shadow-2xl"
        />
      </div>
    </div>
  );
};

export default FixedPen;
