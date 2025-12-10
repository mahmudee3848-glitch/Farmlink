import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import FarmerDashboard from './pages/FarmerDashboard';
import BuyerMarketplace from './pages/BuyerMarketplace';
import OpsDashboard from './pages/OpsDashboard';
import Auth from './pages/Auth';
import { UserRole } from './types';

function App() {
  const [userRole, setUserRole] = useState<UserRole>(UserRole.GUEST);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  const handleLogin = (name: string, role: UserRole) => {
    setUserName(name);
    setUserRole(role);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole(UserRole.GUEST);
    setUserName('');
  };

  const handleRoleChange = (role: UserRole) => {
    // This is mainly for the landing page quick-access buttons
    // In a real app, clicking these would redirect to Auth with role pre-selected
    setUserRole(role);
    if (!isLoggedIn) {
        // If not logged in, these buttons on landing page essentially act as "Guest View" triggers or Auth prompts
        // For this demo, we let them proceed as Guest to view the page, but Auth is encouraged
    }
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 font-sans">
        <Navbar 
            currentRole={userRole} 
            setRole={handleRoleChange} 
            isLoggedIn={isLoggedIn}
            userName={userName}
            onLogout={handleLogout}
        />
        <Routes>
          <Route path="/" element={<Landing setRole={handleRoleChange} />} />
          
          <Route 
            path="/auth" 
            element={!isLoggedIn ? <Auth onLogin={handleLogin} /> : <Navigate to="/" />} 
          />

          <Route 
            path="/farmer/*" 
            element={userRole === UserRole.FARMER || userRole === UserRole.GUEST ? <FarmerDashboard /> : <Navigate to="/auth" />} 
          />
          
          <Route 
            path="/market/*" 
            element={userRole === UserRole.BUYER || userRole === UserRole.GUEST ? <BuyerMarketplace /> : <Navigate to="/auth" />} 
          />
          
          <Route 
            path="/ops/*" 
            element={userRole === UserRole.OPS || userRole === UserRole.GUEST ? <OpsDashboard /> : <Navigate to="/auth" />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;