import React from 'react';
import { Link } from 'react-router-dom';
import { UserRole } from '../types';
import { ArrowRight, Leaf, Truck, TrendingUp, Users } from 'lucide-react';

interface LandingProps {
  setRole: (role: UserRole) => void;
}

const Landing: React.FC<LandingProps> = ({ setRole }) => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-y-0 h-full w-full bg-gradient-to-br from-primary-50 to-white -z-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center lg:pt-32">
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Bridge the Gap Between</span>
            <span className="block text-primary-600">Farm and Table</span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Connect directly with verified farmers, streamline logistics, and reduce food waste. 
            FarmLink aggregates harvests for efficient processing and delivery.
          </p>
          <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center gap-4">
            <button 
              onClick={() => setRole(UserRole.BUYER)}
              className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 md:py-4 md:text-lg md:px-10 shadow-lg shadow-primary-500/30 transition-all"
            >
              I'm a Buyer
            </button>
            <button 
              onClick={() => setRole(UserRole.FARMER)}
              className="w-full flex items-center justify-center px-8 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10 transition-all"
            >
              I'm a Farmer
            </button>
          </div>
        </div>
      </div>

      {/* Feature Grid */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Leaf className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Direct Connection</h3>
              <p className="mt-2 text-gray-600">Eliminate middlemen. Farmers get fair prices, buyers get fresh produce directly from the source.</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <Truck className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Smart Logistics</h3>
              <p className="mt-2 text-gray-600">We aggregate harvests based on location and readiness, streamlining pickup and processing.</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Reduce Waste</h3>
              <p className="mt-2 text-gray-600">Real-time harvest data allows for better planning, reducing post-harvest losses significantly.</p>
            </div>
          </div>
        </div>
      </div>

      {/* For Ops Link */}
      <div className="bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between">
          <div className="text-white mb-4 md:mb-0">
            <h2 className="text-2xl font-bold">Logistics or Processing Partner?</h2>
            <p className="text-gray-400">Join our Ops dashboard to view aggregation clusters.</p>
          </div>
          <button 
             onClick={() => setRole(UserRole.OPS)}
             className="px-6 py-3 bg-white text-gray-900 font-medium rounded-md hover:bg-gray-100"
          >
            Access Ops Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default Landing;