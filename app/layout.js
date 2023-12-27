import { Playfair_Display } from "next/font/google";
import "./globals.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserProvider from "./context/user";
import CartProvider from "./context/cart";

const playfair = Playfair_Display({ subsets: ["latin"], weight: "400" });

export const metadata = {
  title: "eBay",
  description: "This is an eBay clone",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <link
        rel="icon"
        type="image/x-icon"
        href="https://www.svgrepo.com/show/354969/ebay.svg"
      />
      <body className={`${playfair.className} antialiased`}>
        <ToastContainer />

        <UserProvider>
          <CartProvider>{children}</CartProvider>
        </UserProvider>
      </body>
    </html>
  );
}
