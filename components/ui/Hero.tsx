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
      "
    >
      {/* Logo + Company Name */}
      <div className="flex flex-col items-center mb-3">
        <Image
          src="/images/logo.png"
          alt="LingLoom Logo"
          width={40}
          height={40}
          className="mb-2"
        />
        <span className="text-xl font-semibold">LingLoom</span>
      </div>

      {/* Heading */}
      <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 max-w-2xl">
        A language-learning app focused on{" "}
        <span className="text-accent">interactive</span> and{" "}
        <span className="text-accent">effective</span> methods
      </h1>

      {/* Subheading */}
      <p className="text-lg md:text-xl leading-snug text-muted-foreground mb-4">
        If Anki and Duo had a baby—with comprehensible input!
      </p>

      {/* Buttons */}
      <div className="flex gap-6 justify-center flex-wrap mb-5">
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

      {/* Hero Image */}
      <div className="mt-1">
        <Image
          src="/images/webdesign1.png"
          alt="Hero Illustration"
          width={600}
          height={360}
        />
      </div>

      {/* Language bar pinned to bottom */}
      <div className="absolute bottom-0 left-0 w-full">
        <LanguageBar />
      </div>
    </section>
  );
}
