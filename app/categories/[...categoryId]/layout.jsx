"use client";
import Login from "@/components/custom/login";
import ProductNavbar from "@/components/product/productNavbar";
import Top_navbar from "@/components/custom/top_navbar";
import {Bottom_navbar} from "@/components/custom/bottom_navbar";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { MoonLoader } from "react-spinners";
import { Provider } from "react-redux";
import { store, persistor } from "@/features/auth/authStore";
import { PersistGate } from "redux-persist/integration/react";
import MainFooter from "@/components/custom/mainFooter";
import RouteLoader from "@/components/skeleton/RouteLoader"
const ProductLayout = ({ children }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter(); // Using the useRouter hook
  const [loading, setLoading] = useState(false);
  


  const routeChange = (url) => {
    const currentUrl = window.location.pathname + window.location.search;
    if (url !== currentUrl) {
      setLoading(true);
      console.log(url);
      router.push(url, { scroll: false });
    }
  };
  useEffect(() => {
    setLoading(false);
  }, [searchParams, pathname]);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="flex flex-col items-center min-h-screen">
          {/* Show loading spinner while loading */}
          {/* Render the ProductNavbar and main content only when not loading */}
          <Top_navbar routeChange={routeChange} />

          {loading ? (
            <RouteLoader />
          ) : (
            <>
              <main className="flex-grow justify-center w-full my-10 py-2">
                {children}
              </main>)
              <div className="block lg:hidden w-full fixed bottom-0 z-20">
                  <Bottom_navbar routeChange={routeChange} />
              </div>
            </>
            )
          }
         
        </div>
      </PersistGate>
    </Provider>
  );
};

export default ProductLayout;
