"use client";

import SimilarProducts from "@/app/components/SimilarProducts";
import { useCart } from "@/app/context/cart";
import useIsLoading from "@/app/hooks/useIsLoading";
import MainLayout from "@/app/layouts/MainLayout";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Page({ params }) {
  const cart = useCart();

  const [product, setProduct] = useState({});

  const getProduct = async () => {
    useIsLoading(true);
    setProduct({});

    const response = await fetch(`/api/product/${params.id}`);
    const prod = await response.json();

    setProduct(prod);
    cart.isItemAddedToCart(prod);
    useIsLoading(false);
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <>
      <MainLayout>
        <div className="max-w-[1200px] mx-auto">
          <div className="flex px-2 md:px-4 py-3 md:py-5 gap-3 flex-col md:flex-row">
            {product?.url ? (
              <img
                src={product.url + "/280"}
                className="md:w-[40%] w-[80%] rounded-sm"
              />
            ) : (
              <div className="md:w-[40%] w-[80%]"></div>
            )}

            <div className="w-full">
              <h1 className="font-semibold text-xl">{product?.title}</h1>
              <h5 className="text-sm text-gray-700 pt-2">
                Brand New - Full Warranty
              </h5>
              <hr className="h-[px] my-1" />

              <div className="py-1">
                <div className="flex items-center">
                  Condition: <span className="font-semibold ml-2">New</span>
                </div>
              </div>
              <hr className="h-[px] my-1" />
              <div className="py-1">
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center">
                    Price:{" "}
                    {product?.price ? (
                      <span className="font-semibold ml-2">
                        &euro;{(product?.price / 100).toFixed(2)}
                      </span>
                    ) : null}
                  </div>
                  <button
                    onClick={() => {
                      if (cart?.isItemAdded) {
                        cart?.removeFromCart(product);
                        toast.info("Item removed from cart", {
                          autoClose: 3000,
                        });
                      } else {
                        cart?.addToCart(product);
                        toast.success("Item added to cart", {
                          autoClose: 3000,
                        });
                      }
                    }}
                    className={`text-white py-[6.5px] rounded-full px-10 cursor-pointer ${
                      cart?.isItemAdded
                        ? "bg-[#e9a321] hover:bg-[#bf851a]"
                        : "bg-[#3498C9] hover:bg[#0054A0]"
                    }`}
                  >
                    {cart?.isItemAdded ? "Remove From Cart" : "Add To Cart"}
                  </button>
                </div>
                <hr className="h-[px] my-2" />
                <div className="pt-1">
                  <h2 className="font-semibold pb-1">Description:</h2>
                  <p className="text-sm">{product?.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <SimilarProducts />
      </MainLayout>
    </>
  );
}
