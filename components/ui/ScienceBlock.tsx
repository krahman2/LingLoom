"use client";

import Image from "next/image";

export default function ScienceBlock() {
  return (
    <section className="bg-black text-white px-6 py-20 md:px-16">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left: Text Content */}
        <div>
          <h2 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-6">
            The most effective <br />
            science-based approach <br />
            to language learning
          </h2>

          <p className="text-lg mb-4 text-white/90">
            Our method is a cocktail of the highest-impact techniques from
            linguistics, cognitive science, and immersion research.
          </p>

          <p className="italic font-semibold mb-2 text-white/90">
            powered by brain-science.
          </p>

          <p className="text-white/80 leading-relaxed">
            We blend research-backed techniques such as spaced repetition,
            comprehensible input videos, cloze deletions, and micro grammar
            pop-ups to train reading, writing, listening, and speaking in the
            exact order your brain likes to learn.
          </p>
        </div>

        {/* Right: Circular Image */}
        <div className="flex justify-center">
          <div className="w-72 h-72 rounded-full overflow-hidden bg-gradient-to-br from-pink-400 via-yellow-300 to-green-400 flex items-center justify-center">
            <Image
              src="/images/ipadlearn.png"
              alt="Science-based learning illustration"
              width={260}
              height={260}
              className="rounded-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
