"use client";

import { useRouter } from "next/navigation";
import CheckoutItem from "../components/CheckoutItem";
import { useCart } from "../context/cart";
import { useUser } from "../context/user";
import MainLayout from "../layouts/MainLayout";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import useIsLoading from "../hooks/useIsLoading";
import useUserAddress from "../hooks/useUserAddress";
import { loadStripe } from "@stripe/stripe-js";
import Link from "next/link";
import { BiLoaderCircle } from "react-icons/bi";
import ClientOnly from "../components/ClientOnly";

export default function Page() {
  const user = useUser();
  const cart = useCart();
  const router = useRouter();

  let stripe = useRef(null);
  let elements = useRef(null);
  let card = useRef(null);
  let clientSecret = useRef(null);

  const [addressDetails, setAddressDetails] = useState({});
  const [isLoadingAddress, setIsLoadingAddress] = useState(false);

  const stripeInit = async () => {
    stripe.current = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PK_KEY || ""
    );

    const response = await fetch("/api/stripe", {
      method: "POST",
      body: JSON.stringify({ amount: cart.cartTotal() }),
    });

    const result = await response.json();
    clientSecret.current = result.client_secret;
    elements.current = stripe.current.elements();
    var style = {
      base: { fontSize: "17px" },
      invalid: { color: "#ee4b2b", iconColor: "#ee4b2b" },
    };

    card.current = elements.current.create("card", {
      hidePostalCode: true,
      style: style,
    });

    card.current.mount("#card-element");
    card.current.on("change", function (e) {
      document.querySelector("button").disabled = e.empty;
      document.querySelector("#card-error").textContent = e.error
        ? e.error.message
        : "";
    });

    useIsLoading(false);
  };

  useEffect(() => {
    if (cart?.cartTotal() <= 0) {
      toast.error("Your cart is empty!", { autoClose: 3000 });
      return router.push("/");
    }

    useIsLoading(true);
    const getAddress = async () => {
      if (user?.id === null || user?.id === undefined) {
        useIsLoading(false);
        return;
      }

      setIsLoadingAddress(true);
      const response = await useUserAddress();
      if (response) setAddressDetails(response);
      setIsLoadingAddress(false);
    };

    getAddress();
    setTimeout(() => stripeInit(), 300);
  }, [user]);

  const showError = (errMsg) => {
    let error = document.querySelector("#card-error");
    toast.error(errMsg, { autoClose: 3000 });
    error.textContent = errMsg;

    setTimeOut(() => {
      error.textContent = "";
    }, 3000);
  };

  const pay = async (e) => {
    e.preventDefault();

    if (Object.entries(addressDetails).length === 0) {
      showError("Please add shipping address");
    }

    let result = await stripe.current.confirmCardPayment(clientSecret.current, {
      payment_method: { card: card.current },
    });

    if (result.error) {
      showError(result.error.message);
    } else {
      useIsLoading(true);

      try {
        let response = await fetch("/api/orders/create", {
          method: "POST",
          body: JSON.stringify({
            stripe_id: result.paymentIntent.id,
            name: addressDetails.name,
            address: addressDetails.address,
            zipcode: addressDetails.zipcode,
            city: addressDetails.city,
            country: addressDetails.country,
            products: cart.getCart(),
            total: cart.cartTotal(),
          }),
        });

        if (response.status === 200) {
          toast.success("Order complete!", { autoClose: 3000 });
          cart.clearCart();
          return router.push("/success");
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong!", { autoClose: 3000 });
      }

      useIsLoading(false);
    }
  };

  return (
    <>
      <MainLayout>
        <div className="mx-auto max-w-[1100px] px-2">
          <h1 className="font-semibold text-2xl my-3">Checkout</h1>

          <div className="flex items-baseline justify-between relative gap-2 w-full mx-auto flex-col md:flex-row">
            <div className="md:w-[65%] w-full">
              <div className="bg-white rounded-sm p-2 border">
                <h2 className="font-semibold text-lg mb-2">Shipping address</h2>

                {!isLoadingAddress ? (
                  <Link
                    href="/address"
                    className="text-blue-500 text-sm underline"
                  >
                    {addressDetails?.name ? "Update address" : "Add address"}
                  </Link>
                ) : null}

                {!isLoadingAddress && addressDetails?.name ? (
                  <ul className="text-sm mt-1 flex flex-col gap-1">
                    <li>Name: {addressDetails?.name}</li>
                    <li>Address: {addressDetails?.address}</li>
                    <li>Zipcode: {addressDetails?.zipcode}</li>
                    <li>City: {addressDetails?.city}</li>
                    <li>Country: {addressDetails?.country}</li>
                  </ul>
                ) : null}

                {isLoadingAddress ? (
                  <div className="flex items-center gap-1 mt-1">
                    <BiLoaderCircle className="animate-spin" />
                    <span>Getting address...</span>
                  </div>
                ) : null}
              </div>

              <ClientOnly>
              <div className="bg-white mt-3">
                {cart.getCart().map((product) => (
                  <CheckoutItem key={product?.id} product={product} />
                ))}
              </div>
              </ClientOnly>
            </div>

            <div className="md:absolute block border rounded-sm right-0 md:w-[33.5%] w-full">
              <ClientOnly>
              <div className="p-2">
                <div className="flex items-center justify-between text-sm my-3">
                  <span>Items ({cart.getCart().length})</span>
                  <span>&euro;{(cart.cartTotal() / 100).toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>

                <hr className="h-[px] my-2" />

                <div className="flex items-center justify-between my-2 font-semibold text-lg">
                  <h5>Order total</h5>
                  <span>&euro;{(cart.cartTotal() / 100).toFixed(2)}</span>
                </div>

                <form onSubmit={pay}>
                  <div
                    className="border border-gray-500 p-2 rounded-sm"
                    id="card-element"
                  />
                  <p
                    className="text-red-700 text-center font-semibold relative top-2"
                    role="alert"
                    id="card-error"
                  />

                  <button
                    className="bg-blue-600 text-white font-semibold w-full p-2 rounded-full mt-3"
                    type="submit"
                  >
                    Confirm and pay
                  </button>
                </form>
              </div>
              </ClientOnly>

              <div className="my-4 flex items-center justify-center gap-2">
                <img src="/logo.svg" width={40} />
                <h5 className="text-sm font-semibold">MONEY BACK GUARANTEE</h5>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
}
