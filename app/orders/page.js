"use client";

import { FcShipped } from "react-icons/fc";
import MainLayout from "../layouts/MainLayout";
import Link from "next/link";
import { useUser } from "../context/user";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useIsLoading from "../hooks/useIsLoading";
import moment from "moment";

export default function Page() {
  const { user } = useUser();
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    try {
      if (!user && !user?.id) return;
      const response = await fetch("/api/orders");

      const result = await response.json();
      setOrders(result);
      useIsLoading(false);
    } catch (error) {
      toast.error("Something went wrong", { autoClose: 3000 });
      useIsLoading(false);
    }
  };

  useEffect(() => {
    useIsLoading(true);
    getOrders();
  }, [user]);

  return (
    <>
      <MainLayout>
        <div className="my-3 max-w-[1200px] mx-auto px-2 w-full min-h-[50vh]">
          <div className="w-full bg-white min-h-[150px]">
            <div className="flex items-center text-xl gap-2">
              <FcShipped size={30} />
              <span className="font-semibold">Orders</span>
            </div>

            {orders.length < 1 ? (
              <div className="flex items-center text-lg text-gray-400 justify-center min-h-[40vh] w-full">
                You have no order history!
              </div>
            ) : null}

            {orders.map((order) => (
              <div className="text-sm" key={order.id}>
                <div className="border-b py-1 flex flex-col gap-2">
                  <div>
                    <span className="font-semibold">Stripe ID: </span>
                    {order.stripe_id}
                  </div>
                  <div>
                    <span className="font-semibold">Delivery Address: </span>
                    {order?.name}, {order?.address}, {order?.zipcode},{" "}
                    {order?.city}, {order?.country}
                  </div>
                  <div>
                    <span className="font-semibold">Total: </span>
                    &euro;{(order?.total / 100).toFixed(2)}
                  </div>
                  <div>
                    <span className="font-semibold">Order created: </span>
                    {moment(order?.created_at).calendar()}
                  </div>
                  <div>
                    <span className="font-semibold">Delivery time: </span>
                    {moment(order?.created_at).add(3, "days").calendar()}
                  </div>

                  <div className="flex items-center gap-3">
                    {order?.orderItem.map((item) => (
                      <div key={item?.id} className="flex items-center gap-2">
                        <Link
                          className="text-blue-600 font-semibold py-1"
                          href={`/product/${item.product_id}`}
                        >
                          <img
                            className="rounded-sm"
                            width={120}
                            src={item?.product?.url + "/120"}
                          />
                          <span>{item?.product?.title}</span>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </MainLayout>
    </>
  );
}
