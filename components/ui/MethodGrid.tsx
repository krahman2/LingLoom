"use client";

import Image from "next/image";

export default function MethodsGrid() {
  return (
    <section className="bg-white text-black py-24 px-6 sm:px-10 md:px-20 lg:px-32 xl:px-40 relative overflow-hidden">
      {/* Ensure no hidden corner gyphs are present */}
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            What makes us <span className="text-primary">different?</span>
          </h2>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Our innovative approach combines cutting-edge technology with human-centered design
          </p>
          
          {/* Central gyph underneath subtitle */}
          <div className="flex justify-center">
            <Image
              src="/images/Untitled (1024 x 1024 px) (1)/6.gif"
              alt="Innovation animation"
              width={120}
              height={120}
              className="rounded-full"
              unoptimized
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12 text-sm">
          <div className="group hover:bg-gray-50 p-6 rounded-lg transition-colors">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-primary font-bold">🌍</span>
              </div>
              <div>
                <h3 className="font-bold mb-2 text-lg">Cultural Immersion.</h3>
                <p className="text-gray-700 leading-relaxed">
                  Real-world content (music, memes, media) from the cultures you're learning, integrated directly. No need to hunt for external resources.
                </p>
              </div>
            </div>
          </div>

          <div className="group hover:bg-gray-50 p-6 rounded-lg transition-colors">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-primary font-bold">💎</span>
              </div>
              <div>
                <h3 className="font-bold mb-2 text-lg">Underrepresented Languages.</h3>
                <p className="text-gray-700 leading-relaxed">
                  Championing languages like Bangla, Marathi, Telugu, Urdu, and Nepali with quality, comprehensive resources often missing elsewhere.
                </p>
              </div>
            </div>
          </div>
          
          <div className="group hover:bg-gray-50 p-6 rounded-lg transition-colors">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-primary font-bold">🧠</span>
              </div>
              <div>
                <h3 className="font-bold mb-2 text-lg">Comprehensible Input.</h3>
                <p className="text-gray-700 leading-relaxed">
                  Lessons immerse you in understandable content, letting your brain naturally acquire grammar and vocabulary—less rote memorization, more flow.
                </p>
              </div>
            </div>
          </div>

          <div className="group hover:bg-gray-50 p-6 rounded-lg transition-colors">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-primary font-bold">⚡</span>
              </div>
              <div>
                <h3 className="font-bold mb-2 text-lg">Contextual Micro-Grammar.</h3>
                <p className="text-gray-700 leading-relaxed">
                  Bite-sized grammar explanations within cultural contexts. Understand the 'why' without dense textbook study, all in one place.
                </p>
              </div>
            </div>
          </div>

          <div className="group hover:bg-gray-50 p-6 rounded-lg transition-colors">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-primary font-bold">🎯</span>
              </div>
              <div>
                <h3 className="font-bold mb-2 text-lg">Smart Spaced Repetition.</h3>
                <p className="text-gray-700 leading-relaxed">
                  Our intelligent built-in scheduler optimizes reviews, embedding vocabulary and concepts into long-term memory efficiently. No separate flashcard app needed.
                </p>
              </div>
            </div>
          </div>

          <div className="group hover:bg-gray-50 p-6 rounded-lg transition-colors">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-primary font-bold">✍️</span>
              </div>
              <div>
                <h3 className="font-bold mb-2 text-lg">Active Recall & Writing.</h3>
                <p className="text-gray-700 leading-relaxed">
                  Engaging prompts encourage active vocabulary use in context. Stronger recall than passive review, integrated into your learning path.
                </p>
              </div>
            </div>
          </div>

          <div className="group hover:bg-gray-50 p-6 rounded-lg transition-colors">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-primary font-bold">🎵</span>
              </div>
              <div>
                <h3 className="font-bold mb-2 text-lg">Shadowing Pronunciation.</h3>
                <p className="text-gray-700 leading-relaxed">
                 Mimic native speakers in real-time to improve your accent and listening skills simultaneously, all within the app.
                </p>
              </div>
            </div>
          </div>

          <div className="group hover:bg-gray-50 p-6 rounded-lg transition-colors">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-primary font-bold">👥</span>
              </div>
              <div>
                <h3 className="font-bold mb-2 text-lg">Human-First Community.</h3>
                <p className="text-gray-700 leading-relaxed">
                  Connect, share, and practice with fellow learners and native speakers (planned). An integrated community, no need to find external groups for support and practice.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add custom CSS for slow bounce animation */}
      <style jsx>{`
        @keyframes slow-bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-slow-bounce {
          animation: slow-bounce 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
