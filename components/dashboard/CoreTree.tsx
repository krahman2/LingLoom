'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { 
  ChevronDown, 
  ChevronRight,
  BookOpen,
  Star,
  Lock,
  Check,
  Play,
  Circle,
  Award,
  Trophy,
  Crown,
  Zap,
  Target,
  Heart,
  Brain,
  Coffee,
  Home,
  Users,
  ShoppingCart,
  Clock,
  MapPin,
  Utensils,
  Plane,
  Music,
  Camera,
  Gamepad2,
  Smartphone,
  Car,
  Building,
  Trees,
  Sun,
  Moon,
  Cloudy,
  Umbrella,
  Gift,
  BookMarked,
  GraduationCap,
  Briefcase,
  Stethoscope,
  Palette,
  Scissors,
  Hammer,
  Wrench,
  Calculator,
  Globe,
  Flag,
  Mountain,
  Waves,
  Flower,
  Leaf
} from 'lucide-react';

// Types
interface Section {
  id: string;
  title: string;
  type: 'lesson' | 'practice' | 'story' | 'test';
  status: 'locked' | 'available' | 'in-progress' | 'completed' | 'mastered';
  xp: number;
  description?: string;
}

interface Lesson {
  id: string;
  title: string;
  sections: Section[];
  status: 'locked' | 'available' | 'in-progress' | 'completed' | 'mastered';
  totalXP: number;
  completedSections: number;
}

interface Chapter {
  id: string;
  title: string;
  description: string;
  icon: any;
  lessons: Lesson[];
  status: 'locked' | 'available' | 'in-progress' | 'completed' | 'mastered';
  totalXP: number;
  completedLessons: number;
}

interface Unit {
  id: string;
  title: string;
  description: string;
  chapters: Chapter[];
  status: 'locked' | 'available' | 'in-progress' | 'completed' | 'mastered';
  totalXP: number;
  completedChapters: number;
}

interface Level {
  id: string;
  name: string;
  title: string;
  description: string;
  color: string;
  units: Unit[];
  isUnlocked: boolean;
  totalXP: number;
  completedUnits: number;
}

