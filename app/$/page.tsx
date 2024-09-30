"use client"
import { Link2 as LinkIcon } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { config } from "@/config";
import { useSearchParams } from "next/navigation"
import { Suspense } from "react";

const TIMES = {
  RAW: 3000,
  FORMAT: "3"
}


export default function Page() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Redirect />
    </Suspense>
  );
}

function Redirect() {

  const searchParams = useSearchParams();
  const nextUrl = searchParams.get("next");

  if (!nextUrl) {
   return (
      <div className="min-h-screen bg-pink-50 text-pink-900 flex flex-col">
        <Header />
        <main className="flex-grow p-8 max-w-4xl mx-auto">
        {/* eslint-disable-next-line react/no-unescaped-entities */}
          <p>No url was provided in the query 'next'. Example: <code>?next=google.com</code> or ?next=discord</p>
        </main>
        <Footer />
      </div>
    );
 
  }

  const configUrl = config.socials?.find((social) => social.name.toLowerCase() === nextUrl.toLowerCase())


  setTimeout(() => {
    window.location.href = configUrl ? configUrl.url : `https://${nextUrl}`
  }, TIMES.RAW);

  return (
    <div className="min-h-screen bg-pink-50 text-pink-900 flex flex-col">
      <Header />
      <main className="flex-grow p-8">
        <h2 className="text-3xl font-semibold mb-6 flex items-center justify-center">
          <LinkIcon className="h-8 w-8 mr-2 text-pink-400" />
          {/* eslint-disable-next-line react/no-unescaped-entities */}
            Redirecting to { configUrl ? configUrl.name : "a website" }
          </h2>
           {configUrl ? (
              <p className="text-center text-sm mb-8">Redirecting you!</p>
            ) : (
              <p className="text-center text-sm mb-8">You will be redirected to {nextUrl} in <span id="time">{TIMES.FORMAT}</span> seconds.</p>
            )
           }
      </main>
      <Footer />
    </div>
  );
}
