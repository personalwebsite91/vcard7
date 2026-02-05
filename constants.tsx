
import { Platform, CardNetwork, IssuingBank } from './types';

export const BRAND_NAME = "VCard";

export const PLATFORMS: Platform[] = [
  { id: 'chatgpt', name: 'ChatGPT Plus', icon: 'fa-bolt', defaultPrice: 20 },
  { id: 'claude', name: 'Claude Pro', icon: 'fa-brain', defaultPrice: 20 },
  { id: 'midjourney', name: 'Midjourney', icon: 'fa-palette', defaultPrice: 30 },
  { id: 'netflix', name: 'Netflix US', icon: 'fa-play', defaultPrice: 15 },
  { id: 'spotify', name: 'Spotify Premium', icon: 'fa-music', defaultPrice: 10 },
  { id: 'adobe', name: 'Adobe CC', icon: 'fa-pen-nib', defaultPrice: 55 },
  { id: 'aws', name: 'AWS Cloud', icon: 'fa-server', defaultPrice: 10 },
  { id: 'digitalocean', name: 'DigitalOcean', icon: 'fa-droplet', defaultPrice: 5 },
  { id: 'zoom', name: 'Zoom Pro', icon: 'fa-video', defaultPrice: 15 },
  { id: 'google', name: 'Google One', icon: 'fa-cloud', defaultPrice: 2 },
  { id: 'other', name: 'Custom/Other', icon: 'fa-globe', defaultPrice: 1 }
];

export const CARD_NETWORKS: CardNetwork[] = [
  { id: 'visa', name: 'Visa', icon: 'fa-cc-visa' },
  { id: 'mastercard', name: 'Mastercard', icon: 'fa-cc-mastercard' }
];

export const ISSUING_BANKS: IssuingBank[] = [
  { id: 'shaktiind', name: 'Shaktiind Global', icon: 'fa-building-columns' },
  { id: 'hdfc', name: 'HDFC Virtual', icon: 'fa-landmark' },
  { id: 'icici', name: 'ICICI Secure', icon: 'fa-building' },
  { id: 'sbi', name: 'SBI International', icon: 'fa-university' }
];

export const CARD_COLORS = [
  { name: 'Midnight', value: 'linear-gradient(135deg, #0f172a 0%, #334155 100%)', isLight: false },
  { name: 'Ocean Blue', value: 'linear-gradient(135deg, #2563eb 0%, #1e3a8a 100%)', isLight: false },
  { name: 'Royal Purple', value: 'linear-gradient(135deg, #7c3aed 0%, #4c1d95 100%)', isLight: false },
  { name: 'Emerald', value: 'linear-gradient(135deg, #059669 0%, #064e3b 100%)', isLight: false },
  { name: 'Crimson', value: 'linear-gradient(135deg, #dc2626 0%, #7f1d1d 100%)', isLight: false },
  { name: 'Sunset', value: 'linear-gradient(135deg, #ea580c 0%, #9a3412 100%)', isLight: false },
  { name: 'Rose', value: 'linear-gradient(135deg, #db2777 0%, #831843 100%)', isLight: false }
];

export const EXCHANGE_RATE = 83.50; 
export const UPI_ID = "vcard@shaktiind";
