/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, RotateCcw, Heart, Flame, ShieldAlert, Check } from 'lucide-react';
import { CoffeeItem } from '../types';
import { COFFEE_ITEMS } from '../coffeeData';

interface BrewQuizProps {
  onCustomizeItem: (item: CoffeeItem) => void;
}

interface Question {
  id: number;
  text: string;
  subtitle: string;
  options: {
    label: string;
    description: string;
    value: string;
    icon: string;
  }[];
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    text: 'What climate or temperature feels perfect right now?',
    subtitle: 'Choose your thermal coffee baseline',
    options: [
      { label: 'Hot & Comforting', description: 'Steaming mugs with thick foam layers.', value: 'hot', icon: '☕' },
      { label: 'Cold & Chilled', description: 'Ice cold, condensed, perfect for summers.', value: 'cold', icon: '🧊' }
    ]
  },
  {
    id: 2,
    text: 'How do you like your coffee body structured?',
    subtitle: 'Determine milk and texture preferences',
    options: [
      { label: 'Creamy & Velvet', description: 'Luxurious organic whole or oat milk blends.', value: 'creamy', icon: '🥛' },
      { label: 'Bold, Clean & Strong', description: 'Pure water dilutions or direct double shots.', value: 'strong', icon: '⚡' }
    ]
  },
  {
    id: 3,
    text: 'Which underlying tasting note calls to you?',
    subtitle: 'Decide the primary sweet or nutty accents',
    options: [
      { label: 'Sweet Caramel Core', description: 'Decadent butterscotch and sugary syrups.', value: 'sweet', icon: '🍯' },
      { label: 'Deep Organic Cacao', description: 'Dark chocolate, earthy roast notes.', value: 'chocolate', icon: '🍫' },
      { label: 'Pure Caramelized Crema', description: 'No extra sugar, natural bean aromas.', value: 'pure', icon: '🌰' }
    ]
  }
];

