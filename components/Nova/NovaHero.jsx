"use client";
import { useLayoutEffect, useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

import FixedPen from "../homepage/fixedPen";
import NovaHeroCard from "../Nova/NovaHeroCard";

import RouteLoader from "../skeleton/RouteLoader";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, MotionPathPlugin);

const NovaHero = () => {
  const containerRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();
  const pathname = usePathname();

  useEffect(() => setLoading(false), [pathname, searchParams]);

 

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
          <NovaHeroCard />
        </section>
      </div>
    </>
  );
};

export default NovaHero;
