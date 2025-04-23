
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  AlertTriangle, Shield, Stethoscope, Phone, FileText, Search, ChevronDown, ChevronUp
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const EmergencyInfo = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Acil Bilgiler</h1>
        <div className="flex items-center space-x-2">
          <Input 
            placeholder="Bilgi ara..." 
            className="w-64" 
            onChange={e => setSearchQuery(e.target.value)} 
            value={searchQuery}
          />
        </div>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Acil Durum Rehberleri</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <Tabs defaultValue="earthquake" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="earthquake">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Deprem
              </TabsTrigger>
              <TabsTrigger value="firstaid">
                <Stethoscope className="h-4 w-4 mr-2" />
                İlk Yardım
              </TabsTrigger>
              <TabsTrigger value="contacts">
                <Phone className="h-4 w-4 mr-2" />
                İletişim
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="earthquake" className="mt-4 space-y-4">
              <EarthquakeInfo searchQuery={searchQuery} />
            </TabsContent>
            
            <TabsContent value="firstaid" className="mt-4 space-y-4">
              <FirstAidInfo searchQuery={searchQuery} />
            </TabsContent>
            
            <TabsContent value="contacts" className="mt-4 space-y-4">
              <ContactsInfo searchQuery={searchQuery} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

const EarthquakeInfo = ({ searchQuery }) => {
  const earthquakeItems = [
    {
      title: 'Deprem Anında Yapılması Gerekenler',
      content: `
        <p class="mb-2"><strong>Bina İçindeyseniz:</strong></p>
        <ul class="list-disc pl-5 mb-4 space-y-1">
          <li>Panik yapmayın ve sakin kalın.</li>
          <li>Çök-Kapan-Tutun hareketi yapın: Yere çökün, başınızı ve boynunuzu koruyun, sarsıntı geçene kadar sabit bir yere tutunun.</li>
          <li>Pencerelerden, dış duvarlardan, tehlikeli eşyalardan uzak durun.</li>
          <li>Sarsıntı durana kadar bulunduğunuz yerde kalın.</li>
          <li>Sarsıntı bitince bina dışına çıkmaya çalışın.</li>
        </ul>
        
        <p class="mb-2"><strong>Dışarıdaysanız:</strong></p>
        <ul class="list-disc pl-5 space-y-1">
          <li>Binalardan, elektrik direklerinden uzaklaşın.</li>
          <li>Açık alanda, düşme tehlikesi olan nesnelerden uzakta çömelin.</li>
          <li>Aracın içindeyseniz, aracınızı güvenli bir yere çekip içinde kalın.</li>
        </ul>
      `
    },
    {
      title: 'Deprem Sonrası İlk Dakikalar',
      content: `
        <ul class="list-disc pl-5 space-y-1">
          <li>Etrafınızdaki insanların durumunu kontrol edin.</li>
          <li>Önce "Güvendeyim" bilgisini paylaşın.</li>
          <li>Yaralı varsa ilk yardım uygulayın, acil yardım gerektiren durumları bildirin.</li>
          <li>Gaz, elektrik ve su vanalarını kapatın.</li>
          <li>Açık ateş kullanmayın, kibrit ve çakmak yakmayın.</li>
          <li>Telefon hatlarını acil durumlar dışında meşgul etmeyin.</li>
          <li>Hasarlı binalara girmeyin.</li>
        </ul>
      `
    },
    {
      title: 'Deprem Çantası Hazırlama',
      content: `
        <p class="mb-2">Deprem çantasında bulunması gereken malzemeler:</p>
        <ul class="list-disc pl-5 space-y-1">
          <li>Su (kişi başı günlük 2 litre, en az 3 günlük)</li>
          <li>Bozulmayacak gıdalar (konserve, kuru yiyecek, enerji barları)</li>
          <li>El feneri ve yedek piller</li>
          <li>İlk yardım çantası ve kişisel ilaçlar</li>
          <li>Düdük (yardım çağırmak için)</li>
          <li>Toz maskesi, plastik örtü, duct tape</li>
          <li>Islak mendil, çöp torbası, hijyen malzemeleri</li>
          <li>Yerel harita</li>
          <li>Cep telefonu ve portatif şarj cihazı</li>
          <li>Aile üyelerinin önemli belgelerinin kopyaları (kimlik, sigorta, vb.)</li>
          <li>Nakit para ve bozuk para</li>
          <li>Battaniye veya uyku tulumu</li>
        </ul>
        <p class="mt-2">Bu çanta kolay ulaşılabilir bir yerde olmalı ve düzenli kontrol edilmelidir.</p>
      `
    },
    {
      title: 'Güvenli Toplanma Alanları',
      content: `
        <p class="mb-2">İstanbul'da AFAD ve belediyeler tarafından belirlenen Güvenli Toplanma Alanları:</p>
        <ul class="list-disc pl-5 space-y-1">
          <li>Açık alanlar (park, bahçe, spor sahaları)</li>
          <li>Resmî toplanma alanları (ilçe bazında belirlenmiş alanlar)</li>
        </ul>
        <p class="mt-2">Haritalar bölümünden size en yakın toplanma alanını görebilirsiniz.</p>
        <p class="mt-2"><strong>Önemli Not:</strong> Önceden yaşadığınız bölgedeki en yakın toplanma alanlarının yerlerini öğrenin.</p>
      `
    },
    {
      title: 'Binaların Depreme Hazırlığı',
      content: `
        <ul class="list-disc pl-5 space-y-1">
          <li>Binanızın deprem yönetmeliğine uygunluğunu kontrol ettirin.</li>
          <li>Dolap, kitaplık gibi devrilebilecek eşyaları duvara sabitleyin.</li>
          <li>Ağır eşyaları alt raflara yerleştirin.</li>
          <li>Asılı duran ağır objeleri kaldırın.</li>
          <li>Doğal gaz, elektrik ve su tesisatını kontrol ettirin.</li>
          <li>Acil çıkış planı hazırlayın ve aile bireyleriyle paylaşın.</li>
        </ul>
      `
    },
  ];
  
  // Filter items based on search query
  const filteredItems = searchQuery
    ? earthquakeItems.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.content.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : earthquakeItems;
  
  return (
    <div className="space-y-4">
      <div className="bg-emergency-danger/10 border border-emergency-danger/30 rounded-lg p-4 flex items-start">
        <AlertTriangle className="h-5 w-5 text-emergency-danger mr-3 mt-0.5" />
        <div>
          <h3 className="font-medium text-emergency-danger">Deprem Bölgesindeyseniz</h3>
          <p className="text-sm mt-1">
            Deprem anında ve sonrasında yapmanız gerekenler hakkında önemli bilgiler aşağıda paylaşılmıştır.
            Bu bilgiler hayat kurtarabilir.
          </p>
        </div>
      </div>
      
      <Accordion type="single" collapsible className="w-full">
        {filteredItems.map((item, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger>
              <div className="flex items-center">
                <FileText className="h-4 w-4 mr-2 text-emergency-primary" />
                <span>{item.title}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="prose prose-sm max-w-none text-sm" dangerouslySetInnerHTML={{ __html: item.content }} />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      
      {filteredItems.length === 0 && (
        <div className="text-center py-8">
          <Search className="h-10 w-10 text-emergency-dark/20 mx-auto mb-2" />
          <p className="text-emergency-dark/60">"{searchQuery}" ile ilgili bilgi bulunamadı.</p>
        </div>
      )}
    </div>
  );
};

const FirstAidInfo = ({ searchQuery }) => {
  const firstAidItems = [
    {
      title: 'Temel İlk Yardım Prensipleri',
      content: `
        <ul class="list-disc pl-5 space-y-1">
          <li>Önce kendi güvenliğinizi sağlayın.</li>
          <li>Yardım çağırın veya çağırtın.</li>
          <li>Sakin olun ve yaralıyı sakinleştirin.</li>
          <li>Yaralıyı dikkatlice değerlendirin.</li>
          <li>Müdahale ettiğiniz kişiyi sıcak tutun ve rahatlatın.</li>
          <li>Yaralıyı gereksiz yere hareket ettirmeyin.</li>
        </ul>
      `
    },
    {
      title: 'Kanama Kontrolü',
      content: `
        <ul class="list-disc pl-5 space-y-1">
          <li>Temiz bir bez veya gazlı bez kullanarak kanayan bölgeye doğrudan basınç uygulayın.</li>
          <li>Yaralı bölgeyi kalp seviyesinden yukarıda tutun.</li>
          <li>Basıncı en az 15 dakika sürdürün.</li>
          <li>Kanama durmazsa, basınç noktalarını kullanın.</li>
          <li>Turnike kullanımı son çare olmalıdır ve sadece uzuv kanamasında uygulanmalıdır.</li>
        </ul>
      `
    },
    {
      title: 'Kırık ve Burkulmalar',
      content: `
        <ul class="list-disc pl-5 space-y-1">
          <li>Yaralı bölgeyi hareket ettirmeyin.</li>
          <li>Şişlik ve ağrıyı azaltmak için bölgeyi soğuk kompres uygulayın (20 dakika).</li>
          <li>Etkilenen bölgeyi bandaj ile sarın veya atelle sabitleyin.</li>
          <li>Kırık şüphesi varsa, profesyonel yardım gelene kadar hareketsiz tutun.</li>
          <li>Açık kırıklarda, önce kanamayı kontrol edin, sonra steril bir örtü ile kapatın.</li>
        </ul>
      `
    },
    {
      title: 'Bilinç Kaybı ve Temel Yaşam Desteği',
      content: `
        <p class="mb-2">Bilinç kaybı durumunda:</p>
        <ol class="list-decimal pl-5 space-y-1 mb-4">
          <li>Kişinin tepkisini kontrol edin (omuzlarından tutup hafifçe sarsın ve "İyi misiniz?" diye sorun).</li>
          <li>Tepki yoksa, yardım çağırın.</li>
          <li>Solunum yolunu açın: Bir elinizi kişinin alnına, diğerini çenesine yerleştirerek başını hafifçe geriye yatırın.</li>
          <li>Solunumu kontrol edin (bak-dinle-hisset): Göğüs hareketlerini izleyin, nefes sesini dinleyin, nefesini yanağınızda hissetmeye çalışın.</li>
          <li>Normal solunum varsa, kişiyi koma pozisyonuna (yan yatış) getirin.</li>
          <li>Normal solunum yoksa, kalp masajı uygulayın: Göğüs ortasına, dakikada 100-120 bası hızında, 5-6 cm derinliğinde bası uygulayın.</li>
        </ol>
        <p class="font-semibold">Önemli: Temel yaşam desteği konusunda eğitim almak, acil durumlarda hayat kurtarmak için çok önemlidir.</p>
      `
    },
    {
      title: 'Yanıklar',
      content: `
        <ul class="list-disc pl-5 space-y-1">
          <li>Yanık bölgesini soğuk (ılık değil) su altında en az 10 dakika tutun.</li>
          <li>Yanık üzerine yağ, diş macunu vb. maddeler sürmeyin.</li>
          <li>Yanık bölgede oluşan kabarcıkları patlatmayın.</li>
          <li>Steril, yapışmayan bir bandaj veya temiz bir bezle hafifçe örtün.</li>
          <li>Geniş veya derin yanıklarda mutlaka tıbbi yardım alın.</li>
        </ul>
      `
    },
  ];
  
  // Filter items based on search query
  const filteredItems = searchQuery
    ? firstAidItems.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.content.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : firstAidItems;
  
  return (
    <div className="space-y-4">
      <div className="bg-emergency-success/10 border border-emergency-success/30 rounded-lg p-4 flex items-start">
        <Stethoscope className="h-5 w-5 text-emergency-success mr-3 mt-0.5" />
        <div>
          <h3 className="font-medium text-emergency-success">İlk Yardım Bilgileri</h3>
          <p className="text-sm mt-1">
            Aşağıdaki bilgiler temel ilk yardım uygulamaları için rehber niteliğindedir.
            Mümkünse profesyonel tıbbi yardım beklerken bu adımları uygulayın.
          </p>
        </div>
      </div>
      
      <Accordion type="single" collapsible className="w-full">
        {filteredItems.map((item, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger>
              <div className="flex items-center">
                <FileText className="h-4 w-4 mr-2 text-emergency-primary" />
                <span>{item.title}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="prose prose-sm max-w-none text-sm" dangerouslySetInnerHTML={{ __html: item.content }} />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      
      {filteredItems.length === 0 && (
        <div className="text-center py-8">
          <Search className="h-10 w-10 text-emergency-dark/20 mx-auto mb-2" />
          <p className="text-emergency-dark/60">"{searchQuery}" ile ilgili bilgi bulunamadı.</p>
        </div>
      )}
    </div>
  );
};

const ContactsInfo = ({ searchQuery }) => {
  const emergencyContacts = [
    {
      category: 'Acil Durum Numaraları',
      contacts: [
        { name: 'AFAD', number: '122', description: 'Afet ve Acil Durum Yönetimi Başkanlığı' },
        { name: 'Ambulans', number: '112', description: 'Sağlık acil durum hattı' },
        { name: 'İtfaiye', number: '110', description: 'Yangın, kurtarma ve diğer acil durumlar' },
        { name: 'Polis', number: '155', description: 'Güvenlik hizmetleri' },
        { name: 'Jandarma', number: '156', description: 'Kırsal bölgelerde güvenlik hizmetleri' }
      ]
    },
    {
      category: 'İstanbul İlçe AFAD Merkezleri',
      contacts: [
        { name: 'Kadıköy AFAD', number: '0216 XXX XX XX', description: 'Kadıköy İlçe AFAD Koordinasyon Merkezi' },
        { name: 'Beşiktaş AFAD', number: '0212 XXX XX XX', description: 'Beşiktaş İlçe AFAD Koordinasyon Merkezi' },
        { name: 'Fatih AFAD', number: '0212 XXX XX XX', description: 'Fatih İlçe AFAD Koordinasyon Merkezi' },
        { name: 'Üsküdar AFAD', number: '0216 XXX XX XX', description: 'Üsküdar İlçe AFAD Koordinasyon Merkezi' },
        { name: 'Beyoğlu AFAD', number: '0212 XXX XX XX', description: 'Beyoğlu İlçe AFAD Koordinasyon Merkezi' }
      ]
    },
    {
      category: 'Hastaneler',
      contacts: [
        { name: 'İstanbul Tıp Fakültesi Hastanesi', number: '0212 XXX XX XX', description: 'Çapa, Fatih' },
        { name: 'Haydarpaşa Numune Hastanesi', number: '0216 XXX XX XX', description: 'Üsküdar' },
        { name: 'Şişli Etfal Hastanesi', number: '0212 XXX XX XX', description: 'Şişli' },
        { name: 'Marmara Üniversitesi Hastanesi', number: '0216 XXX XX XX', description: 'Maltepe' },
        { name: 'Kartal Lütfi Kırdar Hastanesi', number: '0216 XXX XX XX', description: 'Kartal' }
      ]
    }
  ];
  
  // Filter contacts based on search query
  const filteredContacts = searchQuery
    ? emergencyContacts.map(category => ({
        ...category,
        contacts: category.contacts.filter(contact => 
          contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          contact.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          contact.number.includes(searchQuery)
        )
      })).filter(category => category.contacts.length > 0)
    : emergencyContacts;
  
  return (
    <div className="space-y-4">
      <div className="bg-emergency-primary/10 border border-emergency-primary/30 rounded-lg p-4 flex items-start">
        <Phone className="h-5 w-5 text-emergency-primary mr-3 mt-0.5" />
        <div>
          <h3 className="font-medium text-emergency-primary">Önemli İletişim Bilgileri</h3>
          <p className="text-sm mt-1">
            Aşağıdaki numaralar, acil durumlarda iletişim kurmanız gereken kurumları içermektedir.
            Telefon hatları çalıştığında bu numaraları kullanabilirsiniz.
          </p>
        </div>
      </div>
      
      {filteredContacts.map((category, categoryIndex) => (
        <Card key={categoryIndex}>
          <CardHeader className="py-3">
            <CardTitle className="text-base">{category.category}</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-2">
              {category.contacts.map((contact, contactIndex) => (
                <div key={contactIndex} className="flex justify-between items-center p-3 border rounded-lg hover:bg-emergency-light/50 transition-colors">
                  <div>
                    <p className="font-medium">{contact.name}</p>
                    <p className="text-xs text-emergency-dark/70">{contact.description}</p>
                  </div>
                  <div className="font-bold text-emergency-primary">{contact.number}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
      
      {filteredContacts.length === 0 && (
        <div className="text-center py-8">
          <Search className="h-10 w-10 text-emergency-dark/20 mx-auto mb-2" />
          <p className="text-emergency-dark/60">"{searchQuery}" ile ilgili iletişim bilgisi bulunamadı.</p>
        </div>
      )}
    </div>
  );
};

export default EmergencyInfo;
