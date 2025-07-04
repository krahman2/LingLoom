'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  Mic, 
  MicOff,
  Volume2,
  VolumeX,
  Play,
  Pause,
  RotateCcw,
  CheckCircle,
  XCircle,
  PenTool,
  FileText,
  MessageSquare,
  Zap,
  Trophy,
  Target,
  Clock,
  Star,
  ArrowRight,
  ArrowLeft,
  Shuffle,
  Users,
  Coffee,
  Briefcase,
  Heart,
  ThumbsUp,
  ThumbsDown,
  Save,
  RefreshCw,
  Send,
  Lightbulb,
  BookOpen,
  Gamepad2,
  Timer,
  Award,
  Brain,
  Sparkles,
  ChevronRight,
  Settings,
  BarChart3,
  TrendingUp,
  Headphones,
  Eye,
  EyeOff
} from 'lucide-react';

const tabVariants = {
  inactive: { 
    backgroundColor: "rgba(55, 65, 81, 0.5)",
    color: "rgb(156, 163, 175)",
    borderColor: "rgba(107, 114, 128, 0.3)"
  },
  active: { 
    backgroundColor: "rgba(59, 130, 246, 0.2)",
    color: "rgb(59, 130, 246)",
    borderColor: "rgb(59, 130, 246)"
  }
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

const sectionVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
};

