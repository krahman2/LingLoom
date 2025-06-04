// components/ui/Hero.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import LanguageBar from "@/components/ui/LanguageBar";
import NavigationBar from "./NavigationBar";
import { Rocket, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section
      className="
        relative
        flex flex-col
        min-h-screen
        px-4
        pb-24
        bg-black text-white
        overflow-hidden
      "
    >
      {/* Top Navigation Bar */}
      <NavigationBar />

      {/* Main Content - Centered */}
      <div className="flex-1 flex items-center justify-center">
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

            {/* Enhanced CTA Buttons */}
            <div className="flex gap-6 justify-center lg:justify-start flex-wrap mb-8">
              <Link href="/signup">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-3"
                >
                  <Rocket className="w-5 h-5" />
                  Start Your Adventure!
                </Button>
              </Link>
              <Link href="/login">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-2 border-accent text-accent hover:bg-accent hover:text-black font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-3 bg-transparent"
                >
                  <Sparkles className="w-5 h-5" />
                  Jump Back Into Learning!
                </Button>
              </Link>
            </div>
          </div>

          {/* Right side - Hero animation */}
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
      </div>

      {/* Language bar pinned to bottom */}
      <div className="absolute bottom-0 left-0 w-full">
        <LanguageBar />
      </div>
    </section>
  );
}
