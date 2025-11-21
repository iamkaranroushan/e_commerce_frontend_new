"use client";
import { useLayoutEffect, useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
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
    gsap.registerPlugin(MotionPathPlugin);

     const ctx = gsap.context(() => {
    const pen = document.querySelector(".pen");
    const sections = gsap.utils.toArray(".panel");
    let currentIndex = 0;
    let isAnimating = false;

    const baseWidth = 1920;

    // ⭐ MATCH MEDIA START
    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: "(min-width: 1024px)",
        isMobile: "(max-width: 1023px)",
      },
      (context) => {
        const { isDesktop, isMobile } = context.conditions;

        // 🎞️ timeline based on device
        const tl = gsap.timeline({ paused: true });

        if (isDesktop) {
          // 💻 DESKTOP TIMELINE
          tl.addLabel("section0")
            .to(pen, {
              x: "-30vw",
              y: "50vh",
              scale: () => 2.8 * (window.innerWidth / baseWidth),
              duration: 1.5,
              ease: "power2.inOut",
            })
            .addLabel("section1")
            .to(pen, {
              x: "-30vw",
              y: "-80vh",
              scale: () => 3.5 * (window.innerWidth / baseWidth),
              duration: 2.5,
              ease: "power2.inOut",
            })
            .addLabel("section2")
            .to(pen, {
              x: "0vw",
              y: "0vh",
              scale: () => 1 * (window.innerWidth / baseWidth),
              duration: 2,
              ease: "power2.inOut",
            })
            .addLabel("section3");
        }

        if (isMobile) {
  // 📱 MOBILE / TABLET ANIMATION
  tl.addLabel("section0")

    // ✦ Phase 1: Move OUT of the screen (right)
    .to(pen, {
      duration: 1.4,
      ease: "power2.inOut",
      motionPath: {
        path: [
          { x: "100vw", y: "40vh" },     // slight move right/down
          { x: "50vw", y: "50vh" },    // arc outward
          { x: "30vw", y: "50vh" },    // curve peak
          { x: "0vw", y: "50vh" },     // land into the empty spot
            
        ],
        curviness: 1.4,
      },
      scale: 2.0,
    })


    .addLabel("section1")

    // ✦ Phase 2: curved return path (no flicker)
    .to(pen, {
      duration: 1.7,
      ease: "power2.inOut",
      motionPath: {
        path: [
          { x: "0vw", y: "30vh" },   // off-screen right
          { x: "0vw",  y: "-40vh" },  // nice high arc
          { x: "0vw",   y: "-50vh" },  // landing above empty space
        ],
        curviness: 1.35,
      },
      scale: 2.1,
    })

    .addLabel("section2")

    // ✦ Phase 3: Final settle into the empty slot
    .to(pen, {
      x: "0vw",
      y: "0vh",
      scale: 1.3,
      duration: 1.3,
      ease: "power2.out",
    })

    .addLabel("section3");
}


        // ⭐ Section navigation logic stays same
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

        const handleScroll = (e) => {
          e.preventDefault();
          if (isAnimating) return;
          if (e.deltaY > 0) goToSection(currentIndex + 1);
          else goToSection(currentIndex - 1);
        };

        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          onUpdate: (self) => tl.progress(self.progress),
        });

        window.addEventListener("wheel", handleScroll, { passive: false });

        return () => {
          window.removeEventListener("wheel", handleScroll);
          ScrollTrigger.getAll().forEach((t) => t.kill());
          tl.kill();
        };
      }
    );

    // Cleanup matchMedia on unmount
    return () => mm.revert();
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
        
        <section className="panel h-screen flex justify-center items-center">
          <PenFinal />
        </section>
      </div>
    </>
  );
};

export default Hero;
