/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, Coffee, MapPin, CreditCard, ChevronRight, Sparkles, Clock, Compass, Utensils } from 'lucide-react';
import { CartItem, Order } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onOrderSuccess: () => void;
}

type Step = 'form' | 'brewing' | 'success';

export default function CheckoutModal({
  isOpen,
  onClose,
  cartItems,
  onOrderSuccess
}: CheckoutModalProps) {
  const [step, setStep] = useState<Step>('form');
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [type, setType] = useState<'dinein' | 'takeaway'>('dinein');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'card'>('cod');

  // Brewing animation states
  const [brewStep, setBrewStep] = useState(0);
  const brewLogs = [
    'Sourcing and weighing premium single-origin Arabica beans...',
    'Grinding beans to exact 400-micron espresso grade...',
    'Extracting double-espresso stream with golden crema...',
    'Perfecting steamed velvety microfoam layer...',
    'Adding chosen syrups, plating neatly for service...',
    'Handing over order to your table or pickup counter!'
  ];

  // Calculate pricing
  const subtotal = cartItems.reduce((acc, item) => acc + (item.pricePerUnit * item.quantity), 0);
  const convenienceFee = subtotal === 0 ? 0 : 0.95;
  const total = subtotal + convenienceFee;

  // Simulate progress
  useEffect(() => {
    let interval: any;
    if (step === 'brewing') {
      interval = setInterval(() => {
        setBrewStep((prev) => {
          if (prev >= brewLogs.length - 1) {
            clearInterval(interval);
            setTimeout(() => {
              setStep('success');
            }, 1000);
            return prev;
          }
          return prev + 1;
        });
      }, 1400);
    }
    return () => clearInterval(interval);
  }, [step]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !phone || !email) {
      return;
    }
    setStep('brewing');
  };

  const handleFinish = () => {
    onOrderSuccess();
    setStep('form');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div id="checkout-modal-container" className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            id="checkout-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={step !== 'brewing' ? onClose : undefined}
            className="absolute inset-0 bg-neutral-950/85 backdrop-blur-sm"
          />

          {/* Checkout Card */}
          <motion.div
            id="checkout-card"
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            className="relative w-full max-w-lg bg-[#140F0D] border border-coffee-border rounded-2xl overflow-hidden max-h-[92vh] flex flex-col shadow-2xl z-10"
          >
            {/* Header */}
            <div id="checkout-header" className="px-6 py-5 border-b border-coffee-border flex justify-between items-center bg-coffee-dark bg-opacity-80">
              <div className="flex items-center gap-2">
                <Coffee className="text-coffee-accent animate-bounce" size={20} />
                <h3 className="font-display text-lg font-bold text-coffee-white">
                  {step === 'form' && 'Finalize Your Order'}
                  {step === 'brewing' && 'Brew Lab Preparing'}
                  {step === 'success' && 'Order Dispatched'}
                </h3>
              </div>
              {step !== 'brewing' && (
                <button
                  id="close-checkout-btn"
                  onClick={onClose}
                  className="p-1 px-2 text-xs rounded-md bg-[#1B1310] hover:bg-coffee-accent text-coffee-cream hover:text-coffee-black transition-colors min-h-[30px] flex items-center justify-center cursor-pointer"
                >
                  <X size={15} />
                </button>
              )}
            </div>

            {/* Steps Rendering */}
            <div className="flex-1 overflow-y-auto p-6 scrollbar-thin">
              {step === 'form' && (
                <form id="checkout-form" onSubmit={handleSubmit} className="space-y-5">
                  <div className="bg-[#1C1513] border border-coffee-border rounded-xl p-3 flex justify-between text-xs text-coffee-white">
                    <span className="text-coffee-muted">Total Cart Items ({cartItems.length}):</span>
                    <span className="font-bold text-coffee-gold font-mono">£{total.toFixed(2)}</span>
                  </div>

                  {/* Contact details */}
                  <div className="space-y-3.5">
                    <h4 className="text-[10px] font-bold uppercase tracking-wider text-coffee-accent">
                      Contact Information
                    </h4>
                    
                    <div className="space-y-2">
                      <label className="block text-xs text-coffee-cream font-medium">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="e.g. Kabir Dev"
                        className="w-full bg-[#1A1210] border border-coffee-border rounded-xl px-4 py-2.5 text-sm text-coffee-white placeholder:text-coffee-muted/50 focus:outline-none focus:border-coffee-accent transition-colors"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <label className="block text-xs text-coffee-cream font-medium">Mobile Call *</label>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="e.g. +44 20 7946 0958"
                          className="w-full bg-[#1A1210] border border-coffee-border rounded-xl px-4 py-2.5 text-sm text-coffee-white placeholder:text-coffee-muted/50 focus:outline-none focus:border-coffee-accent transition-colors"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-xs text-coffee-cream font-medium">Email *</label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="e.g. name@coffee.com"
                          className="w-full bg-[#1A1210] border border-coffee-border rounded-xl px-4 py-2.5 text-sm text-coffee-white placeholder:text-coffee-muted/50 focus:outline-none focus:border-coffee-accent transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Service preference: Dine-In vs Takeaway */}
                  <div className="space-y-3 pt-2">
                    <h4 className="text-[10px] font-bold uppercase tracking-wider text-coffee-accent">
                      Service preference
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setType('dinein')}
                        className={`p-3 rounded-xl border flex items-center justify-center gap-2 transition-all cursor-pointer ${
                          type === 'dinein'
                            ? 'bg-coffee-accent/15 border-coffee-accent text-coffee-white'
                            : 'bg-[#1A1210] border-coffee-border text-coffee-muted'
                        }`}
                      >
                        <Utensils size={16} />
                        <span className="text-xs font-semibold">Dine-In</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setType('takeaway')}
                        className={`p-3 rounded-xl border flex items-center justify-center gap-2 transition-all cursor-pointer ${
                          type === 'takeaway'
                            ? 'bg-coffee-accent/15 border-coffee-accent text-coffee-white'
                            : 'bg-[#1A1210] border-coffee-border text-coffee-muted'
                        }`}
                      >
                        <Coffee size={16} />
                        <span className="text-xs font-semibold">Takeaway / Pick-up</span>
                      </button>
                    </div>

                    {type === 'dinein' && (
                      <div className="space-y-2 mt-2">
                        <label className="block text-xs text-coffee-cream font-medium">Table or Hotel Room Number (Optional)</label>
                        <input
                          type="text"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          placeholder="e.g. Table 4 or Room 204"
                          className="w-full bg-[#1A1210] border border-coffee-border rounded-xl px-4 py-2.5 text-sm text-coffee-white placeholder:text-coffee-muted/50 focus:outline-none focus:border-coffee-accent transition-colors"
                        />
                      </div>
                    )}
                  </div>

                  {/* Payment Method */}
                  <div className="space-y-3 pt-2">
                    <h4 className="text-[10px] font-bold uppercase tracking-wider text-coffee-accent">
                      Payment Method
                    </h4>
                    <div className="bg-[#1C1513] border border-coffee-accent/30 rounded-xl p-4 flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-coffee-accent/10 text-coffee-accent">
                        <Check size={16} className="text-coffee-accent" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-coffee-white">Pay at Counter</p>
                        <p className="text-[11px] text-coffee-muted mt-0.5 leading-relaxed">
                          Please settle payment at the counter when collecting your order or charge directly to your hotel room registry.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3">
                    <button
                      type="submit"
                      className="w-full bg-coffee-accent hover:bg-coffee-gold text-coffee-black font-semibold py-3.5 px-4 rounded-xl transition-all shadow-lg flex items-center justify-center gap-1.5 cursor-pointer font-serif uppercase tracking-wider text-xs md:text-sm"
                    >
                      Place Order • £{total.toFixed(2)}
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </form>
              )}

              {step === 'brewing' && (
                <div id="brewing-terminal-step" className="h-full py-10 flex flex-col items-center justify-center text-center space-y-8">
                  {/* Rotating Glass brewing widget */}
                  <div className="relative w-28 h-28 flex items-center justify-center">
                    <div className="absolute inset-0 border-4 border-dashed border-coffee-accent/30 rounded-full animate-spin [animation-duration:12s]" />
                    <div className="absolute inset-2 border-2 border-coffee-accent/10 rounded-full" />
                    
                    {/* Coffee cup */}
                    <div className="relative z-10 w-16 h-12 bg-gradient-to-br from-coffee-accent/20 to-[#32231C] border-2 border-coffee-accent/80 rounded-b-2xl flex items-end justify-center overflow-hidden">
                      {/* Fluid filling animation */}
                      <motion.div
                        initial={{ height: '0%' }}
                        animate={{ height: `${(brewStep + 1) * 16.6}%` }}
                        transition={{ duration: 1.2, ease: 'easeInOut' }}
                        className="w-full bg-coffee-accent/90"
                      />
                      {/* Handle */}
                      <div className="absolute right-[-10px] top-[10px] w-4 h-6 border-2 border-coffee-accent/80 rounded-r-xl" />
                    </div>

                    {/* Rising Steam bubbles */}
                    <div className="absolute top-2 w-full flex justify-center gap-1.5 h-6 overflow-hidden">
                      <div className="w-1.5 h-3 bg-coffee-accent/40 rounded-full animate-pulse [animation-duration:1s]" />
                      <div className="w-1 h-2 bg-coffee-accent/30 rounded-full animate-pulse [animation-duration:1.4s]" />
                      <div className="w-1.5 h-4 bg-coffee-accent/50 rounded-full animate-pulse [animation-duration:0.8s]" />
                    </div>
                  </div>

                  <div className="max-w-xs space-y-2">
                    <h4 className="font-display text-base font-bold text-coffee-cream uppercase tracking-wide">
                      Barista Handcrafting
                    </h4>
                    <p className="text-xs text-coffee-accent font-mono h-12 flex items-center justify-center leading-relaxed">
                      {brewLogs[brewStep]}
                    </p>
                  </div>

                  {/* Steps tracker */}
                  <div className="w-full max-w-xs bg-[#1C1513] border border-coffee-border rounded-xl p-4 space-y-2.5 text-left">
                    {brewLogs.slice(0, 5).map((log, i) => (
                      <div key={i} className="flex items-center gap-2.5 text-xs">
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 text-[10px] ${
                          brewStep > i
                            ? 'bg-green-500 text-white font-bold'
                            : brewStep === i
                            ? 'bg-coffee-accent text-coffee-black animate-ping'
                            : 'bg-coffee-dark border border-coffee-border text-coffee-muted'
                        }`}>
                          {brewStep > i ? '✓' : i + 1}
                        </div>
                        <span className={`${brewStep === i ? 'text-coffee-white font-medium' : brewStep > i ? 'text-coffee-muted line-through opacity-60' : 'text-coffee-muted'}`}>
                          {i === 0 && 'Prepping Beans'}
                          {i === 1 && 'Precision Grinding'}
                          {i === 2 && 'Extraction Stream'}
                          {i === 3 && 'Laying Dairy/Alternative Foam'}
                          {i === 4 && 'Drizzling & Sealing'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {step === 'success' && (
                <div id="success-tracker-step" className="h-full py-6 flex flex-col items-center justify-center text-center space-y-6">
                  {/* Circle indicator */}
                  <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500 text-green-500 flex items-center justify-center">
                    <Check size={32} strokeWidth={2.5} />
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-display text-xl font-bold text-coffee-white">
                      Deliciousness on the Way!
                    </h4>
                    <p className="text-xs text-coffee-muted max-w-sm font-sans mx-auto px-4">
                      Thank you for choosing Grand Cafe UK! Your order is currently being prepared fresh in our kitchen located inside Forest House Hotel.
                    </p>
                  </div>

                  {/* Preparation status card */}
                  <div className="w-full bg-[#1C1513] border border-coffee-border rounded-2xl p-4 text-left space-y-4">
                    {/* Summary metadata */}
                    <div className="flex justify-between items-center pb-3 border-b border-coffee-border/60">
                      <div>
                        <p className="text-[10px] text-coffee-muted uppercase font-semibold">Service Type</p>
                        <p className="text-sm font-bold text-coffee-white flex items-center gap-1.5 mt-0.5">
                          <Coffee size={14} className="text-coffee-accent" />
                          {type === 'dinein' ? 'Dine-In Live Serve' : 'Takeaway Counter'}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] text-coffee-muted uppercase font-semibold">Order ID</p>
                        <p className="text-sm font-mono font-bold text-coffee-gold mt-0.5">GC-9411-LN</p>
                      </div>
                    </div>

                    {/* Step updates */}
                    <div className="flex gap-3">
                      <div className="p-2 rounded-xl bg-coffee-accent/15 text-coffee-accent h-10 w-10 flex items-center justify-center flex-shrink-0">
                        <Compass className="animate-spin duration-1000" size={18} />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-coffee-cream">Preparation Status</p>
                        <p className="text-[11px] text-coffee-muted mt-0.5">
                          {type === 'dinein' 
                            ? 'Our active crew is prepping your fresh coffee and plates. A server will bring them straight to your table!' 
                            : 'Our active crew is packaging your items. We will notify you when it is ready to collect at the counter!'}
                        </p>
                      </div>
                    </div>

                    {/* Coffee tracker bar */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-[11px] font-semibold text-coffee-cream">
                        <span>Grinding</span>
                        <span className="text-coffee-accent font-bold">Brewing</span>
                        <span className="opacity-40">Ready!</span>
                      </div>
                      <div className="w-full h-1.5 bg-[#0F0A08] rounded-full overflow-hidden flex">
                        <div className="w-1/3 bg-green-500 rounded-l-full" />
                        <motion.div
                          animate={{ width: ['0%', '50%', '0%'] }}
                          transition={{ repeat: Infinity, duration: 2 }}
                          className="w-1/3 bg-coffee-accent"
                        />
                        <div className="flex-1 bg-neutral-900" />
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 w-full max-w-sm">
                    <button
                      id="finish-order-btn"
                      onClick={handleFinish}
                      className="w-full bg-[#1C1513] hover:bg-coffee-accent border border-coffee-border hover:border-coffee-accent text-coffee-cream hover:text-coffee-black font-semibold py-3 px-4 rounded-xl transition-all font-serif uppercase tracking-wider text-xs cursor-pointer"
                    >
                      Done & Close Tracker
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
