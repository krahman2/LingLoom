'use client';

import NavigationBar from '@/components/ui/NavigationBar';
import Footer from '@/components/ui/Footer';
import { 
  BookOpen, 
  MessageSquare, 
  Brain, 
  Target, 
  Users,
  Sparkles 
} from 'lucide-react';
import Image from 'next/image';

export default function ApproachPage() {
  const approaches = [
    {
      number: "1",
      title: "Beyond Words: Cultural Immersion",
      description: "Many apps teach vocabulary; we aim for cultural fluency. Our curriculum (in development) will integrate authentic materials like popular memes, music, and clips from TV shows. This isn't just for fun—it's about understanding the context, humor, and real-world usage that bring a language to life.",
      icon: BookOpen,
      iconBg: "bg-blue-500/20",
      iconColor: "text-blue-400",
      borderColor: "border-blue-500/20"
    },
    {
      number: "2", 
      title: "Comprehensible & Engaging Input",
      description: "We believe in learning through understanding. You'll encounter new language in meaningful contexts—stories, dialogues, and scenarios relevant to the culture you're exploring. This makes learning more intuitive and less about dry grammar rules.",
      icon: MessageSquare,
      iconBg: "bg-green-500/20",
      iconColor: "text-green-400",
      borderColor: "border-green-500/20"
    },
    {
      number: "3",
      title: "Smart Repetition, Lasting Knowledge",
      description: "Our Spaced Repetition System (SRS) ensures that what you learn sticks. We intelligently schedule reviews of vocabulary and concepts so you reinforce your knowledge efficiently, moving it from short-term recall to long-term understanding.",
      icon: Brain,
      iconBg: "bg-purple-500/20",
      iconColor: "text-purple-400",
      borderColor: "border-purple-500/20"
    },
    {
      number: "4",
      title: "Active Learning, Real Skills",
      description: "You'll do more than just passively absorb. Interactive exercises will challenge you to actively recall and use what you've learned. This hands-on practice is crucial for building genuine communication skills.",
      icon: Target,
      iconBg: "bg-orange-500/20",
      iconColor: "text-orange-400",
      borderColor: "border-orange-500/20"
    },
    {
      number: "5",
      title: "Community & Connection",
      description: "Language is connection. LingLoom is designed to be a community-first platform. We plan to facilitate interactions with fellow learners and native speakers, because practice and shared experience are vital parts of the journey.",
      icon: Users,
      iconBg: "bg-pink-500/20",
      iconColor: "text-pink-400",
      borderColor: "border-pink-500/20"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-950">
      <NavigationBar />
      <main className="flex-grow">
        
        {/* Hero Section */}
        <section className="relative bg-gray-950 px-4 py-16 md:py-24">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
              Our <span className="text-yellow-400">Approach</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed mb-12">
              LingLoom blends proven linguistic science with a deep appreciation for cultural 
              immersion and human connection. We're crafting an approach that not only teaches 
              you a language but also welcomes you into its world.
            </p>
            <div className="flex justify-center">
              <Image
                src="/images/Untitled (1024 x 1024 px) (1)/10.gif"
                alt="Approach animation"
                width={250}
                height={250}
                className="rounded-full"
                unoptimized
              />
            </div>
          </div>
        </section>

        {/* Approach Cards Section */}
        <section className="bg-gray-950 px-4 py-16 md:py-24 -mt-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid gap-6 md:gap-8">
              {/* First row - 2 cards */}
              <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                {approaches.slice(0, 2).map((approach) => {
                  const Icon = approach.icon;
                  return (
                    <div 
                      key={approach.number}
                      className="bg-gray-900/50 border border-gray-800 rounded-2xl hover:border-gray-700 backdrop-blur-sm transition-all duration-300 overflow-hidden group"
                    >
                      <div className="p-8">
                        <div className="flex items-start gap-6">
                          <div className={`flex-shrink-0 w-16 h-16 ${approach.iconBg} ${approach.borderColor} border rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                            <Icon className={`w-8 h-8 ${approach.iconColor}`} />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-2xl font-bold text-white mb-3">
                              {approach.number}. {approach.title}
                            </h3>
                            <p className="text-gray-400 leading-relaxed">
                              {approach.description}
                </p>
              </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Middle card - full width */}
              <div className="grid">
                {approaches.slice(2, 3).map((approach) => {
                  const Icon = approach.icon;
                  return (
                    <div 
                      key={approach.number}
                      className="bg-gray-900/50 border border-gray-800 rounded-2xl hover:border-gray-700 backdrop-blur-sm transition-all duration-300 overflow-hidden group"
                    >
                      <div className="p-8 md:p-10">
                        <div className="flex items-start gap-6">
                          <div className={`flex-shrink-0 w-16 h-16 ${approach.iconBg} ${approach.borderColor} border rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                            <Icon className={`w-8 h-8 ${approach.iconColor}`} />
              </div>
                          <div className="flex-1 max-w-4xl">
                            <h3 className="text-2xl font-bold text-white mb-3">
                              {approach.number}. {approach.title}
                            </h3>
                            <p className="text-gray-400 leading-relaxed">
                              {approach.description}
                </p>
              </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>

              {/* Last row - 2 cards */}
              <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                {approaches.slice(3, 5).map((approach) => {
                  const Icon = approach.icon;
                  return (
                    <div 
                      key={approach.number}
                      className="bg-gray-900/50 border border-gray-800 rounded-2xl hover:border-gray-700 backdrop-blur-sm transition-all duration-300 overflow-hidden group"
                    >
                      <div className="p-8">
                        <div className="flex items-start gap-6">
                          <div className={`flex-shrink-0 w-16 h-16 ${approach.iconBg} ${approach.borderColor} border rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                            <Icon className={`w-8 h-8 ${approach.iconColor}`} />
              </div>
                          <div className="flex-1">
                            <h3 className="text-2xl font-bold text-white mb-3">
                              {approach.number}. {approach.title}
                            </h3>
                            <p className="text-gray-400 leading-relaxed">
                              {approach.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Evolving with You Section */}
        <section className="bg-gray-950 px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8 md:p-12 text-center backdrop-blur-sm hover:border-gray-700 transition-all duration-300">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/60 rounded-xl flex items-center justify-center">
                  <Image
                    src="/images/Untitled (1024 x 1024 px) (1)/11.gif"
                    alt="Science-backed learning animation"
                    width={64}
                    height={64}
                    className="rounded-full"
                    unoptimized
                  />
                </div>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Evolving with You
            </h2>
              <p className="text-lg text-gray-400 leading-relaxed max-w-2xl mx-auto mb-4">
                Our approach is continuously evolving as we learn from our community and the latest 
                in language acquisition research. We're excited to build a new kind of learning 
                experience, especially for the languages you care about.
              </p>
              <p className="text-sm text-gray-500 font-semibold">
                Science-Backed Learning Methods
              </p>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
} 