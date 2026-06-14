/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CoffeeItem } from './types';

export const COFFEE_ITEMS: CoffeeItem[] = [
  // Breakfast Section
  {
    id: 'full-english',
    name: 'Full Traditional English Breakfast',
    description: 'Golden hash brown, fried eggs, premium grilled sausages, back bacon slices, baked beans, and buttery toast.',
    price: 8.50,
    category: 'breakfast',
    image: '/src/assets/images/english_breakfast_1781424876985.jpg',
    rating: 4.9,
    tag: 'Best Seller',
    features: ['Real Cumberland Sausage', 'Crispy Back Bacon', 'Fresh Hash Browns']
  },
  {
    id: 'scrambled-beans',
    name: 'Scrambled Eggs & Beans on Toast',
    description: 'Creamy scrambled farm eggs served over a thick slice of toasted sourdough with hot tomato baked beans.',
    price: 5.50,
    category: 'breakfast',
    image: '/src/assets/images/cappuccino_cup_1781424158560.jpg', // Reused for nice plates/decor, we can use interior or other things or english breakfast
    rating: 4.8,
    tag: 'Classic',
    features: ['Free Range Eggs', 'Artisanal Sourdough', 'Baked Beans']
  },
  {
    id: 'cozy-omelette',
    name: 'Grand House Omelette',
    description: 'Fluffy three-egg omelette stuffed with mature cheddar cheese, sliced mushrooms, and fresh garden herbs.',
    price: 6.50,
    category: 'breakfast',
    image: '/src/assets/images/english_breakfast_1781424876985.jpg',
    rating: 4.7,
    tag: 'Hearty',
    features: ['Mature Cheddar Cheese', 'Fresh Field Mushrooms', 'Farmed Eggs']
  },

  // Coffee & Drinks Section
  {
    id: 'cappuccino',
    name: 'Velvety Cappuccino',
    description: 'Double shot of rich espresso layered with steamed organic milk and a dense blanket of velvet microfoam.',
    price: 3.20,
    category: 'coffee',
    image: '/src/assets/images/cappuccino_cup_1781424158560.jpg',
    rating: 4.9,
    tag: 'Barista Choice',
    features: ['Beautiful rosette art', 'Espresso Core', 'Organic Fresh Milk']
  },
  {
    id: 'gourmet-latte',
    name: 'Classic Caffe Latte',
    description: 'A smooth double-shot espresso topped with steamed milk and a delicate layer of creamy froth.',
    price: 3.30,
    category: 'coffee',
    image: '/src/assets/images/iced_latte_1781424140619.jpg',
    rating: 4.8,
    features: ['Mild & Creamy', 'Fair-Trade Arabica', 'Gently Steamed Milk']
  },
  {
    id: 'espresso',
    name: 'Espresso Double Shot',
    description: 'A beautifully extracted, intense double shot of pure roasted coffee with a thick golden-brown crema.',
    price: 2.20,
    category: 'coffee',
    image: '/src/assets/images/espresso_cup_1781424192615.jpg',
    rating: 4.7,
    tag: 'Pure Extract',
    features: ['Dense textured crema', 'Single-Origin Roast', 'Caffeine Kick']
  },
  {
    id: 'americano',
    name: 'Classic Americano',
    description: 'Double shot of espresso diluted with hot water for a smooth, deep, full-bodied coffee experience.',
    price: 2.80,
    category: 'coffee',
    image: '/src/assets/images/hero_cappuccino_1781424103983.jpg',
    rating: 4.6,
    features: ['Pure Crema Blend', 'Clean Notes', 'Hot Water Diluted']
  }
];

export const OTHER_DRINKS: CoffeeItem[] = [
  // Lunch Section
  {
    id: 'gourmet-club-sandwich',
    name: 'Artisanal Club Sandwich',
    description: 'Stacked toasted sandwich with premium sliced chicken, crispy smoked bacon, fresh avocado, tomato, and baby lettuce.',
    price: 7.20,
    category: 'lunch',
    image: '/src/assets/images/club_sandwich_1781424911820.jpg',
    rating: 4.9,
    tag: 'Lunch Favourite',
    features: ['Smoked Back Bacon', 'Avocado Spread', 'Country White Toast']
  },
  {
    id: 'cozy-garden-salad',
    name: 'Greek Garden Salad',
    description: 'Crisp romaine lettuce, vine-ripened tomatoes, block cucumbers, olives, and authentic Greek feta cubes drizzled with olive oil.',
    price: 5.95,
    category: 'lunch',
    image: '/src/assets/images/club_sandwich_1781424911820.jpg',
    rating: 4.7,
    features: ['Authentic Greek Feta', 'Extra Virgin Olive Oil', 'Crisp local veggies']
  },
  {
    id: 'grand-daily-special',
    name: 'Chef’s Special Beef stew & Mash',
    description: 'Slow-cooked British beef in rich red wine gravy, served with heavy cream mashed potatoes and glazed peas.',
    price: 9.95,
    category: 'specials',
    image: '/src/assets/images/english_breakfast_1781424876985.jpg',
    rating: 4.95,
    tag: 'Daily Special',
    features: ['24-Hour Slow Cooked', 'Buttery Mash Pot', 'Locally Sourced Beef']
  }
];

export const HERO_IMAGE_PATH = '/src/assets/images/hero_section.jpg';
export const CAFE_INTERIOR_PATH = '/src/assets/images/london_cafe_interior_1781424893863.jpg';
export const CLUB_SANDWICH_PATH = '/src/assets/images/club_sandwich_1781424911820.jpg';
export const ENGLISH_BREAKFAST_PATH = '/src/assets/images/english_breakfast_1781424876985.jpg';
export const COFFEE_BAG_PATH = '/src/assets/images/coffee_bag_1781424121386.jpg';