export default function BrewQuiz({ onCustomizeItem }: BrewQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResult, setShowResult] = useState(false);
  const [matchedCoffee, setMatchedCoffee] = useState<CoffeeItem | null>(null);

  const handleOptionSelect = (value: string) => {
    const nextAnswers = { ...answers, [currentQuestion]: value };
    setAnswers(nextAnswers);

    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate matching coffee
      calculateMatch(nextAnswers);
    }
  };

  const calculateMatch = (finalAnswers: Record<string, string>) => {
    const isCold = finalAnswers['0'] === 'cold';
    const isCreamy = finalAnswers['1'] === 'creamy';
    const sweetPref = finalAnswers['2'];

    let recommendation: CoffeeItem = COFFEE_ITEMS[1]; // default Classic Cappuccino

    if (isCold) {
      // recommend Iced Caramel Latte
      recommendation = COFFEE_ITEMS[0];
    } else if (isCreamy) {
      if (sweetPref === 'chocolate') {
        // mocha
        recommendation = COFFEE_ITEMS[2];
      } else {
        // cappuccino
        recommendation = COFFEE_ITEMS[1];
      }
    } else {
      // Espresso
      recommendation = COFFEE_ITEMS[3];
    }

    setMatchedCoffee(recommendation);
    setShowResult(true);
  };

  const handleReset = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResult(false);
    setMatchedCoffee(null);
  };

  return (
    <div id="brew-quiz-section" className="bg-[#140F0D] border border-coffee-border rounded-3xl p-6 md:p-10 shadow-xl relative overflow-hidden">
      
      {/* Absolute ambient lights */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-coffee-accent/5 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-coffee-gold/5 rounded-full filter blur-3xl pointer-events-none" />

      {/* Intro section */}
      <div className="text-center max-w-xl mx-auto space-y-2 mb-8">
        <span className="text-[10px] uppercase font-bold tracking-widest text-coffee-accent bg-coffee-accent/10 px-3 py-1 rounded-full border border-coffee-accent/20">
          Sensoric Personalization
        </span>
        <h3 className="font-display text-2xl md:text-3xl font-bold text-coffee-white tracking-tight leading-none mt-1">
          Find Your Perfect Roast
        </h3>
        <p className="text-xs text-coffee-muted font-sans max-w-md mx-auto">
          Answer three quick questions about your palate, and our lead barista's recommendation algorithm will select your perfect beverage.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {!showResult ? (
          <motion.div
            key={`question-${currentQuestion}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Question progress */}
            <div className="flex items-center justify-between text-xs text-coffee-muted max-w-lg mx-auto">
              <span className="font-semibold uppercase tracking-wider text-coffee-accent">
                Question {currentQuestion + 1} of {QUESTIONS.length}
              </span>
              <span>{Math.round(((currentQuestion) / QUESTIONS.length) * 100)}% complete</span>
            </div>
            
            {/* Grid Line Indicator */}
            <div className="w-full max-w-lg h-1 bg-[#1E1714] rounded-full mx-auto overflow-hidden">
              <motion.div
                className="h-full bg-coffee-accent"
                initial={{ width: `${(currentQuestion / QUESTIONS.length) * 100}%` }}
                animate={{ width: `${((currentQuestion + 1) / QUESTIONS.length) * 100}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>

            {/* Question text */}
            <div className="text-center max-w-lg mx-auto space-y-1">
              <h4 className="text-lg md:text-xl font-display font-bold text-coffee-cream">
                {QUESTIONS[currentQuestion].text}
              </h4>
              <p className="text-xs text-coffee-muted">{QUESTIONS[currentQuestion].subtitle}</p>
            </div>

            {/* Answer Options Grid */}
            <div className="grid md:grid-cols-2 gap-4 max-w-lg mx-auto">
              {QUESTIONS[currentQuestion].options.map((option) => (
                <button
                  key={option.value}
                  id={`quiz-opt-${option.value}`}
                  onClick={() => handleOptionSelect(option.value)}
                  className="bg-coffee-dark hover:bg-[#1E1714] border border-coffee-border hover:border-coffee-accent p-5 rounded-2xl text-left transition-all active:scale-98 group flex items-start gap-4 cursor-pointer"
                >
                  <div className="text-3xl p-2.5 rounded-xl bg-[#1A1310] border border-coffee-border group-hover:bg-coffee-accent/15 transition-all">
                    {option.icon}
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-sm font-semibold text-coffee-white group-hover:text-coffee-accent transition-colors">
                      {option.label}
                    </p>
                    <p className="text-xs text-coffee-muted leading-relaxed">
                      {option.description}
                    </p>
                  </div>
                </button>
              ))}
            </div>

            {/* Back indicator if progress > 0 */}
            {currentQuestion > 0 && (
              <div className="text-center">
                <button
                  id="quiz-back-btn"
                  onClick={() => setCurrentQuestion(currentQuestion - 1)}
                  className="text-xs text-coffee-muted hover:text-coffee-accent font-semibold flex items-center justify-center gap-1 mx-auto cursor-pointer"
                >
                  <RotateCcw size={12} /> Go back to previous step
                </button>
              </div>
            )}
          </motion.div>
        ) : (
          /* Results Display Cards */
          <motion.div
            key="result-quiz"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="max-w-2xl mx-auto bg-coffee-dark border border-coffee-border rounded-2xl overflow-hidden p-6 md:p-8 space-y-6"
          >
            <div className="flex flex-col md:flex-row gap-6 items-center">
              {/* Product render */}
              <div className="w-40 h-40 rounded-full border-4 border-coffee-border overflow-hidden flex-shrink-0 shadow-2xl relative">
                <img
                  src={matchedCoffee?.image}
                  alt={matchedCoffee?.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover filter brightness-95"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-2.5 left-0 right-0 text-center">
                  <span className="text-[9px] uppercase tracking-wider font-bold text-coffee-gold bg-coffee-black/70 px-2 py-0.5 rounded-full border border-coffee-border/40">
                    Perfect Match
                  </span>
                </div>
              </div>

              {/* Recommendation Description info */}
              <div className="flex-1 space-y-3 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <Heart size={14} className="text-red-400 fill-red-400" />
                  <span className="text-xs font-semibold text-coffee-accent uppercase tracking-wider">
                    palate Match Selected
                  </span>
                </div>

                <h4 className="font-display text-2xl font-bold text-coffee-white">
                  {matchedCoffee?.name}
                </h4>

                <p className="text-xs text-coffee-cream leading-relaxed font-sans">
                  Based on your affinity for {answers[0] === 'cold' ? 'cold refreshes' : 'cozy heat'} and {answers[1] === 'creamy' ? 'rich, creamy whole textures' : 'stark deep extractions'}, our sensory panel selected the {matchedCoffee?.name}. {matchedCoffee?.description}
                </p>

                {matchedCoffee?.features && (
                  <div className="flex flex-wrap gap-2 pt-1 justify-center md:justify-start">
                    {matchedCoffee.features.map((feature, idx) => (
                      <span key={idx} className="text-[10px] font-mono text-coffee-white bg-[#1A1311] border border-coffee-border px-2 py-1 rounded-md flex items-center gap-1 text-xs">
                        <Check size={10} className="text-coffee-accent" />
                        {feature}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Quick check actions */}
            <div className="pt-4 border-t border-coffee-border/50 flex flex-col sm:flex-row items-center gap-3">
              <button
                id="add-matched-cup"
                onClick={() => matchedCoffee && onCustomizeItem(matchedCoffee)}
                className="w-full sm:w-auto flex-1 bg-coffee-accent hover:bg-coffee-gold text-coffee-black font-semibold py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer font-serif tracking-wider"
              >
                Customize & Order Match • £{matchedCoffee?.price.toFixed(2)}
                <ArrowRight size={14} />
              </button>
              
              <button
                id="reset-quiz-btn"
                onClick={handleReset}
                className="w-full sm:w-auto bg-[#1C1513] hover:bg-neutral-800 border border-coffee-border text-coffee-cream py-3 px-5 rounded-xl transition-colors font-semibold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <RotateCcw size={14} />
                Retake Quiz
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
