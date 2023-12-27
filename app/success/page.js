import { AiOutlineCheckCircle } from "react-icons/ai";
import MainLayout from "../layouts/MainLayout";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <MainLayout>
        <div className="max-w-[1200px] w-full mx-auto">
          <div className="bg-white w-full p-2 flex items-center justify-center h-[50vh]">
            <div>
              <div className="flex items-center text-xl gap-2 font-semibold justify-center">
                <AiOutlineCheckCircle size={35} color="green" />
                <span className="text">Payment Successful</span>
              </div>

              <p className="mt-1 text-center">
                Thank you! We have received your payment.
              </p>

              <Link className="w-full" href="/">
                <button className="bg-blue-600 text-white p-2 mt-3 w-full rounded-md">
                  Back to shop
                </button>
              </Link>
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
}