// Speaking Booth Component
const SpeakingBooth = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentMode, setCurrentMode] = useState('pronunciation'); // pronunciation, shadowing, roleplay
  const [selectedBot, setSelectedBot] = useState('waiter');

  const pronunciationWords = [
    { word: "নমস্কার", phonetic: "/nomoshkar/", accuracy: 95 },
    { word: "ধন্যবাদ", phonetic: "/dhonnobad/", accuracy: 87 },
    { word: "আপনি কেমন আছেন?", phonetic: "/apni kemon achen?/", accuracy: 92 },
  ];

  const bots = [
    { id: 'waiter', name: 'Restaurant Waiter', icon: Coffee, scenario: 'Ordering food at a restaurant' },
    { id: 'friend', name: 'Casual Friend', icon: Users, scenario: 'Having a friendly conversation' },
    { id: 'interviewer', name: 'Job Interviewer', icon: Briefcase, scenario: 'Professional job interview' },
  ];

  return (
    <motion.div 
      className="space-y-6"
      variants={sectionVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Mode Selector */}
      <div className="flex flex-wrap gap-3">
        {[
          { id: 'pronunciation', name: 'Pronunciation Check', icon: Target },
          { id: 'shadowing', name: 'Shadowing Practice', icon: Headphones },
          { id: 'roleplay', name: 'Role-Play Bots', icon: Users },
        ].map((mode) => {
          const Icon = mode.icon;
          return (
            <button
              key={mode.id}
              onClick={() => setCurrentMode(mode.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                currentMode === mode.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <Icon className="w-4 h-4" />
              {mode.name}
            </button>
          );
        })}
      </div>

      {/* Pronunciation Check Mode */}
      {currentMode === 'pronunciation' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div 
            className="bg-gray-800 rounded-lg p-6"
            variants={cardVariants}
            whileHover="hover"
          >
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-400" />
              Pronunciation Practice
            </h3>
            
            <div className="space-y-4">
              {pronunciationWords.map((item, index) => (
                <div key={index} className="bg-gray-700 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <span className="text-white font-medium text-lg">{item.word}</span>
                      <p className="text-gray-400 text-sm">{item.phonetic}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-medium ${
                        item.accuracy >= 90 ? 'text-green-400' : 
                        item.accuracy >= 75 ? 'text-yellow-400' : 'text-red-400'
                      }`}>
                        {item.accuracy}%
                      </span>
                      <button className="text-gray-400 hover:text-white">
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setIsRecording(!isRecording)}
                      className={`p-3 rounded-full transition-colors ${
                        isRecording ? 'bg-red-500 text-white' : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                      }`}
                    >
                      {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                    </button>
                    <div className="flex-1 bg-gray-600 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${item.accuracy}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* AI Feedback Panel */}
          <motion.div 
            className="bg-gray-800 rounded-lg p-6"
            variants={cardVariants}
            whileHover="hover"
          >
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <Brain className="w-5 h-5 text-purple-400" />
              AI Feedback
            </h3>
            
            <div className="space-y-4">
              <div className="bg-green-600/20 border border-green-600/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-green-400 font-medium">Great pronunciation!</span>
                </div>
                <p className="text-gray-300 text-sm">
                  Your "নমস্কার" sounds natural. The stress on the first syllable is perfect.
                </p>
              </div>
              
              <div className="bg-yellow-600/20 border border-yellow-600/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb className="w-5 h-5 text-yellow-400" />
                  <span className="text-yellow-400 font-medium">Improvement tip</span>
                </div>
                <p className="text-gray-300 text-sm">
                  Try to soften the "ধ" sound in "ধন্যবাদ". Listen to the native pronunciation again.
                </p>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-4">
                <h4 className="text-white font-medium mb-3">Progress Overview</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Accuracy</span>
                    <span className="text-white">91%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Clarity</span>
                    <span className="text-white">88%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Fluency</span>
                    <span className="text-white">85%</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Shadowing Practice Mode */}
      {currentMode === 'shadowing' && (
        <motion.div 
          className="bg-gray-800 rounded-lg p-6"
          variants={cardVariants}
          whileHover="hover"
        >
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <Headphones className="w-5 h-5 text-green-400" />
            Shadowing Practice
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-gray-700 rounded-lg p-4 mb-4">
                <h4 className="text-white font-medium mb-3">Listen and Repeat</h4>
                <div className="space-y-3">
                  {[
                    "আমি বাংলা শিখছি।",
                    "তুমি কি বাংলা বলতে পারো?",
                    "আমার নাম রুসলান।"
                  ].map((line, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-gray-600 rounded">
                      <button className="text-blue-400 hover:text-blue-300">
                        <Play className="w-4 h-4" />
                      </button>
                      <span className="text-white flex-1">{line}</span>
                      <button className="text-gray-400 hover:text-white">
                        <Mic className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full"
                >
                  {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                </button>
                <div className="flex-1 bg-gray-700 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full w-1/3" />
                </div>
                <span className="text-gray-400 text-sm">2:30 / 7:45</span>
              </div>
            </div>
            
            <div className="bg-gray-700 rounded-lg p-4">
              <h4 className="text-white font-medium mb-3">Your Progress</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Lines completed</span>
                  <span className="text-white">8/12</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Accuracy</span>
                  <span className="text-green-400">89%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Speed match</span>
                  <span className="text-yellow-400">92%</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Role-Play Mode */}
      {currentMode === 'roleplay' && (
        <div className="space-y-6">
          {/* Bot Selection */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {bots.map((bot) => {
              const Icon = bot.icon;
              return (
                <motion.button
                  key={bot.id}
                  onClick={() => setSelectedBot(bot.id)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    selectedBot === bot.id
                      ? 'bg-blue-600/20 border-blue-600 text-blue-400'
                      : 'bg-gray-800 border-gray-700 text-gray-300 hover:border-gray-600'
                  }`}
                  variants={cardVariants}
                  whileHover="hover"
                >
                  <Icon className="w-8 h-8 mx-auto mb-2" />
                  <h4 className="font-medium">{bot.name}</h4>
                  <p className="text-sm text-gray-400 mt-1">{bot.scenario}</p>
                </motion.button>
              );
            })}
          </div>

          {/* Chat Interface */}
          <motion.div 
            className="bg-gray-800 rounded-lg p-6"
            variants={cardVariants}
            whileHover="hover"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold flex items-center gap-2">
                <Coffee className="w-5 h-5 text-orange-400" />
                Conversation with Restaurant Waiter
              </h3>
              <div className="flex items-center gap-2">
                <button className="text-gray-400 hover:text-white">
                  <Settings className="w-4 h-4" />
                </button>
                <button className="text-gray-400 hover:text-white">
                  <BarChart3 className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="space-y-4 max-h-64 overflow-y-auto mb-4">
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                  <Coffee className="w-4 h-4 text-white" />
                </div>
                <div className="bg-gray-700 rounded-lg p-3 max-w-xs">
                  <p className="text-white text-sm">নমস্কার! আপনি কী খেতে চান?</p>
                  <p className="text-gray-400 text-xs mt-1">Hello! What would you like to eat?</p>
                </div>
              </div>
              
              <div className="flex gap-3 justify-end">
                <div className="bg-blue-600 rounded-lg p-3 max-w-xs">
                  <p className="text-white text-sm">আমি ভাত আর মাছ খেতে চাই।</p>
                  <p className="text-gray-200 text-xs mt-1">I want to eat rice and fish.</p>
                </div>
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <Users className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsRecording(!isRecording)}
                className={`p-3 rounded-full transition-colors ${
                  isRecording ? 'bg-red-500 text-white' : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                }`}
              >
                <Mic className="w-5 h-5" />
              </button>
              <input 
                type="text" 
                placeholder="Type your response..."
                className="flex-1 bg-gray-700 text-white p-3 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
              />
              <button className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg">
                <Send className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

// Writing Desk Component
const WritingDesk = () => {
  const [currentMode, setCurrentMode] = useState('prompts'); // prompts, journal, translation
  const [showFeedback, setShowFeedback] = useState(false);

  const prompts = [
    { id: 1, title: "Describe your morning routine", difficulty: "Beginner", time: "10 min" },
    { id: 2, title: "Write about your favorite festival", difficulty: "Intermediate", time: "15 min" },
    { id: 3, title: "Argue for renewable energy", difficulty: "Advanced", time: "20 min" },
  ];

  return (
    <motion.div 
      className="space-y-6"
      variants={sectionVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Mode Selector */}
      <div className="flex flex-wrap gap-3">
        {[
          { id: 'prompts', name: 'Guided Prompts', icon: Lightbulb },
          { id: 'journal', name: 'Journal Mode', icon: BookOpen },
          { id: 'translation', name: 'Back-Translation', icon: RefreshCw },
        ].map((mode) => {
          const Icon = mode.icon;
          return (
            <button
              key={mode.id}
              onClick={() => setCurrentMode(mode.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                currentMode === mode.id
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <Icon className="w-4 h-4" />
              {mode.name}
            </button>
          );
        })}
      </div>

      {/* Guided Prompts Mode */}
      {currentMode === 'prompts' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="space-y-4">
            <h3 className="text-white font-semibold">Writing Prompts</h3>
            {prompts.map((prompt) => (
              <motion.div 
                key={prompt.id}
                className="bg-gray-800 rounded-lg p-4 cursor-pointer"
                variants={cardVariants}
                whileHover="hover"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-2 py-1 rounded text-xs ${
                    prompt.difficulty === 'Beginner' ? 'bg-green-600 text-white' :
                    prompt.difficulty === 'Intermediate' ? 'bg-yellow-600 text-white' :
                    'bg-red-600 text-white'
                  }`}>
                    {prompt.difficulty}
                  </span>
                  <span className="text-gray-400 text-xs">{prompt.time}</span>
                </div>
                <h4 className="text-white font-medium">{prompt.title}</h4>
                <ChevronRight className="w-4 h-4 text-gray-400 ml-auto" />
              </motion.div>
            ))}
          </div>
          
          <div className="lg:col-span-2">
            <motion.div 
              className="bg-gray-800 rounded-lg p-6"
              variants={cardVariants}
              whileHover="hover"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-semibold">Current Prompt: Describe your morning routine</h3>
                <div className="flex items-center gap-2">
                  <Timer className="w-4 h-4 text-yellow-400" />
                  <span className="text-yellow-400 text-sm">8:30 remaining</span>
                </div>
              </div>
              
              <textarea 
                className="w-full h-64 bg-gray-700 text-white p-4 rounded-lg border border-gray-600 focus:border-purple-500 focus:outline-none resize-none"
                placeholder="আমি সকাল ৬টায় ঘুম থেকে উঠি..."
              />
              
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-4">
                  <span className="text-gray-400 text-sm">Words: 45/150</span>
                  <button 
                    onClick={() => setShowFeedback(!showFeedback)}
                    className="text-purple-400 hover:text-purple-300 text-sm"
                  >
                    {showFeedback ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    {showFeedback ? ' Hide' : ' Show'} AI Help
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <button className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded">
                    <Save className="w-4 h-4 mr-2" />
                    Save Draft
                  </button>
                  <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded">
                    Submit
                  </button>
                </div>
              </div>
              
              {showFeedback && (
                <motion.div 
                  className="mt-4 p-4 bg-purple-600/20 border border-purple-600/30 rounded-lg"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                >
                  <h4 className="text-purple-400 font-medium mb-2">AI Writing Assistant</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Try using more descriptive verbs</li>
                    <li>• Consider adding time expressions (সকালে, দুপুরে)</li>
                    <li>• Great use of present tense!</li>
                  </ul>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      )}

      {/* Journal Mode */}
      {currentMode === 'journal' && (
        <motion.div 
          className="bg-gray-800 rounded-lg p-6"
          variants={cardVariants}
          whileHover="hover"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-white font-semibold flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-400" />
              Personal Journal
            </h3>
            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-sm">January 15, 2024</span>
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded text-sm">
                New Entry
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <textarea 
                className="w-full h-80 bg-gray-700 text-white p-4 rounded-lg border border-gray-600 focus:border-indigo-500 focus:outline-none resize-none"
                placeholder="আজকের দিনটি কেমন কাটল? (How was your day today?)"
              />
              
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-4">
                  <span className="text-gray-400 text-sm">Words: 128</span>
                  <span className="text-gray-400 text-sm">•</span>
                  <span className="text-gray-400 text-sm">5 min read</span>
                </div>
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded">
                  Get AI Feedback
                </button>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-gray-700 rounded-lg p-4">
                <h4 className="text-white font-medium mb-3">Recent Entries</h4>
                <div className="space-y-2">
                  {[
                    { date: "Jan 14", title: "বিশ্ববিদ্যালয়ের প্রথম দিন", mood: "😊" },
                    { date: "Jan 13", title: "নতুন বন্ধুত্ব", mood: "😄" },
                    { date: "Jan 12", title: "বাংলা ক্লাস", mood: "🤔" },
                  ].map((entry, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-600 rounded">
                      <div>
                        <span className="text-white text-sm">{entry.title}</span>
                        <p className="text-gray-400 text-xs">{entry.date}</p>
                      </div>
                      <span className="text-lg">{entry.mood}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-4">
                <h4 className="text-white font-medium mb-3">Writing Stats</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">This week</span>
                    <span className="text-white">5 entries</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Avg. words</span>
                    <span className="text-white">156</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Streak</span>
                    <span className="text-green-400">7 days</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Back-Translation Mode */}
      {currentMode === 'translation' && (
        <motion.div 
          className="bg-gray-800 rounded-lg p-6"
          variants={cardVariants}
          whileHover="hover"
        >
          <h3 className="text-white font-semibold mb-6 flex items-center gap-2">
            <RefreshCw className="w-5 h-5 text-green-400" />
            Back-Translation Exercise
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="text-white font-medium mb-3">Original English Text</h4>
              <div className="bg-gray-700 rounded-lg p-4 mb-4">
                <p className="text-gray-300">
                  "The weather is beautiful today. I decided to take a walk in the park and enjoy the sunshine. 
                  Many people were sitting on benches, reading books or having conversations with friends."
                </p>
              </div>
              
              <h4 className="text-white font-medium mb-3">Your Bengali Translation</h4>
              <textarea 
                className="w-full h-32 bg-gray-700 text-white p-4 rounded-lg border border-gray-600 focus:border-green-500 focus:outline-none resize-none"
                placeholder="বাংলায় অনুবাদ করুন..."
              />
            </div>
            
            <div>
              <h4 className="text-white font-medium mb-3">AI Analysis</h4>
              <div className="space-y-4">
                <div className="bg-green-600/20 border border-green-600/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-green-400 font-medium">Good translation!</span>
                  </div>
                  <p className="text-gray-300 text-sm">
                    You correctly captured the meaning and used appropriate vocabulary.
                  </p>
                </div>
                
                <div className="bg-yellow-600/20 border border-yellow-600/30 rounded-lg p-4">
                  <h5 className="text-yellow-400 font-medium mb-2">Suggestions</h5>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• "আবহাওয়া" is more formal than "আবহাওয়া"</li>
                    <li>• Consider using "রোদ উপভোগ করা" for "enjoy sunshine"</li>
                  </ul>
                </div>
                
                <div className="bg-gray-700 rounded-lg p-4">
                  <h5 className="text-white font-medium mb-2">Alternative Translation</h5>
                  <p className="text-gray-300 text-sm">
                    "আজ আবহাওয়া খুব সুন্দর। আমি পার্কে হাঁটতে যেতে এবং রোদ উপভোগ করতে ঠিক করলাম..."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

// Arcade Component
const Arcade = () => {
  const [selectedGame, setSelectedGame] = useState('match');
  const [gameActive, setGameActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);

  const games = [
    { id: 'match', name: 'Timed Match', icon: Zap, description: 'Match Bengali words with English meanings' },
    { id: 'picture', name: 'Picture Description', icon: Eye, description: 'Describe images in Bengali' },
    { id: 'dialogue', name: 'Dialogue Completion', icon: MessageSquare, description: 'Complete conversation scenarios' },
    { id: 'sequence', name: 'Sequencing Puzzles', icon: Shuffle, description: 'Arrange words to form correct sentences' },
  ];

  return (
    <motion.div 
      className="space-y-6"
      variants={sectionVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Game Selector */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {games.map((game) => {
          const Icon = game.icon;
          return (
            <motion.button
              key={game.id}
              onClick={() => setSelectedGame(game.id)}
              className={`p-4 rounded-lg border-2 transition-all text-left ${
                selectedGame === game.id
                  ? 'bg-orange-600/20 border-orange-600 text-orange-400'
                  : 'bg-gray-800 border-gray-700 text-gray-300 hover:border-gray-600'
              }`}
              variants={cardVariants}
              whileHover="hover"
            >
              <Icon className="w-8 h-8 mb-2" />
              <h4 className="font-medium">{game.name}</h4>
              <p className="text-sm text-gray-400 mt-1">{game.description}</p>
            </motion.button>
          );
        })}
      </div>

      {/* Game Interface */}
      <motion.div 
        className="bg-gray-800 rounded-lg p-6"
        variants={cardVariants}
        whileHover="hover"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-white font-semibold flex items-center gap-2">
            <Gamepad2 className="w-5 h-5 text-orange-400" />
            {games.find(g => g.id === selectedGame)?.name}
          </h3>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Timer className="w-4 h-4 text-yellow-400" />
              <span className="text-yellow-400 font-mono">{timeLeft}s</span>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-yellow-400" />
              <span className="text-white">1,250 pts</span>
            </div>
          </div>
        </div>

        {/* Timed Match Game */}
        {selectedGame === 'match' && (
          <div className="space-y-6">
            <div className="text-center">
              <h4 className="text-white font-medium mb-4">Match the Bengali words with their English meanings</h4>
              {!gameActive ? (
                <button 
                  onClick={() => setGameActive(true)}
                  className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg"
                >
                  Start Game
                </button>
              ) : (
                <div className="grid grid-cols-2 gap-8">
                  {/* Bengali Words */}
                  <div className="space-y-3">
                    <h5 className="text-gray-400 font-medium">Bengali</h5>
                    {['বই', 'পানি', 'ঘর', 'রান্না'].map((word, index) => (
                      <motion.button
                        key={index}
                        className="w-full p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {word}
                      </motion.button>
                    ))}
                  </div>
                  
                  {/* English Words */}
                  <div className="space-y-3">
                    <h5 className="text-gray-400 font-medium">English</h5>
                    {['Water', 'House', 'Book', 'Cooking'].map((word, index) => (
                      <motion.button
                        key={index}
                        className="w-full p-3 bg-gray-600 hover:bg-gray-500 text-white rounded-lg"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {word}
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Picture Description Game */}
        {selectedGame === 'picture' && (
          <div className="text-center">
            <div className="bg-gray-700 rounded-lg p-8 mb-6 aspect-video flex items-center justify-center">
              <div className="text-center">
                <Eye className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400">Image: A family having dinner together</p>
              </div>
            </div>
            
            <textarea 
              className="w-full h-32 bg-gray-700 text-white p-4 rounded-lg border border-gray-600 focus:border-orange-500 focus:outline-none resize-none mb-4"
              placeholder="ছবিটি বাংলায় বর্ণনা করুন... (Describe the image in Bengali...)"
            />
            
            <div className="flex items-center justify-center gap-4">
              <button className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded">
                Skip
              </button>
              <button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded">
                Submit Answer
              </button>
            </div>
          </div>
        )}

        {/* Score and Progress */}
        <div className="mt-6 pt-6 border-t border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-green-400">92%</div>
              <div className="text-gray-400 text-sm">Accuracy</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-400">15</div>
              <div className="text-gray-400 text-sm">Streak</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-400">Level 8</div>
              <div className="text-gray-400 text-sm">Current Level</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-400">2,450</div>
              <div className="text-gray-400 text-sm">High Score</div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function SkillsStudio() {
  const [activeTab, setActiveTab] = useState('speaking');

  const tabs = [
    { id: 'speaking', name: 'Speaking Booth', icon: Mic, component: SpeakingBooth },
    { id: 'writing', name: 'Writing Desk', icon: PenTool, component: WritingDesk },
    { id: 'arcade', name: 'Arcade', icon: Gamepad2, component: Arcade },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Skills Studio</h1>
        <p className="text-gray-400">Practice speaking, writing, and game-based challenges</p>
      </div>
      
      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 mb-8">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex items-center gap-3 px-6 py-3 rounded-lg border-2 transition-all"
              variants={tabVariants}
              animate={activeTab === tab.id ? 'active' : 'inactive'}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Icon className="w-5 h-5" />
              {tab.name}
            </motion.button>
          );
        })}
      </div>
      
      {/* Tab Content */}
      <div className="min-h-screen">
        {(() => {
          const activeTabData = tabs.find(tab => tab.id === activeTab);
          const Component = activeTabData?.component;
          return Component ? <Component /> : null;
        })()}
      </div>
    </div>
  );
} 