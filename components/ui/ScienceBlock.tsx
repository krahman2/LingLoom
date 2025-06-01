"use client";

import Image from "next/image";

export default function ScienceBlock() {
  return (
    <section className="bg-black text-white px-6 py-20 md:px-16 relative overflow-hidden">
      {/* Ensure no hidden corner gyphs are present */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left: Text Content */}
        <div>
          <h2 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-6">
            The most effective <br />
            <span className="text-accent">science-based</span> approach <br />
            to language learning
          </h2>

          <p className="text-lg mb-4 text-white/90">
            Our method is a cocktail of the highest-impact techniques from
            linguistics, cognitive science, and immersion research.
          </p>

          <p className="italic font-semibold mb-2 text-accent">
            powered by brain-science.
          </p>

          <p className="text-white/80 leading-relaxed">
            We blend research-backed techniques such as spaced repetition,
            comprehensible input videos, cloze deletions, and micro grammar
            pop-ups to train reading, writing, listening, and speaking in the
            exact order your brain likes to learn.
          </p>

          {/* Additional animated element */}
          <div className="mt-12 flex items-center gap-8">
            <div className="w-28 h-28">
              <Image
                src="/images/Untitled (1024 x 1024 px) (1)/5.gif"
                alt="Brain learning animation"
                width={112}
                height={112}
                className="rounded-full"
                unoptimized
              />
            </div>
            <p className="text-sm text-accent font-semibold">
              Scientifically optimized for your brain's natural learning patterns
            </p>
          </div>
        </div>

        {/* Right: Enhanced Image Section */}
        <div className="flex justify-center relative">
          <div className="w-72 h-72 rounded-full overflow-hidden bg-gradient-to-br from-pink-400 via-yellow-300 to-green-400 flex items-center justify-center relative">
            <Image
              src="/images/ipadlearn.png"
              alt="Science-based learning illustration"
              width={260}
              height={260}
              className="rounded-full object-cover"
            />
            
            {/* Floating animated elements around the main image */}
            <div className="absolute -top-2 -right-2 animate-bounce">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <span className="text-2xl">🧠</span>
              </div>
            </div>
            
            <div className="absolute -bottom-2 -left-2 animate-pulse">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <span className="text-2xl">⚡</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
