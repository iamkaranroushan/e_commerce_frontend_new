"use client";
import { useState } from "react";
import DesktopNav from "../navigation/desktopNav";
import MobileNav from "../navigation/mobileNav";
import SidebarMenu from "../navigation/Sidebar";
import SearchModal from"../navigation/searchModal";

export default function TopNavbar({ routeChange }) {
  const [showSearch, setShowSearch] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="fixed top-0 left-0 w-full z-[100] ">
      <DesktopNav
        routeChange={routeChange}
        openSearch={() => setShowSearch(true)}
      />

      <MobileNav
        routeChange={routeChange}
        openSearch={() => setShowSearch(true)}
        openSidebar={() => setShowSidebar(true)}
      />

      <SidebarMenu
        show={showSidebar}
        close={() => setShowSidebar(false)}
        routeChange={routeChange}
      />

      <SearchModal
        show={showSearch}
        close={() => setShowSearch(false)}
      />
    </div>
  );
}
