"use client";
import ProductNavbar from "@/components/product/productNavbar";
import UserNavbar from "@/components/user/usernav";
import Top_navbar from "@/components/custom/top_navbar";
import {Bottom_navbar} from "@/components/custom/bottom_navbar";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { MoonLoader } from "react-spinners";
import { Provider } from "react-redux";
import { store, persistor } from "@/features/auth/authStore";
import { PersistGate } from "redux-persist/integration/react";
import CartNavbar from "@/components/cart/cartNavbar";
import { Button } from "@/components/ui/button";
import useCart from "@/hooks/useCart";
import RouteLoader from "@/components/skeleton/RouteLoader"
const CartLayout = ({ children }) => {

  const [routeLoading, setRouteLoading] = useState(false);
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
    setLoading(false); // Cleanup timer when the effect re-runs
  }, [pathname, searchParams]);

  const handleCheckOut = (url) => {
    const currentUrl = window.location.pathname + window.location.search;
    if (url !== currentUrl) {
      setRouteLoading(true);
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
          
          <Top_navbar routeChange={routeChange} />
          
          {loading ? (
            <div className="">
              <RouteLoader/>
            </div>
          ) : (
            <>

            <main className="p-3 w-full">
              {children}
            </main>

            <div className="block lg:hidden w-full fixed bottom-0 z-20">
                <Bottom_navbar routeChange={routeChange} />
            </div>
            </>
          )
          }
        </div>
      </PersistGate>
    </Provider >
  );
};

export default CartLayout;
