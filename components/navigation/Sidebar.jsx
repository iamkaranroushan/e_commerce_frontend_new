"use client";

import { motion, AnimatePresence } from "framer-motion";
import { IoBagOutline } from "react-icons/io5";
import { LuUserRound } from "react-icons/lu";
import { BsBoxSeam } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import Login from "../custom/login";
import Logout from "../custom/logout";
import { LuPencilRuler } from "react-icons/lu";
import { LuLayoutDashboard } from "react-icons/lu";


import { TbLogout } from "react-icons/tb";
const CATEGORY_NAVS = [
  { label: "Pheonix", path: "/" },
  { label: "Knox", path: "/knox" },
  { label: "Nova", path: "/nova" },
];
export default function SidebarMenu({ show, close, routeChange }) {
  const { role, user, token, phoneNumber } = useSelector((s) => s.auth);

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);

  const go = (path) => {
    routeChange(path);
    close();
  };

  return (
    <AnimatePresence>
      {show && (
        <>


        
          {/* BACKDROP */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-[250]"
            onClick={close}
          />

           
            
          {/* SIDEBAR */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="fixed top-0 left-0 h-full w-[75%] max-w-xs bg-white shadow-xl z-[300] py-3 px-[clamp(1rem,5vw,1.8rem)] flex flex-col justify-between"
          >
            {/* LOGIN/LOGOUT MODALS */}
            {isLoginOpen && <Login onClose={() => setIsLoginOpen(false)} />}
            {isLogoutOpen && (
              <Logout
                setIsLogoutOpen={setIsLogoutOpen}
                onClose={() => setIsLogoutOpen(false)}
              />
            )}

            {/* ================= TOP SECTION ================= */}
            <div>
              {/* HEADER */}
              <div className="flex justify-between items-center mb-6">
                <span className="font-bold text-xl">NOIRE</span>
                <button className="text-3xl text-gray-600" onClick={close}>
                  <IoCloseOutline />
                </button>
              </div>

              {/* CATEGORY NAVS */}
              <div className="space-y-5 mb-8">
                {CATEGORY_NAVS.map((c) => (
                  <div
                    key={c.path}
                    onClick={() => go(c.path)}
                    className="text-[clamp(1.1rem,3vw,1.3rem)] text-gray-700 cursor-pointer"
                  >
                    {c.label}
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 my-4"></div>

              {/* OTHER ACTIONS */}
              <div className="space-y-5">
                {role !== "admin" && (
                  <div
                    className="flex items-center space-x-3 text-[clamp(1.1rem,3vw,1.3rem)] cursor-pointer"
                    onClick={() => go("/cart")}
                  >
                    <IoBagOutline className="text-[clamp(1.1rem,3vw,1.3rem)]" />
                    <span>Bag</span>
                  </div>
                )}
                {token && role !== "admin" && (
                  <div
                      className="flex items-center space-x-3 text-[clamp(1.1rem,3vw,1.3rem)] cursor-pointer"
                      onClick={() => go("/orders")}
                  >
                      <BsBoxSeam className="text-[clamp(1rem,3vw,1.2rem)]" />
                      <span>Orders</span>
                  </div>
                    )}

                

                {role === "admin" && (
                <>
                    <div
                    className="flex items-center space-x-3 text-lg cursor-pointer"
                    onClick={() => go("/admin/edit")}
                    >
                    <LuPencilRuler  className="text-xl" />
                    <span>Edit</span>
                    </div>

                    <div
                    className="flex items-center space-x-3 text-lg cursor-pointer"
                    onClick={() => go("/admin/edit")}
                    >
                    <LuLayoutDashboard  className="text-xl" />
                    <span>Dashboard</span>
                    </div>
                </>
                )}
                
                
                  {token && (

                    <div
                      className="flex items-center text-red-500  space-x-3 text-[clamp(1.1rem,3vw,1.3rem)] cursor-pointer"
                       onClick={() => setIsLogoutOpen(true)}
                  >
                    <TbLogout   className="text-[clamp(1.3rem,3vw,1.5rem)]" />
                    <span>Logout</span>
                  </div>
                    
                  )}

              </div>
            </div>

            {/* ================= BOTTOM SECTION ================= */}
           {/* ================= BOTTOM SECTION ================= */}
        <div className="pt-6 mt-6 border-t border-gray-200">

        {/* LOGOUT BUTTON FIRST */}
        

        {/* USER INFO OR LOGIN BUTTON */}
        {/* USER INFO OR LOGIN BUTTON */}
            {token ? (
            <div
                onClick={() => go(role === "admin" ? "/admin/dashboard" : "/user")}
                className="flex items-center space-x-4 mb-4 cursor-pointer"
            >
                <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                <LuUserRound className="text-2xl text-gray-600" />
                </div>

                <div>
                <p className="font-semibold text-gray-800">{user || "User"}</p>
                <p className="text-sm text-gray-500">{phoneNumber}</p>
                </div>
            </div>
            ) : (
            <button
                onClick={() => setIsLoginOpen(true)}
                className="bg-black text-white px-4 py-4 mb-4 rounded-lg text-sm w-full"
            >
                Login
            </button>
            )}
        </div>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
