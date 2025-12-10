import React from 'react';
import { MOCK_FARMERS, OPS_STATS, MOCK_LISTINGS } from '../services/mockData';
import { CropStatus } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Truck, AlertTriangle, Package } from 'lucide-react';

// A simple mock map component using relative positioning
const MockMap: React.FC = () => {
  return (
    <div className="relative w-full h-[400px] bg-gray-100 rounded-xl overflow-hidden border border-gray-300">
        {/* Fake Map Grid */}
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#6b7280 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
        <div className="absolute top-4 left-4 bg-white p-2 rounded-md shadow-md text-xs z-10 opacity-80">
            <p className="font-bold">Aggregator Map View</p>
            <div className="flex items-center mt-1"><span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span> Ready for Pickup</div>
            <div className="flex items-center mt-1"><span className="w-2 h-2 rounded-full bg-orange-400 mr-2"></span> Growing</div>
        </div>

        {MOCK_FARMERS.map((farmer) => {
           // Determine status of farmer based on their first listing for demo
           const listing = MOCK_LISTINGS.find(l => l.farmerId === farmer.id);
           const isReady = listing?.status === CropStatus.READY;
           
           return (
            <div 
                key={farmer.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                style={{ left: `${farmer.coordinates.x}%`, top: `${farmer.coordinates.y}%` }}
            >
                <div className={`w-4 h-4 rounded-full border-2 border-white shadow-lg ${isReady ? 'bg-green-500 animate-pulse' : 'bg-orange-400'}`}></div>
                {/* Tooltip on Hover */}
                <div className="hidden group-hover:block absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-32 bg-gray-900 text-white text-xs rounded p-2 z-20 text-center">
                    <p className="font-bold">{farmer.name}</p>
                    <p>{farmer.location}</p>
                    {isReady && <p className="text-green-300 font-bold mt-1">Ready!</p>}
                </div>
            </div>
           );
        })}
    </div>
  );
};

const OpsDashboard: React.FC = () => {
  const totalReadyVolume = MOCK_LISTINGS
    .filter(l => l.status === CropStatus.READY)
    .reduce((acc, curr) => acc + curr.quantity, 0);

  const readyFarmersCount = new Set(
    MOCK_LISTINGS.filter(l => l.status === CropStatus.READY).map(l => l.farmerId)
  ).size;

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <div className="bg-gray-900 text-white px-4 py-6">
        <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold">Operations Command Center</h1>
            <p className="text-gray-400 text-sm">Logistics & Aggregation Overview</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-lg p-6 flex items-center border-l-4 border-primary-500">
                <div className="p-3 bg-primary-100 rounded-full mr-4">
                    <Package className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                    <p className="text-sm text-gray-500 font-medium">Ready Volume</p>
                    <p className="text-2xl font-bold text-gray-900">{totalReadyVolume} units</p>
                </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6 flex items-center border-l-4 border-orange-500">
                <div className="p-3 bg-orange-100 rounded-full mr-4">
                    <Truck className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                    <p className="text-sm text-gray-500 font-medium">Active Pickups Needed</p>
                    <p className="text-2xl font-bold text-gray-900">{readyFarmersCount} Locations</p>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 flex items-center border-l-4 border-red-500">
                <div className="p-3 bg-red-100 rounded-full mr-4">
                    <AlertTriangle className="h-6 w-6 text-red-600" />
                </div>
                <div>
                    <p className="text-sm text-gray-500 font-medium">Critical Clusters</p>
                    <p className="text-2xl font-bold text-gray-900">2 Regions</p>
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Map Section */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold text-gray-900">Farmer Clusters</h2>
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">Real-time Data</span>
                </div>
                <MockMap />
                <div className="mt-4 text-sm text-gray-600">
                    <p><strong>Insight:</strong> High concentration of ready-to-harvest Maize in Northern clusters. Dispatch 5-ton trucks to Kaduna axis.</p>
                </div>
            </div>

            {/* Charts Section */}
            <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-6">Regional Forecast</h2>
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={OPS_STATS}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="region" tick={{fontSize: 10}} />
                            <YAxis hide />
                            <Tooltip />
                            <Bar dataKey="volume" fill="#22c55e" radius={[4, 4, 0, 0]}>
                                {OPS_STATS.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#16a34a' : '#22c55e'} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div className="mt-4 space-y-3">
                    {OPS_STATS.map((stat) => (
                        <div key={stat.region} className="flex justify-between items-center text-sm border-b border-gray-100 pb-2">
                            <span className="text-gray-600">{stat.region}</span>
                            <span className="font-semibold">{stat.readyCount} farmers ready</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default OpsDashboard;