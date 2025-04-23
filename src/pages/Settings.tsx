
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Settings as SettingsIcon, Download, Accessibility, Languages, Database, 
  MapPin, Moon, Sun, Wifi, WifiOff, BatteryMedium, Share2
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { toast } from '@/components/ui/sonner';

const Settings = () => {
  const [language, setLanguage] = useState('tr');
  const [fontSize, setFontSize] = useState(100);
  const [highContrast, setHighContrast] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [offlineMode, setOfflineMode] = useState(true);
  const [lowPowerMode, setLowPowerMode] = useState(true);
  const [locationSharing, setLocationSharing] = useState(true);
  const [autoSync, setAutoSync] = useState(true);
  
  const handleDownloadMaps = () => {
    toast.success("İstanbul haritaları çevrimdışı kullanım için indirildi.", {
      description: "Tüm mahalleler ve acil durum noktaları artık çevrimdışı kullanılabilir."
    });
  };
  
  const handleClearData = () => {
    toast.success("Önbellek ve geçici veriler temizlendi.", {
      description: "Acil durum verileri ve önemli ayarlar korundu."
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Ayarlar</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Accessibility Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Accessibility className="h-5 w-5 mr-2" />
              Erişilebilirlik
            </CardTitle>
            <CardDescription>Uygulama görünümünü özelleştirin</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="fontSize">Yazı Tipi Boyutu</Label>
              <div className="flex items-center space-x-2">
                <span className="text-sm">A</span>
                <Slider 
                  id="fontSize" 
                  min={75} 
                  max={150} 
                  step={25} 
                  value={[fontSize]} 
                  onValueChange={(value) => setFontSize(value[0])} 
                />
                <span className="text-lg">A</span>
              </div>
              <p className="text-xs text-emergency-dark/70">
                Mevcut boyut: {fontSize}%
              </p>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="highContrast">Yüksek Kontrast Modu</Label>
                <p className="text-xs text-emergency-dark/70">
                  Erişilebilirliği artırmak için kontrastı arttırır
                </p>
              </div>
              <Switch 
                id="highContrast" 
                checked={highContrast} 
                onCheckedChange={setHighContrast} 
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="darkMode">Karanlık Mod</Label>
                <p className="text-xs text-emergency-dark/70">
                  Gece kullanımı için ekranı karartır
                </p>
              </div>
              <div className="flex space-x-2 items-center">
                <Sun className="h-4 w-4 text-emergency-warning" />
                <Switch 
                  id="darkMode" 
                  checked={darkMode} 
                  onCheckedChange={setDarkMode} 
                />
                <Moon className="h-4 w-4 text-emergency-dark/70" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Language Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Languages className="h-5 w-5 mr-2" />
              Dil Ayarları
            </CardTitle>
            <CardDescription>Uygulama dilini değiştirin</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="language">Dil Seçimi</Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger id="language">
                  <SelectValue placeholder="Dil seçin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tr">Türkçe</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="ar">العربية</SelectItem>
                  <SelectItem value="ku">Kurdî</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-emergency-dark/70">
                Uygulamanın arayüz dili değişecektir
              </p>
            </div>
          </CardContent>
        </Card>
        
        {/* Network and Battery Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BatteryMedium className="h-5 w-5 mr-2" />
              Ağ ve Pil Ayarları
            </CardTitle>
            <CardDescription>Çevrimdışı mod ve enerji tasarrufu</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="offlineMode" className="flex items-center">
                  {offlineMode ? (
                    <WifiOff className="h-4 w-4 mr-1.5 text-emergency-warning" />
                  ) : (
                    <Wifi className="h-4 w-4 mr-1.5 text-emergency-success" />
                  )}
                  <span>Çevrimdışı Mod</span>
                </Label>
                <p className="text-xs text-emergency-dark/70">
                  İnternet olmadığında mesh ağı kullanır
                </p>
              </div>
              <Switch 
                id="offlineMode" 
                checked={offlineMode} 
                onCheckedChange={setOfflineMode} 
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="lowPowerMode">Düşük Güç Modu</Label>
                <p className="text-xs text-emergency-dark/70">
                  Pil tüketimini azaltır, bazı özellikler kısıtlanabilir
                </p>
              </div>
              <Switch 
                id="lowPowerMode" 
                checked={lowPowerMode} 
                onCheckedChange={setLowPowerMode} 
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="locationSharing">Konum Paylaşımı</Label>
                <p className="text-xs text-emergency-dark/70">
                  Acil durumda konumunuz yardım ekipleriyle paylaşılır
                </p>
              </div>
              <Switch 
                id="locationSharing" 
                checked={locationSharing} 
                onCheckedChange={setLocationSharing} 
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="autoSync">Otomatik Senkronizasyon</Label>
                <p className="text-xs text-emergency-dark/70">
                  İnternet bağlantısı olduğunda verileri günceller
                </p>
              </div>
              <Switch 
                id="autoSync" 
                checked={autoSync} 
                onCheckedChange={setAutoSync} 
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" onClick={() => toast.info("Uygulama manuel olarak senkronize ediliyor...")}>
              Şimdi Senkronize Et
            </Button>
          </CardFooter>
        </Card>
        
        {/* Data Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Database className="h-5 w-5 mr-2" />
              Veri Yönetimi
            </CardTitle>
            <CardDescription>Çevrimdışı veriler ve depolama</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium">Depolama Kullanımı</p>
                <div className="mt-1.5 h-2.5 w-full bg-emergency-light rounded-full overflow-hidden">
                  <div className="h-full bg-emergency-primary rounded-full" style={{ width: '35%' }}></div>
                </div>
                <div className="flex justify-between mt-1">
                  <p className="text-xs text-emergency-dark/70">124 MB kullanılıyor</p>
                  <p className="text-xs text-emergency-dark/70">500 MB toplam</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm font-medium">Çevrimdışı Haritalar</p>
                <div className="flex justify-between items-center text-xs text-emergency-dark/70">
                  <span>İstanbul bölgesi haritaları</span>
                  <span>92 MB</span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full flex items-center"
                  onClick={handleDownloadMaps}
                >
                  <Download className="h-4 w-4 mr-1.5" />
                  Haritaları Güncelle
                </Button>
              </div>
              
              <div className="pt-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full text-emergency-danger border-emergency-danger/30"
                  onClick={handleClearData}
                >
                  Geçici Verileri Temizle
                </Button>
                <p className="text-xs text-emergency-dark/60 mt-1">
                  Önemli acil durum verileri korunacaktır
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Share App Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Share2 className="h-5 w-5 mr-2" />
              Uygulamayı Paylaş
            </CardTitle>
            <CardDescription>
              Acil durumda en hızlı iletişim için
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              Bu uygulamayı aileniz ve arkadaşlarınızla paylaşarak, acil durumlarda birbirinizle iletişim kurmanızı sağlayabilirsiniz. 
              Çevrimdışı haritalara ve mesh ağı üzerinden iletişim özelliklerine sahip olabilirler.
            </p>
            <div className="flex items-center justify-center space-x-4 mt-4">
              <Button onClick={() => toast.success("Uygulama bağlantısı kopyalandı!")}>Paylaş</Button>
              <Button variant="outline" onClick={() => toast.success("QR kod kopyalandı!")}>QR Kod</Button>
            </div>
          </CardContent>
        </Card>
        
        {/* About App Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <SettingsIcon className="h-5 w-5 mr-2" />
              Uygulama Hakkında
            </CardTitle>
            <CardDescription>
              Sürüm bilgileri ve katkıda bulunanlar
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">İstanbul Acil Yardım</h3>
                <p className="text-sm text-emergency-dark/70">Sürüm 1.0.0</p>
                <p className="text-xs text-emergency-dark/60 mt-1">Son güncelleme: 23.04.2025</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium">İşbirliği</h4>
                <p className="text-xs text-emergency-dark/70">
                  İstanbul Büyükşehir Belediyesi, AFAD ve gönüllü yazılım geliştiricileri tarafından hazırlanmıştır.
                </p>
              </div>
              
              <p className="text-xs text-emergency-dark/60 border-t pt-2">
                © 2025 İstanbul Acil Yardım. Tüm hakları saklıdır.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
