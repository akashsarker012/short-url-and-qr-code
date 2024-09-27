import UrlContainer from "@/components/urlContainer";
import Image from "next/image";
import prisma from "@/lib/db";
export default function Home() {

  return (
    <main className="mx-auto max-w-xl px-6 py-12 md:py-24">
      <div className="space-y-6 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          Url Shortener
        </h1>
        <p className="md:text-xl">Shorten your urls and share then esaly</p>
        <UrlContainer />
      </div>
    </main>
  );
}
