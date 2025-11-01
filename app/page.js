'use client'

import AnimatedLoader from "@/components/custom/animatedLogo";
import FeaturedProducts from "@/components/custom/featuredProducts";
import Layout from "@/components/custom/layout";
import Login from "@/components/custom/login";
import MainFooter from "@/components/custom/mainFooter";
import Hero from "@/components/homepage/hero";
import RouteLoader from "@/components/skeleton/RouteLoader";
import { useState, Suspense } from "react";

const Page = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <Suspense fallback={<RouteLoader />}>
      <Layout>
        {isLoginOpen && (
          <Login
            setIsLoginOpen={setIsLoginOpen}
            onClose={() => setIsLoginOpen(false)}
          />
        )}
        <div
          className={`flex flex-col justify-center hide-scrollbar bg-black ${isLoginOpen ? "blur-sm" : ""
            }`}
        >
          <Hero />
        </div>
      </Layout>
    </Suspense>
  );
};

export default Page;

{/**<FeaturedProducts setIsLoginOpen={setIsLoginOpen} /> */}