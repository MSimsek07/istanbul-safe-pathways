
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Map, MessageSquare, FileText, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import EmergencyStatusButton from '@/components/status/EmergencyStatusButton';

const Index = () => {
  return (
    <div className="space-y-8">
      {/* Emergency Alert */}
      <Card className="border-emergency-warning bg-emergency-warning/10">
        <CardHeader className="pb-2">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-emergency-warning" />
            <CardTitle className="text-emergency-warning">Acil Durum Bilgilendirmesi</CardTitle>
          </div>
          <CardDescription>Yanınızda bulundurmanız gereken önemli bilgiler</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm">
            <strong>İstanbul Acil Yardım</strong> uygulaması, deprem ve acil durumlar için tasarlanmıştır. 
            Bu uygulama tam olarak çalışabilmesi için konum izinlerine ihtiyaç duyar.
          </p>
          <p className="text-sm mt-2">
            <strong>Çevrimdışı mod etkinleştirildi.</strong> Uygulamanın tüm özellikleri internet bağlantısı olmadan da çalışacaktır.
          </p>
        </CardContent>
        <CardFooter>
          <EmergencyStatusButton />
        </CardFooter>
      </Card>

      {/* Quick Access Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <QuickAccessCard 
          title="Haritalar" 
          description="Güvenli bölgeler ve acil durum toplanma alanları" 
          icon={<Map className="h-8 w-8" />}
          color="bg-emergency-primary text-white"
          to="/maps"
        />
        
        <QuickAccessCard 
          title="İletişim" 
          description="Mesh ağı üzerinden mesajlaşma" 
          icon={<MessageSquare className="h-8 w-8" />}
          color="bg-emergency-accent text-white"
          to="/communication"
        />
        
        <QuickAccessCard 
          title="Acil Bilgiler" 
          description="İlk yardım ve acil durum rehberleri" 
          icon={<FileText className="h-8 w-8" />}
          color="bg-emergency-secondary text-white"
          to="/emergency-info"
        />
        
        <QuickAccessCard 
          title="Topluluk Yardımı" 
          description="Görev takibi ve kaynak yönetimi" 
          icon={<Users className="h-8 w-8" />}
          color="bg-emergency-success text-white"
          to="/community-response"
        />
      </div>
      
      {/* Emergency Contacts */}
      <Card>
        <CardHeader>
          <CardTitle>Acil Durum Telefon Numaraları</CardTitle>
          <CardDescription>Bu numaralar telefon hatları çalıştığında kullanılabilir</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <EmergencyContact title="AFAD" number="122" />
          <EmergencyContact title="Ambulans" number="112" />
          <EmergencyContact title="İtfaiye" number="110" />
          <EmergencyContact title="Polis" number="155" />
        </CardContent>
      </Card>
      
      {/* Latest Updates */}
      <Card>
        <CardHeader>
          <CardTitle>Son Güncellemeler</CardTitle>
          <CardDescription>Yarı çevrimdışı mesaj sistemi üzerinden alınan</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-l-4 border-emergency-primary pl-4 py-2">
            <p className="text-sm font-medium">Genel Uyarı - AFAD</p>
            <p className="text-xs text-muted-foreground">23.04.2025 10:45</p>
            <p className="text-sm mt-1">
              Kuzey Anadolu Fay Hattı üzerinde tespit edilen hareketliliklere karşı uyarı seviyesi turuncu olarak belirlenmiştir.
              Lütfen acil durum çantalarınızı hazır bulundurunuz.
            </p>
          </div>
          
          <div className="border-l-4 border-emergency-warning pl-4 py-2">
            <p className="text-sm font-medium">İçme Suyu Uyarısı - İBB</p>
            <p className="text-xs text-muted-foreground">22.04.2025 18:30</p>
            <p className="text-sm mt-1">
              Fatih ve Beyoğlu bölgelerinde içme suyu altyapısında hasar tespit edilmiştir. 
              Bu bölgelerde şebeke suyu içilmeden önce kaynatılmalıdır.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

interface QuickAccessCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  to: string;
}

const QuickAccessCard: React.FC<QuickAccessCardProps> = ({ title, description, icon, color, to }) => {
  return (
    <Link to={to}>
      <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
        <CardHeader className={`${color} rounded-t-lg`}>
          <div className="flex justify-center">{icon}</div>
        </CardHeader>
        <CardContent className="pt-4">
          <h3 className="font-semibold text-center">{title}</h3>
          <p className="text-xs text-center text-muted-foreground mt-1">{description}</p>
        </CardContent>
      </Card>
    </Link>
  );
};

interface EmergencyContactProps {
  title: string;
  number: string;
}

const EmergencyContact: React.FC<EmergencyContactProps> = ({ title, number }) => {
  return (
    <div className="flex justify-between items-center p-3 border rounded-lg">
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-sm text-emergency-dark/70">Acil Durum Hattı</p>
      </div>
      <Button variant="outline" className="font-bold">
        {number}
      </Button>
    </div>
  );
};

export default Index;
