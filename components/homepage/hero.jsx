"use client";
import { useLayoutEffect, useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

import FixedPen from "./fixedPen";
import HeroCard from "../custom/HeroCard";
import PenBody from "./penBody";
import PenNib from "./penNib";
import PenFinal from "./penFinal";
import RouteLoader from "../skeleton/RouteLoader";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const Hero = () => {
  const [loading, setLoading] = useState(false);
  const containerRef = useRef(null);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setLoading(false);
  }, [pathname, searchParams]);

  useLayoutEffect(() => {
  const ctx = gsap.context(() => {
    const sections = gsap.utils.toArray(".panel");
    const pen = document.querySelector(".pen");
    let currentIndex = 0;
    let isAnimating = false;

    // 🪄 Main timeline controlling pen motion
    const tl = gsap.timeline({ paused: true });
    tl.addLabel("section0")
      .to(pen, { x: -500, y: 100, scale: 2.8, duration: 1.5, ease: "power2.inOut" })
      .addLabel("section1")
      .to(pen, { x: -500, y: -800, scale: 3.5, duration: 2.5, ease: "power2.inOut" })
      .addLabel("section2")
      .to(pen, { x: 400, y: 0, scale: 1, duration: 2, ease: "power2.inOut" })
      .addLabel("section3");

    // ✨ Function to go to a section smoothly
    const goToSection = (index) => {
      if (isAnimating || index < 0 || index >= sections.length) return;
      isAnimating = true;

      gsap.to(window, {
        scrollTo: { y: sections[index], offsetY: 0 },
        duration: 1.2,
        ease: "power2.inOut",
        onUpdate: () => ScrollTrigger.update(),
        onComplete: () => (isAnimating = false),
      });

      tl.tweenTo(`section${index}`, {
        duration: 1.2,
        ease: "power2.inOut",
      });

      currentIndex = index;
    };

    // 🖱️ Manual scroll (wheel) handling
    const handleScroll = (e) => {
      e.preventDefault();
      if (isAnimating) return;
      if (e.deltaY > 0) goToSection(currentIndex + 1);
      else goToSection(currentIndex - 1);
    };

    // 🧠 Sync timeline with normal scroll (e.g. scrollbar drag or page down)
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        tl.progress(progress);
      },
    });

    // 🧩 Event listener
    window.addEventListener("wheel", handleScroll, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleScroll);
      ScrollTrigger.getAll().forEach((t) => t.kill());
      tl.kill();
    };
  }, containerRef);

  return () => ctx.revert();
}, []);



  return (
    <>
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-80 hide-scrollbar">
          <RouteLoader />
        </div>
      )}

      <div ref={containerRef} className="relative bg-white">
        {/* Fixed Pen */}
        <FixedPen />

        {/* Scrollable Sections */}
        <section className="panel h-screen flex items-center justify-center">
          <HeroCard />
        </section>

        <section className="panel h-screen flex items-center justify-center">
          <PenBody />
        </section>

        <section className="panel h-screen flex items-center justify-center">
          <PenNib />
        </section>
        
        <section className="panel h-screen flex items-center justify-center">
          <PenFinal />
        </section>
      </div>
    </>
  );
};

export default Hero;
