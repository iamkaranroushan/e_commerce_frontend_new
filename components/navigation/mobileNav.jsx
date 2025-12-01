"use client";
import { IoIosSearch } from "react-icons/io";
import { IoBagOutline } from "react-icons/io5";
import { HiBars3 } from "react-icons/hi2";
import { useSelector } from "react-redux";

export default function MobileNav({ routeChange, openSidebar, openSearch }) {
  const { role } = useSelector((s) => s.auth);

  return (
    <div className="lg:hidden flex items-center justify-between w-full py-3 px-[clamp(1.4rem,4vw,10rem)] bg-white/10 backdrop-blur-lg">
        <div className="flex items-center space-x-5">
        
        <HiBars3
          className="text-3xl cursor-pointer"
          onClick={openSidebar}
        />
        <span
        onClick={() => routeChange("/")}
        className="font-bold text-xl cursor-pointer"
      >
        NOIRE
      </span>
        </div>
      {/* LEFT SECTION: search + cart + menu */}
      <div className="flex items-center space-x-5">
        <IoIosSearch
          onClick={openSearch}
          className="text-2xl cursor-pointer"
        />

        {role !== "admin" && (
          <IoBagOutline
            className="text-2xl cursor-pointer"
            onClick={() => routeChange("/cart")}
          />
        )}

        
      </div>

      {/* RIGHT: LOGO */}
      
    </div>
  );
}
