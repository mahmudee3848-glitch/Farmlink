import React, { useState } from 'react';
import { MOCK_LISTINGS } from '../services/mockData';
import { CropStatus, CropListing } from '../types';
import { Plus, Edit2, MapPin, Calendar, CheckCircle } from 'lucide-react';

const FarmerDashboard: React.FC = () => {
  const [listings, setListings] = useState<CropListing[]>(MOCK_LISTINGS.filter(l => l.farmerId === 'f1'));
  const [showAddModal, setShowAddModal] = useState(false);

  const handleStatusUpdate = (id: string, newStatus: CropStatus) => {
    setListings(prev => prev.map(item => 
      item.id === id ? { ...item, status: newStatus } : item
    ));
  };

  const getStatusColor = (status: CropStatus) => {
    switch (status) {
      case CropStatus.GROWING: return 'bg-blue-100 text-blue-800';
      case CropStatus.HARVESTING: return 'bg-yellow-100 text-yellow-800';
      case CropStatus.READY: return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white shadow-sm border-b border-gray-200 px-4 py-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Welcome, Musa</h1>
            <p className="text-sm text-gray-500 flex items-center mt-1">
              <MapPin className="h-3 w-3 mr-1" /> Kaduna Farm, Nigeria
            </p>
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Crop
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">My Crops & Harvest Status</h2>
        
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {listings.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
              <div className="relative h-40 w-full bg-gray-200">
                <img src={item.imageUrl} alt={item.cropType} className="h-full w-full object-cover" />
                <span className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(item.status)}`}>
                  {item.status}
                </span>
              </div>
              
              <div className="p-4 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-gray-900">{item.cropType}</h3>
                  <p className="text-primary-600 font-semibold">₦{item.pricePerUnit}/{item.unit}</p>
                </div>
                
                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <div className="flex items-center justify-between">
                    <span>Quantity:</span>
                    <span className="font-medium">{item.quantity} {item.unit}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center"><Calendar className="h-3 w-3 mr-1"/> Harvest:</span>
                    <span className="font-medium">{item.harvestDate}</span>
                  </div>
                </div>

                <div className="mt-auto border-t border-gray-100 pt-4">
                  <label className="block text-xs font-medium text-gray-700 mb-2">Update Status</label>
                  <select 
                    value={item.status}
                    onChange={(e) => handleStatusUpdate(item.id, e.target.value as CropStatus)}
                    className="block w-full text-sm rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 p-2 bg-gray-50"
                  >
                    {Object.values(CropStatus).map((status) => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Listing Modal Mockup */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Crop</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Crop Type</label>
                <input type="text" className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm" placeholder="e.g. Maize" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Quantity</label>
                    <input type="number" className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Unit</label>
                    <select className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm">
                        <option>kg</option>
                        <option>bags</option>
                        <option>baskets</option>
                    </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Expected Harvest Date</label>
                <input type="date" className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm" />
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button onClick={() => setShowAddModal(false)} className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">Cancel</button>
                <button onClick={() => setShowAddModal(false)} className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">Save Listing</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FarmerDashboard;