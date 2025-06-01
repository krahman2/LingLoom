'use client';

import React from 'react';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle, Clock, Calendar, TrendingUp } from 'lucide-react';

const languageCourses = [
  // Core Offerings: Available Now, Coming Soon, Planned
  {
    name: 'Bangla',
    flag: 'bangladesh.png',
    status: 'Available Now',
    description: 'Spoken by over 270 million people, Bangla is the 6th most spoken language globally. It holds the unique distinction of being the catalyst for UNESCO\'s International Mother Language Day.',
    category: 'Core',
    icon: CheckCircle,
    statusColor: 'text-green-400',
    bgColor: 'bg-green-900/20',
    borderColor: 'border-green-800'
  },
  {
    name: 'Hindi',
    flag: 'india.png',
    status: 'Available Now',
    description: 'A primary language for hundreds of millions in India and the diaspora, Hindi serves as a key to understanding the subcontinent\'s vast cultural and cinematic landscape.',
    category: 'Core',
    icon: CheckCircle,
    statusColor: 'text-green-400',
    bgColor: 'bg-green-900/20',
    borderColor: 'border-green-800'
  },
  {
    name: 'Marathi',
    flag: 'india.png',
    status: 'Coming Soon',
    description: 'Native to Maharashtra, Marathi is spoken by over 83 million people and boasts a rich literary tradition dating back centuries.',
    category: 'Core',
    icon: Clock,
    statusColor: 'text-yellow-400',
    bgColor: 'bg-yellow-900/20',
    borderColor: 'border-yellow-800'
  },
  {
    name: 'Telugu',
    flag: 'india.png',
    status: 'Coming Soon',
    description: 'A Dravidian language with classical status, Telugu is spoken by over 82 million people, primarily in Andhra Pradesh and Telangana.',
    category: 'Core',
    icon: Clock,
    statusColor: 'text-yellow-400',
    bgColor: 'bg-yellow-900/20',
    borderColor: 'border-yellow-800'
  },
  {
    name: 'Urdu',
    flag: 'pakistan.png',
    status: 'Planned',
    description: 'Known for its poetic elegance, Urdu is spoken by over 230 million people globally (including second language speakers) and shares deep historical ties with Hindi.',
    category: 'Core',
    icon: Calendar,
    statusColor: 'text-blue-400',
    bgColor: 'bg-blue-900/20',
    borderColor: 'border-blue-800'
  },
  {
    name: 'Nepali',
    flag: 'nepal.png',
    status: 'Planned',
    description: 'The official language of Nepal, Nepali is spoken by over 16 million people and serves as a lingua franca in the Himalayan region.',
    category: 'Core',
    icon: Calendar,
    statusColor: 'text-blue-400',
    bgColor: 'bg-blue-900/20',
    borderColor: 'border-blue-800'
  },
  // Future Expansion
  {
    name: 'Farsi (Persian)',
    flag: 'iran.png',
    status: 'Future Expansion',
    description: 'With a rich history spanning millennia, Farsi is spoken by over 110 million people, primarily in Iran, Afghanistan (as Dari), and Tajikistan (as Tajik).',
    category: 'Future',
    icon: TrendingUp,
    statusColor: 'text-gray-400',
    bgColor: 'bg-gray-800/50',
    borderColor: 'border-gray-700'
  },
  {
    name: 'Kazakh',
    flag: 'kazakhstan.png',
    status: 'Future Expansion',
    description: 'The state language of Kazakhstan, Kazakh is a Turkic language spoken by approximately 13 million people, vital to Central Asian cultural identity.',
    category: 'Future',
    icon: TrendingUp,
    statusColor: 'text-gray-400',
    bgColor: 'bg-gray-800/50',
    borderColor: 'border-gray-700'
  },
  {
    name: 'Uzbek',
    flag: 'uzbekistan.png',
    status: 'Future Expansion',
    description: 'Spoken by around 35 million people, mainly in Uzbekistan and other parts of Central Asia, Uzbek is a Turkic language with a significant literary heritage.',
    category: 'Future',
    icon: TrendingUp,
    statusColor: 'text-gray-400',
    bgColor: 'bg-gray-800/50',
    borderColor: 'border-gray-700'
  },
];

