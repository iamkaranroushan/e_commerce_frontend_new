"use client";
import ProductNavbar from "@/components/product/productNavbar";
// import UserNavbar from "@/components/user/usernav";
import Top_navbar from "@/components/custom/top_navbar";
import {Bottom_navbar} from "@/components/custom/bottom_navbar";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { MoonLoader } from "react-spinners";
import { Provider } from "react-redux";
import {store, persistor} from "@/features/auth/authStore";
import { PersistGate } from "redux-persist/integration/react";
import RouteLoader from "@/components/skeleton/RouteLoader"
const UserLayout = ({ children }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const Router = useRouter(); // Using the useRouter hook
  const [loading, setLoading] = useState(false);
  
  // const handleBack = () => {
  //   setLoading(true);
  //   router.back(); // Navigates to the previous page
  // };
  // useEffect(() => {
  //   setLoading(false);
  // }, [searchParams, pathname]);


const routeChange = (url) => {
    const currentUrl = window.location.pathname + window.location.search;
    if (url !== currentUrl) {
      setLoading(true);
      console.log(url);
      Router.push(url, { scroll: false });
    }
  };
  useEffect(() => {
    setLoading(false); // Cleanup timer when the effect re-runs
  }, [pathname, searchParams]);
  return (
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
        <div className="flex flex-col items-center min-h-screen">
         <Top_navbar routeChange={routeChange} />
          {/* Show loading spinner while loading */}
          {loading ? (
            <div className="">
              <RouteLoader/>
            </div>
          ) : (
            <>
              {/* Render the ProductNavbar and main content only when not loading 
              <UserNavbar handleBack={handleBack} />*/}
              
              <main className="flex-grow justify-center w-screen  p-3">
                {children}
              </main>

              <div className="block lg:hidden w-full fixed bottom-0 z-20">
                <Bottom_navbar routeChange={routeChange} />
              </div>

            </>
          )}
        </div>
      </PersistGate>
    </Provider>
  );
};

export default UserLayout;
