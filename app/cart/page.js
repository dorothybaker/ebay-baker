"use client";

import { useRouter } from "next/navigation";
import CartItem from "../components/CartItem";
import SimilarProducts from "../components/SimilarProducts";
import MainLayout from "../layouts/MainLayout";
import { useCart } from "../context/cart";
import useIsLoading from "../hooks/useIsLoading";
import ClientOnly from "../components/ClientOnly";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter();
  const cart = useCart();

  useEffect(() => {
    useIsLoading(true);
    cart.getCart();
    cart.cartTotal();
    useIsLoading(false);
  }, [cart]);

  const goToCheckOut = () => {
    if (!cart.cartTotal()) {
      alert("You don't have any items in the cart.");
      return;
    }

    router.push("/checkout");
  };

  return (
    <>
      <MainLayout>
        <div className="max-w-[1200px] w-full mx-auto mb-5 min-h-[300px] px-2">
          <h1 className="font-semibold text-2xl my-3">Shopping cart</h1>

          <div className="relative flex items-baseline justify-between gap-2 flex-col md:flex-row">
            <ClientOnly>
              <div className="md:w-[65%] w-full">
                {cart.getCart().length > 0 ? (
                  cart
                    .getCart()
                    .map((product) => (
                      <CartItem key={product.id} product={product} />
                    ))
                ) : (
                  <div className="h-full w-[200px] mt-3 text-lg text-gray-400 flex items-center justify-center">
                    No items in the cart!
                  </div>
                )}
              </div>
            </ClientOnly>

            <div className="md:w-[33%] md:absolute block w-full top-2 right-0">
              <ClientOnly>
                <div className="bg-white p-2 border">
                  <button
                    className="flex items-center justify-center p-2 w-full bg-blue-600 text-white rounded-full font-semibold"
                    onClick={() => goToCheckOut()}
                  >
                    Go to checkout
                  </button>

                  <div className="flex items-center justify-between text-sm my-3">
                    <span>Items ({cart.getCart().length})</span>
                    <span>&euro;{(cart.cartTotal() / 100).toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>

                  <hr className="h-[px] my-2" />

                  <div className="font-semibold flex items-center justify-between text-lg">
                    <span>Subtotal</span>
                    <span>&euro;{(cart.cartTotal() / 100).toFixed(2)}</span>
                  </div>
                </div>
              </ClientOnly>
            </div>
          </div>
        </div>

        <SimilarProducts />
      </MainLayout>
    </>
  );
}
