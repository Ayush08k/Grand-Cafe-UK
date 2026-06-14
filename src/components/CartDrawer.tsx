/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, ShoppingBag, Coffee, ArrowRight, Minus, Plus } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onRemoveItem: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onCheckout: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onRemoveItem,
  onUpdateQuantity,
  onCheckout
}: CartDrawerProps) {
  const subtotal = cartItems.reduce((acc, item) => acc + (item.pricePerUnit * item.quantity), 0);
  const convenienceFee = subtotal === 0 ? 0 : 0.95;
  const total = subtotal + convenienceFee;

  const getCustomizedDescription = (item: CartItem) => {
    if (item.basePrice === item.pricePerUnit) return 'Standard size';
    const parts = [];
    if (item.size) parts.push(`${item.size} cup`);
    if (item.milk && item.milk !== 'none' && item.milk !== 'whole') parts.push(`${item.milk} milk`);
    if (item.syrup && item.syrup !== 'none') parts.push(`${item.syrup} syrup`);
    if (item.extraShot) parts.push('+Extra shot');
    return parts.join(' | ') || 'Customized Classic';
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div id="cart-drawer-overlay" className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            id="cart-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Drawer container holds panel */}
          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              id="cart-panel"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', ease: 'easeOut', duration: 0.35 }}
              className="w-screen max-w-md bg-[#120D0B] border-l border-coffee-border flex flex-col shadow-2xl relative"
            >
              {/* Header */}
              <div id="cart-header" className="px-6 py-5 border-b border-coffee-border flex justify-between items-center bg-coffee-dark bg-opacity-70 backdrop-blur">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-coffee-accent/15 text-coffee-accent">
                    <ShoppingBag size={18} />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-coffee-white">Your Order</h3>
                    <p className="text-[10px] text-coffee-muted uppercase tracking-wider font-semibold">
                      {cartItems.length} custom blend{cartItems.length !== 1 && 's'}
                    </p>
                  </div>
                </div>
                <button
                  id="close-cart-btn"
                  onClick={onClose}
                  className="p-2 rounded-lg bg-[#1B1310] hover:bg-coffee-accent hover:text-coffee-black border border-coffee-border text-coffee-cream transition-all cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Cart List */}
              <div id="cart-list-container" className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin">
                {cartItems.length === 0 ? (
                  <div id="empty-cart-state" className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                    <div className="w-16 h-16 rounded-full bg-[#1B1310] border border-coffee-border flex items-center justify-center text-coffee-accent animate-pulse">
                      <Coffee size={28} />
                    </div>
                    <div className="max-w-xs space-y-1">
                      <h4 className="font-display text-base font-bold text-coffee-cream">Empty Cup</h4>
                      <p className="text-xs text-coffee-muted font-sans leading-relaxed">
                        Your basket is currently empty. Explore our signature picks and build your dream espresso!
                      </p>
                    </div>
                    <button
                      id="cart-back-to-shop"
                      onClick={onClose}
                      className="text-xs font-semibold uppercase tracking-wider text-coffee-accent hover:text-coffee-gold flex items-center gap-1 mt-2 underline"
                    >
                      Browse Menu <ArrowRight size={12} />
                    </button>
                  </div>
                ) : (
                  cartItems.map((item) => (
                    <motion.div
                      key={item.id}
                      id={`cart-item-${item.id}`}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="bg-[#181210] border border-coffee-border rounded-xl p-3 flex gap-3 relative group"
                    >
                      {/* Image */}
                      <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border border-coffee-border bg-coffee-dark">
                        <img
                          src={item.image}
                          alt={item.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Info & Quantity controls */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div className="space-y-0.5">
                          <div className="flex justify-between">
                            <span className="text-xs font-bold text-coffee-white block tracking-tight line-clamp-1">
                              {item.name}
                            </span>
                            <span className="text-xs font-bold text-coffee-gold ml-2 font-mono">
                              £{(item.pricePerUnit * item.quantity).toFixed(2)}
                            </span>
                          </div>
                          <span className="text-[10px] text-coffee-muted font-sans capitalize block leading-relaxed">
                            {getCustomizedDescription(item)}
                          </span>
                        </div>

                        {/* Controls bar */}
                        <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-coffee-border/50">
                          {/* Unit price indicator */}
                          <p className="text-[10px] text-coffee-muted">£{item.pricePerUnit.toFixed(2)} / unit</p>

                          <div className="flex items-center gap-3">
                            {/* Quantity buttons */}
                            <div className="flex items-center bg-coffee-dark border border-coffee-border rounded-lg px-1.5 py-0.5 scale-90 origin-right">
                              <button
                                id={`dec-qty-${item.id}`}
                                onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                disabled={item.quantity <= 1}
                                className="p-0.5 text-coffee-muted hover:text-coffee-accent disabled:opacity-40 transition-colors cursor-pointer"
                              >
                                <Minus size={12} />
                              </button>
                              <span className="px-2 text-xs font-semibold text-coffee-white min-w-[14px] text-center">
                                {item.quantity}
                              </span>
                              <button
                                id={`inc-qty-${item.id}`}
                                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                className="p-0.5 text-coffee-muted hover:text-coffee-accent transition-colors cursor-pointer"
                              >
                                <Plus size={12} />
                              </button>
                            </div>

                            {/* Trash button */}
                            <button
                              id={`remove-item-${item.id}`}
                              onClick={() => onRemoveItem(item.id)}
                              className="p-1 cursor-pointer text-coffee-muted hover:text-red-400 hover:bg-neutral-900 rounded-md transition-colors"
                              title="Delete Item"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              {/* Order pricing summary footer block */}
              {cartItems.length > 0 && (
                <div id="cart-footer" className="p-6 bg-[#0E0A08] border-t border-coffee-border space-y-4">
                  <div className="space-y-2 text-xs text-coffee-cream">
                    <div className="flex justify-between">
                      <span className="text-coffee-muted">Item Subtotal</span>
                      <span className="font-semibold font-mono">£{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b border-coffee-border/50">
                      <span className="text-coffee-muted">Packing & Service Fee</span>
                      <span className="font-mono">£{convenienceFee.toFixed(2)}</span>
                    </div>
                    
                    {/* Dine-In and Takeaway Notice Badge */}
                    <div className="py-2 px-3 rounded-lg bg-coffee-accent/10 border border-coffee-accent/20 flex items-center justify-between text-[10px] text-coffee-accent">
                      <span className="font-medium tracking-wide uppercase font-mono">Service: Dine-In or Takeaway Only</span>
                      <span className="font-bold bg-coffee-accent text-coffee-black px-1.5 py-0.5 rounded text-[8.5px]">Active</span>
                    </div>

                    <div className="flex justify-between items-baseline pt-1">
                      <span className="text-sm font-bold text-coffee-white">Total Amount</span>
                      <span className="text-xl font-bold text-coffee-gold font-serif">£{total.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Checkout CTA banner */}
                  <button
                    id="cart-checkout-btn"
                    onClick={onCheckout}
                    className="w-full bg-coffee-accent hover:bg-coffee-gold text-coffee-black font-semibold py-3.5 px-4 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer font-serif uppercase tracking-wider text-sm"
                  >
                    Proceed to Checkout
                    <ArrowRight size={16} />
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
