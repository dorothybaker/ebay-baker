"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import Link from "next/link";

export default function Page() {
  const supabase = createClientComponentClient();

  return (
    <>
      <div className="w-full min-h-[98vh] bg-white flex flex-col items-center justify-center">
        <div className="border-b-gray-300">
          <Link href="/">
            <img src="/logo.svg" className="w-[100px] md:w-[150px]" />
          </Link>
        </div>
        <h1 className="font-semibold text-xl my-2">Login / Register</h1>

        <div className="max-w-[400px] mx-auto px-2">
          <Auth
            onlyThirdPartyProviders
            appearance={{ theme: ThemeSupa }}
            providers={["google"]}
            redirectTo={`${window.location.origin}/auth/callback`}
            supabaseClient={supabase}
          />
        </div>
      </div>
    </>
  );
}
