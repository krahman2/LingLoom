// components/ui/Footer.tsx
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-white px-6 py-12 md:py-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

        {/* Column 1: Logo, Tagline, Button */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          {/* Logo */}
          <div className="mb-3 flex items-center gap-2">
            <Image
              src="/images/logo.png"
              alt="LingLoom Logo"
              width={24}
              height={24}
            />
            <span className="font-semibold text-lg">LingLoom</span>
          </div>

          <h2 className="text-xl font-bold mb-2">Fast Track to Fluency</h2>
          <p className="text-sm text-gray-300 mb-4 max-w-sm">
            Every exercise is timed, ordered, and repeated according to the latest neuroscience, so 30 minutes a day compounds into real-world fluency faster than any single-method app.
          </p>

          <Button
            size="sm"
            className="bg-transparent border border-accent text-accent hover:bg-accent/10"
          >
            APP COMING SOON
          </Button>
        </div>

        {/* Column 2: Explore + Social Links */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-6">
          {/* Explore */}
          <div>
            <h3 className="font-semibold mb-2 text-sm text-white">Explore</h3>
            <nav className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-gray-300">
              <Link href="/about">About</Link>
              <Link href="/mission">Mission</Link>
              <Link href="/courses">Courses</Link>
              <Link href="/approach">Approach</Link>
              <Link href="/pricing">Pricing</Link>
              <Link href="/contact">Contact</Link>
            </nav>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold mb-2 text-sm text-white">Social</h3>
            <div className="flex flex-wrap gap-4 text-sm text-gray-400 justify-center md:justify-start">
              <a href="#" className="hover:text-white">Instagram</a>
              <a href="#" className="hover:text-white">TikTok</a>
              <a href="#" className="hover:text-white">Twitter</a>
              <a href="#" className="hover:text-white">YouTube</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
