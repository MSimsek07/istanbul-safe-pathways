
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  MessageSquare, Users, User, Send, Wifi, MapPin, Clock, CheckCheck, ChevronDown, Search
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import EmergencyStatusButton from '@/components/status/EmergencyStatusButton';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

const Communication = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">İletişim</h1>
        <EmergencyStatusButton />
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Mesh Ağı İletişimi</CardTitle>
              <CardDescription>Çevrimdışı mod aktif - 5 kişi bağlı</CardDescription>
            </div>
            <div className="flex items-center space-x-1 text-xs bg-emergency-light px-2 py-1 rounded">
              <Wifi className="h-3 w-3 text-emergency-warning" />
              <span>Çevrimdışı mod</span>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="pt-0">
          <Tabs defaultValue="messages" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="messages">
                <MessageSquare className="h-4 w-4 mr-2" />
                Mesajlar
              </TabsTrigger>
              <TabsTrigger value="nearby">
                <Users className="h-4 w-4 mr-2" />
                Yakındaki Kişiler
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="messages" className="mt-0">
              <ChatInterface />
            </TabsContent>
            
            <TabsContent value="nearby" className="mt-0">
              <NearbyUsers />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

const ChatInterface = () => {
  const [message, setMessage] = useState('');
  const channels = [
    { id: 1, name: 'Acil Durum Kanalı', unread: 3 },
    { id: 2, name: 'Kadıköy Bölgesi', unread: 0 },
    { id: 3, name: 'Yardım Koordinasyonu', unread: 5 }
  ];
  
  const [activeChannel, setActiveChannel] = useState(channels[0]);
  
  const messages = [
    {
      id: 1,
      sender: 'AFAD Bot',
      content: 'Merhaba, bu acil durum iletişim kanalına hoş geldiniz. Bu kanal üzerinden yardım talep edebilir ve önemli bilgileri paylaşabilirsiniz.',
      time: '10:15',
      avatar: 'AB',
      isBot: true
    },
    {
      id: 2,
      sender: 'Mehmet K.',
      content: 'Kadıköy İskele Meydanında toplanma alanında su ve battaniye eksikliği var. Yardım eden olur mu?',
      time: '10:23',
      avatar: 'MK',
      isBot: false
    },
    {
      id: 3,
      sender: 'Ayşe Y.',
      content: 'Rıhtım Caddesi açık ve güvenli. Oradan geçerek toplanma alanına ulaşabilirsiniz.',
      time: '10:28',
      location: 'Kadıköy, Rıhtım Caddesi',
      avatar: 'AY',
      isBot: false
    },
    {
      id: 4,
      sender: 'Siz',
      content: 'Battaniye ve 10 şişe su ile yola çıkıyorum. 15 dakika içinde orada olacağım.',
      time: '10:34',
      avatar: 'SZ',
      isCurrentUser: true
    }
  ];
  
  const handleSendMessage = () => {
    if (message.trim() !== '') {
      // In a real app, this would send a message through the mesh network
      console.log('Sending message:', message);
      setMessage('');
    }
  };
  
  return (
    <div className="flex flex-col h-[60vh] border rounded-lg">
      {/* Channel selection */}
      <div className="p-3 border-b flex justify-between items-center bg-background">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center justify-between w-56 px-3 text-left font-normal h-9">
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-2 text-emergency-primary" />
                <span>{activeChannel.name}</span>
              </div>
              <ChevronDown className="h-4 w-4 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Kanallar</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {channels.map(channel => (
              <DropdownMenuItem 
                key={channel.id} 
                onClick={() => setActiveChannel(channel)}
                className="flex justify-between"
              >
                <span>{channel.name}</span>
                {channel.unread > 0 && (
                  <span className="bg-emergency-primary text-white text-xs px-2 py-0.5 rounded-full">
                    {channel.unread}
                  </span>
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        
        <Button variant="ghost" size="icon">
          <Search className="h-4 w-4" />
        </Button>
      </div>
      
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(message => (
          <div 
            key={message.id} 
            className={`flex ${message.isCurrentUser ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex ${message.isCurrentUser ? 'flex-row-reverse' : 'flex-row'} max-w-[80%]`}>
              {!message.isCurrentUser && (
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarFallback className={message.isBot ? 'bg-emergency-primary text-white' : ''}>
                    {message.avatar}
                  </AvatarFallback>
                </Avatar>
              )}
              <div>
                {!message.isCurrentUser && (
                  <div className="flex items-center mb-1">
                    <span className="text-xs font-medium">{message.sender}</span>
                    <span className="text-xs text-emergency-dark/60 ml-2">{message.time}</span>
                  </div>
                )}
                <div 
                  className={`rounded-lg px-3 py-2 ${
                    message.isCurrentUser 
                      ? 'bg-emergency-primary text-white' 
                      : message.isBot 
                        ? 'bg-emergency-light' 
                        : 'bg-emergency-light/80'
                  }`}
                >
                  <p className="text-sm break-words">{message.content}</p>
                  {message.location && (
                    <div className="flex items-center mt-1 text-xs">
                      <MapPin className="h-3 w-3 mr-1" />
                      <span>{message.location}</span>
                    </div>
                  )}
                </div>
                {message.isCurrentUser && (
                  <div className="flex justify-end items-center mt-1">
                    <span className="text-xs text-emergency-dark/60 mr-1">{message.time}</span>
                    <CheckCheck className="h-3 w-3 text-emergency-primary" />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Message input */}
      <div className="p-3 border-t bg-background">
        <div className="flex space-x-2">
          <Input 
            placeholder="Mesajınızı yazın..." 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1"
            onKeyPress={e => e.key === 'Enter' && handleSendMessage()}
          />
          <Button 
            variant={message.trim() !== '' ? 'default' : 'outline'} 
            size="icon"
            onClick={handleSendMessage}
            disabled={message.trim() === ''}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex justify-between mt-2 text-xs text-emergency-dark/60">
          <div className="flex items-center">
            <Wifi className="h-3 w-3 mr-1 text-emergency-warning" />
            <span>Mesh ağı: 5 kişi bağlı</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            <span>Son senkronizasyon: 5dk önce</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const NearbyUsers = () => {
  const nearbyUsers = [
    {
      id: 1,
      name: 'Mehmet K.',
      status: 'safe',
      distance: 120,
      lastSeen: '2 dk önce',
      avatar: 'MK'
    },
    {
      id: 2,
      name: 'Ayşe Y.',
      status: 'safe',
      distance: 250,
      lastSeen: '5 dk önce',
      avatar: 'AY'
    },
    {
      id: 3,
      name: 'Ali B.',
      status: 'need-help',
      distance: 300,
      lastSeen: '1 dk önce',
      avatar: 'AB'
    },
    {
      id: 4,
      name: 'Zeynep M.',
      status: 'emergency',
      distance: 400,
      lastSeen: '7 dk önce',
      avatar: 'ZM'
    },
    {
      id: 5,
      name: 'Hüseyin T.',
      status: 'safe',
      distance: 550,
      lastSeen: '10 dk önce',
      avatar: 'HT'
    }
  ];
  
  const getStatusColor = (status) => {
    switch(status) {
      case 'safe': return 'bg-emergency-success';
      case 'need-help': return 'bg-emergency-warning';
      case 'emergency': return 'bg-emergency-danger animate-pulse';
      default: return 'bg-emergency-dark/30';
    }
  };
  
  const getStatusText = (status) => {
    switch(status) {
      case 'safe': return 'Güvende';
      case 'need-help': return 'Yardım İstiyor';
      case 'emergency': return 'ACİL DURUM';
      default: return 'Bilinmiyor';
    }
  };
  
  return (
    <>
      <div className="flex items-center space-x-2 mb-4">
        {/* Fixed here: Changed from using startIcon prop to using a wrapping div with flexbox */}
        <div className="relative w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-emergency-dark/40" />
          <Input 
            placeholder="İsim ile ara..." 
            className="pl-9" 
          />
        </div>
      </div>
      
      <div className="border rounded-lg overflow-hidden">
        <div className="grid grid-cols-[auto_1fr_auto] gap-4 p-3 bg-emergency-light/50 border-b font-medium text-sm">
          <div>Kişi</div>
          <div>Durum</div>
          <div>Mesafe</div>
        </div>
        
        <div className="max-h-[50vh] overflow-y-auto">
          {nearbyUsers.map(user => (
            <div key={user.id} className="grid grid-cols-[auto_1fr_auto] gap-4 p-3 border-b items-center hover:bg-emergency-light/30 transition-colors">
              <div className="flex items-center space-x-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback>{user.avatar}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-sm">{user.name}</p>
                  <p className="text-xs text-emergency-dark/60">{user.lastSeen}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${getStatusColor(user.status)}`}></div>
                <span className="text-sm">{getStatusText(user.status)}</span>
              </div>
              
              <div className="text-right">
                <p className="font-medium text-sm">{user.distance}m</p>
                <Button variant="outline" size="sm" className="mt-1">
                  <MessageSquare className="h-3 w-3 mr-1" />
                  Mesaj
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-4 text-xs text-emergency-dark/70 flex justify-between">
        <span>Son güncelleme: 2 dakika önce</span>
        <span>Çevrede 5 cihaz bulundu</span>
      </div>
    </>
  );
};

export default Communication;
