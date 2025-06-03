// components/ui/Hero.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import LanguageBar from "@/components/ui/LanguageBar";
import { Rocket, Sparkles, BookOpen, Heart, Target, Mail, GraduationCap } from "lucide-react";

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
      <nav className="flex justify-between items-center w-full py-6 z-20">
        {/* Logo + Company Name */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/logo.png"
            alt="LingLoom Logo"
            width={40}
            height={40}
          />
          <span className="text-xl font-bold">LingLoom</span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-6">
          <Link 
            href="/about" 
            className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium"
          >
            <Heart className="w-4 h-4" />
            About
          </Link>
          <Link 
            href="/mission" 
            className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium"
          >
            <Target className="w-4 h-4" />
            Mission
          </Link>
          <Link 
            href="/approach" 
            className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium"
          >
            <BookOpen className="w-4 h-4" />
            Approach
          </Link>
          <Link 
            href="/courses" 
            className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium"
          >
            <GraduationCap className="w-4 h-4" />
            Courses
          </Link>
          <Link 
            href="/contact" 
            className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium"
          >
            <Mail className="w-4 h-4" />
            Contact
          </Link>
        </div>

        {/* Top Right Auth Buttons */}
        <div className="flex items-center gap-3">
          <Link href="/login">
            <Button 
              variant="ghost" 
              size="sm"
              className="text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200"
            >
              Log In
            </Button>
          </Link>
          <Link href="/signup">
            <Button 
              size="sm"
              className="bg-primary hover:bg-primary/90 text-white font-medium transition-all duration-200 hover:scale-105"
            >
              Sign Up
            </Button>
          </Link>
        </div>
      </nav>

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
