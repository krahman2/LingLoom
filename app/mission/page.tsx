'use client';

import NavigationBar from '@/components/ui/NavigationBar';
import Footer from '@/components/ui/Footer';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';

export default function MissionPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-950 text-white">
      <NavigationBar />
      <main className="flex-grow">
        
        {/* Hero Section */}
        <section className="relative bg-gray-950 px-4 py-16 md:py-24">
          <div className="max-w-6xl mx-auto text-center">
            <div className="flex justify-center mb-8">
              <Image
                src="/images/Untitled (1024 x 1024 px) (1)/8.gif"
                alt="Mission animation"
                width={170}
                height={170}
                className="rounded-full"
                unoptimized
              />
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
              Our Mission: Giving Voice<br />
              <span className="text-purple-500">to All Languages</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              While countless apps teach Spanish or French, LingLoom champions the vibrant, 
              widely spoken languages often left in the shadows. We exist to provide deep, 
              culturally rich learning experiences for languages like Bangla, and many others that 
              deserve a world-class platform.
            </p>
          </div>
        </section>

        {/* Main Content Section */}
        <section className="bg-gray-950 px-4 py-16 border-t border-gray-800">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16">
              {/* Left Column */}
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-2">
                  More Than Words:
                </h2>
                <h3 className="text-3xl md:text-4xl font-bold text-purple-400 mb-8">
                  Human Connection<br />First
                </h3>
                
                <div className="space-y-4 text-gray-400 leading-relaxed">
                  <p>
                    In a world increasingly dominated by AI, we believe language learning remains profoundly human. 
                    It's about connection, community, and understanding the heart behind the words. While AI 
                    can drill vocabulary, it can't share a joke, explain a cultural nuance, or immerse you in the rhythm 
                    of a language's music and humor.
                  </p>
                  <p>
                    LingLoom is committed to a <span className="font-semibold text-accent">community-centric, human-first</span> approach. 
                    We're not just teaching you to speak; we're inviting you to experience a culture.
                  </p>
                </div>

                {/* Heart and Music Note Decorations */}
                <div className="mt-16 flex items-center justify-center gap-8">
                  <div className="text-6xl">💜</div>
                  <div className="w-20 h-20">
                    <Image
                      src="/images/Untitled (1024 x 1024 px) (1)/9.gif"
                      alt="Cultural connection animation"
                      width={80}
                      height={80}
                      className="rounded-full"
                      unoptimized
                    />
                  </div>
                  <div className="text-yellow-400 text-4xl">♪</div>
                </div>
              </div>

              {/* Right Column - Core Commitments */}
              <div className="md:mt-0">
                <h2 className="text-2xl font-bold mb-8">Our Core Commitments:</h2>
                
                <div className="space-y-4">
                  <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-5 hover:border-gray-700 transition-all">
                    <div className="flex items-start gap-3">
                      <ChevronRight className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-bold text-yellow-400 mb-2">Champion Underrepresented Languages</h4>
                        <p className="text-gray-400 text-sm leading-relaxed">
                          Provide exceptional learning resources for languages often overlooked by 
                          mainstream apps, starting with powerful global languages like Bangla.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-5 hover:border-gray-700 transition-all">
                    <div className="flex items-start gap-3">
                      <ChevronRight className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-bold text-yellow-400 mb-2">Immersive Cultural Learning</h4>
                        <p className="text-gray-400 text-sm leading-relaxed">
                          Integrate authentic materials like memes, music, TV show snippets, and 
                          cultural discussions to make learning relevant, engaging, and truly 
                          immersive.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-5 hover:border-gray-700 transition-all">
                    <div className="flex items-start gap-3">
                      <ChevronRight className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-bold text-yellow-400 mb-2">Foster Real Communication</h4>
                        <p className="text-gray-400 text-sm leading-relaxed">
                          Equip learners with the ability to understand and participate in real-world 
                          conversations, complete with humor, idioms, and cultural context.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-5 hover:border-gray-700 transition-all">
                    <div className="flex items-start gap-3">
                      <ChevronRight className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-bold text-yellow-400 mb-2">Build a Supportive Community</h4>
                        <p className="text-gray-400 text-sm leading-relaxed">
                          Create a space where learners can connect, practice with native speakers 
                          (planned), share insights, and celebrate their progress together.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The LingLoom Difference Section */}
        <section className="bg-white text-black py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center px-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              The LingLoom Difference
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              We're not just another language app. We're a movement to make diverse languages accessible 
              and to celebrate the human element of communication. Join us in weaving a new tapestry of 
              global understanding, one language, one connection at a time.
            </p>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
} 