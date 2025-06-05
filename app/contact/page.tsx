'use client';

import NavigationBar from '@/components/ui/NavigationBar';
import Footer from '@/components/ui/Footer';
import Image from 'next/image';
import Link from 'next/link'; // For email links, though technically <a> tags are used
import { Mail, MessageSquare, Brain, Languages } from 'lucide-react';

export default function ContactPage() {
  const contactMethods = [
    {
      icon: Mail,
      title: "General Inquiries",
      description: "For questions, support, or info about LingLoom.",
      email: "hello@lingloom.com",
      color: "text-blue-400",
      bgColor: "bg-blue-900/20",
      borderColor: "border-blue-800"
    },
    {
      icon: MessageSquare,
      title: "Feedback & Ideas",
      description: "How can we improve? What features would you love?",
      email: "feedback@lingloom.com",
      color: "text-green-400",
      bgColor: "bg-green-900/20",
      borderColor: "border-green-800"
    },
    {
      icon: Languages,
      title: "Language Suggestions",
      description: "Is there an underrepresented language you'd love to see on LingLoom? Tell us!",
      email: "languages@lingloom.com",
      color: "text-purple-400",
      bgColor: "bg-purple-900/20",
      borderColor: "border-purple-800"
    },
    {
      icon: Brain,
      title: "Partnerships",
      description: "Interested in collaborating or partnering with us?",
      email: "partners@lingloom.com",
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
            <div className="flex justify-center mb-8">
              <Image
                src="/images/Untitled (1024 x 1024 px) (1)/12.gif"
                alt="Contact animation"
                width={160}
                height={160}
                className="rounded-full"
                unoptimized
              />
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
              Get in <span className="text-accent">Touch</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              We're passionate about languages, especially those that deserve more spotlight. Whether you have a question, feedback, a language suggestion, or want to collaborate, we'd love to hear from you!
            </p>
          </div>
        </section>

        {/* Contact Methods Section */}
        <section className="bg-black px-4 py-16 md:py-24 border-t border-gray-800">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              How to Reach Us
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {contactMethods.map((method, index) => {
                const Icon = method.icon;
                return (
                  <div
                    key={index}
                    className="bg-gray-900 border border-gray-800 rounded-2xl p-8 hover:border-gray-700 transition-all duration-300 group"
                  >
                    <div className={`w-14 h-14 ${method.bgColor} ${method.borderColor} border rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`w-7 h-7 ${method.color}`} />
                    </div>
                    
                    <h3 className={`text-xl font-bold mb-3 ${method.color}`}>
                      {method.title}
                    </h3>
                    
                    <p className="text-gray-400 mb-4 leading-relaxed">
                      {method.description}
                    </p>
                    
                    <a 
                      href={`mailto:${method.email}`} 
                      className={`inline-flex items-center gap-2 ${method.color} hover:underline text-sm font-medium transition-colors duration-300`}
                    >
                      <Mail className="w-4 h-4" />
                      {method.email}
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Response Time Section */}
        <section className="bg-gradient-to-b from-black to-gray-900 px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 md:p-12 text-center hover:border-gray-700 transition-all duration-300">
              <div className="flex justify-center mb-6">
                <Image
                  src="/images/Untitled (1024 x 1024 px) (1)/13.gif"
                  alt="Response time animation"
                  width={100}
                  height={100}
                  className="rounded-full"
                  unoptimized
                />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                We'll Get Back to You
              </h2>
              <p className="text-lg text-gray-400 leading-relaxed max-w-2xl mx-auto">
                We aim to respond within 2-3 business days. You can also find us on social media (links in footer).
              </p>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
} 