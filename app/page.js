"use client";

import { useEffect, useState } from "react";
import CarouselComp from "./components/CarouselComp";
import Product from "./components/Product";
import MainLayout from "./layouts/MainLayout";
import useIsLoading from "./hooks/useIsLoading";

export default function Home() {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    useIsLoading(true);

    const response = await fetch(`/api/products`);
    const prods = await response.json();

    setProducts([]);
    setProducts(prods);
    useIsLoading(false);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <MainLayout>
        <CarouselComp />

        <div className="max-w-[1200px] mx-auto w-full px-2">
          <h1 className="font-semibold text-2xl my-4">Products</h1>

          <div className="grid lg:grid-cols-6 grid-cols-2 md:grid-cols-4 sm:grid-cols-3 gap-2">
            {products.map((product) => (
              <Product key={product.id} product={product} />
            ))}
          </div>
        </div>
      </MainLayout>
    </>
  );
}