export default function CoursesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-950 text-white">
      <Header />
      <main className="flex-grow">
        
        {/* Hero Section */}
        <section className="relative bg-gray-950 px-4 py-16 md:py-24">
          <div className="max-w-6xl mx-auto text-center">
            <div className="flex justify-center mb-8">
              <Image
                src="/images/Untitled (1024 x 1024 px) (1)/14.gif"
                alt="Courses animation"
                width={160}
                height={160}
                className="rounded-full"
                unoptimized
              />
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
              Our Language Offerings
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              LingLoom is committed to <span className="font-semibold text-accent">championing underrepresented languages</span> while providing a human-first, culturally immersive learning experience. Explore our current and upcoming courses:
            </p>
          </div>
        </section>

        {/* Languages Section */}
        <section className="bg-gray-950 px-4 py-16 md:py-24 border-t border-gray-800">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-12 text-center">
              Current & Upcoming Languages
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {languageCourses.filter(lang => lang.category === 'Core').map((lang) => {
                const Icon = lang.icon;
                return (
                  <div 
                    key={lang.name} 
                    className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 hover:border-gray-700 backdrop-blur-sm transition-all duration-300 group"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 relative">
                          <Image 
                            src={`/images/flags/${lang.flag}`} 
                            alt={`${lang.name} flag`} 
                            fill
                            className="object-contain" 
                          />
                        </div>
                        <h3 className="text-xl font-bold text-white">{lang.name}</h3>
                      </div>
                      <div className={`w-10 h-10 ${lang.bgColor} ${lang.borderColor} border rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className={`w-5 h-5 ${lang.statusColor}`} />
                      </div>
                    </div>
                    
                    <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                      {lang.description}
                    </p>
                    
                    <span className={`inline-flex items-center gap-2 text-sm font-semibold ${lang.statusColor}`}>
                      <Icon className="w-4 h-4" />
                      {lang.status}
                    </span>
                  </div>
                );
              })}
            </div>

            <h3 className="text-3xl md:text-4xl font-extrabold mb-8 text-center text-white">
              Future Expansion
            </h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {languageCourses.filter(lang => lang.category === 'Future').map((lang) => {
                const Icon = lang.icon;
                return (
                  <div 
                    key={lang.name} 
                    className="bg-gray-900/30 border border-gray-800 rounded-2xl p-6 hover:border-gray-700 backdrop-blur-sm transition-all duration-300 group"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 relative opacity-75">
                          <Image 
                            src={`/images/flags/${lang.flag}`} 
                            alt={`${lang.name} flag`} 
                            fill
                            className="object-contain" 
                          />
                        </div>
                        <h3 className="text-xl font-bold text-gray-300">{lang.name}</h3>
                      </div>
                      <div className={`w-10 h-10 ${lang.bgColor} ${lang.borderColor} border rounded-lg flex items-center justify-center`}>
                        <Icon className={`w-5 h-5 ${lang.statusColor}`} />
                      </div>
                    </div>
                    
                    <p className="text-gray-500 text-sm mb-4 leading-relaxed">
                      {lang.description}
                    </p>
                    
                    <span className={`inline-flex items-center gap-2 text-sm font-semibold ${lang.statusColor}`}>
                      <Icon className="w-4 h-4" />
                      {lang.status}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gray-950 px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8 md:p-12 text-center backdrop-blur-sm hover:border-gray-700 transition-all duration-300">
              <div className="flex justify-center mb-6">
                <Image
                  src="/images/Untitled (1024 x 1024 px) (1)/15.gif"
                  alt="Language suggestion animation"
                  width={100}
                  height={100}
                  className="rounded-full"
                  unoptimized
                />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Your Language Not Listed?
              </h2>
              <p className="text-lg text-gray-400 leading-relaxed max-w-2xl mx-auto mb-6">
                Our passion is to grow our library, especially with languages you care about. 
              </p>
              <Link 
                href="/contact" 
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300"
              >
                Suggest a Language
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
} 