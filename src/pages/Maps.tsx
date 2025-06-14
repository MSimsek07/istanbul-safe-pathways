import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  MapPin, Hospital, Home, Shield, NavigationIcon, Layers, List, Filter, BatteryMedium
} from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuCheckboxItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import EmergencyMap from '@/components/maps/EmergencyMap';

const Maps = () => {
  const [activeTab, setActiveTab] = useState('map'); // 'map' or 'list'
  const [showAssemblyPoints, setShowAssemblyPoints] = useState(true);
  const [showHospitals, setShowHospitals] = useState(true);
  const [showShelters, setShowShelters] = useState(true);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Haritalar</h1>
        <div className="flex space-x-2">
          <Button 
            variant={activeTab === 'map' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setActiveTab('map')}
          >
            <Layers className="h-4 w-4 mr-1" />
            Harita
          </Button>
          <Button 
            variant={activeTab === 'list' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setActiveTab('list')}
          >
            <List className="h-4 w-4 mr-1" />
            Liste
          </Button>
          <FilterButton 
            showAssemblyPoints={showAssemblyPoints}
            setShowAssemblyPoints={setShowAssemblyPoints}
            showHospitals={showHospitals}
            setShowHospitals={setShowHospitals}
            showShelters={showShelters}
            setShowShelters={setShowShelters}
          />
        </div>
      </div>
      
      {activeTab === 'map' ? (
        <MapView 
          showAssemblyPoints={showAssemblyPoints}
          showHospitals={showHospitals}
          showShelters={showShelters}
          isMapLoaded={isMapLoaded}
          setIsMapLoaded={setIsMapLoaded}
        />
      ) : (
        <ListView />
      )}
    </div>
  );
};

interface FilterButtonProps {
  showAssemblyPoints: boolean;
  setShowAssemblyPoints: (show: boolean) => void;
  showHospitals: boolean;
  setShowHospitals: (show: boolean) => void;
  showShelters: boolean;
  setShowShelters: (show: boolean) => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({
  showAssemblyPoints,
  setShowAssemblyPoints,
  showHospitals,
  setShowHospitals,
  showShelters,
  setShowShelters
}) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="outline" size="sm">
        <Filter className="h-4 w-4 mr-1" />
        Filtrele
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuLabel>Gösterilecek Yerler</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuCheckboxItem 
        checked={showAssemblyPoints}
        onCheckedChange={setShowAssemblyPoints}
      >
        Toplanma Alanları
      </DropdownMenuCheckboxItem>
      <DropdownMenuCheckboxItem 
        checked={showHospitals}
        onCheckedChange={setShowHospitals}
      >
        Hastaneler
      </DropdownMenuCheckboxItem>
      <DropdownMenuCheckboxItem 
        checked={showShelters}
        onCheckedChange={setShowShelters}
      >
        Sığınaklar
      </DropdownMenuCheckboxItem>
      <DropdownMenuSeparator />
      <DropdownMenuLabel>Rota Tercihleri</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuCheckboxItem checked>Deprem Güvenli</DropdownMenuCheckboxItem>
      <DropdownMenuCheckboxItem>En Hızlı Rota</DropdownMenuCheckboxItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

interface MapViewProps {
  showAssemblyPoints: boolean;
  showHospitals: boolean;
  showShelters: boolean;
  isMapLoaded: boolean;
  setIsMapLoaded: (loaded: boolean) => void;
}

const MapView: React.FC<MapViewProps> = ({ 
  showAssemblyPoints, 
  showHospitals, 
  showShelters,
  isMapLoaded,
  setIsMapLoaded
}) => {
  return (
    <Card className="border-none shadow-none">
      <CardContent className="p-0">
        <div className="bg-emergency-light border rounded-lg p-0 h-[70vh] relative">
          {!isMapLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-emergency-light/90 z-10">
              <div className="text-center">
                <div className="loading-spinner mx-auto mb-4"></div>
                <p className="text-emergency-dark font-medium">Çevrimdışı haritalar yükleniyor...</p>
                <p className="text-sm text-emergency-dark/70 mt-1">İstanbul bölgesi haritaları</p>
              </div>
            </div>
          )}
          
          <EmergencyMap 
            showAssemblyPoints={showAssemblyPoints}
            showHospitals={showHospitals}
            showShelters={showShelters}
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-4">
        <div className="text-xs text-emergency-dark/70">
          <BatteryMedium className="h-4 w-4 inline mr-1" /> 
          Düşük güç modu aktif - Harita kullanımı pil kullanımını arttırabilir
        </div>
        <Button>
          <NavigationIcon className="h-4 w-4 mr-2" />
          Rotaları Göster
        </Button>
      </CardFooter>
    </Card>
  );
};

const ListView = () => {
  const emergencyLocations = [
    { 
      id: 1, 
      name: 'Fenerbahçe Park Toplanma Alanı', 
      type: 'assembly', 
      distance: 1.2,
      capacity: 5000,
      icon: <Shield className="h-5 w-5 text-emergency-success" />
    },
    { 
      id: 2, 
      name: 'İstanbul Tıp Fakültesi Hastanesi', 
      type: 'hospital', 
      distance: 2.5,
      capacity: null,
      icon: <Hospital className="h-5 w-5 text-emergency-primary" />
    },
    { 
      id: 3, 
      name: 'Beyoğlu İlçe Afet Sığınağı', 
      type: 'shelter', 
      distance: 3.7,
      capacity: 1200,
      icon: <Home className="h-5 w-5 text-emergency-secondary" />
    },
    { 
      id: 4, 
      name: 'Beşiktaş Meydanı Toplanma Alanı', 
      type: 'assembly', 
      distance: 4.1,
      capacity: 3000,
      icon: <Shield className="h-5 w-5 text-emergency-success" />
    },
    { 
      id: 5, 
      name: 'Acıbadem Hastanesi Maslak', 
      type: 'hospital', 
      distance: 5.3,
      capacity: null,
      icon: <Hospital className="h-5 w-5 text-emergency-primary" />
    },
  ];
  
  return (
    <div className="space-y-4">
      {emergencyLocations.map(location => (
        <Card key={location.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div className="flex items-start space-x-3">
                <div className="bg-white rounded-full p-2 shadow-sm">
                  {location.icon}
                </div>
                <div>
                  <h3 className="font-medium">{location.name}</h3>
                  <p className="text-xs text-emergency-dark/70 mt-1">
                    {location.type === 'assembly' && 'Acil Durum Toplanma Alanı'}
                    {location.type === 'hospital' && 'Hastane'}
                    {location.type === 'shelter' && 'Sığınak'}
                    {location.capacity && ` • Kapasite: ${location.capacity} kişi`}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-sm font-medium">{location.distance} km</span>
                <span className="text-xs text-emergency-dark/70">Yürüyerek ~{Math.round(location.distance * 12)} dk</span>
              </div>
            </div>
            <div className="flex justify-end mt-3">
              <Button variant="outline" size="sm" className="mr-2">
                <MapPin className="h-4 w-4 mr-1" />
                Haritada Göster
              </Button>
              <Button size="sm">
                <NavigationIcon className="h-4 w-4 mr-1" />
                Rota
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Maps;
