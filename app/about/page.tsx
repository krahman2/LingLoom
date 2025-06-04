'use client';

import NavigationBar from '@/components/ui/NavigationBar';
import Footer from '@/components/ui/Footer';
import { Globe, Heart, Users, Zap } from 'lucide-react';
import Image from 'next/image';

export default function AboutPage() {
  const philosophyPoints = [
    {
      icon: Globe,
      title: "Focus on Underrepresented Gems",
      description: "We prioritize languages that deserve more attention and better learning tools.",
      color: "text-blue-400",
      bgColor: "bg-blue-900/20",
      borderColor: "border-blue-800"
    },
    {
      icon: Heart,
      title: "Immersive Content",
      description: "Our curriculum (in development) will weave in authentic materials like memes, music, and snippets from popular culture to provide a truly immersive experience.",
      color: "text-green-400",
      bgColor: "bg-green-900/20",
      borderColor: "border-green-800"
    },
    {
      icon: Users,
      title: "Community at the Core",
      description: "We aim to build a vibrant community where learners can interact, share, and support each other.",
      color: "text-purple-400",
      bgColor: "bg-purple-900/20",
      borderColor: "border-purple-800"
    },
    {
      icon: Zap,
      title: "Effective & Engaging Methods",
      description: "We combine proven techniques like comprehensible input and spaced repetition with interactive, fun exercises to make learning stick.",
      color: "text-orange-400",
      bgColor: "bg-orange-900/20",
      borderColor: "border-orange-800"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <NavigationBar />
      <main className="flex-grow">
        
        {/* Hero Section */}
        <section className="relative bg-gray-950 px-4 py-16 md:py-24">
          <div className="max-w-6xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <Image
                src="/images/Untitled (1024 x 1024 px) (1)/7.gif"
                alt="About us animation"
                width={160}
                height={160}
                className="rounded-full"
                unoptimized
              />
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
              About <span className="text-purple-500">LingLoom</span>
            </h1>
            <div className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed space-y-4">
              <p>
                LingLoom started with a simple observation: while the digital world offers countless tools to learn dominant languages like Spanish or French, many of the world's vital, widely-spoken languages remain underserved. We asked, "What about Bangla, a language with over 230 million speakers? What about other beautiful languages rich in culture but poor in accessible, high-quality learning resources?"
              </p>
              <p>
                We are a passionate team dedicated to changing that. LingLoom is our answer—a platform committed to bringing often-overlooked languages to the forefront, making them accessible, engaging, and deeply connected to their cultural roots.
              </p>
            </div>
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="bg-black px-4 py-16 md:py-24 border-t border-gray-800">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-extrabold text-center mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Our Philosophy
            </h2>
            <p className="text-xl text-gray-400 text-center mb-12 max-w-3xl mx-auto">
              Human-Centric, Culturally Rich
            </p>
            
            <div className="mb-12 max-w-3xl mx-auto">
              <p className="text-gray-400 leading-relaxed text-center">
                In an age of AI, we champion the irreplaceable human element in language learning. True fluency isn't just about vocabulary lists and grammar drills; it's about understanding context, humor, music, and the everyday expressions that make a language come alive. It's about connecting with people.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {philosophyPoints.map((point, index) => {
                const Icon = point.icon;
                return (
                  <div
                    key={index}
                    className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-gray-700 transition-all duration-300 group"
                  >
                    <div className="flex items-start gap-4">
                      <div className={`flex-shrink-0 w-12 h-12 ${point.bgColor} ${point.borderColor} border rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className={`w-6 h-6 ${point.color}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className={`text-lg font-bold mb-2 ${point.color}`}>
                          {point.title}
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                          {point.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Join the Movement Section */}
        <section className="bg-gradient-to-b from-black to-gray-900 px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 md:p-12 text-center hover:border-gray-700 transition-all duration-300">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Join the Movement
              </h2>
              <p className="text-lg text-gray-400 leading-relaxed max-w-2xl mx-auto">
                LingLoom is more than a learning platform; it's a community celebrating linguistic diversity and human connection. Our app is currently in development, and we're excited to share our journey with you. Follow us to be part of a new way to learn languages—one that values every voice and every culture.
              </p>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
} 