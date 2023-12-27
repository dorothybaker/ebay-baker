"use client";

import { useRouter } from "next/navigation";
import TextInput from "../components/TextInput";
import MainLayout from "../layouts/MainLayout";
import { useUser } from "../context/user";
import { useEffect, useState } from "react";
import useIsLoading from "../hooks/useIsLoading";
import useUserAddress from "../hooks/useUserAddress";
import { toast } from "react-toastify";
import useCreateAddress from "../hooks/useCreateAddress";
import ClientOnly from "../components/ClientOnly";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function Page() {
  const router = useRouter();
  const { user } = useUser();

  const [addressId, setAddressId] = useState(null);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [isUpdatingAddress, setIsUpdatingAddress] = useState(false);
  const [error, setError] = useState({});

  const showError = (type) => {
    if (Object.entries(error).length > 0) {
      return error.message;
    }
    return "";
  };

  const getAddress = async () => {
    if (user?.id === null || user?.id === undefined) {
      useIsLoading(false);
      return;
    }

    const response = await useUserAddress();
    if (response) {
      setTheCurrentAddress(response);
      useIsLoading(false);
      return;
    }
    useIsLoading(false);
  };

  useEffect(() => {
    useIsLoading(true);
    getAddress();
  }, [user]);

  const setTheCurrentAddress = (result) => {
    setAddressId(result.id);
    setName(result.name);
    setAddress(result.address);
    setZipcode(result.zipcode);
    setCity(result.city);
    setCountry(result.country);
  };

  const validate = () => {
    setError({});
    let isError = false;

    if (!name) {
      setError({ type: "name", message: "A name is required" });
      isError = true;
    } else if (!address) {
      setError({ type: "address", message: "An address is required" });
      isError = true;
    } else if (!zipcode) {
      setError({ type: "zipcode", message: "A zipcode is required" });
      isError = true;
    } else if (!city) {
      setError({ type: "city", message: "A city is required" });
      isError = true;
    } else if (!country) {
      setError({ type: "country", message: "A country is required" });
      isError = true;
    }

    return isError;
  };

  const submit = async (e) => {
    e.preventDefault();
    let isError = validate();

    if (isError) {
      toast.error(error.message, { autoClose: 3000 });
      return;
    }

    try {
      setIsUpdatingAddress(true);

      const response = await useCreateAddress({
        addressId,
        name,
        address,
        zipcode,
        city,
        country,
      });
      setTheCurrentAddress(response);
      setIsUpdatingAddress(false);

      toast.success("Address succefully updated!", { autoClose: 3000 });
      router.push("/checkout");
    } catch (error) {
      setIsUpdatingAddress(false);
      console.log(error);
    }
  };

  return (
    <>
      <MainLayout>
        <div className="mx-auto max-w-[600px] px-2 my-3">
          <div className="mx-auto bg-white rounded-sm">
            <h1 className="font-semibold text-xl mb-2">Address Details</h1>

            <form onSubmit={submit} className="flex flex-col gap-3">
              <ClientOnly>
                <TextInput
                  string={name}
                  placeholder="Name"
                  error={showError("name")}
                  onUpdate={setName}
                />
              </ClientOnly>
              <ClientOnly>
                <TextInput
                  string={address}
                  placeholder="Address"
                  error={showError("address")}
                  onUpdate={setAddress}
                />
              </ClientOnly>
              <ClientOnly>
                <TextInput
                  string={zipcode}
                  placeholder="Zipcode"
                  error={showError("zipcode")}
                  onUpdate={setZipcode}
                />
              </ClientOnly>
              <ClientOnly>
                <TextInput
                  string={city}
                  placeholder="City"
                  error={showError("city")}
                  onUpdate={setCity}
                />
              </ClientOnly>
              <ClientOnly>
                <TextInput
                  string={country}
                  placeholder="Country"
                  error={showError("country")}
                  onUpdate={setCountry}
                />
              </ClientOnly>

              <button
                type="submit"
                disabled={isUpdatingAddress}
                className={`${
                  isUpdatingAddress
                    ? "bg-blue-800 cursor-not-allowed"
                    : "bg-blue-600 cursor-pointer"
                } w-full font-semibold text-white mt-5 p-3 rounded-md `}
              >
                {!isUpdatingAddress ? (
                  <span>Update address</span>
                ) : (
                  <div className="flex items-center gap-2 justify-center">
                    <AiOutlineLoading3Quarters className="animate-spin" />
                    <span>Please wait...</span>
                  </div>
                )}
              </button>
            </form>
          </div>
        </div>
      </MainLayout>
    </>
  );
}
