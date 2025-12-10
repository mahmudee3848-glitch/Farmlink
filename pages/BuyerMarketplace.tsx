import React, { useState, useMemo } from 'react';
import { MOCK_LISTINGS, MOCK_FARMERS } from '../services/mockData';
import { Search, Filter, MapPin, ShoppingCart, CheckCircle, CreditCard, Copy, AlertTriangle } from 'lucide-react';
import { CropListing } from '../types';

interface PaymentModalProps {
  product: CropListing;
  onClose: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ product, onClose }) => {
    const [step, setStep] = useState(1);
    const [isCopied, setIsCopied] = useState(false);

    // Find farmer details for bank info
    const farmer = MOCK_FARMERS.find(f => f.id === product.farmerId);
    
    // Fallback if no specific bank details (should exist in real app)
    const bankDetails = farmer?.bankDetails || {
        bankName: 'First Bank',
        accountNumber: '1234567890',
        accountName: product.farmerName
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(bankDetails.accountNumber);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    const totalAmount = product.pricePerUnit * 10; // Mocking a purchase of 10 units for demo

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-lg w-full overflow-hidden shadow-2xl">
                
                {/* Step 1: Order Summary */}
                {step === 1 && (
                    <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                            <ShoppingCart className="mr-2 h-5 w-5 text-primary-600" /> Confirm Order
                        </h3>
                        
                        <div className="bg-gray-50 p-4 rounded-lg mb-6">
                            <div className="flex gap-4">
                                <img src={product.imageUrl} alt={product.cropType} className="w-20 h-20 object-cover rounded-md" />
                                <div>
                                    <h4 className="font-bold text-lg">{product.cropType}</h4>
                                    <p className="text-sm text-gray-500">Sold by {product.farmerName}</p>
                                    <p className="text-sm text-gray-500">Location: {product.location}</p>
                                </div>
                            </div>
                            <div className="mt-4 pt-4 border-t border-gray-200 space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span>Price per unit</span>
                                    <span>₦{product.pricePerUnit.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span>Quantity</span>
                                    <span>10 {product.unit} (Demo)</span>
                                </div>
                                <div className="flex justify-between font-bold text-lg mt-2 text-primary-700">
                                    <span>Total to Pay</span>
                                    <span>₦{totalAmount.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button onClick={onClose} className="flex-1 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50">Cancel</button>
                            <button onClick={() => setStep(2)} className="flex-1 py-3 bg-primary-600 rounded-lg text-white font-medium hover:bg-primary-700 shadow-md">Proceed to Payment</button>
                        </div>
                    </div>
                )}

                {/* Step 2: P2P Bank Transfer Details */}
                {step === 2 && (
                    <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center">
                            <CreditCard className="mr-2 h-5 w-5 text-primary-600" /> Bank Transfer
                        </h3>
                        <p className="text-sm text-gray-500 mb-6">Make a direct transfer to the farmer's account below.</p>

                        <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-6">
                            <div className="space-y-4">
                                <div>
                                    <p className="text-xs text-blue-600 uppercase font-semibold tracking-wider">Bank Name</p>
                                    <p className="text-lg font-bold text-gray-900">{bankDetails.bankName}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-blue-600 uppercase font-semibold tracking-wider">Account Number</p>
                                    <div className="flex items-center gap-3">
                                        <p className="text-2xl font-mono font-bold text-gray-900 tracking-widest">{bankDetails.accountNumber}</p>
                                        <button onClick={handleCopy} className="text-gray-400 hover:text-primary-600 transition-colors">
                                            {isCopied ? <CheckCircle className="h-5 w-5 text-green-500" /> : <Copy className="h-5 w-5" />}
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-xs text-blue-600 uppercase font-semibold tracking-wider">Account Name</p>
                                    <p className="text-lg font-medium text-gray-900">{bankDetails.accountName}</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-start gap-2 mb-6 bg-yellow-50 p-3 rounded-lg border border-yellow-100">
                             <AlertTriangle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                             <p className="text-xs text-yellow-800">
                                Please ensure you transfer the exact amount of <span className="font-bold">₦{totalAmount.toLocaleString()}</span>. 
                                Click the button below only after the transfer is successful.
                             </p>
                        </div>

                        <div className="flex gap-3">
                            <button onClick={() => setStep(1)} className="flex-1 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50">Back</button>
                            <button onClick={() => setStep(3)} className="flex-1 py-3 bg-primary-600 rounded-lg text-white font-medium hover:bg-primary-700 shadow-md">I Have Sent the Money</button>
                        </div>
                    </div>
                )}

                {/* Step 3: Success */}
                {step === 3 && (
                    <div className="p-8 text-center">
                        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                            <CheckCircle className="h-10 w-10 text-green-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Order Placed!</h3>
                        <p className="text-gray-500 mb-8">
                            We have notified {product.farmerName}. Your order status is currently 
                            <span className="font-semibold text-yellow-600"> Pending Confirmation</span>. 
                            Once the farmer confirms receipt of funds, logistics will be arranged.
                        </p>
                        <button onClick={onClose} className="w-full py-3 bg-gray-900 rounded-lg text-white font-medium hover:bg-gray-800">Return to Marketplace</button>
                    </div>
                )}
            </div>
        </div>
    );
};

const BuyerMarketplace: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState<CropListing | null>(null);

  const locations = ['All', ...Array.from(new Set(MOCK_LISTINGS.map(l => l.location)))];

  const filteredListings = useMemo(() => {
    return MOCK_LISTINGS.filter(item => {
      const matchesSearch = item.cropType.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLocation = selectedLocation === 'All' || item.location === selectedLocation;
      return matchesSearch && matchesLocation;
    });
  }, [searchTerm, selectedLocation]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header / Search */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h1 className="text-2xl font-bold text-gray-900">Marketplace</h1>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 sm:text-sm"
                  placeholder="Search for crops..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="flex items-center space-x-2">
                 <Filter className="h-5 w-5 text-gray-500" />
                 <select 
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                 >
                    {locations.map(loc => (
                        <option key={loc} value={loc}>{loc}</option>
                    ))}
                 </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {filteredListings.map((product) => (
            <div key={product.id} className="group relative bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
              <div className="aspect-w-4 aspect-h-3 bg-gray-200 rounded-t-2xl overflow-hidden h-48">
                <img
                  src={product.imageUrl}
                  alt={product.cropType}
                  className="w-full h-full object-center object-cover group-hover:opacity-90"
                />
                <div className="absolute bottom-2 left-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded-md flex items-center">
                    <MapPin className="h-3 w-3 mr-1" /> {product.location}
                </div>
              </div>
              
              <div className="flex-1 p-4 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold text-gray-900">
                      <span className="absolute inset-0" onClick={() => setSelectedProduct(product)} />
                      {product.cropType}
                    </h3>
                    <p className="text-lg font-semibold text-primary-600">₦{product.pricePerUnit.toLocaleString()}</p>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">Sold by {product.farmerName}</p>
                  
                  <div className="mt-3 grid grid-cols-2 gap-2 text-sm text-gray-600">
                    <div className="bg-gray-50 p-2 rounded text-center">
                        <span className="block text-xs text-gray-400">Available</span>
                        <span className="font-medium">{product.quantity} {product.unit}</span>
                    </div>
                    <div className="bg-gray-50 p-2 rounded text-center">
                        <span className="block text-xs text-gray-400">Harvest</span>
                        <span className="font-medium">{product.harvestDate}</span>
                    </div>
                  </div>
                </div>

                <button 
                    onClick={() => setSelectedProduct(product)}
                    className="mt-4 w-full bg-primary-600 border border-transparent rounded-md py-2 px-4 flex items-center justify-center text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 z-10 relative"
                >
                   <ShoppingCart className="h-4 w-4 mr-2" />
                   Order Now
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {filteredListings.length === 0 && (
            <div className="text-center py-20">
                <p className="text-gray-500 text-lg">No crops found matching your criteria.</p>
            </div>
        )}
      </div>

      {/* Payment Modal */}
      {selectedProduct && (
          <PaymentModal 
            product={selectedProduct} 
            onClose={() => setSelectedProduct(null)} 
          />
      )}
    </div>
  );
};

export default BuyerMarketplace;