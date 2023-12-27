"use client";

import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function Loading() {
  return (
    <>
      <div className="fixed bg-black/70 inset-0 w-full z-40 flex items-center justify-center h-[100vh] overflow-hidden">
        <div className="flex justify-center items-center flex-col">
          <AiOutlineLoading3Quarters
            size={70}
            className="text-blue-400 animate-spin"
          />
          <div className="text-white text-center text-xl font-medium">
            Loading...
          </div>
        </div>
      </div>
    </>
  );
}
