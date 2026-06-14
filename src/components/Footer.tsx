/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, Phone, MapPin, ChevronRight, Check } from 'lucide-react';

interface FooterProps {
  onScrollToSection: (sectionId: string) => void;
}

export default function Footer({ onScrollToSection }: FooterProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSub = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setEmail('');
    }, 3000);
  };

  return (
    <footer id="app-footer" className="bg-[#0A0706] border-t border-coffee-border pt-16 pb-8 text-xs text-coffee-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top grids */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-coffee-border/40">
          
          {/* Slogan & Newsletter */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-coffee-cream">
              Grand Cafe UK
            </h4>
            <p className="text-xs leading-relaxed max-w-sm">
              Known for our traditional English breakfasts, premium coffee blends, generous portion sizes, and a warm family-friendly atmosphere inside Forest House Hotel.
            </p>

            <form onSubmit={handleSub} className="flex gap-2 max-w-sm pt-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 bg-[#120D0B] border border-coffee-border rounded-xl px-4 py-2.5 text-xs text-coffee-white placeholder:text-coffee-muted/50 focus:outline-none focus:border-coffee-accent transition-colors"
              />
              <button
                type="submit"
                className="bg-coffee-accent hover:bg-coffee-gold hover:scale-103 text-coffee-black px-4 rounded-xl font-semibold transition-all flex items-center justify-center cursor-pointer"
              >
                {subscribed ? <Check size={14} /> : <ChevronRight size={15} />}
              </button>
            </form>
            {subscribed && (
              <p className="text-[10px] text-coffee-accent animate-pulse">Thank you! You have subscribed to Grand Cafe UK club.</p>
            )}
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-coffee-cream">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs font-medium">
              <li>
                <button
                  onClick={() => onScrollToSection('about')}
                  className="hover:text-coffee-accent cursor-pointer transition-colors"
                >
                  Our Story
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('menu')}
                  className="hover:text-coffee-accent cursor-pointer transition-colors"
                >
                  Featured Menu
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('why-choose-us')}
                  className="hover:text-coffee-accent cursor-pointer transition-colors"
                >
                  Why Choose Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('contact')}
                  className="hover:text-coffee-accent cursor-pointer transition-colors"
                >
                  Directions & Location
                </button>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-coffee-cream">
              Opening Hours
            </h4>
            <ul className="space-y-2.5 text-xs font-semibold text-coffee-cream/80">
              <li className="flex justify-between border-b border-coffee-border/20 pb-1.5">
                <span>Monday - Friday</span>
                <span className="text-coffee-accent">7:00 AM - 6:00 PM</span>
              </li>
              <li className="flex justify-between border-b border-coffee-border/20 pb-1.5">
                <span>Saturday</span>
                <span className="text-coffee-accent">7:30 AM - 6:00 PM</span>
              </li>
              <li className="flex justify-between border-b border-coffee-border/20 pb-1.5">
                <span>Sunday</span>
                <span className="text-coffee-accent">8:00 AM - 4:00 PM</span>
              </li>
              <li className="text-[10px] text-coffee-muted italic mt-1">
                * Serving breakfast all day!
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-coffee-cream">
              Contact Us
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <Phone size={14} className="text-coffee-accent flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-[10px] text-coffee-muted uppercase">Phone Helpline</p>
                  <p className="text-xs text-coffee-cream font-medium mt-0.5">+44 20 8888 7721</p>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail size={14} className="text-coffee-accent flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-[10px] text-coffee-muted uppercase">Email Queries</p>
                  <p className="text-xs text-[#EADCC9] font-medium mt-0.5">hello@grandcafeuk.com</p>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin size={14} className="text-coffee-accent flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-[10px] text-coffee-muted uppercase">Cafe Address</p>
                  <p className="text-xs text-coffee-cream font-medium mt-0.5">Inside Forest House Hotel, London N13 6BE, United Kingdom</p>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Credits & Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-coffee-muted">
          <p>© 2026 Grand Cafe UK (Forest House Hotel). All Rights Reserved.</p>
          <div className="flex gap-4">
            <a href="#app-footer" className="hover:text-coffee-cream transition-colors">Facebook</a>
            <a href="#app-footer" className="hover:text-coffee-cream transition-colors">Instagram</a>
            <a href="#app-footer" className="hover:text-coffee-cream transition-colors">TripAdvisor</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
