
import React from 'react';
import { Wifi, WifiOff } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const NetworkStatus: React.FC = () => {
  // In a real app, we would check the actual network status
  // For demo purposes, let's simulate offline status
  const isOnline = false;
  const meshPeers = 5; // Simulated number of mesh network peers
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center space-x-1">
            {isOnline ? (
              <Wifi className="h-4 w-4 text-emergency-success" />
            ) : (
              <div className="flex items-center">
                <WifiOff className="h-4 w-4 text-emergency-warning" />
                <span className="text-xs ml-1 text-emergency-warning">{meshPeers}</span>
              </div>
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          {isOnline 
            ? 'Çevrimiçi - Internet bağlantısı mevcut' 
            : `Çevrimdışı - ${meshPeers} mesh ağı bağlantısı`}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default NetworkStatus;
