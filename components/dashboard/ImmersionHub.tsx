'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Subtitles, 
  BookOpen, 
  Headphones, 
  Globe, 
  ChevronRight,
  ChevronUp,
  Settings,
  RotateCcw,
  FastForward,
  Rewind,
  Languages,
  Highlighter,
  PenTool,
  Heart,
  Share2,
  Download,
  Search,
  Filter,
  Clock,
  Star,
  TrendingUp,
  Music,
  Smile,
  MessageCircle
} from 'lucide-react';

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  hover: { scale: 1.02, transition: { duration: 0.2 } }
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  hover: { 
    y: -4, 
    boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.3)",
    transition: { duration: 0.2 } 
  }
};

// Video Feed Component
const VideoFeed = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [subtitlesOn, setSubtitlesOn] = useState(true);
  const [showDictionary, setShowDictionary] = useState(false);

  const videos = [
    { id: 1, title: "Daily Life in Bangladesh", level: "Beginner", duration: "3:45", thumbnail: "/api/placeholder/300/200" },
    { id: 2, title: "Street Food Adventures", level: "Intermediate", duration: "5:20", thumbnail: "/api/placeholder/300/200" },
    { id: 3, title: "Cultural Festivals", level: "Advanced", duration: "7:15", thumbnail: "/api/placeholder/300/200" },
  ];

  return (
    <motion.div 
      className="bg-gray-900 border border-gray-700 rounded-xl p-6"
      variants={sectionVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Play className="w-6 h-6 text-red-400 mr-3" />
          <h2 className="text-xl font-bold text-white">Video Feed</h2>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setSubtitlesOn(!subtitlesOn)}
            className={`p-2 rounded-lg transition-colors ${subtitlesOn ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}
          >
            <Subtitles className="w-4 h-4" />
          </button>
          <button className="p-2 rounded-lg bg-gray-700 text-gray-300 hover:bg-gray-600">
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Video Player */}
      <div className="relative mb-6">
        <div className="bg-gray-800 rounded-lg aspect-video flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20" />
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="z-10 bg-red-500 hover:bg-red-600 text-white p-4 rounded-full transition-colors"
          >
            {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8" />}
          </button>
          
          {/* Dictionary Overlay */}
          {showDictionary && (
            <motion.div 
              className="absolute top-4 right-4 bg-gray-900 border border-gray-600 rounded-lg p-3 max-w-xs"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className="text-sm text-gray-300">
                <div className="text-white font-semibold">খাবার (khabar)</div>
                <div className="text-gray-400">noun • food</div>
                <div className="text-xs text-gray-500 mt-1">Click to add to vocabulary</div>
              </div>
            </motion.div>
          )}
          
          {/* Subtitles */}
          {subtitlesOn && (
            <div className="absolute bottom-4 left-4 right-4 bg-black/70 text-white p-2 rounded text-center">
              আমি প্রতিদিন সকালে খাবার খাই
            </div>
          )}
        </div>
        
        {/* Video Controls */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-3">
            <button className="text-gray-400 hover:text-white">
              <Heart className="w-5 h-5" />
            </button>
            <button className="text-gray-400 hover:text-white">
              <Share2 className="w-5 h-5" />
            </button>
            <button className="text-gray-400 hover:text-white">
              <Download className="w-5 h-5" />
            </button>
          </div>
          <div className="text-sm text-gray-400">
            Level: Beginner • 3:45
          </div>
        </div>
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {videos.map((video) => (
          <motion.div 
            key={video.id}
            className="bg-gray-800 rounded-lg overflow-hidden cursor-pointer"
            variants={cardVariants}
            whileHover="hover"
          >
            <div className="aspect-video bg-gray-700 flex items-center justify-center">
              <Play className="w-8 h-8 text-gray-400" />
            </div>
            <div className="p-3">
              <h3 className="text-white font-medium text-sm mb-1">{video.title}</h3>
              <div className="flex justify-between text-xs text-gray-400">
                <span>{video.level}</span>
                <span>{video.duration}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// Podcast Player Component
const PodcastPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1.0);
  const [showTranscript, setShowTranscript] = useState(false);

  return (
    <motion.div 
      className="bg-gray-900 border border-gray-700 rounded-xl p-6"
      variants={sectionVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Headphones className="w-6 h-6 text-green-400 mr-3" />
          <h2 className="text-xl font-bold text-white">Podcast Player</h2>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setSpeed(speed === 1.0 ? 1.5 : speed === 1.5 ? 0.75 : 1.0)}
            className="px-3 py-1 bg-gray-700 text-gray-300 rounded text-sm hover:bg-gray-600"
          >
            {speed}x
          </button>
        </div>
      </div>

      {/* Current Episode */}
      <div className="bg-gray-800 rounded-lg p-4 mb-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-green-600 rounded-lg flex items-center justify-center">
            <Music className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-white font-semibold">Bengali Stories for Beginners</h3>
            <p className="text-gray-400 text-sm">Episode 12: The Market Adventure</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs text-gray-500">15:30</span>
              <div className="flex-1 bg-gray-700 rounded-full h-1">
                <div className="bg-green-500 h-1 rounded-full w-1/3"></div>
              </div>
              <span className="text-xs text-gray-500">45:00</span>
            </div>
          </div>
        </div>
        
        {/* Player Controls */}
        <div className="flex items-center justify-center gap-4 mt-4">
          <button className="text-gray-400 hover:text-white">
            <Rewind className="w-6 h-6" />
          </button>
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full"
          >
            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
          </button>
          <button className="text-gray-400 hover:text-white">
            <FastForward className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Transcript Toggle */}
      <button 
        onClick={() => setShowTranscript(!showTranscript)}
        className="w-full bg-gray-800 hover:bg-gray-700 text-gray-300 p-3 rounded-lg mb-4 flex items-center justify-center gap-2"
      >
        <Languages className="w-4 h-4" />
        {showTranscript ? 'Hide' : 'Show'} Transcript
      </button>

      {/* Transcript */}
      {showTranscript && (
        <motion.div 
          className="bg-gray-800 rounded-lg p-4 max-h-40 overflow-y-auto"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
        >
          <div className="text-sm text-gray-300 leading-relaxed">
            <p className="mb-2">
              <span className="text-blue-400 cursor-pointer hover:underline">আজ</span> আমি 
              <span className="text-blue-400 cursor-pointer hover:underline"> বাজারে</span> গেছি। 
              সেখানে অনেক <span className="text-blue-400 cursor-pointer hover:underline">মানুষ</span> ছিল।
            </p>
            <p className="text-gray-500 text-xs italic">
              Today I went to the market. There were many people there.
            </p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

// Reading Room Component
const ReadingRoom = () => {
  const [selectedArticle, setSelectedArticle] = useState<{id: number; title: string; level: string; time: string; type: string} | null>(null);
  const [highlightMode, setHighlightMode] = useState(false);

  const articles = [
    { id: 1, title: "A Day in Dhaka", level: "Beginner", time: "5 min", type: "Article" },
    { id: 2, title: "The Mysterious Tea Shop", level: "Intermediate", time: "12 min", type: "Story" },
    { id: 3, title: "Bangladeshi Traditions", level: "Advanced", time: "8 min", type: "Culture" },
  ];

  return (
    <motion.div 
      className="bg-gray-900 border border-gray-700 rounded-xl p-6"
      variants={sectionVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <BookOpen className="w-6 h-6 text-blue-400 mr-3" />
          <h2 className="text-xl font-bold text-white">Reading Room</h2>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setHighlightMode(!highlightMode)}
            className={`p-2 rounded-lg transition-colors ${highlightMode ? 'bg-yellow-600 text-white' : 'bg-gray-700 text-gray-300'}`}
          >
            <Highlighter className="w-4 h-4" />
          </button>
          <button className="p-2 rounded-lg bg-gray-700 text-gray-300 hover:bg-gray-600">
            <Search className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Article Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {articles.map((article) => (
          <motion.div 
            key={article.id}
            className="bg-gray-800 rounded-lg p-4 cursor-pointer"
            variants={cardVariants}
            whileHover="hover"
            onClick={() => setSelectedArticle(article)}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className={`px-2 py-1 rounded text-xs ${
                article.level === 'Beginner' ? 'bg-green-600 text-white' :
                article.level === 'Intermediate' ? 'bg-yellow-600 text-white' :
                'bg-red-600 text-white'
              }`}>
                {article.level}
              </span>
              <span className="text-gray-400 text-xs">{article.type}</span>
            </div>
            <h3 className="text-white font-medium mb-2">{article.title}</h3>
            <div className="flex items-center justify-between text-sm text-gray-400">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {article.time}
              </span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Reading Interface */}
      <div className="bg-gray-800 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-semibold">Sample Reading</h3>
          <div className="flex items-center gap-2">
            <button className="text-gray-400 hover:text-white">
              <PenTool className="w-4 h-4" />
            </button>
            <button className="text-gray-400 hover:text-white">
              <Languages className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        <div className="text-gray-300 leading-relaxed">
          <p className="mb-4">
            ঢাকা শহরের <span className="bg-blue-600/30 px-1 rounded cursor-pointer hover:bg-blue-600/50">রাস্তায়</span> 
            অনেক <span className="bg-green-600/30 px-1 rounded cursor-pointer hover:bg-green-600/50">গাড়ি</span> চলে। 
            মানুষ খুব <span className="bg-yellow-600/30 px-1 rounded cursor-pointer hover:bg-yellow-600/50">তাড়াহুড়ো</span> করে।
          </p>
          <p className="text-sm text-gray-500 italic mb-4">
            Many cars run on the streets of Dhaka city. People are in a great hurry.
          </p>
          
          <div className="flex items-center gap-4 text-sm">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded">
              Continue Reading
            </button>
            <button className="text-gray-400 hover:text-white">
              Write Summary
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Culture Minis Component
const CultureMinis = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const cultureMinis = [
    { id: 1, title: "Bengali Idioms", type: "idioms", icon: MessageCircle, color: "purple" },
    { id: 2, title: "Internet Memes", type: "memes", icon: Smile, color: "pink" },
    { id: 3, title: "Folk Music", type: "music", icon: Music, color: "indigo" },
    { id: 4, title: "Festival Videos", type: "videos", icon: Globe, color: "green" },
  ];

  return (
    <motion.div 
      className="bg-gray-900 border border-gray-700 rounded-xl p-6"
      variants={sectionVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Globe className="w-6 h-6 text-purple-400 mr-3" />
          <h2 className="text-xl font-bold text-white">Culture Minis</h2>
        </div>
        <div className="text-sm text-gray-400">
          Swipe up for quick cultural insights
        </div>
      </div>

      {/* Culture Categories */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {cultureMinis.map((mini) => {
          const Icon = mini.icon;
          return (
            <motion.div 
              key={mini.id}
              className={`bg-${mini.color}-600/20 border border-${mini.color}-600/30 rounded-lg p-4 cursor-pointer text-center`}
              variants={cardVariants}
              whileHover="hover"
            >
              <Icon className={`w-8 h-8 text-${mini.color}-400 mx-auto mb-2`} />
              <h3 className="text-white font-medium text-sm">{mini.title}</h3>
            </motion.div>
          );
        })}
      </div>

      {/* Featured Culture Slide */}
      <div className="bg-gray-800 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-semibold">Today's Cultural Insight</h3>
          <button className="text-gray-400 hover:text-white">
            <ChevronUp className="w-5 h-5" />
          </button>
        </div>
        
        <div className="text-center">
          <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageCircle className="w-8 h-8 text-white" />
          </div>
          <h4 className="text-white font-medium mb-2">Bengali Idiom of the Day</h4>
          <p className="text-gray-300 mb-2">"আকাশ থেকে পড়া"</p>
          <p className="text-gray-400 text-sm mb-4">Literally: "Falling from the sky"</p>
          <p className="text-gray-300 text-sm">
            Meaning: Something unexpected or surprising, like "out of the blue" in English.
          </p>
          
          <div className="flex justify-center gap-2 mt-4">
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded text-sm">
              Learn More
            </button>
            <button className="text-gray-400 hover:text-white">
              <Heart className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function ImmersionHub() {
  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Immersion Hub</h1>
        <p className="text-gray-400">Dive deep into Bengali culture and language through multimedia content</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <VideoFeed />
        <PodcastPlayer />
        <ReadingRoom />
        <CultureMinis />
      </div>
    </div>
  );
} 