
import React, { useState } from 'react';
import { AlertTriangle, CheckCircle, HelpCircle, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { toast } from '@/components/ui/sonner';

type StatusType = 'safe' | 'need-help' | 'emergency' | null;

const EmergencyStatusButton: React.FC = () => {
  const [status, setStatus] = useState<StatusType>(null);
  
  const handleSetStatus = (newStatus: StatusType) => {
    setStatus(newStatus);
    
    const statusMessages = {
      'safe': 'Durumunuz "Güvende" olarak ayarlandı. Bu bilgi yakınınızdaki ağ kullanıcılarıyla paylaşılacak.',
      'need-help': 'Durumunuz "Yardıma İhtiyacım Var" olarak ayarlandı. Çevrenizdeki yardım ekipleri bilgilendirilecek.',
      'emergency': 'ACİL DURUM bildirimi yapıldı! Konumunuz ve durumunuz en yakın yardım ekiplerine iletildi.',
      'null': 'Durum güncellemeniz silindi.'
    };
    
    toast.success(statusMessages[newStatus || 'null'], {
      duration: 5000,
    });
  };
  
  const getStatusContent = () => {
    switch(status) {
      case 'safe':
        return (
          <div className="flex items-center">
            <CheckCircle className="h-4 w-4 mr-2 text-emergency-success" />
            <span className="font-medium">Güvende</span>
          </div>
        );
      case 'need-help':
        return (
          <div className="flex items-center">
            <HelpCircle className="h-4 w-4 mr-2 text-emergency-warning" />
            <span className="font-medium">Yardıma İhtiyacım Var</span>
          </div>
        );
      case 'emergency':
        return (
          <div className="flex items-center">
            <AlertTriangle className="h-4 w-4 mr-2 text-emergency-danger animate-pulse" />
            <span className="font-medium">ACİL DURUM</span>
          </div>
        );
      default:
        return (
          <div className="flex items-center">
            <User className="h-4 w-4 mr-2" />
            <span className="font-medium">Durum Belirle</span>
          </div>
        );
    }
  };
  
  const getButtonVariant = () => {
    switch(status) {
      case 'safe': return 'outline';
      case 'need-help': return 'secondary';
      case 'emergency': return 'destructive';
      default: return 'outline';
    }
  };
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant={getButtonVariant()} 
          className={status === 'emergency' ? 'animate-pulse-slow' : ''}
        >
          {getStatusContent()}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleSetStatus('safe')}>
          <CheckCircle className="h-4 w-4 mr-2 text-emergency-success" />
          <span>Güvende</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleSetStatus('need-help')}>
          <HelpCircle className="h-4 w-4 mr-2 text-emergency-warning" />
          <span>Yardıma İhtiyacım Var</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleSetStatus('emergency')}>
          <AlertTriangle className="h-4 w-4 mr-2 text-emergency-danger" />
          <span>ACİL DURUM</span>
        </DropdownMenuItem>
        {status && (
          <DropdownMenuItem onClick={() => handleSetStatus(null)}>
            <span className="text-emergency-dark">Durumu Temizle</span>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default EmergencyStatusButton;
