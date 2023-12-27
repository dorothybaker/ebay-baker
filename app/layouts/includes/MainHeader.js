"use client";

import debounce from "debounce";
import Link from "next/link";
import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { BiLoaderCircle } from "react-icons/bi";
import { GrSearchAdvanced } from "react-icons/gr";

export default function MainHeader() {
  const [items, setItems] = useState([]);
  const [isSearching, setIsSearching] = useState(null);

  const handleSearchName = debounce(async (e) => {
    if (e.target.value === "") {
      setItems([]);
      return;
    }

    setIsSearching(true);

    try {
      const response = await fetch(
        `/api/products/search-by-name/${e.target.value}`
      );
      const result = await response.json();

      if (result) {
        setItems(result);
        setIsSearching(false);
        return;
      }

      setItems([]);
      setIsSearching(false);
    } catch (error) {
      console.log(error);
    }
  }, 500);

  return (
    <>
      <div className="border-b">
        <div className="flex items-center justify-between w-full mx-auto max-w-[1200px] py-2 md:py-3">
          <div className="flex items-center w-full bg-white">
            <div className="flex justify-between items-center gap-2 md:gap-5 max-w-[1150px] w-full px-2 mx-auto">
              <Link href="/">
                <img src="/logo.svg" className="w-[70px] md:w-[100px]" />
              </Link>

              <div className="w-full">
                <div className="relative">
                  <div className="flex items-center gap-1 md:gap-3">
                    <div className="relative flex items-center border-2 border-gray-900 w-full">
                      <button className="text-white bg-gray-900 p-[6.5px] flex items-center border-none">
                        <AiOutlineSearch size={20} />
                      </button>
                      <input
                        type="text"
                        placeholder="Search eBay..."
                        className="w-full bg-white placeholder-gray-400 focus:outline-none outline-none px-1 self-end pb-1"
                        onChange={handleSearchName}
                      />

                      {isSearching ? (
                        <BiLoaderCircle
                          className="animate-spin mr-1"
                          size={20}
                        />
                      ) : null}

                      {items.length > 0 ? (
                        <div className="absolute bg-white max-w-[910px] md:w-full w-[230px] h-auto z-20 left-0 top-12 border p-1">
                          {items.map((item) => (
                            <div className="p-1" key={item.id}>
                              <Link
                                href={`/product/${item?.id}`}
                                className="flex items-center justify-between w-full cursor-pointer"
                              >
                                <div className="flex items-center gap-2">
                                  <img
                                    src={item?.url + "/40"}
                                    width={30}
                                    className="rounded-full"
                                  />
                                  <span className="truncate">
                                    {item?.title}
                                  </span>
                                </div>
                                <div className="truncate hidden md:block">
                                  &euro;{(item?.price / 100).toFixed(2)}
                                </div>
                              </Link>
                            </div>
                          ))}
                        </div>
                      ) : null}
                    </div>
                    <button className="flex items-center p-[8.7px] text-sm md:px-5 bg-blue-600 font-semibold text-white rounded-sm hover:bg-blue-700">
                      Search
                    </button>
                    <button className="flex items-center p-[8.7px] text-sm md:px-5 border border-black hover:border-blue-600 font-semibold hover:text-blue-600 rounded-sm">
                      <span className="hidden md:block">Advanced</span>
                      <GrSearchAdvanced size={17} className="block md:hidden" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
