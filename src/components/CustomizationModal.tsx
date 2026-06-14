/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, Coffee, Plus, Minus, Flame } from 'lucide-react';
import { CoffeeItem, CartItem } from '../types';

interface CustomizationModalProps {
  isOpen: boolean;
  onClose: () => void;
  coffee: CoffeeItem | null;
  onAddToCart: (item: CartItem) => void;
}

export default function CustomizationModal({
  isOpen,
  onClose,
  coffee,
  onAddToCart
}: CustomizationModalProps) {
  if (!coffee) return null;

  const [size, setSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [milk, setMilk] = useState<'none' | 'whole' | 'oat' | 'almond'>('whole');
  const [syrup, setSyrup] = useState<'none' | 'caramel' | 'vanilla' | 'hazelnut'>('none');
  const [extraShot, setExtraShot] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(1);

  // Reset states on opening new coffee item
  useEffect(() => {
    if (isOpen && coffee) {
      setSize('medium');
      // Non-coffee items don't have milk/syrups
      setMilk(coffee.category !== 'coffee' ? 'none' : 'whole');
      setSyrup('none');
      setExtraShot(false);
      setQuantity(1);
    }
  }, [isOpen, coffee]);

  // Calculate pricing
  const getSizePriceAddon = () => {
    if (coffee.category === 'specials' || coffee.category === 'breakfast' || coffee.category === 'lunch') return 0;
    if (size === 'small') return 0;
    if (size === 'medium') return 0.30;
    return 0.60;
  };

  const getMilkPriceAddon = () => {
    if (coffee.category === 'breakfast' || coffee.category === 'lunch' || coffee.category === 'specials') return 0;
    if (milk === 'oat') return 0.40;
    if (milk === 'almond') return 0.45;
    return 0;
  };

  const getSyrupPriceAddon = () => {
    if (syrup !== 'none') return 0.25;
    return 0;
  };

  const getExtraShotPriceAddon = () => {
    return extraShot ? 0.45 : 0;
  };

  const basePrice = coffee.price;
  const pricePerUnit = basePrice + getSizePriceAddon() + getMilkPriceAddon() + getSyrupPriceAddon() + getExtraShotPriceAddon();
  const totalPrice = pricePerUnit * quantity;

  const handleAdd = () => {
    const configId = `${coffee.id}-${size}-${milk}-${syrup}-${extraShot ? 'yes' : 'no'}`;
    const cartItem: CartItem = {
      id: configId,
      coffeeId: coffee.id,
      name: coffee.name,
      basePrice,
      pricePerUnit,
      quantity,
      size,
      milk,
      syrup,
      extraShot,
      image: coffee.image
    };
    onAddToCart(cartItem);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div id="custom-modal-container" className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            id="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-neutral-950/80 backdrop-blur-sm"
          />

          {/* Modal Card */}
          <motion.div
            id="customization-card"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="relative w-full max-w-lg bg-[#181210] border border-coffee-border rounded-2xl overflow-hidden max-h-[90vh] flex flex-col shadow-2xl"
          >
            {/* Header image background */}
            <div id="modal-header-section" className="relative h-44 flex-shrink-0 bg-gradient-to-t from-coffee-dark to-transparent">
              <img
                src={coffee.image}
                alt={coffee.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover filter brightness-75 contrast-110"
              />
              <button
                id="close-modal-btn"
                onClick={onClose}
                className="absolute top-4 right-4 bg-black/60 hover:bg-coffee-accent p-2 rounded-full border border-coffee-border text-white hover:text-coffee-black transition-all cursor-pointer"
              >
                <X size={18} />
              </button>
              
              {coffee.tag && (
                <div id="modal-coffee-tag" className="absolute top-4 left-4 bg-coffee-accent/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-coffee-black flex items-center gap-1">
                  <Flame size={12} />
                  {coffee.tag}
                </div>
              )}
              
              <div id="modal-header-meta" className="absolute bottom-4 left-4 right-4">
                <h3 className="font-display text-2xl font-bold text-coffee-white tracking-tight drop-shadow-md">
                  {coffee.name}
                </h3>
                <p className="font-sans text-xs text-coffee-cream mt-1 line-clamp-1 opacity-90 drop-shadow">
                  {coffee.description}
                </p>
              </div>
            </div>

            {/* Scrollable Customization Steps */}
            <div id="custom-modal-body" className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin">
              {coffee.category === 'coffee' ? (
                <>
                  {/* Size Option */}
                  <div id="size-custom-step" className="space-y-3">
                    <div className="flex justify-between items-baseline">
                      <span className="text-sm font-semibold text-coffee-cream uppercase tracking-wider font-display">
                        1. Select Cup Size
                      </span>
                      <span className="text-xs text-coffee-accent">Required</span>
                    </div>
                    <div id="size-options-grid" className="grid grid-cols-3 gap-2">
                      {(['small', 'medium', 'large'] as const).map((s) => {
                        const addon = s === 'small' ? 0 : s === 'medium' ? 0.30 : 0.60;
                        return (
                          <button
                            key={s}
                            id={`size-${s}-btn`}
                            onClick={() => setSize(s)}
                            className={`p-3 rounded-xl border flex flex-col items-center justify-center transition-all cursor-pointer relative ${
                              size === s
                                ? 'bg-coffee-accent/15 border-coffee-accent text-coffee-white'
                                : 'bg-[#1D1614] border-coffee-border hover:border-coffee-muted/40 text-coffee-muted'
                            }`}
                          >
                            <Coffee size={s === 'small' ? 16 : s === 'medium' ? 20 : 24} className={size === s ? 'text-coffee-accent' : ''} />
                            <span className="text-xs font-medium capitalize mt-1.5">{s}</span>
                            <span className="text-[10px] mt-0.5 opacity-80">{addon > 0 ? `+£${addon.toFixed(2)}` : 'Base'}</span>
                            {size === s && (
                              <div className="absolute top-1 right-1 bg-coffee-accent text-coffee-black rounded-full p-0.5">
                                <Check size={8} strokeWidth={3} />
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Milk Option */}
                  <div id="milk-custom-step" className="space-y-3">
                    <div className="flex justify-between items-baseline">
                      <span className="text-sm font-semibold text-coffee-cream uppercase tracking-wider font-display">
                        2. Choice of Milk
                      </span>
                      <span className="text-xs text-coffee-accent">Default: Whole</span>
                    </div>
                    <div id="milk-options-grid" className="grid grid-cols-4 gap-2">
                      {[
                        { id: 'whole', label: 'Whole', addon: 0 },
                        { id: 'none', label: 'None/Water', addon: 0 },
                        { id: 'oat', label: 'Oat', addon: 0.40 },
                        { id: 'almond', label: 'Almond', addon: 0.45 },
                      ].map((m) => (
                        <button
                          key={m.id}
                          id={`milk-${m.id}-btn`}
                          onClick={() => setMilk(m.id as any)}
                          className={`p-2.5 rounded-xl border flex flex-col items-center justify-center transition-all cursor-pointer relative ${
                            milk === m.id
                              ? 'bg-coffee-accent/15 border-coffee-accent text-coffee-white'
                              : 'bg-[#1D1614] border-coffee-border hover:border-coffee-muted/40 text-coffee-muted'
                          }`}
                        >
                          <span className="text-xs font-medium">{m.label}</span>
                          <span className="text-[10px] mt-1 opacity-85">{m.addon > 0 ? `+£${m.addon.toFixed(2)}` : 'Free'}</span>
                          {milk === m.id && (
                            <div className="absolute top-1 right-1 bg-coffee-accent text-coffee-black rounded-full p-0.5">
                              <Check size={8} strokeWidth={3} />
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Syrup Option */}
                  <div id="syrup-custom-step" className="space-y-3">
                    <div className="flex justify-between items-baseline">
                      <span className="text-sm font-semibold text-coffee-cream uppercase tracking-wider font-display">
                        3. Sweetener & Syrup Addon
                      </span>
                      <span className="text-xs text-coffee-muted">Optional</span>
                    </div>
                    <div id="syrup-options-grid" className="grid grid-cols-4 gap-2">
                      {[
                        { id: 'none', label: 'None', addon: 0 },
                        { id: 'caramel', label: 'Caramel', addon: 0.25 },
                        { id: 'vanilla', label: 'Vanilla', addon: 0.25 },
                        { id: 'hazelnut', label: 'Hazelnut', addon: 0.25 },
                      ].map((sy) => (
                        <button
                          key={sy.id}
                          id={`syrup-${sy.id}-btn`}
                          onClick={() => setSyrup(sy.id as any)}
                          className={`p-2.5 rounded-xl border flex flex-col items-center justify-center transition-all cursor-pointer relative ${
                            syrup === sy.id
                              ? 'bg-coffee-accent/15 border-coffee-accent text-coffee-white'
                              : 'bg-[#1D1614] border-coffee-border hover:border-coffee-muted/40 text-coffee-muted'
                          }`}
                        >
                          <span className="text-xs font-medium">{sy.label}</span>
                          <span className="text-[10px] mt-1 opacity-85">{sy.addon > 0 ? `+£${sy.addon.toFixed(2)}` : 'Free'}</span>
                          {syrup === sy.id && (
                            <div className="absolute top-1 right-1 bg-coffee-accent text-coffee-black rounded-full p-0.5">
                              <Check size={8} strokeWidth={3} />
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Extra Espresso Shot */}
                  <div id="extra-shot-custom-step" className="pt-2">
                    <button
                      id="toggle-extra-shot-btn"
                      onClick={() => setExtraShot(!extraShot)}
                      className={`w-full p-4 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                        extraShot
                          ? 'bg-coffee-accent/15 border-coffee-accent text-coffee-white font-medium'
                          : 'bg-[#1D1614] border-coffee-border text-coffee-muted hover:border-coffee-muted/40'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`p-1.5 rounded-lg ${extraShot ? 'bg-coffee-accent text-coffee-black' : 'bg-coffee-dark'}`}>
                          <Coffee size={14} />
                        </div>
                        <div className="text-left">
                          <p className="text-xs text-coffee-white font-medium">Add Extra Espresso Shot</p>
                          <p className="text-[10px] text-coffee-muted">Boost caffeine strength & body</p>
                        </div>
                      </div>
                      <span className="text-sm font-semibold text-coffee-accent">+£0.45</span>
                    </button>
                  </div>
                </>
              ) : (
                /* Food / Meal Special Details */
                <div id="bean-specific-details" className="space-y-4 pt-2">
                  <div className="bg-[#1D1614] border border-coffee-border p-4 rounded-xl space-y-3">
                    <h4 className="text-xs font-semibold text-coffee-accent uppercase tracking-wider font-display">
                      Dish Preparation Details
                    </h4>
                    <p className="text-xs text-coffee-cream leading-relaxed">
                      All Grand Cafe UK meals are prepared fresh to order using finest local ingredients inside Forest House Hotel. Clean, family-friendly, and served in generous portions.
                    </p>
                    <div className="grid grid-cols-2 gap-2 pt-1 text-[11px] text-coffee-muted">
                      <div className="flex items-center gap-1.5">
                        <Check size={12} className="text-coffee-accent" />
                        <span>Fresh Ingredients</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Check size={12} className="text-coffee-accent" />
                        <span>Generous Portion Size</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Check size={12} className="text-coffee-accent" />
                        <span>Available for Takeaway</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Check size={12} className="text-coffee-accent" />
                        <span>Dine-In Hot Plate</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Footer Section: Pricing and Actions */}
            <div id="modal-bottom-bar" className="p-6 bg-coffee-dark border-t border-coffee-border space-y-4 flex-shrink-0">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[11px] text-coffee-muted tracking-wide uppercase">Custom Total</p>
                  <p className="text-2xl font-bold text-coffee-gold font-serif">
                    £{totalPrice.toFixed(2)}
                  </p>
                </div>

                {/* Quantity Controls */}
                <div id="modal-qty-control" className="flex items-center bg-[#1D1614] border border-coffee-border rounded-xl px-2 py-1.5">
                  <button
                    id="dec-qty-modal"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="p-1 text-coffee-muted hover:text-coffee-accent disabled:opacity-40 transition-colors cursor-pointer"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="px-3.5 text-sm font-semibold text-coffee-white min-w-[20px] text-center">
                    {quantity}
                  </span>
                  <button
                    id="inc-qty-modal"
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-1 text-coffee-muted hover:text-coffee-accent transition-colors cursor-pointer"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              {/* Add to Cart button */}
              <button
                id="add-to-cart-action-btn"
                onClick={handleAdd}
                className="w-full bg-coffee-accent hover:bg-coffee-gold text-coffee-black font-semibold py-3.5 px-4 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer font-serif tracking-wider"
              >
                <Coffee size={18} />
                Add to Cart • £{totalPrice.toFixed(2)}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
