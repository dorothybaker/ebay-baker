"use client";

import { usePathname } from "next/navigation";

export default function CheckoutItem({ product }) {
  const pathname = usePathname();

  return (
    <>
      <div className="flex justify-start rounded-sm border p-2 mb-2 gap-2 flex-col md:flex-row">
        <img
          src={product?.url + "/150"}
          className="rounded-sm h-[150px] w-[150px]"
        />

        <div className="overflow-hidden">
          <h4 className="font-semibold">{product?.title}</h4>
          <span className="font-bold text-lg">
            &euro;{(product?.price / 100).toFixed(2)}
          </span>
          <div className="text-gray-500 text-sm flex items-center gap-1 font-semibold">
            <h4 className=" ine-through">
              &euro;{((product?.price * 1.2) / 100).toFixed(2)}
            </h4>
            &ndash;
            <span>20% OFF</span>
          </div>
          <p className="text-sm">{product?.description.slice(0, 100)}...</p>

          {pathname === "/cart" ? (
            <button className="text-blue-600 p-1 underline text-sm font-semibold">
              Remove
            </button>
          ) : null}
        </div>
      </div>
    </>
  );
}
