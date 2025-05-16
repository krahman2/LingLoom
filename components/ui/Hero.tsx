"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import LanguageBar from "@/components/ui/LanguageBar";

export default function Hero() {
  return (
    <section className="flex flex-col items-center justify-center text-center min-h-screen px-4 bg-black text-white">
      {/* Logo + Company Name */}
      <div className="flex flex-col items-center mb-6">
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
      <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 max-w-3xl">
        A language-learning app focused on{" "}
        <span className="text-accent">interactive</span> and{" "}
        <span className="text-accent">effective</span> methods
      </h1>

      {/* Subheading */}
      <p className="text-base leading-snug text-muted-foreground mb-8">
        If Anki and Duo had a baby—with comprehensible input!
      </p>

      {/* Buttons */}
      <div className="flex gap-4 justify-center flex-wrap">
        <Button size="lg" variant="secondary">
          SIGN UP
        </Button>
        <Button size="lg" variant="ghost">
          LOG IN
        </Button>
      </div>

      {/* Hero Image */}
      <div className="mt-8">
        <Image
          src="/images/webdesign1.png"
          alt="Hero Illustration"
          width={500}
          height={300}
        />
      </div>

      {/* extra space before the language bar */}
      <div className="mt-12 w-full">
        <LanguageBar />
      </div>
    </section>
  );
}
