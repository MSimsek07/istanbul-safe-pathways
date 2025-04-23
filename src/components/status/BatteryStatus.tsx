
import React from 'react';
import { Battery, BatteryCharging, BatteryWarning } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const BatteryStatus: React.FC = () => {
  // In a real app, we would check the actual battery status
  // For demo purposes, let's simulate a battery level
  const batteryLevel = 45;
  const isCharging = false;
  
  const getBatteryIcon = () => {
    if (isCharging) return <BatteryCharging className="h-4 w-4 text-emergency-success" />;
    if (batteryLevel <= 20) return <BatteryWarning className="h-4 w-4 text-emergency-danger" />;
    return <Battery className={`h-4 w-4 ${batteryLevel <= 30 ? 'text-emergency-warning' : 'text-emergency-success'}`} />;
  };
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center space-x-1">
            {getBatteryIcon()}
            <span className="text-xs">{batteryLevel}%</span>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          {isCharging 
            ? 'Şarj oluyor' 
            : batteryLevel <= 20 
              ? 'Düşük pil - Enerji tasarrufu modunu etkinleştirin' 
              : `Pil seviyesi: ${batteryLevel}%`}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default BatteryStatus;
