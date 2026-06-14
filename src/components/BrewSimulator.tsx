/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CupSoda, Trash2, Check, Sparkles } from 'lucide-react';
import { CartItem } from '../types';
import { CAPPUCCINO_CUP_PATH } from '../coffeeData';

interface BrewSimulatorProps {
  onAddCustomCartItem: (item: CartItem) => void;
}

type IngredientId = 'espresso' | 'milk' | 'caramel' | 'chocolate' | 'cream';

interface Ingredient {
  id: IngredientId;
  name: string;
  color: string;
  price: number;
  description: string;
  emoji: string;
}

const INGREDIENTS: Ingredient[] = [
  {
    id: 'espresso',
    name: 'Gourmet Espresso Stream',
    color: 'bg-[#3b2314]', // rich coffee brown
    price: 0.80,
    description: 'Double extraction roast of Arabica crema',
    emoji: '☕'
  },
  {
    id: 'milk',
    name: 'Organic Steamed Milk',
    color: 'bg-[#f4e6d4]', // organic off-white milk
    price: 0.55,
    description: 'Hot frothy textured classic milk',
    emoji: '🥛'
  },
  {
    id: 'caramel',
    name: 'Salted Caramel Drizzle',
    color: 'bg-[#d08c3f]', // sweet amber caramel
    price: 0.40,
    description: 'Silky golden organic caramel topping',
    emoji: '🍯'
  },
  {
    id: 'chocolate',
    name: 'Swiss Dark Fudge Chocolate',
    color: 'bg-[#22120a]', // dark cacao chocolate
    price: 0.40,
    description: 'Melted organic premium Dutch cacao fudge',
    emoji: '🍫'
  },
  {
    id: 'cream',
    name: 'Whipped Cream Foam',
    color: 'bg-[#fafafa]', // dense pure white peak
    price: 0.50,
    description: 'Airy, fluffy premium whipped peaks',
    emoji: '☁️'
  }
];

