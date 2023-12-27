"use client";

import { toast } from "react-toastify";
import { useCart } from "../context/cart";

export default function CartItem({ product }) {
  const cart = useCart();

  const removeFromCart = () => {
    let res = confirm(
      `Are you sure you want to remove "${product?.title}" from the cart?`
    );

    if (res) {
      cart.removeFromCart(product);
      toast.info("Removed from cart", { autoClose: 3000 });
    }
  };

  return (
    <>
      <div className="relative flex justify-start my-2 border w-full p-2 md:p-3 gap-2 flex-col md:flex-row">
        <img
          src={product?.url + "/150"}
          className="rounded-sm h-[150px] w-[150px]"
        />

        <div className="overflow-hidden w-full">
          <div className="flex items-center justify-between w-full">
            <h2 className="font-semibold text-lg">{product?.title}</h2>
            <span className="font-bold text-lg">
              {" "}
              &euro;{(product?.price / 100).toFixed(2)}
            </span>
          </div>
          <h4 className="font-semibold mt-1">NEW</h4>
          <p className="text-sm my-1">
            {product?.description?.slice(0, 150)}...
          </p>
          <div className="absolute bottom-1 right-1 text-sm font-semibold">
            <button
              className="text-blue-600 p-1 underline"
              onClick={() => removeFromCart()}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
