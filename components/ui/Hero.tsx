// components/ui/Hero.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import LanguageBar from "@/components/ui/LanguageBar";

export default function Hero() {
  return (
    <section
      className="
        relative
        flex flex-col items-center justify-center
        text-center
        min-h-screen
        px-4
        pb-24
        bg-black text-white
        overflow-hidden
      "
    >
      {/* Logo + Company Name */}
      <div className="flex flex-col items-center mb-6 z-10">
        <Image
          src="/images/logo.png"
          alt="LingLoom Logo"
          width={50}
          height={50}
          className="mb-3"
        />
        <span className="text-2xl font-bold">LingLoom</span>
      </div>

      {/* Main Content with animated gyph */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-12 max-w-6xl mx-auto z-10">
        
        {/* Left side - Text content */}
        <div className="flex-1 text-center lg:text-left">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6 max-w-2xl">
            A language-learning app focused on{" "}
            <span className="text-accent">interactive</span> and{" "}
            <span className="text-accent">effective</span> methods
          </h1>

          <p className="text-lg md:text-xl leading-snug text-gray-200 mb-8">
            The human way to fluency—through cultural immersion and connection.
          </p>

          {/* Buttons */}
          <div className="flex gap-6 justify-center lg:justify-start flex-wrap mb-8">
            <Link href="/signup">
              <Button size="lg" variant="secondary">
                SIGN UP
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="ghost">
                LOG IN
              </Button>
            </Link>
          </div>
        </div>

        {/* Right side - Hero gyph instead of image */}
        <div className="flex-1 relative flex justify-center items-center">
          <Image
            src="/images/Untitled (1024 x 1024 px) (1)/3.gif"
            alt="Learning animation"
            width={380} 
            height={380}
            className="rounded-full object-contain" 
            unoptimized
          />
        </div>
      </div>

      {/* Language bar pinned to bottom */}
      <div className="absolute bottom-0 left-0 w-full">
        <LanguageBar />
      </div>
    </section>
  );
}
