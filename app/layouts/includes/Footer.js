"use client";

export default function Footer() {
  return (
    <>
      <div className="border-t mt-10 px-2">
        <div className="flex items-baseline lg:justify-start lg:gap-20 flex-wrap justify-between w-full mx-auto max-w-[1200px] py-3 md:py-4">
          <ul className="text-gray-700">
            <li className="font-bold text-lg">Buy</li>
            <li className="mt-1 py-1 text-xs hover:underline cursor-pointer">
              Registration
            </li>
            <li className="py-1 text-xs hover:underline cursor-pointer">
              eBay Money Back Guarantee
            </li>
            <li className="py-1 text-xs hover:underline cursor-pointer">
              Bidding & buying help
            </li>
            <li className="py-1 text-xs hover:underline cursor-pointer">
              Stores
            </li>
            <li className="py-1 text-xs hover:underline cursor-pointer">
              eBay local
            </li>
            <li className="py-1 text-xs hover:underline cursor-pointer">
              eBay guides
            </li>
          </ul>

          <ul className="text-gray-700">
            <li className="font-bold text-lg">Sell</li>
            <li className="mt-1 py-1 text-xs hover:underline cursor-pointer">
              Start selling
            </li>
            <li className="py-1 text-xs hover:underline cursor-pointer">
              Learn to sell
            </li>
            <li className="py-1 text-xs hover:underline cursor-pointer">
              Business Sellers
            </li>
            <li className="py-1 text-xs hover:underline cursor-pointer">
              Affiliates
            </li>
          </ul>

          <ul className="text-gray-700">
            <li className="font-bold text-lg">About eBay</li>
            <li className="mt-1 py-1 text-xs hover:underline cursor-pointer">
              Company info
            </li>
            <li className="py-1 text-xs hover:underline cursor-pointer">
              News
            </li>
            <li className="py-1 text-xs hover:underline cursor-pointer">
              Investors
            </li>
            <li className="py-1 text-xs hover:underline cursor-pointer">
              Careers
            </li>
            <li className="py-1 text-xs hover:underline cursor-pointer">
              Government relations
            </li>
            <li className="py-1 text-xs hover:underline cursor-pointer">
              Advertise with us
            </li>
            <li className="py-1 text-xs hover:underline cursor-pointer">
              Policies
            </li>
          </ul>

          <ul className="text-gray-700">
            <li className="font-bold text-lg">Help and Contact</li>
            <li className="mt-1 py-1 text-xs hover:underline cursor-pointer">
              Resolution Center
            </li>
            <li className="py-1 text-xs hover:underline cursor-pointer">
              Seller Information Center
            </li>
            <li className="py-1 text-xs hover:underline cursor-pointer">
              Contact Us
            </li>

            <ul className="text-gray-700">
              <li className="font-bold text-lg">Communities</li>
              <li className="mt-1 py-1 text-xs hover:underline cursor-pointer">
                Announcements
              </li>
              <li className="py-1 text-xs hover:underline cursor-pointer">
                Answer Center
              </li>
              <li className="py-1 text-xs hover:underline cursor-pointer">
                Discussion Boards
              </li>
              <li className="py-1 text-xs hover:underline cursor-pointer">
                Groups
              </li>
            </ul>
          </ul>
        </div>
        <div className="my-2 text-sm">
          &copy; Copyright 2023. All rights reserved. eBay
        </div>
      </div>
    </>
  );
}
