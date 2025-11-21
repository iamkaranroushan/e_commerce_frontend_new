"use client";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import useCategories from "@/hooks/useCategories";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { BsSearch } from "react-icons/bs";
import { LuUserRound } from "react-icons/lu";
import { FaRegEdit } from "react-icons/fa";
import { IoBagOutline } from "react-icons/io5";
import { MdSearch } from "react-icons/md";
import { IoIosSearch } from "react-icons/io";

const Top_navbar = ({ routeChange }) => {
  const { role } = useSelector((state) => state.auth);
  const pathname = usePathname();
  const isActive = (path) => pathname === path;

  const [showCategories, setShowCategories] = useState(false);
  const { categories, loading } = useCategories(); // <-- categories have subCategories

  // Search modal state
  const [showSearch, setShowSearch] = useState(false);

  return (
    <div className="top-0 z-[100] fixed flex flex-col w-screen bg-white">
      {/* Main Navbar */}
      <div className="flex items-center justify-between w-full py-[clamp(0.8rem,2vw,1rem)] px-[clamp(0.3rem,4vw,30rem)]">
        {/* title */}
        <div className="flex items-center">
          <span
            onClick={() => routeChange("/")}
            className=" cursor-default font-bold  lg:text-2xl"
          >
            NOIRE
          </span>
        </div>

        <div className="hidden lg:flex lg:justify-around lg:space-x-8 lg:items-center">
          {/* Search */}
          <button onClick={() => setShowSearch(true)}>
            <IoIosSearch className="text-[clamp(1rem,5vw,1.5rem)]" />
          </button>

          {/* admin or edit */}
          {role === "admin" ? (
            <button onClick={() => routeChange("/admin/edit")}>
              <span
                className={` ${isActive("/admin/edit") && "text-black font-bold"}`}
              >
                <FaRegEdit className="text-[clamp(1rem,5vw,1.5rem)]" />
              </span>
            </button>
          ) : (
            <button onClick={() => routeChange("/cart")}>
              <span
                className={` ${isActive("/cart") && "text-black font-bold"}`}
              >
                <IoBagOutline className="text-[clamp(1rem,5vw,1.5rem)]" />
              </span>
            </button>
          )}

          {/* User or admin */}
          <div className="flex items-center justify-center mr-1">
            <button
              className="rounded-full"
              onClick={() =>
                role !== "admin"
                  ? routeChange("/user")
                  : routeChange("/admin/dashboard")
              }
            >
              <span className={` ${isActive("/user") && "text-black font-bold"}`}>
                <LuUserRound className="text-[clamp(1rem,5vw,1.5rem)]" />
              </span>
            </button>
          </div>
        </div>
        <div
          onClick={() => setShowSearch(true)}
          className=" lg:hidden flex border border-stone-100 p-2 rounded-lg"
        >
          <button>
            <IoIosSearch className="text-[clamp(1rem,5vw,1.5rem)] mr-2" />
          </button>
          <span className="">Search</span>
        </div>
      </div>

      {/* Search Modal */}
      <AnimatePresence>
        {showSearch && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-2xl shadow-lg p-6 w-[90%] max-w-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Search</h2>
                <button
                  onClick={() => setShowSearch(false)}
                  className="text-gray-600 hover:text-black"
                >
                  ✕
                </button>
              </div>
              <input
                type="text"
                placeholder="Type to search..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Top_navbar;
