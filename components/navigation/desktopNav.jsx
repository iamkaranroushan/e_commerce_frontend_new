"use client";
import { usePathname } from "next/navigation";
import { IoIosSearch } from "react-icons/io";
import { IoBagOutline } from "react-icons/io5";
import { LuUserRound } from "react-icons/lu";
import { FaRegEdit } from "react-icons/fa";
import { useSelector } from "react-redux";
import { TbEdit } from "react-icons/tb";
import { LuPencilRuler } from "react-icons/lu";

const CATEGORY_NAVS = [
  { label: "Pheonix", path: "/" },
  { label: "Knox", path: "/knox" },
  { label: "Nova", path: "/nova" },
];

export default function DesktopNav({ routeChange, openSearch }) {
  const pathname = usePathname();
  const { role } = useSelector((s) => s.auth);

  const isActive = (p) => pathname === p;

  return (
    <div className="hidden lg:flex items-center justify-between w-full py-4 px-[clamp(3rem,5vw,10rem)] bg-white/10 backdrop-blur-lg">
      {/* Logo */}
      <span
        onClick={() => routeChange("/")}
        className="font-bold text-2xl cursor-pointer"
      >
        NOIRE
      </span>

      {/* Middle Nav */}
      <div className="flex items-center  space-x-8">
        {CATEGORY_NAVS.map((c) => (
          <span
            key={c.path}
            onClick={() => routeChange(c.path)}
            className={`cursor-pointer text-lg ${
              isActive(c.path) ? "font-semibold" : "text-gray-600"
            }`}
          >
            {c.label}
          </span>
        ))}
      </div>

      {/* Right Icons */}
      <div className="flex items-center space-x-6">
        <IoIosSearch
          onClick={openSearch}
          className="text-2xl cursor-pointer"
        />

        {role === "admin" ? (
          <LuPencilRuler
            className="text-2xl cursor-pointer"
            onClick={() => routeChange("/admin/edit")}
          />
        ) : (
          <IoBagOutline
            className="text-2xl cursor-pointer"
            onClick={() => routeChange("/cart")}
          />
        )}

        <LuUserRound
          className="text-2xl cursor-pointer"
          onClick={() =>
            role === "admin"
              ? routeChange("/admin/dashboard")
              : routeChange("/user")
          }
        />
      </div>
    </div>
  );
}
