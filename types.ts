export enum UserRole {
  GUEST = 'GUEST',
  FARMER = 'FARMER',
  BUYER = 'BUYER',
  OPS = 'OPS'
}

export enum CropStatus {
  GROWING = 'Growing',
  HARVESTING = 'Harvesting',
  READY = 'Ready for Processing',
  SOLD = 'Sold',
  DISPATCHED = 'Dispatched',
  DELIVERED = 'Delivered'
}

export interface BankDetails {
  bankName: string;
  accountNumber: string;
  accountName: string;
}

export interface Farmer {
  id: string;
  name: string;
  location: string;
  coordinates: { x: number; y: number }; // Mock coordinates for the map 0-100 range
  phone: string;
  bankDetails: BankDetails;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface CropListing {
  id: string;
  farmerId: string;
  farmerName: string;
  cropType: string;
  quantity: number;
  unit: string;
  pricePerUnit: number;
  harvestDate: string;
  status: CropStatus;
  location: string;
  imageUrl: string;
}

export interface BuyerOrder {
  id: string;
  listingId: string;
  buyerId: string;
  status: 'Pending' | 'Confirmed' | 'Shipped';
  date: string;
}

// Stats for Ops Dashboard
export interface RegionStat {
  region: string;
  volume: number;
  readyCount: number;
}