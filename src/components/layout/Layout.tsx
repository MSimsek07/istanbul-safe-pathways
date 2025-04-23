
import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  Map, MessageSquare, FileText, Users, Settings, MenuIcon, X, AlertTriangle, BatteryMedium
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import NetworkStatus from '@/components/status/NetworkStatus';
import BatteryStatus from '@/components/status/BatteryStatus';

const Layout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const navItems = [
    { name: 'Ana Sayfa', path: '/', icon: <AlertTriangle className="h-5 w-5" /> },
    { name: 'Haritalar', path: '/maps', icon: <Map className="h-5 w-5" /> },
    { name: 'İletişim', path: '/communication', icon: <MessageSquare className="h-5 w-5" /> },
    { name: 'Acil Bilgiler', path: '/emergency-info', icon: <FileText className="h-5 w-5" /> },
    { name: 'Topluluk Yardımı', path: '/community-response', icon: <Users className="h-5 w-5" /> },
    { name: 'Ayarlar', path: '/settings', icon: <Settings className="h-5 w-5" /> },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-emergency-light">
      {/* Header */}
      <header className="bg-emergency-primary text-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <AlertTriangle className="h-6 w-6" />
            <span className="font-bold text-lg">İstanbul Acil Yardım</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2">
              <NetworkStatus />
              <BatteryStatus />
            </div>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="md:hidden text-white hover:bg-emergency-primary/80"
              onClick={toggleMenu}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </header>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg absolute top-14 right-0 left-0 z-50">
          <nav className="container mx-auto px-4 py-2">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link 
                    to={item.path}
                    className={cn(
                      "flex items-center space-x-2 px-4 py-2 rounded-md transition-colors",
                      location.pathname === item.path 
                        ? "bg-emergency-primary text-white" 
                        : "hover:bg-emergency-light"
                    )}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
      
      {/* Main Content with Desktop Navigation */}
      <div className="flex flex-1">
        {/* Desktop Sidebar Navigation */}
        <aside className="hidden md:block w-64 bg-white shadow-md">
          <nav className="p-4 h-[calc(100vh-4rem)] overflow-y-auto">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link 
                    to={item.path}
                    className={cn(
                      "flex items-center space-x-3 px-4 py-3 rounded-md transition-colors",
                      location.pathname === item.path 
                        ? "bg-emergency-primary text-white" 
                        : "hover:bg-emergency-light"
                    )}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
            
            <div className="mt-8 p-4 bg-emergency-light rounded-md">
              <div className="flex justify-between mb-2">
                <NetworkStatus />
                <BatteryStatus />
              </div>
              <p className="text-xs text-emergency-dark/70 mt-2">
                Çevrimdışı mod: Aktif<br />
                Son güncelleme: 23.04.2025
              </p>
            </div>
          </nav>
        </aside>
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto">
          <div className="container mx-auto p-4 md:p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
