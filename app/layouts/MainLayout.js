"use client";

import { useEffect, useState } from "react";
import Footer from "./includes/Footer";
import MainHeader from "./includes/MainHeader";
import SubMenu from "./includes/SubMenu";
import TopMenu from "./includes/TopMenu";
import Loading from "../components/Loading";

export default function MainLayout({ children }) {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    window.addEventListener("storage", function () {
      let res = localStorage.getItem("isLoading");
      res === "false" ? setIsLoading(false) : setIsLoading(true);
    });
  }, []);

  return (
    <>
      <div className="max-w-[1300px] mx-auto w-full">
        <div>
          {isLoading ? <Loading /> : <div></div>}
          <TopMenu />
          <MainHeader />
          <SubMenu />

          {children}

          <Footer />
        </div>
      </div>
    </>
  );
}
