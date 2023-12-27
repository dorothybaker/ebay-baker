"use client";

import Link from "next/link";
import { useState, useCallback } from "react";

import { BsChevronDown } from "react-icons/bs";
import { FcShipped } from "react-icons/fc";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useUser } from "@/app/context/user";
import { useCart } from "@/app/context/cart";
import ClientOnly from "@/app/components/ClientOnly";

export default function TopMenu() {
  const user = useUser();
  const cart = useCart();

  const isLoggedIn = () => {
    if (user && user?.id) {
      return (
        <button
          onClick={toggleIsMenu}
          className="flex items-center gap-2 hover:underline cursor-pointer"
        >
          <h1 className="truncate">Hi, {user?.name}</h1>
          <BsChevronDown
            className={`${
              isMenu ? "rotate-180" : "rotate-0"
            } transition duration-200`}
            size={10}
          />
        </button>
      );
    }

    return (
      <Link
        href="/auth"
        className="flex items-center gap-1 hover:underline cursor-pointer"
      >
        <span>Login</span>
        <BsChevronDown
          className={`${
            isMenu ? "rotate-180" : "rotate-0"
          } transition duration-200`}
          size={10}
        />
      </Link>
    );
  };

  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isMenu, setIsMenu] = useState(false);

  const toggleMenu = useCallback(() => {
    setShowMobileMenu((current) => !current);
  }, []);

  const toggleIsMenu = useCallback(() => {
    setIsMenu((current) => !current);
  }, []);

  return (
    <>
      <div className="border-b">
        <div className="flex items-center justify-between w-full mx-auto max-w-[1200px] py-2 md:py-3">
          <ul className="flex items-center text-sm text-[#333] px-2 gap-3 md:gap-4">
            <li className="relative">
              {isLoggedIn()}

              <div
                className={`${
                  isMenu ? "visible" : "hidden"
                } absolute bg-white top-8 w-[200px] left-0 z-40 border shadow-md p-2`}
              >
                <div className="flex items-center justify-start gap-1">
                  <img
                    src={user?.picture}
                    width={40}
                    className="rounded-full"
                  />
                  <span className="text-base font-semibold">{user?.name}</span>
                </div>
                <hr className="h-[px] my-2" />
                <div className="flex flex-col gap-2">
                  <Link
                    href="/orders"
                    className="cursor-pointer text-blue-600 hover:text-blue-700 hover:underline"
                  >
                    My Orders
                  </Link>
                  <p
                    onClick={() => {
                      user?.signOut();
                      setIsMenu(false);
                    }}
                    className="cursor-pointer text-blue-600 hover:text-blue-700 hover:underline"
                  >
                    Sign Out!
                  </p>
                </div>
              </div>
            </li>
            <li className="hidden md:block cursor-pointer">Daily Deals</li>
            <li className="hidden md:block cursor-pointer">Help and Contact</li>

            {/* Mobile View */}
            <li className="relative md:hidden">
              <div className="flex items-center gap-1" onClick={toggleMenu}>
                <span>More</span>
                <BsChevronDown
                  className={`${
                    showMobileMenu ? "rotate-180" : "rotate-0"
                  } transition duration-200`}
                  size={10}
                />
              </div>

              <div
                className={`top-8 bg-white z-40 border p-2 shadow-md flex flex-col gap-2 w-[200px] transition ${
                  showMobileMenu ? "absolute" : "hidden"
                }`}
              >
                <span>Daily Deals</span>
                <span>Help and Contact</span>
              </div>
            </li>
          </ul>

          <ul className="flex items-center text-sm text-[#333] px-2 gap-2 md:gap-4">
            <li className="flex items-center gap-1 cursor-pointer hover:underline">
              <div className="h-6 w-6 rounded-full flex items-center justify-center border border-[#333]">
                <FcShipped size={15} />
              </div>
              <span>Ship to</span>
            </li>
            <ClientOnly>
              <li>
                <Link href="/cart">
                  <div className="relative cursor-pointer">
                    <AiOutlineShoppingCart size={20} />

                    {cart?.cartCount() > 0 ? (
                      <div className="h-[14px] w-[14px] absolute -top-1 -right-[5px] rounded-full text-white bg-red-600">
                        <div className="flex items-center justify-center -mt-[4.5px]">
                          {cart?.cartCount()}
                        </div>
                      </div>
                    ) : (
                      <div></div>
                    )}
                  </div>
                </Link>
              </li>
            </ClientOnly>
          </ul>
        </div>
      </div>
    </>
  );
}
