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

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, MotionPathPlugin);

const Hero = () => {
  const containerRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();
  const pathname = usePathname();

  useEffect(() => setLoading(false), [pathname, searchParams]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const pen = document.querySelector(".pen");
      const sections = gsap.utils.toArray(".panel");
      let currentIndex = 0;
      let isAnimating = false;

      const baseWidth = 1920;

      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 1024px)",
          isMobile: "(max-width: 1023px)",
        },
        (context) => {
          const { isDesktop, isMobile } = context.conditions;

          // ⭐ INITIAL PEN STATE (per breakpoint)
          gsap.set(pen, {
            x: "0vw",
            y: "0vh",
            scale: isMobile ? 1.3 : 1,
            rotate: 0,
            opacity: 1,
          });

          // ⭐ TIMELINE PER BREAKPOINT
          const tl = gsap.timeline({ paused: true });

          if (isDesktop) {
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
            tl.addLabel("section0")
              .to(pen, {
                duration: 1.4,
                ease: "power2.inOut",
                motionPath: {
                  path: [
                    { x: "0vw", y: "-50vh" },
                    { x: "0vw", y: "-80vh" },
                    { x: "0vw", y: "-90vh" },
                    { x: "0vw", y: "-110vh" },
                  ],
                  curviness: 1.4,
                },
                scale: 1.5,
              })
              .addLabel("section1")
              .to(pen, {
                duration: 1.7,
                ease: "power2.inOut",
                motionPath: {
                  path: [
                    { x: "0vw", y: "-900vh" },
                    { x: "0vw", y: "-900vh" },
                    { x: "0vw", y: "-900vh" },
                  ],
                  curviness: 1.35,
                },
                scale: 2.1,
              })
              .addLabel("section2")
              .to(pen, {
                x: "0vw",
                y: "0vh",
                scale: 1,
                duration: 1.3,
                ease: "power2.out",
              })
              .addLabel("section3");
          }

          // ⭐ SECTION SCROLL NAVIGATION
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

          // ⭐ SCROLLTRIGGER SYNCING
          ScrollTrigger.create({
            trigger: containerRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
            onUpdate: (self) => tl.progress(self.progress),
          });

          window.addEventListener("wheel", handleScroll, { passive: false });

          // ⭐ CLEANUP for this breakpoint
          return () => {
            window.removeEventListener("wheel", handleScroll);
            tl.kill();
            ScrollTrigger.getAll().forEach((t) => t.kill());
          };
        }
      );

      // ⭐ Cleanup all matchMedia rules when component unmounts
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
        <FixedPen />

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
