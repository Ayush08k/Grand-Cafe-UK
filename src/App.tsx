/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShoppingBag,
  Heart,
  ChevronRight,
  ArrowRight,
  Star,
  Check,
  Coffee,
  Sparkles,
  MapPin,
  Flame,
  Utensils,
  Maximize2,
  Phone,
  Clock,
  Compass,
  Smile,
  DollarSign,
  Search,
  MessageSquare,
  Hotel
} from 'lucide-react';

import { 
  COFFEE_ITEMS, 
  OTHER_DRINKS, 
  HERO_IMAGE_PATH, 
  CAFE_INTERIOR_PATH,
  ENGLISH_BREAKFAST_PATH,
  CLUB_SANDWICH_PATH,
  COFFEE_BAG_PATH 
} from './coffeeData';
import { CoffeeItem, CartItem } from './types';

// Importing Custom components
import Navbar from './components/Navbar';
import CustomizationModal from './components/CustomizationModal';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import BrewQuiz from './components/BrewQuiz';
import BrewSimulator from './components/BrewSimulator';
import Footer from './components/Footer';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [customizingCoffee, setCustomizingCoffee] = useState<CoffeeItem | null>(null);
  
  // Category Filtering for menu
  const [activeCategory, setActiveCategory] = useState<'all' | 'breakfast' | 'coffee' | 'lunch'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Gallery fullscreen lightbox state
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  // Simulated Direction Path State
  const [showDirections, setShowDirections] = useState(false);
  const [directionStep, setDirectionStep] = useState(0);
  const directionsList = [
    "Exit the Forest House Hotel main lobby lift/elevators.",
    "Turn right down the main carpeted gallery hallway past the reception desk.",
    "Follow signs for 'Grand Cafe UK' towards the sunny glass conservatory garden area.",
    "Smell the fresh roasted espresso! You have arrived at Grand Cafe UK."
  ];

  // Contact Form State
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMsg, setContactMsg] = useState('');
  const [contactSuccess, setContactSuccess] = useState(false);

  // Handle contact submit
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMsg) return;
    setContactSuccess(true);
    setTimeout(() => {
      setContactSuccess(false);
      setContactName('');
      setContactEmail('');
      setContactMsg('');
    }, 4000);
  };

  // Combine standard menu items 
  const allItems = [...COFFEE_ITEMS, ...OTHER_DRINKS];
  
  const filteredItems = allItems.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory || (activeCategory === 'lunch' && item.category === 'specials');
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Smooth scroll handler
  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Cart operations
  const handleAddToCart = (newItem: CartItem) => {
    setCartItems((prevItems) => {
      const existingIdx = prevItems.findIndex(item => item.id === newItem.id);
      if (existingIdx > -1) {
        const updated = [...prevItems];
        updated[existingIdx].quantity += newItem.quantity;
        return updated;
      }
      return [...prevItems, newItem];
    });
    // Open the cart automatically for feedback
    setIsCartOpen(true);
  };

  const handleRemoveCartItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleUpdateCartQuantity = (id: string, newQty: number) => {
    setCartItems(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: newQty } : item
    ));
  };

  const handleCheckoutProgress = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderSuccess = () => {
    setCartItems([]); // Reset basket
  };

  const triggerNextDirection = () => {
    if (directionStep < directionsList.length - 1) {
      setDirectionStep(directionStep + 1);
    } else {
      setDirectionStep(0);
      setShowDirections(false);
    }
  };

  return (
    <div id="grand-cafe-app" className="min-h-screen bg-coffee-black text-coffee-white selection:bg-coffee-accent selection:text-coffee-black font-sans">
      
      {/* Sticky Header */}
      <Navbar
        cartItems={cartItems}
        onOpenCart={() => setIsCartOpen(true)}
        onScrollToSection={handleScrollToSection}
      />

      {/* 1. HERO SECTION */}
      <section id="hero" className="relative min-h-[calc(100vh-120px)] flex items-center pt-8 pb-16 lg:py-20 overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute top-1/4 right-[-10%] w-[500px] h-[500px] bg-coffee-accent/5 rounded-full filter blur-[120px] pointer-events-none" />
        <div className="absolute bottom-10 left-[-5%] w-[400px] h-[400px] bg-coffee-gold/5 rounded-full filter blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Hero Left Content */}
            <div className="col-span-12 lg:col-span-6 space-y-6 md:space-y-8 text-center lg:text-left">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1E1410] border border-coffee-border text-coffee-accent text-xs font-medium uppercase tracking-wider mx-auto lg:mx-0">
                  <Star size={12} className="fill-coffee-accent text-coffee-accent" />
                  <span>London's Favourite Local Café</span>
                </div>
                
                <motion.h1
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-coffee-white tracking-tight leading-[1.08]"
                >
                  London's Favourite <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-coffee-accent to-coffee-gold italic font-serif font-semibold">Local Café</span>
                </motion.h1>
                
                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                  className="text-sm md:text-base text-coffee-cream max-w-lg mx-auto lg:mx-0 font-sans leading-relaxed"
                >
                  Fresh Coffee, Delicious Breakfasts & A Warm Welcome Every Day. Nestled inside Forest House Hotel, we combine high value meals with outstanding quality.
                </motion.p>
              </div>

              {/* Displays Stats Cards */}
              <div id="hero-badge-metrics" className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-xl mx-auto lg:mx-0 text-left pt-2">
                <div className="bg-[#1C1513] border border-coffee-border rounded-xl p-3 flex flex-col justify-center">
                  <div className="flex items-center gap-1.5 text-coffee-white">
                    <Star size={14} className="fill-coffee-accent text-coffee-accent" />
                    <span className="text-sm font-bold">4.8★</span>
                  </div>
                  <span className="text-[10px] text-coffee-muted mt-0.5">Customer Rating</span>
                </div>
                <div className="bg-[#1C1513] border border-coffee-border rounded-xl p-3 flex flex-col justify-center">
                  <span className="text-sm font-bold text-coffee-white">322+</span>
                  <span className="text-[10px] text-coffee-muted mt-0.5">Real Reviews</span>
                </div>
                <div className="bg-[#1C1513] border border-coffee-border rounded-xl p-3 flex flex-col justify-center">
                  <span className="text-sm font-bold text-coffee-accent">Dine-In</span>
                  <span className="text-[10px] text-coffee-muted mt-0.5">Cozy Lounges</span>
                </div>
                <div className="bg-[#1C1513] border border-coffee-border rounded-xl p-3 flex flex-col justify-center">
                  <span className="text-sm font-bold text-coffee-gold">Takeaway</span>
                  <span className="text-[10px] text-coffee-muted mt-0.5">Quick Service</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
              >
                <motion.button
                  id="hero-view-menu-btn"
                  onClick={() => handleScrollToSection('menu')}
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  className="w-full sm:w-auto bg-coffee-accent hover:bg-coffee-gold text-coffee-black font-extrabold py-3.5 px-8 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer font-serif tracking-wider uppercase text-xs"
                >
                  View Menu
                  <ChevronRight size={15} strokeWidth={2.5} />
                </motion.button>
                <motion.button
                  id="hero-visit-us-btn"
                  onClick={() => handleScrollToSection('contact')}
                  whileHover={{ scale: 1.04, y: -2, borderColor: 'var(--color-coffee-accent)' }}
                  whileTap={{ scale: 0.96 }}
                  className="w-full sm:w-auto bg-transparent border border-coffee-border text-coffee-cream hover:text-coffee-white py-3.5 px-8 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer font-bold text-xs uppercase tracking-wider"
                >
                  Visit Us Today
                </motion.button>
              </motion.div>

            </div>

            {/* Hero Right: Premium Cappuccino Graphic */}
            <div className="col-span-12 lg:col-span-6 flex justify-center lg:justify-end relative">
              <div className="absolute w-[80%] h-[80%] rounded-full border border-coffee-accent/10 animate-pulse" />
              
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-[420px] aspect-square rounded-2xl overflow-hidden border border-coffee-border bg-coffee-dark p-3.5 shadow-2xl relative group"
              >
                <div className="absolute inset-0 border border-coffee-accent/20 rounded-2xl m-2.5 pointer-events-none group-hover:border-coffee-accent/40 transition-colors" />
                
                <img
                  src={HERO_IMAGE_PATH}
                  alt="Delicious hot frothing coffee served at Grand Cafe UK"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-xl filter brightness-95"
                />

                {/* Floating indicator */}
                <div className="absolute bottom-6 left-6 bg-[#16100E]/90 backdrop-blur border border-coffee-border p-3 rounded-xl flex items-center gap-2.5 shadow-lg">
                  <div className="p-1.5 rounded-lg bg-coffee-accent text-coffee-black animate-bounce">
                    <Coffee size={14} />
                  </div>
                  <div>
                    <span className="text-[8px] text-coffee-muted uppercase tracking-wider block font-semibold">Locally Brewed</span>
                    <span className="text-xs font-bold text-coffee-white">Best Coffee in London N13</span>
                  </div>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. ABOUT US SECTION */}
      <section id="about" className="py-20 bg-[#120D10]/40 border-y border-coffee-border relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-coffee-accent/3 rounded-full filter blur-[100px] pointer-events-none" />
        
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        >
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Col: Real Cafe Interior Display */}
            <div className="col-span-12 lg:col-span-5 flex justify-center">
              <div className="relative max-w-[380px] w-full">
                <div className="absolute inset-[-12px] bg-[#C89D7C]/5 rounded-3xl filter blur-xl pointer-events-none" />
                
                <div className="bg-[#1C1513] border border-coffee-border rounded-2xl p-4 shadow-2xl overflow-hidden group">
                  <img
                    src={CAFE_INTERIOR_PATH}
                    alt="Grand Cafe UK cozy modern interior setup inside Forest House Hotel"
                    referrerPolicy="no-referrer"
                    className="w-full h-80 object-cover rounded-xl filter brightness-95 hover:scale-103 transition-transform duration-500"
                  />
                  <div className="mt-4 text-center">
                    <span className="font-display font-medium text-xs text-[#C89D7C] tracking-widest block uppercase">
                      FOREST HOUSE HOTEL • LONDON N13
                    </span>
                    <span className="text-sm font-semibold text-coffee-white block mt-1">
                      Our Cozy Dining Room & Lounge Bar
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Col: About us text list highlights */}
            <div className="col-span-12 lg:col-span-7 space-y-6 md:space-y-8 text-center lg:text-left">
              <div className="space-y-3">
                <span className="text-xs font-semibold text-coffee-accent uppercase tracking-wider font-display block">
                  Welcome to Grand Cafe UK
                </span>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-coffee-white tracking-tight">
                  Where Quality Meets <span className="text-coffee-accent italic font-serif">Valued Comfort</span>
                </h2>
                <p className="text-xs md:text-sm text-coffee-cream leading-relaxed max-w-xl mx-auto lg:mx-0">
                  Established with a commitment to providing Londoners and travelers with outstanding morning hospitality, <strong className="text-coffee-white">Grand Cafe UK</strong> is known for generous English breakfasts, premium espresso drinks, and a genuinely warm atmosphere where every staff member treats you like family.
                </p>
              </div>

              {/* Highlights List explicitly matching user requests */}
              <div className="grid sm:grid-cols-2 gap-4 max-w-lg mx-auto lg:mx-0 text-left">
                {[
                  { label: 'Family-Friendly Atmosphere', desc: 'Children and parents welcome with spacious tables.', icon: <Smile className="text-coffee-accent" size={16} /> },
                  { label: 'Fresh Local Ingredients', desc: 'Sourced daily from prime farms for genuine taste.', icon: <Utensils className="text-coffee-accent" size={16} /> },
                  { label: 'Warm, Friendly Service', desc: 'Consistently rated 5 stars for our family care.', icon: <Check className="text-coffee-accent" size={16} /> },
                  { label: 'Great Value Meals (£1–10)', desc: 'Generous portion sizes that will not break the bank.', icon: <DollarSign className="text-coffee-accent" size={16} /> },
                  { label: 'Hotel Lobby Convenience', desc: 'Dine-in effortlessly inside Forest House Hotel.', icon: <Hotel className="text-coffee-accent" size={16} /> },
                  { label: 'Freshly Extracted Coffee', desc: 'Expert baristas brewing custom roasts daily.', icon: <Coffee className="text-coffee-accent" size={16} /> }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-2.5 items-start p-3 bg-[#181210]/60 border border-coffee-border/30 rounded-xl">
                    <div className="p-1.5 rounded-lg bg-[#241B18] text-[#C89D7C] flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-coffee-white">{item.label}</h4>
                      <p className="text-[10px] text-coffee-muted mt-0.5 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <button
                  id="about-meet-our-menu-btn"
                  onClick={() => handleScrollToSection('menu')}
                  className="bg-coffee-accent hover:bg-coffee-gold text-coffee-black font-semibold py-3.5 px-6 rounded-xl transition-all shadow flex items-center justify-center gap-1.5 cursor-pointer font-serif text-xs uppercase tracking-wider mx-auto lg:mx-0"
                >
                  Explore Today's Menu
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>

          </div>
        </motion.div>
      </section>

      {/* 3. FEATURED MENU SECTION */}
      <section id="menu" className="py-20 bg-[#0E0907] border-b border-coffee-border overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10"
        >
          
          {/* Section Header */}
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="font-serif italic text-base text-coffee-accent font-medium">Authentic & Affordable</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-coffee-white tracking-tight">
              Featured Menu Cards
            </h2>
            <p className="text-xs text-coffee-muted font-sans">
              Traditional English breakfasts, fresh artisan coffees, and classic lunch sandwiches. All meals priced fairly between £1 to £10 with large portion sizes.
            </p>
          </div>

          {/* Search bar + Categories row */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-[#140F0D] border border-coffee-border p-4 rounded-2xl max-w-4xl mx-auto">
            {/* Category tabs */}
            <div id="menu-category-tabs" className="flex flex-wrap items-center gap-2">
              {[
                { id: 'all', label: 'All Items' },
                { id: 'breakfast', label: 'Breakfast' },
                { id: 'coffee', label: 'Coffee & Drinks' },
                { id: 'lunch', label: 'Gourmet Lunch' },
              ].map((tab) => (
                <motion.button
                  key={tab.id}
                  id={`tab-${tab.id}`}
                  onClick={() => setActiveCategory(tab.id as any)}
                  whileHover={{ scale: 1.03, y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all border cursor-pointer ${
                    activeCategory === tab.id
                      ? 'bg-coffee-accent border-coffee-accent text-coffee-black shadow-[0_4px_15px_rgba(200,157,124,0.35)]'
                      : 'bg-coffee-card border-coffee-border hover:border-coffee-accent/40 text-coffee-cream hover:text-coffee-white'
                  }`}
                >
                  {tab.label}
                </motion.button>
              ))}
            </div>

            {/* Quick search input */}
            <div className="relative w-full md:w-64">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-coffee-muted pointer-events-none">
                <Search size={14} />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search breakfast, lattes..."
                className="w-full bg-[#1C1513] border border-coffee-border rounded-xl pl-9 pr-4 py-2 text-xs text-coffee-white placeholder:text-coffee-muted/50 focus:outline-none focus:border-coffee-accent transition-colors"
              />
            </div>
          </div>

          {/* Product Grid */}
          <div id="product-cards-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  id={`product-card-${item.id}`}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  whileHover={{ y: -6, scale: 1.015 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-[#16100E] border border-coffee-border/40 rounded-2xl overflow-hidden p-3.5 flex flex-col justify-between group text-left shadow-[0_4px_25px_rgba(255,255,255,0.03)] hover:shadow-[0_15px_40px_rgba(255,255,255,0.11)] hover:border-[#C89D7C]/60 transition-all duration-300"
                >
                  <div className="space-y-4">
                    {/* Image box */}
                    <div className="relative h-44 rounded-xl overflow-hidden bg-coffee-dark border border-coffee-border">
                      {item.tag && (
                        <div className="absolute top-2.5 left-2.5 bg-coffee-accent/90 backdrop-blur-sm px-2.5 py-0.5 rounded-full text-[9px] font-bold text-coffee-black uppercase tracking-wider flex items-center gap-1 z-10">
                          <Sparkles size={9} />
                          {item.tag}
                        </div>
                      )}
                      
                      <div className="absolute top-2.5 right-2.5 bg-black/60 backdrop-blur px-2.5 py-0.5 rounded-full text-[9px] text-[#E5B288] font-bold flex items-center gap-0.5 z-10">
                        <Star size={9} className="fill-[#E5B288]" />
                        {item.rating}
                      </div>

                      <img
                        src={item.image}
                        alt={item.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500 filter brightness-95"
                      />
                    </div>

                    {/* Meta info text */}
                    <div className="space-y-1">
                      <h3 className="font-display text-sm font-bold text-coffee-white group-hover:text-coffee-accent transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-xs text-coffee-cream line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {/* Features checklist tags */}
                    <div className="flex flex-wrap gap-1 pt-1">
                      {item.features?.slice(0, 2).map((feat, idx) => (
                        <span key={idx} className="text-[8.5px] bg-[#221714] text-[#C89D7C] px-2 py-0.5 rounded font-medium">
                          {feat}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Pricing and Cart add trigger */}
                  <div className="flex items-center justify-between pt-4 mt-4 border-t border-coffee-border/50">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-coffee-muted uppercase">Price</span>
                      <span className="text-base font-bold text-coffee-gold font-mono">
                        £{item.price.toFixed(2)}
                      </span>
                    </div>
                    
                    <motion.button
                      id={`customize-cup-btn-${item.id}`}
                      onClick={() => setCustomizingCoffee(item)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2.5 rounded-xl bg-coffee-accent hover:bg-coffee-gold text-coffee-black text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-md hover:shadow-coffee-accent/20"
                    >
                      <ShoppingBag size={13} />
                      <span>Order</span>
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Empty state search result */}
            {filteredItems.length === 0 && (
              <div className="col-span-12 text-center py-12 space-y-2 bg-[#140F0D] rounded-2xl border border-dashed border-coffee-border">
                <Coffee className="mx-auto text-coffee-accent animate-pulse" size={24} />
                <p className="text-sm font-medium text-coffee-cream">No dishes match your search keywords.</p>
                <button 
                  onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
                  className="text-xs text-coffee-accent underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>

        </motion.div>
      </section>

      {/* 4. CUSTOMER REVIEWS / TESTIMONIALS SECTION */}
      <section id="reviews" className="py-20 bg-[#120D10]/20 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12"
        >
          
          <div className="text-center max-w-xl mx-auto space-y-1">
            <span className="text-xs font-semibold text-coffee-accent uppercase tracking-wider font-display block">
              What the Locals Say
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-coffee-white tracking-tight">
              Loved by N13 and Beyond
            </h2>
            <p className="text-xs text-coffee-muted">
              With a stellar 4.8★ average rating from 322 different neighborhood diners and hotel visitors.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                text: "Staff are like family and food is fantastic with good portions.",
                author: "James R.",
                role: "Palmers Green Resident",
                rating: 5,
                imgText: "JR"
              },
              {
                text: "Great English full breakfast, best coffee in town.",
                author: "Sarah L.",
                role: "Local Food Critic",
                rating: 5,
                imgText: "SL"
              },
              {
                text: "Made me feel welcome from the moment I arrived. Perfect morning spot.",
                author: "David M.",
                role: "Forest House Hotel Guest",
                rating: 5,
                imgText: "DM"
              }
            ].map((rev, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ duration: 0.3 }}
                className="bg-[#1C1513] border border-coffee-border/45 rounded-2xl p-6 space-y-4 flex flex-col justify-between hover:border-coffee-accent/40 shadow-[0_4px_25px_rgba(255,255,255,0.02)] hover:shadow-[0_12px_35px_rgba(255,255,255,0.09)] transition-all duration-300"
              >
                <div className="space-y-3">
                  <div className="flex gap-0.5 text-coffee-gold">
                    {[...Array(rev.rating)].map((_, idx) => (
                      <Star key={idx} size={13} className="fill-coffee-gold text-coffee-gold" />
                    ))}
                  </div>
                  <p className="text-xs font-medium text-coffee-cream leading-relaxed italic">
                    "{rev.text}"
                  </p>
                </div>
                
                <div className="flex items-center gap-3 pt-3 border-t border-coffee-border/40">
                  <div className="w-8 h-8 rounded-full bg-coffee-accent text-coffee-black font-extrabold text-[11px] flex items-center justify-center">
                    {rev.imgText}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-coffee-white">{rev.author}</h4>
                    <p className="text-[9px] text-coffee-muted font-mono">{rev.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </motion.div>
      </section>

      {/* 5. COFFEE & FOOD PHOTO GALLERY (With lightbox zoom trigger) */}
      <section id="gallery" className="py-20 bg-coffee-black border-y border-coffee-border overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 35 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12"
        >
          
          <div className="text-center max-w-xl mx-auto space-y-1">
            <span className="font-serif italic text-base text-coffee-accent font-medium">Sensory Gallery</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-coffee-white tracking-tight">
              Freshly Plated Highlights
            </h2>
            <p className="text-xs text-coffee-muted">
              Click any picture card below to view custom details or trigger high-definition magnification.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {[
              { path: ENGLISH_BREAKFAST_PATH, label: 'Traditional English fry-up', category: 'Breakfast' },
              { path: CAFE_INTERIOR_PATH, label: 'Grand Cafe interior conservatory', category: 'Interiors' },
              { path: CLUB_SANDWICH_PATH, label: 'Toasted double club sandwich', category: 'Gourmet Lunch' },
              { path: HERO_IMAGE_PATH, label: 'Dense velvety hot cappuccino', category: 'Drinks' },
            ].map((img, i) => (
              <div 
                key={i}
                onClick={() => setLightboxImg(img.path)}
                className="group relative aspect-[4/5] rounded-xl overflow-hidden bg-[#1C1513] border border-coffee-border shadow-lg cursor-pointer flex-shrink-0"
              >
                <img 
                  src={img.path} 
                  alt={img.label}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover filter brightness-90 group-hover:scale-105 transition-all duration-500" 
                />
                
                {/* Hover overlay caption */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-left">
                  <span className="text-[9px] font-mono uppercase tracking-wider text-coffee-accent font-bold">
                    {img.category}
                  </span>
                  <p className="text-[11px] text-coffee-white font-semibold mt-1 flex items-center justify-between">
                    <span>{img.label}</span>
                    <Maximize2 size={12} className="text-coffee-accent flex-shrink-0" />
                  </p>
                </div>
              </div>
            ))}
          </div>

        </motion.div>
      </section>

      {/* 6. WHY CHOOSE US SECTION */}
      <section id="why-choose-us" className="py-20 bg-[#120D10]/20 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16"
        >
          
          <div className="text-center max-w-xl mx-auto space-y-1">
            <span className="text-xs font-semibold text-coffee-accent uppercase tracking-wider font-display block font-bold">
              Pure Hospitality
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-coffee-white tracking-tight">
              Why Grand Cafe is Palmers Green's Pride
            </h2>
            <p className="text-xs text-coffee-muted">
              We stand apart through fair pricing values and home-crafted cuisine done exceptionally well.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto items-center">
            {/* Left Column: Visual Retail Bag Package with high quality detail explanation */}
            <div className="flex justify-center">
              <motion.div
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ duration: 0.3 }}
                className="bg-[#1C1513] border border-coffee-border/45 rounded-2xl p-5 max-w-sm w-full relative group shadow-[0_4px_25px_rgba(255,255,255,0.02)] hover:shadow-[0_12px_35px_rgba(255,255,255,0.09)] transition-all duration-300"
              >
                <div className="absolute top-3 right-3 bg-coffee-gold text-coffee-black font-mono text-[9px] font-extrabold px-2.5 py-0.5 rounded uppercase tracking-widest">
                  Hotel Exclusive
                </div>
                <img 
                  src={COFFEE_BAG_PATH} 
                  alt="Grand Cafe Signature Roast retail package" 
                  referrerPolicy="no-referrer"
                  className="w-full h-80 object-cover rounded-xl filter brightness-95" 
                />
                <div className="mt-4 text-center">
                  <h4 className="font-display font-bold text-sm text-coffee-white block uppercase tracking-widest">
                    Grand Cafe <span className="text-coffee-accent">Signature Blend</span>
                  </h4>
                  <p className="text-[10px] text-coffee-cream mt-1">
                    Buy our signature medium-roasted beans inside the café. Perfect for home coffee makers (ground to order).
                  </p>
                  <p className="text-xs font-semibold text-coffee-gold mt-2 font-mono">£6.50 / 500g Bag</p>
                </div>
              </motion.div>
            </div>

            {/* Right Column: Grid list pointing to specific reasons */}
            <div className="space-y-6">
              {[
                { title: 'Generous Breakfast Portions', desc: 'No cutting corners. Our legendary Full English has premium Cumberland sausage, crispy back bacon, and freshly cooked eggs with plenty of hot buttered toast.' },
                { title: 'Artisan Espresso Sourcing', desc: 'Double shot extraction in every beverage from fresh 100% Arabica coffee beans, roasted locally in London for premium crema levels.' },
                { title: 'Superb Value for Money (£1–10)', desc: 'Enjoy rich food and professional catering priced carefully to stay friendly to Palmers Green, Southgate, and N13 families.' },
                { title: 'Friendly Household Connection', desc: 'Managed with pride. Our servers will remember your favorite latte choice and greet you with genuine smiles every day.' }
              ].map((reason, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="w-7 h-7 rounded-full bg-coffee-accent/15 border border-coffee-accent/30 text-coffee-accent text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5 font-mono">
                    {idx + 1}
                  </div>
                  <div className="space-y-1 text-left">
                    <h4 className="text-sm font-bold text-coffee-white uppercase tracking-wider">{reason.title}</h4>
                    <p className="text-xs text-coffee-cream leading-relaxed">{reason.desc}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </motion.div>
      </section>

      {/* 7. SENSORY PERSONALIZATION: INTERACTIVE QUIZ & FLUID BUILDING LAB */}
      <section id="quiz" className="py-20 bg-[#0E0907] border-y border-coffee-border overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16"
        >
          
          <div className="text-center max-w-xl mx-auto space-y-1">
            <span className="font-serif italic text-base text-coffee-accent font-medium">Sensory Experience Lab</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-coffee-white tracking-tight">
              Customize Your Drinks Interactive
            </h2>
            <p className="text-xs text-coffee-muted">
              Use our high-precision palate matcher tool or layer fresh ingredients dynamically to create your personal beverage!
            </p>
          </div>

          {/* Bento Grid layout linking BrewQuiz & BrewSimulator */}
          <div className="grid lg:grid-cols-2 gap-8 items-start max-w-6xl mx-auto">
            
            {/* Column 1: Palate matching quiz */}
            <BrewQuiz onCustomizeItem={(item) => setCustomizingCoffee(item)} />

            {/* Column 2: Virtual mixer cup simulator */}
            <BrewSimulator onAddCustomCartItem={handleAddToCart} />

          </div>

        </motion.div>
      </section>

      {/* 8. CONTACT & LOCATION SECTION (With Simulated interactive directions map) */}
      <section id="contact" className="py-20 relative overflow-hidden bg-coffee-black">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12"
        >
          
          <div className="text-center max-w-xl mx-auto space-y-1">
            <span className="text-xs font-semibold text-coffee-accent uppercase tracking-wider font-display block font-bold">
              Find Your Seat
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-coffee-white tracking-tight">
              Visit Us inside Forest House Hotel
            </h2>
            <p className="text-xs text-coffee-muted">
              Located on the lobby level. Open to the public with secure free hotel parking options.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 max-w-5xl mx-auto items-stretch">
            
            {/* Left Column: Simulated Interactive Map Card */}
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
              className="bg-[#140F0D] border border-coffee-border/45 rounded-3xl p-6 flex flex-col justify-between space-y-6 text-left shadow-[0_4px_25px_rgba(255,255,255,0.02)] hover:shadow-[0_12px_35px_rgba(255,255,255,0.07)] transition-all duration-300"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-coffee-cream">
                    Location & Directions Map
                  </h4>
                  <span className="bg-green-500/10 text-green-400 font-mono text-[9px] font-bold px-2 py-0.5 rounded border border-green-500/20 uppercase">
                    Indoor Lobby Spot
                  </span>
                </div>

                {/* High fidelity simulated map mockup card */}
                <div className="relative h-56 bg-[#100A08] border border-coffee-border/80 rounded-2xl overflow-hidden shadow-inner flex items-center justify-center p-4">
                  {/* Mock Map grid lines */}
                  <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(240,193,153,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(240,193,153,0.1)_1px,transparent_1px)] bg-[size:20px_20px]" />
                  
                  {/* Central Hotel Tower Pin */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-20">
                    <motion.div 
                      animate={{ y: [0, -6, 0] }}
                      transition={{ repeat: Infinity, duration: 1.8 }}
                      className="p-1.5 rounded-full bg-coffee-accent text-coffee-black border border-white shadow-lg inline-block cursor-pointer"
                    >
                      <MapPin size={20} className="fill-coffee-black" />
                    </motion.div>
                    <span className="text-[10px] font-bold text-coffee-white bg-coffee-black/90 border border-coffee-border px-2 py-0.5 rounded-md mt-1 block">
                      Forest House Hotel (London N13)
                    </span>
                  </div>

                  {/* Surround London streets labels */}
                  <span className="absolute top-6 left-6 text-[8px] font-mono text-coffee-muted/40 uppercase tracking-widest">Aldermans Hill</span>
                  <span className="absolute bottom-6 right-6 text-[8px] font-mono text-[#C89D7C]/30 uppercase tracking-widest">Green Lanes A105</span>
                  <span className="absolute top-1/3 right-4 text-[8px] font-mono text-coffee-muted/40 uppercase tracking-widest font-bold">Broomfield Park</span>

                  {/* Watermark text */}
                  <div className="absolute bottom-3 left-3 text-[9px] text-[#C89D7C]/15 font-mono">
                    SIMULATED SAT-NAV CORE
                  </div>
                </div>

                {/* Info and hours */}
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="space-y-1">
                    <p className="text-[10px] text-coffee-muted uppercase">Physical Address</p>
                    <p className="text-xs text-coffee-cream leading-relaxed font-semibold">
                      Grand Cafe UK <br />
                      Forest House Hotel, <br />
                      London N13 6BE
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] text-coffee-muted uppercase">Phone Queries</p>
                    <p className="text-xs text-coffee-cream leading-relaxed font-semibold">
                      +44 20 8888 7721
                    </p>
                    <p className="text-[10px] text-coffee-accent mt-1 flex items-center gap-1">
                      <Clock size={10} /> Open Daily: 7 AM - 6 PM
                    </p>
                  </div>
                </div>
              </div>

              {/* Lobby Interactive Directing Assistant */}
              <div className="bg-[#1C1513] border border-coffee-border rounded-2xl p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-coffee-accent flex items-center gap-1 font-mono uppercase">
                    <Compass size={11} className="animate-spin" /> Lobby Path Assistant
                  </span>
                  {!showDirections && (
                    <button 
                      onClick={() => { setShowDirections(true); setDirectionStep(0); }}
                      className="text-[10px] bg-coffee-accent text-coffee-black px-2 py-1 rounded font-bold hover:bg-white transition-colors cursor-pointer uppercase"
                    >
                      Start Directions
                    </button>
                  )}
                </div>

                {showDirections ? (
                  <div className="space-y-3">
                    <p className="text-xs text-coffee-cream leading-relaxed font-medium font-sans">
                      <span className="text-coffee-accent font-bold">Step {directionStep + 1}: </span> 
                      {directionsList[directionStep]}
                    </p>
                    <div className="flex gap-2">
                      <button 
                        onClick={triggerNextDirection}
                        className="bg-[#241B18] hover:bg-coffee-accent text-coffee-cream hover:text-coffee-black text-[10px] px-3 py-1.5 rounded-lg border border-coffee-border/80 font-bold transition-all flex items-center gap-1 cursor-pointer"
                      >
                        <span>{directionStep === directionsList.length - 1 ? 'Okay, Got It' : 'Next Step'}</span>
                        <ChevronRight size={11} />
                      </button>
                      <button 
                        onClick={() => setShowDirections(false)}
                        className="text-coffee-muted text-[10px] hover:underline"
                      >
                        Reset Guidance
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-[11px] text-coffee-muted font-sans italic leading-relaxed">
                    Arriving at the hotel? Click 'Start Directions' to guide you from the hotel lobby straight to our tables in the conservatory garden room.
                  </p>
                )}
              </div>
            </motion.div>

            {/* Right Column: Reservation / Contact messaging Form */}
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
              className="bg-[#140F0D] border border-coffee-border/45 rounded-3xl p-6 flex flex-col justify-between space-y-6 text-left shadow-[0_4px_25px_rgba(255,255,255,0.02)] hover:shadow-[0_12px_35px_rgba(255,255,255,0.07)] transition-all duration-300"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <MessageSquare size={16} className="text-coffee-accent" />
                  <h4 className="text-sm font-bold uppercase tracking-wider text-coffee-cream">
                    Get in Touch with our Crew
                  </h4>
                </div>
                
                <p className="text-xs text-coffee-muted leading-relaxed font-sans">
                  Have a question about allergens, hosting a family morning breakfast gathering, or seeking group bookings? Drop us a line below. Our hospitable crew responds within 2 hours.
                </p>

                {contactSuccess ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-coffee-accent/15 border border-coffee-accent/40 rounded-xl p-6 text-center space-y-3.5 my-4"
                  >
                    <div className="w-10 h-10 rounded-full bg-coffee-accent text-coffee-black font-bold flex items-center justify-center mx-auto">
                      ✓
                    </div>
                    <div>
                      <h5 className="text-sm font-bold text-coffee-white">Message Dispatched Successfully!</h5>
                      <p className="text-xs text-coffee-cream mt-1 leading-relaxed">
                        Thank you! One of our family hosts will respond directly to your address very soon. See you inside the hotel!
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-3.5">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold text-coffee-cream">Your Name *</label>
                      <input
                        type="text"
                        required
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="e.g. David Beckham"
                        className="w-full bg-[#1A1211] border border-coffee-border rounded-xl px-4 py-2.5 text-xs text-coffee-white placeholder:text-coffee-muted/45 focus:outline-none focus:border-coffee-accent transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold text-coffee-cream">Your Email Address *</label>
                      <input
                        type="email"
                        required
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        placeholder="david.b@gmail.co.uk"
                        className="w-full bg-[#1A1211] border border-coffee-border rounded-xl px-4 py-2.5 text-xs text-coffee-white placeholder:text-coffee-muted/45 focus:outline-none focus:border-coffee-accent transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold text-coffee-cream">Detailed Request *</label>
                      <textarea
                        required
                        rows={3}
                        value={contactMsg}
                        onChange={(e) => setContactMsg(e.target.value)}
                        placeholder="e.g. allergic restrictions details or morning corporate table reservations..."
                        className="w-full bg-[#1A1211] border border-coffee-border rounded-xl p-3 text-xs text-coffee-white placeholder:text-coffee-muted/45 focus:outline-none focus:border-coffee-accent transition-colors resize-none"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full bg-coffee-accent hover:bg-coffee-gold text-coffee-black font-semibold py-3 px-4 rounded-xl transition-all font-serif uppercase tracking-widest text-xs cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        Send message to family crew
                        <ChevronRight size={14} />
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>

          </div>
        </motion.div>
      </section>

      {/* Elegant Footer component with links */}
      <Footer onScrollToSection={handleScrollToSection} />

      {/* Overlays / Lightboxes / Modals */}

      {/* 1. Gallery Lightbox overlay */}
      {lightboxImg && (
        <div 
          id="gallery-lightbox" 
          onClick={() => setLightboxImg(null)}
          className="fixed inset-0 z-50 bg-neutral-950/95 backdrop-blur-sm flex items-center justify-center p-4 cursor-zoom-out"
        >
          <div className="relative max-w-4xl max-h-[85vh] overflow-hidden rounded-2xl border border-coffee-border">
            <button 
              onClick={() => setLightboxImg(null)}
              className="absolute top-4 right-4 bg-coffee-black/80 text-white p-2 rounded-full border border-coffee-border hover:bg-coffee-accent hover:text-coffee-black transition-colors"
            >
              ✕
            </button>
            <img 
              src={lightboxImg} 
              alt="High definition zoom view inside Grand Cafe" 
              referrerPolicy="no-referrer"
              className="max-w-full max-h-[80vh] object-contain rounded-2xl" 
            />
          </div>
        </div>
      )}

      {/* 2. Customization Modal Sheets */}
      <CustomizationModal
        isOpen={customizingCoffee !== null}
        coffee={customizingCoffee}
        onClose={() => setCustomizingCoffee(null)}
        onAddToCart={handleAddToCart}
      />

      {/* 3. Sliding Basket Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemoveItem={handleRemoveCartItem}
        onUpdateQuantity={handleUpdateCartQuantity}
        onCheckout={handleCheckoutProgress}
      />

      {/* 4. Checkout simulated process tracking modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        cartItems={cartItems}
        onClose={() => setIsCheckoutOpen(false)}
        onOrderSuccess={handleOrderSuccess}
      />

    </div>
  );
}
