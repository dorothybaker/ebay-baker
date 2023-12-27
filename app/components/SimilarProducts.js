"use client";

import { useEffect, useState } from "react";
import Product from "./Product";
import { BiLoader } from "react-icons/bi";

export default function SimilarProducts() {
  const [products, setProducts] = useState([]);

  const getRandomProducts = async () => {
    try {
      const response = await fetch(`/api/products/get-random`);
      const result = await response.json();

      if (result) {
        setProducts(result);
        return;
      }
      setProducts([]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRandomProducts();
  }, []);

  return (
    <>
      <hr className="h-[px] max-w-[1200px] py-1 mx-auto" />

      <div className="max-w-[1200px] w-full mx-auto px-2">
        <h2 className="font-semibold text-2xl my-3">Similar sponsored items</h2>

        {products?.length > 0 ? (
          <div className="grid lg:grid-cols-6 grid-cols-2 md:grid-cols-4 sm:grid-cols-3 gap-2">
            {products?.map((product) => (
              <Product key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="h-[40vh] flex items-center justify-center">
            <div className="flex items-center gap-1 justify-center font-semibold">
              <BiLoader className="text-blue-600 animate-spin" size={40} />
              <span>Loading Products...</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
