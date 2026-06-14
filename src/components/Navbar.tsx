/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Coffee, Menu, X, Sparkles } from 'lucide-react';
import { CartItem } from '../types';

interface NavbarProps {
  cartItems: CartItem[];
  onOpenCart: () => void;
  onScrollToSection: (sectionId: string) => void;
}

export default function Navbar({
  cartItems,
  onOpenCart,
  onScrollToSection
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const totalQty = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Monitor scroll height and direction
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Scrolled past 15px?
      if (currentScrollY > 15) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Hide/Show navbar on scroll direction
      if (currentScrollY > 80) {
        if (currentScrollY > lastScrollY) {
          // Scrolling down - hide navbar
          setIsVisible(false);
        } else {
          // Scrolling up - show navbar
          setIsVisible(true);
        }
      } else {
        // At the very top - always show
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleMobileNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    onScrollToSection(sectionId);
  };

  const navLinks = [
    { id: 'about', label: 'Our Story' },
    { id: 'menu', label: 'Featured Menu' },
    { id: 'why-choose-us', label: 'Why Us' },
    { id: 'quiz', label: 'Flavour Matcher', hasIcon: true },
    { id: 'contact', label: 'Visit Us' },
  ];

  return (
    <header
      id="app-header"
      className={`sticky top-0 z-40 w-full transition-all duration-300 ease-in-out ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      } bg-transparent ${
        isScrolled ? 'py-2.5' : 'py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 md:h-16">
          
          {/* Logo Brand - Left side, transparent bg, standard hover glow */}
          <motion.div
            id="brand-logo"
            onClick={() => onScrollToSection('hero')}
            className="flex items-center gap-2.5 cursor-pointer group"
            whileHover={{ scale: 1.015 }}
            transition={{ duration: 0.2 }}
          >
            <div className="p-2 sm:p-2.5 rounded-2xl bg-coffee-card/60 border border-coffee-border/60 text-coffee-accent group-hover:bg-coffee-accent group-hover:text-coffee-black group-hover:border-coffee-accent transition-all duration-300 shadow-sm shadow-black/30">
              <Coffee size={18} className="group-hover:rotate-12 transition-transform duration-300" />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-sm sm:text-base lg:text-lg font-extrabold text-coffee-white tracking-widest uppercase block transition-all duration-300 group-hover:text-coffee-accent">
                GRAND <span className="text-coffee-accent group-hover:text-coffee-white transition-all">CAFE UK</span>
              </span>
              <span className="text-[7.5px] sm:text-[8px] text-coffee-muted font-mono tracking-widest block uppercase mt-0.5">
                EST. 1998
              </span>
            </div>
          </motion.div>

          {/* Centered Desktop Nav - Styled as a floating Solid Capsule around buttons */}
          <nav
            id="desktop-nav"
            className="hidden md:flex items-center bg-[#15100E] border border-coffee-border/50 px-5 py-2 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.5)] text-xs font-semibold tracking-wider text-coffee-cream uppercase hover:border-coffee-accent/40 hover:shadow-[0_8px_32px_rgba(200,157,124,0.06)] transition-all duration-300 gap-1.5"
          >
            {navLinks.map((link) => (
              <motion.button
                key={link.id}
                onClick={() => onScrollToSection(link.id)}
                whileHover={{ y: -1, scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="hover:text-coffee-accent hover:bg-coffee-accent/5 px-3 py-1.5 rounded-full cursor-pointer transition-all duration-250 flex items-center gap-1 relative group"
              >
                {link.hasIcon && (
                  <Sparkles size={11} className="text-coffee-gold animate-pulse" />
                )}
                <span>{link.label}</span>
                
                {/* Micro-indicator bottom dot */}
                <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-coffee-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.button>
            ))}
          </nav>

          {/* Right Controls - Independent micro-glass actions */}
          <div id="nav-right" className="flex items-center gap-2.5">
            
            {/* My Basket solid action pill */}
            <motion.button
              id="header-cart-btn"
              onClick={onOpenCart}
              whileHover={{ y: -1, scale: 1.025 }}
              whileTap={{ scale: 0.96 }}
              className="relative p-2.5 px-4 rounded-full bg-[#15100E] border border-coffee-border/60 hover:border-coffee-accent hover:bg-coffee-accent/10 text-coffee-cream hover:text-coffee-white transition-all cursor-pointer flex items-center gap-2 group shadow-[0_8px_24px_rgba(0,0,0,0.4)]"
            >
              <ShoppingBag size={15} className="text-coffee-accent group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline text-xs font-bold tracking-wider uppercase">My Basket</span>
              
              {/* Quant count badge */}
              {totalQty > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-5 h-5 bg-coffee-accent hover:bg-coffee-gold text-coffee-black font-extrabold rounded-full flex items-center justify-center text-[9.5px] border border-coffee-black shadow-md shadow-black/80 font-mono"
                >
                  {totalQty}
                </motion.span>
              )}
            </motion.button>

            {/* Responsive menu toggle strictly for mobile & tablet (screens under lg size or md size) */}
            <motion.button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="md:hidden p-2.5 rounded-full bg-[#15100E] border border-coffee-border/60 text-coffee-cream hover:text-coffee-accent transition-all cursor-pointer flex items-center justify-center shadow-[0_8px_24px_rgba(0,0,0,0.4)]"
            >
              {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
            </motion.button>
          </div>

        </div>
      </div>

      {/* Mobile/Tablet Dropdown Menu with solid crisp background */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="absolute top-full left-4 right-4 mt-2 p-4 bg-[#140F0D] border border-coffee-border/80 rounded-2xl shadow-2xl md:hidden flex flex-col gap-1.5 z-50 text-left"
          >
            <div className="text-[10px] uppercase tracking-wider text-coffee-muted font-mono font-bold px-3 pb-2 border-b border-coffee-border/30 mb-2">
              Explore Grand Cafe UK
            </div>
            
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleMobileNavClick(link.id)}
                className="w-full text-left py-2 px-3 text-xs font-semibold tracking-wide text-coffee-cream hover:text-coffee-white hover:bg-coffee-accent/10 rounded-xl transition-all flex items-center gap-2 cursor-pointer"
              >
                {link.hasIcon ? (
                  <Sparkles size={12} className="text-coffee-accent" />
                ) : (
                  <div className="w-1.5 h-1.5 bg-coffee-accent/50 rounded-full" />
                )}
                <span>{link.label}</span>
              </button>
            ))}

            {/* Quick action in mobile menu */}
            <div className="mt-2 pt-2 border-t border-coffee-border/30 flex items-center justify-between text-[11px] text-coffee-accent">
              <span className="font-mono">Open Daily • Est. London 1998</span>
              <span className="bg-coffee-accent/20 text-coffee-accent px-1.5 py-0.5 rounded text-[8.5px] uppercase font-bold tracking-wider">Premium Experience</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