// Sample data structure
const createSampleData = (): Level[] => [
  {
    id: 'a0',
    name: 'A0',
    title: 'Complete Beginner',
    description: 'Start your Bengali journey with basic greetings and essential words',
    color: 'from-green-500 to-green-600',
    isUnlocked: true,
    totalXP: 2400,
    completedUnits: 3,
    units: [
      {
        id: 'a0-u1',
        title: 'Unit 1: First Steps',
        description: 'Basic greetings and introductions',
        status: 'completed',
        totalXP: 800,
        completedChapters: 4,
        chapters: [
          {
            id: 'a0-u1-c1',
            title: 'Greetings',
            description: 'Learn how to say hello and goodbye',
            icon: Heart,
            status: 'completed',
            totalXP: 200,
            completedLessons: 5,
            lessons: [
              {
                id: 'a0-u1-c1-l1',
                title: 'নমস্কার - Hello',
                status: 'completed',
                totalXP: 40,
                completedSections: 4,
                sections: [
                  { id: 's1', title: 'Introduction', type: 'lesson', status: 'completed', xp: 10 },
                  { id: 's2', title: 'Pronunciation', type: 'practice', status: 'completed', xp: 10 },
                  { id: 's3', title: 'Usage Examples', type: 'lesson', status: 'completed', xp: 10 },
                  { id: 's4', title: 'Practice Quiz', type: 'test', status: 'completed', xp: 10 }
                ]
              },
              {
                id: 'a0-u1-c1-l2',
                title: 'আপনি কেমন আছেন? - How are you?',
                status: 'completed',
                totalXP: 40,
                completedSections: 4,
                sections: [
                  { id: 's1', title: 'Asking about wellbeing', type: 'lesson', status: 'completed', xp: 10 },
                  { id: 's2', title: 'Common responses', type: 'lesson', status: 'completed', xp: 10 },
                  { id: 's3', title: 'Speaking practice', type: 'practice', status: 'completed', xp: 10 },
                  { id: 's4', title: 'Conversation test', type: 'test', status: 'completed', xp: 10 }
                ]
              }
            ]
          },
          {
            id: 'a0-u1-c2',
            title: 'Family',
            description: 'Family members and relationships',
            icon: Users,
            status: 'in-progress',
            totalXP: 200,
            completedLessons: 2,
            lessons: [
              {
                id: 'a0-u1-c2-l1',
                title: 'পরিবার - Family',
                status: 'completed',
                totalXP: 40,
                completedSections: 4,
                sections: [
                  { id: 's1', title: 'Family tree', type: 'lesson', status: 'completed', xp: 10 },
                  { id: 's2', title: 'Basic terms', type: 'lesson', status: 'completed', xp: 10 },
                  { id: 's3', title: 'Practice', type: 'practice', status: 'completed', xp: 10 },
                  { id: 's4', title: 'Quiz', type: 'test', status: 'completed', xp: 10 }
                ]
              },
              {
                id: 'a0-u1-c2-l2',
                title: 'আমার বাবা-মা - My Parents',
                status: 'in-progress',
                totalXP: 40,
                completedSections: 2,
                sections: [
                  { id: 's1', title: 'Parents vocabulary', type: 'lesson', status: 'completed', xp: 10 },
                  { id: 's2', title: 'Describing parents', type: 'lesson', status: 'completed', xp: 10 },
                  { id: 's3', title: 'Speaking exercise', type: 'practice', status: 'available', xp: 10 },
                  { id: 's4', title: 'Assessment', type: 'test', status: 'locked', xp: 10 }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'a1',
    name: 'A1',
    title: 'Elementary',
    description: 'Build basic conversational skills and everyday vocabulary',
    color: 'from-blue-500 to-blue-600',
    isUnlocked: true,
    totalXP: 3200,
    completedUnits: 1,
    units: [
      {
        id: 'a1-u1',
        title: 'Unit 1: Daily Life',
        description: 'Everyday activities and routines',
        status: 'available',
        totalXP: 1200,
        completedChapters: 0,
        chapters: [
          {
            id: 'a1-u1-c1',
            title: 'Daily Routine',
            description: 'Morning to night activities',
            icon: Sun,
            status: 'available',
            totalXP: 300,
            completedLessons: 0,
            lessons: [
              {
                id: 'a1-u1-c1-l1',
                title: 'সকালের কাজ - Morning Activities',
                status: 'available',
                totalXP: 60,
                completedSections: 0,
                sections: [
                  { id: 's1', title: 'Wake up routine', type: 'lesson', status: 'available', xp: 15 },
                  { id: 's2', title: 'Morning prayers', type: 'lesson', status: 'locked', xp: 15 },
                  { id: 's3', title: 'Breakfast time', type: 'practice', status: 'locked', xp: 15 },
                  { id: 's4', title: 'Morning quiz', type: 'test', status: 'locked', xp: 15 }
                ]
              }
            ]
          },
          {
            id: 'a1-u1-c2',
            title: 'Food & Drink',
            description: 'Bengali cuisine and dining',
            icon: Utensils,
            status: 'locked',
            totalXP: 300,
            completedLessons: 0,
            lessons: []
          }
        ]
      }
    ]
  },
  {
    id: 'a2',
    name: 'A2',
    title: 'Pre-Intermediate',
    description: 'Express opinions and discuss familiar topics',
    color: 'from-purple-500 to-purple-600',
    isUnlocked: false,
    totalXP: 4000,
    completedUnits: 0,
    units: []
  },
  {
    id: 'b1',
    name: 'B1',
    title: 'Intermediate',
    description: 'Handle most situations and express ideas clearly',
    color: 'from-orange-500 to-orange-600',
    isUnlocked: false,
    totalXP: 5000,
    completedUnits: 0,
    units: []
  },
  {
    id: 'b2',
    name: 'B2',
    title: 'Upper Intermediate',
    description: 'Understand complex texts and speak fluently',
    color: 'from-red-500 to-red-600',
    isUnlocked: false,
    totalXP: 6000,
    completedUnits: 0,
    units: []
  }
];

const statusColors = {
  locked: 'bg-gray-600 text-gray-400',
  available: 'bg-blue-600 text-white hover:bg-blue-700',
  'in-progress': 'bg-yellow-600 text-white hover:bg-yellow-700',
  completed: 'bg-green-600 text-white hover:bg-green-700',
  mastered: 'bg-purple-600 text-white hover:bg-purple-700'
};

const statusIcons = {
  locked: Lock,
  available: Circle,
  'in-progress': Play,
  completed: Check,
  mastered: Crown
};

const typeIcons = {
  lesson: BookOpen,
  practice: Target,
  story: BookMarked,
  test: Trophy
};

export default function CoreTree() {
  const [levels] = useState<Level[]>(createSampleData);
  const [expandedLevels, setExpandedLevels] = useState<Set<string>>(new Set(['a0']));
  const [expandedUnits, setExpandedUnits] = useState<Set<string>>(new Set(['a0-u1']));
  const [expandedChapters, setExpandedChapters] = useState<Set<string>>(new Set(['a0-u1-c1']));
  const [expandedLessons, setExpandedLessons] = useState<Set<string>>(new Set(['a0-u1-c1-l1']));

  const toggleExpanded = (id: string, type: 'level' | 'unit' | 'chapter' | 'lesson') => {
    const setters = {
      level: setExpandedLevels,
      unit: setExpandedUnits,
      chapter: setExpandedChapters,
      lesson: setExpandedLessons
    };
    
    const setter = setters[type];
    setter(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const isExpanded = (id: string, type: 'level' | 'unit' | 'chapter' | 'lesson') => {
    const sets = {
      level: expandedLevels,
      unit: expandedUnits,
      chapter: expandedChapters,
      lesson: expandedLessons
    };
    return sets[type].has(id);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Core Tree</h1>
        <p className="text-gray-400">Progress through structured lessons from beginner to intermediate</p>
      </div>

      <div className="space-y-6">
        {levels.map((level, levelIndex) => (
          <motion.div
            key={level.id}
            className="relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: levelIndex * 0.1 }}
          >
            {/* Level Header */}
            <motion.button
              onClick={() => level.isUnlocked && toggleExpanded(level.id, 'level')}
              className={`w-full text-left p-6 rounded-lg border-2 transition-all ${
                level.isUnlocked
                  ? `bg-gradient-to-r ${level.color} border-transparent hover:scale-[1.02]`
                  : 'bg-gray-800 border-gray-700 opacity-50'
              }`}
              disabled={!level.isUnlocked}
              whileHover={{ scale: level.isUnlocked ? 1.02 : 1 }}
              whileTap={{ scale: level.isUnlocked ? 0.98 : 1 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    {level.isUnlocked ? (
                      isExpanded(level.id, 'level') ? (
                        <ChevronDown className="w-6 h-6 text-white" />
                      ) : (
                        <ChevronRight className="w-6 h-6 text-white" />
                      )
                    ) : (
                      <Lock className="w-6 h-6 text-gray-400" />
                    )}
                    <div className="text-2xl font-bold text-white bg-white/20 rounded-full w-12 h-12 flex items-center justify-center">
                      {level.name}
                    </div>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">{level.title}</h2>
                    <p className="text-gray-200 text-sm">{level.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-white font-semibold">{level.totalXP} XP</div>
                  <div className="text-gray-200 text-sm">{level.completedUnits} units completed</div>
                </div>
              </div>
            </motion.button>

            {/* Level Content */}
            <AnimatePresence>
              {isExpanded(level.id, 'level') && level.isUnlocked && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="ml-8 mt-4 space-y-4"
                >
                  {level.units.map((unit, unitIndex) => (
                    <motion.div
                      key={unit.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: unitIndex * 0.05 }}
                    >
                      {/* Unit Header */}
                      <motion.button
                        onClick={() => toggleExpanded(unit.id, 'unit')}
                        className="w-full text-left p-4 bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-700 transition-all"
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {isExpanded(unit.id, 'unit') ? (
                              <ChevronDown className="w-5 h-5 text-gray-400" />
                            ) : (
                              <ChevronRight className="w-5 h-5 text-gray-400" />
                            )}
                            <div>
                              <h3 className="text-lg font-semibold text-white">{unit.title}</h3>
                              <p className="text-gray-400 text-sm">{unit.description}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-white font-medium">{unit.totalXP} XP</div>
                            <div className="text-gray-400 text-sm">{unit.completedChapters} chapters</div>
                          </div>
                        </div>
                      </motion.button>

                      {/* Unit Content */}
                      <AnimatePresence>
                        {isExpanded(unit.id, 'unit') && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="ml-6 mt-3 space-y-3"
                          >
                            {unit.chapters.map((chapter, chapterIndex) => (
                              <motion.div
                                key={chapter.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: chapterIndex * 0.03 }}
                              >
                                {/* Chapter Header */}
                                <motion.button
                                  onClick={() => chapter.status !== 'locked' && toggleExpanded(chapter.id, 'chapter')}
                                  className={`w-full text-left p-3 rounded-lg border transition-all ${
                                    chapter.status === 'locked'
                                      ? 'bg-gray-900 border-gray-800 opacity-50'
                                      : 'bg-gray-800 hover:bg-gray-700 border-gray-700'
                                  }`}
                                  disabled={chapter.status === 'locked'}
                                  whileHover={{ scale: chapter.status !== 'locked' ? 1.01 : 1 }}
                                >
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                      {chapter.status === 'locked' ? (
                                        <Lock className="w-4 h-4 text-gray-500" />
                                      ) : isExpanded(chapter.id, 'chapter') ? (
                                        <ChevronDown className="w-4 h-4 text-gray-400" />
                                      ) : (
                                        <ChevronRight className="w-4 h-4 text-gray-400" />
                                      )}
                                      <chapter.icon className="w-5 h-5 text-blue-400" />
                                      <div>
                                        <h4 className="font-medium text-white">{chapter.title}</h4>
                                        <p className="text-gray-400 text-xs">{chapter.description}</p>
                                      </div>
                                    </div>
                                    <div className="text-right">
                                      <div className="text-white text-sm">{chapter.totalXP} XP</div>
                                      <div className="text-gray-400 text-xs">{chapter.completedLessons} lessons</div>
                                    </div>
                                  </div>
                                </motion.button>

                                {/* Chapter Content */}
                                <AnimatePresence>
                                  {isExpanded(chapter.id, 'chapter') && chapter.status !== 'locked' && (
                                    <motion.div
                                      initial={{ opacity: 0, height: 0 }}
                                      animate={{ opacity: 1, height: 'auto' }}
                                      exit={{ opacity: 0, height: 0 }}
                                      className="ml-4 mt-2 space-y-2"
                                    >
                                      {chapter.lessons.map((lesson, lessonIndex) => (
                                        <motion.div
                                          key={lesson.id}
                                          initial={{ opacity: 0, x: -20 }}
                                          animate={{ opacity: 1, x: 0 }}
                                          transition={{ delay: lessonIndex * 0.02 }}
                                        >
                                          {/* Lesson Header */}
                                          <motion.button
                                            onClick={() => lesson.status !== 'locked' && toggleExpanded(lesson.id, 'lesson')}
                                            className={`w-full text-left p-2 rounded border transition-all ${
                                              lesson.status === 'locked'
                                                ? 'bg-gray-900 border-gray-800 opacity-50'
                                                : 'bg-gray-800 hover:bg-gray-700 border-gray-700'
                                            }`}
                                            disabled={lesson.status === 'locked'}
                                            whileHover={{ scale: lesson.status !== 'locked' ? 1.005 : 1 }}
                                          >
                                            <div className="flex items-center justify-between">
                                              <div className="flex items-center gap-2">
                                                {lesson.status === 'locked' ? (
                                                  <Lock className="w-3 h-3 text-gray-500" />
                                                ) : isExpanded(lesson.id, 'lesson') ? (
                                                  <ChevronDown className="w-3 h-3 text-gray-400" />
                                                ) : (
                                                  <ChevronRight className="w-3 h-3 text-gray-400" />
                                                )}
                                                <span className="text-white text-sm font-medium">{lesson.title}</span>
                                              </div>
                                              <div className="flex items-center gap-2">
                                                <span className="text-gray-400 text-xs">{lesson.completedSections}/{lesson.sections.length}</span>
                                                <span className="text-white text-xs">{lesson.totalXP} XP</span>
                                              </div>
                                            </div>
                                          </motion.button>

                                          {/* Lesson Content - Sections */}
                                          <AnimatePresence>
                                            {isExpanded(lesson.id, 'lesson') && lesson.status !== 'locked' && (
                                              <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                className="ml-3 mt-1 space-y-1"
                                              >
                                                {lesson.sections.map((section, sectionIndex) => {
                                                  const StatusIcon = statusIcons[section.status];
                                                  const TypeIcon = typeIcons[section.type];
                                                  
                                                  return (
                                                    <motion.button
                                                      key={section.id}
                                                      className={`w-full text-left p-2 rounded text-sm transition-all ${statusColors[section.status]}`}
                                                      disabled={section.status === 'locked'}
                                                      initial={{ opacity: 0, x: -10 }}
                                                      animate={{ opacity: 1, x: 0 }}
                                                      transition={{ delay: sectionIndex * 0.01 }}
                                                      whileHover={{ scale: section.status !== 'locked' ? 1.02 : 1 }}
                                                      whileTap={{ scale: section.status !== 'locked' ? 0.98 : 1 }}
                                                    >
                                                      <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-2">
                                                          <StatusIcon className="w-3 h-3" />
                                                          <TypeIcon className="w-3 h-3" />
                                                          <span>{section.title}</span>
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                          <Zap className="w-3 h-3" />
                                                          <span>{section.xp}</span>
                                                        </div>
                                                      </div>
                                                    </motion.button>
                                                  );
                                                })}
                                              </motion.div>
                                            )}
                                          </AnimatePresence>
                                        </motion.div>
                                      ))}
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </motion.div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Progress Summary */}
      <motion.div
        className="mt-8 p-6 bg-gray-800 rounded-lg border border-gray-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h3 className="text-lg font-semibold text-white mb-4">Your Progress</h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {levels.map((level) => (
            <div key={level.id} className="text-center">
              <div className={`w-16 h-16 mx-auto mb-2 rounded-full bg-gradient-to-r ${level.color} flex items-center justify-center ${!level.isUnlocked ? 'opacity-50' : ''}`}>
                <span className="text-white font-bold">{level.name}</span>
              </div>
              <div className="text-white text-sm font-medium">{level.title}</div>
              <div className="text-gray-400 text-xs">{level.totalXP} XP</div>
              {level.isUnlocked ? (
                <div className="text-green-400 text-xs">{level.completedUnits} units done</div>
              ) : (
                <div className="text-gray-500 text-xs">Locked</div>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
} 