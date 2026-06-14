/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface CoffeeItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'breakfast' | 'coffee' | 'lunch' | 'specials';
  image: string;
  rating: number;
  tag?: string;
  features?: string[];
}

export interface CartItem {
  id: string; // Unique configuration ID: coffeeId + '-' + size + '-' + milk + '-' + syrup + '-' + extraShot
  coffeeId: string;
  name: string;
  basePrice: number;
  pricePerUnit: number;
  quantity: number;
  size: 'small' | 'medium' | 'large';
  milk: 'none' | 'whole' | 'oat' | 'almond';
  syrup: 'none' | 'caramel' | 'vanilla' | 'hazelnut';
  extraShot: boolean;
  image: string;
}

export interface Order {
  customerName: string;
  phone: string;
  email: string;
  type: 'delivery' | 'pickup';
  address?: string;
  paymentMethod: 'cod' | 'card';
  items: CartItem[];
  totalAmount: number;
}