export default function BrewSimulator({ onAddCustomCartItem }: BrewSimulatorProps) {
  const [layers, setLayers] = useState<IngredientId[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);

  const calculateCustomPrice = () => {
    // Base cup structure price is 1.50
    const baseVessel = 1.50;
    const ingredientsPrice = layers.reduce((acc, layerId) => {
      const ing = INGREDIENTS.find(i => i.id === layerId);
      return acc + (ing ? ing.price : 0);
    }, 0);
    return baseVessel + ingredientsPrice;
  };

  const handleAddIngredient = (id: IngredientId) => {
    if (layers.length >= 6) return; // Limit cup height capacity to 6 layers
    setLayers([...layers, id]);
  };

  const handleRemoveLastLayer = () => {
    if (layers.length === 0) return;
    setLayers(layers.slice(0, -1));
  };

  const handleClear = () => {
    setLayers([]);
  };

  const handleAddCustomToCart = () => {
    if (layers.length === 0) return;

    const pricePerUnit = calculateCustomPrice();
    const configId = `custom-lab-${layers.join('-')}`;

    const customCartItem: CartItem = {
      id: configId,
      coffeeId: 'custom-lab-brew',
      name: `Custom Menu Creator (${layers.length} Layers)`,
      basePrice: 1.50,
      pricePerUnit,
      quantity: 1,
      size: 'medium',
      milk: 'whole',
      syrup: 'none',
      extraShot: false,
      image: CAPPUCCINO_CUP_PATH
    };

    onAddCustomCartItem(customCartItem);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setLayers([]);
    }, 2500);
  };

  return (
    <div id="brew-simulator-card" className="bg-[#140F0D] border border-coffee-border rounded-3xl p-6 md:p-8 shadow-xl relative overflow-hidden">
      {/* Absolute backgrounds */}
      <div className="absolute top-0 left-0 w-48 h-48 bg-coffee-accent/5 rounded-full filter blur-2xl pointer-events-none" />
      
      {/* Header */}
      <div className="text-center max-w-xl mx-auto space-y-2 mb-8 animate-fade-in">
        <span className="text-[10px] uppercase font-bold tracking-widest text-[#E5B288] bg-[#E5B288]/10 px-3 py-1 rounded-full border border-[#E5B288]/20">
          Recipe Crafting Lab
        </span>
        <h3 className="font-display text-2xl md:text-3xl font-bold text-coffee-white tracking-tight">
          Visual Beverage Builder
        </h3>
        <p className="text-xs text-coffee-muted font-sans max-w-sm mx-auto">
          Tap gourmet ingredients below to pour custom layers into your hot drink cup!
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-center">
        {/* Left Side: Beaker cup rendering */}
        <div className="col-span-12 lg:col-span-5 flex flex-col items-center justify-center bg-coffee-dark border border-coffee-border/80 rounded-2xl p-6 relative min-h-[360px]">
          {/* Virtual Beaker Glass */}
          <div className="relative w-44 h-64 border-x-4 border-b-4 border-white/25 rounded-b-3xl flex flex-col justify-end overflow-hidden shadow-2xl bg-black/40">
            {/* Liquid stacked layers inside beaker */}
            <AnimatePresence>
              {layers.length === 0 ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                  <CupSoda size={32} className="text-coffee-muted animate-pulse mb-2" />
                  <p className="text-[10px] text-coffee-muted font-mono tracking-wider uppercase">Cup is Empty</p>
                  <p className="text-[9px] text-coffee-muted opacity-80 mt-1">Select ingredients below to start mixing!</p>
                </div>
              ) : (
                layers.map((layerId, idx) => {
                  const ing = INGREDIENTS.find(i => i.id === layerId);
                  if (!ing) return null;
                  
                  return (
                    <motion.div
                      key={`${layerId}-${idx}`}
                      initial={{ height: '0%', opacity: 0 }}
                      animate={{ height: `${100 / Math.max(layers.length, 3)}%`, opacity: 1 }}
                      exit={{ height: '0%', opacity: 0 }}
                      transition={{ duration: 0.45, ease: 'easeOut' }}
                      className={`w-full ${ing.color} relative border-t border-white/5 flex items-center justify-center font-mono text-[9px] font-semibold tracking-wider text-black/60 shadow-inner group`}
                    >
                      <span className="truncate px-2 group-hover:scale-105 transition-transform text-center font-bold">
                        {ing.name.split(' ')[0]} {ing.emoji}
                      </span>
                    </motion.div>
                  );
                })
              )}
            </AnimatePresence>

            {/* Scale markings on beaker */}
            <div className="absolute left-2 inset-y-0 flex flex-col justify-between py-6 text-[8px] font-mono text-white/20 select-none">
              <span>— MAX 300ml</span>
              <span>— 250ml</span>
              <span>— 200ml</span>
              <span>— 150ml</span>
              <span>— 100ml</span>
              <span>— MIN 50ml</span>
            </div>
          </div>

          {/* Controls below cup */}
          <div className="flex gap-2.5 mt-5">
            <button
              id="sim-undo-btn"
              onClick={handleRemoveLastLayer}
              disabled={layers.length === 0}
              className="px-3 py-1.5 rounded-lg border border-coffee-border hover:border-red-500/50 hover:bg-red-950/10 text-coffee-cream disabled:opacity-40 transition-colors text-xs flex items-center gap-1 cursor-pointer"
            >
              <Trash2 size={12} />
              Undo Layer
            </button>
            <button
              id="sim-clear-btn"
              onClick={handleClear}
              disabled={layers.length === 0}
              className="px-3 py-1.5 rounded-lg border border-coffee-border hover:border-coffee-accent hover:bg-coffee-accent/15 text-coffee-cream disabled:opacity-40 transition-colors text-xs cursor-pointer"
            >
              Flush Cup
            </button>
          </div>
        </div>

        {/* Right Side: Ingredients Selection List */}
        <div className="col-span-12 lg:col-span-7 space-y-5">
          <div className="space-y-2.5">
            <h4 className="text-xs font-semibold text-coffee-accent uppercase tracking-wider font-display">
              Select Layers (Up to 6)
            </h4>
            <div className="grid sm:grid-cols-2 gap-2.5">
              {INGREDIENTS.map((ing) => {
                const count = layers.filter(l => l === ing.id).length;
                return (
                  <button
                    key={ing.id}
                    id={`sim-add-${ing.id}`}
                    onClick={() => handleAddIngredient(ing.id)}
                    disabled={layers.length >= 6}
                    className={`p-3 rounded-xl border border-coffee-border text-left hover:border-coffee-accent hover:bg-coffee-dark transition-all flex items-center justify-between group cursor-pointer ${
                      layers.length >= 6 ? 'opacity-40 cursor-default' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-xl">{ing.emoji}</div>
                      <div>
                        <p className="text-xs font-semibold text-coffee-white group-hover:text-coffee-accent transition-colors">
                          {ing.name}
                        </p>
                        <p className="text-[10px] text-coffee-muted">{ing.description}</p>
                      </div>
                    </div>
                    
                    <div className="text-right flex items-center gap-2 flex-shrink-0">
                      <span className="text-xs font-bold text-coffee-gold bg-[#1D1614] px-2 py-1 rounded">
                        +£{ing.price.toFixed(2)}
                      </span>
                      {count > 0 && (
                        <span className="text-[10px] font-bold text-coffee-black bg-coffee-accent px-1.5 py-0.5 rounded-full">
                          {count}x
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Pricing & Add to Cart section */}
          <div className="p-4 bg-coffee-dark border border-coffee-border rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-[10px] text-coffee-muted uppercase tracking-wider font-semibold">Cup base price + ingredients</p>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <span className="text-2xl font-serif font-bold text-coffee-white font-mono">£{calculateCustomPrice().toFixed(2)}</span>
                <span className="text-[10px] text-green-400 font-mono">Includes £1.50 paper cup</span>
              </div>
            </div>

            <button
              id="sim-dispatch-btn"
              onClick={handleAddCustomToCart}
              disabled={layers.length === 0 || isSuccess}
              className={`w-full sm:w-auto px-6 py-3.5 rounded-xl font-serif uppercase tracking-widest text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                layers.length === 0
                  ? 'bg-[#1D1614] border border-coffee-border text-coffee-muted cursor-not-allowed'
                  : isSuccess
                  ? 'bg-green-600 text-white'
                  : 'bg-coffee-accent hover:bg-coffee-gold text-coffee-black shadow-lg animate-pulse'
              }`}
            >
              {isSuccess ? (
                <>
                  <Check size={14} strokeWidth={3} />
                  Custom Blend Added!
                </>
              ) : (
                <>
                  <Sparkles size={14} className="animate-spin" />
                  Order Custom Cup
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
