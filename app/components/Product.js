"use client";

import Link from "next/link";

export default function Product({ product }) {
  return (
    <>
      <Link
        href={`/product/${product.id}`}
        className="max-w-[200px] p-1.5 border border-gray-50 hover:border-gray-200 hover:shadow-xl bg-white rounded-sm mx-auto"
      >
        {product?.url ? (
          <img
            src={product.url + "/190"}
            className="cursor-pointer rounded-sm"
          />
        ) : null}

        <div className="pt-2 px-[3px]">
          <h3 className="font-semibold hover:underline cursor-pointer">
            {product?.title.length > 14
              ? product?.title.slice(0, 14) + "..."
              : product?.title}
          </h3>
          <h4 className="font-bold">
            &euro;{(product?.price / 100).toFixed(2)}
          </h4>

          <div className="text-gray-500 font-mono text-sm flex items-center gap-1 font-semibold">
            <h4 className=" line-through">
              &euro;{((product?.price * 1.2) / 100).toFixed(2)}
            </h4>
            &ndash;
            <span>20% OFF</span>
          </div>
        </div>
      </Link>
    </>
  );
}
