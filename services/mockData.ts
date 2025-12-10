import { CropListing, CropStatus, Farmer, RegionStat } from '../types';

export const MOCK_FARMERS: Farmer[] = [
  { 
    id: 'f1', 
    name: 'Musa Ibrahim', 
    location: 'Kaduna', 
    coordinates: { x: 30, y: 20 }, 
    phone: '+234 800 111 2222',
    bankDetails: { bankName: 'First Bank', accountNumber: '3044512987', accountName: 'Musa Ibrahim Farms' }
  },
  { 
    id: 'f2', 
    name: 'Chioma Okeke', 
    location: 'Enugu', 
    coordinates: { x: 70, y: 80 }, 
    phone: '+234 800 333 4444',
    bankDetails: { bankName: 'Zenith Bank', accountNumber: '2001928374', accountName: 'Chioma Okeke Agro' }
  },
  { 
    id: 'f3', 
    name: 'Ade Wale', 
    location: 'Ogun', 
    coordinates: { x: 20, y: 75 }, 
    phone: '+234 800 555 6666',
    bankDetails: { bankName: 'GTBank', accountNumber: '0123456789', accountName: 'Wale Ventures' }
  },
  { 
    id: 'f4', 
    name: 'Yakubu Danladi', 
    location: 'Kano', 
    coordinates: { x: 40, y: 15 }, 
    phone: '+234 800 777 8888',
    bankDetails: { bankName: 'Access Bank', accountNumber: '1234567890', accountName: 'Danladi Crops' }
  },
  { 
    id: 'f5', 
    name: 'Efe Omoregie', 
    location: 'Edo', 
    coordinates: { x: 45, y: 65 }, 
    phone: '+234 800 999 0000',
    bankDetails: { bankName: 'UBA', accountNumber: '2233445566', accountName: 'Efe Omoregie' }
  },
];

export const MOCK_LISTINGS: CropListing[] = [
  {
    id: 'c1',
    farmerId: 'f1',
    farmerName: 'Musa Ibrahim',
    cropType: 'Maize',
    quantity: 500,
    unit: 'kg',
    pricePerUnit: 250,
    harvestDate: '2025-11-30',
    status: CropStatus.READY,
    location: 'Kaduna',
    imageUrl: 'https://picsum.photos/400/300?random=1'
  },
  {
    id: 'c2',
    farmerId: 'f2',
    farmerName: 'Chioma Okeke',
    cropType: 'Cassava',
    quantity: 2000,
    unit: 'tubers',
    pricePerUnit: 100,
    harvestDate: '2025-12-05',
    status: CropStatus.GROWING,
    location: 'Enugu',
    imageUrl: 'https://picsum.photos/400/300?random=2'
  },
  {
    id: 'c3',
    farmerId: 'f3',
    farmerName: 'Ade Wale',
    cropType: 'Tomatoes',
    quantity: 100,
    unit: 'baskets',
    pricePerUnit: 5000,
    harvestDate: '2025-11-25',
    status: CropStatus.HARVESTING,
    location: 'Ogun',
    imageUrl: 'https://picsum.photos/400/300?random=3'
  },
  {
    id: 'c4',
    farmerId: 'f4',
    farmerName: 'Yakubu Danladi',
    cropType: 'Rice',
    quantity: 1000,
    unit: 'bags',
    pricePerUnit: 35000,
    harvestDate: '2025-11-28',
    status: CropStatus.READY,
    location: 'Kano',
    imageUrl: 'https://picsum.photos/400/300?random=4'
  },
  {
    id: 'c5',
    farmerId: 'f1',
    farmerName: 'Musa Ibrahim',
    cropType: 'Sorghum',
    quantity: 300,
    unit: 'kg',
    pricePerUnit: 180,
    harvestDate: '2026-01-10',
    status: CropStatus.GROWING,
    location: 'Kaduna',
    imageUrl: 'https://picsum.photos/400/300?random=5'
  }
];

export const OPS_STATS: RegionStat[] = [
  { region: 'North West', volume: 4500, readyCount: 12 },
  { region: 'South East', volume: 2100, readyCount: 5 },
  { region: 'South West', volume: 3200, readyCount: 8 },
  { region: 'North Central', volume: 1800, readyCount: 3 },
];