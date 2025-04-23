import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Users, List, CheckCircle, PlusCircle, SearchIcon, Filter, ChevronDown, 
  MapPin, Clock, User, PackageOpen, Clipboard, Briefcase
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { toast } from '@/components/ui/sonner';

const CommunityResponse = () => {
  const [activeTab, setActiveTab] = useState('tasks');
  const [searchQuery, setSearchQuery] = useState('');
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Topluluk Yardımı</h1>
        <Button>
          <PlusCircle className="h-4 w-4 mr-2" />
          Yeni Görev Ekle
        </Button>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Topluluk Yanıt Koordinasyonu</CardTitle>
              <CardDescription>Görevleri takip edin ve kaynakları yönetin</CardDescription>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="pt-0">
          <Tabs defaultValue="tasks" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="tasks">
                <Clipboard className="h-4 w-4 mr-2" />
                Görevler
              </TabsTrigger>
              <TabsTrigger value="resources">
                <PackageOpen className="h-4 w-4 mr-2" />
                Kaynaklar
              </TabsTrigger>
              <TabsTrigger value="teams">
                <Users className="h-4 w-4 mr-2" />
                Ekipler
              </TabsTrigger>
            </TabsList>
            
            <div className="flex items-center justify-between mt-4 mb-6">
              <div className="relative flex-1 max-w-sm">
                <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-emergency-dark/40" />
                <Input 
                  type="search" 
                  placeholder={
                    activeTab === 'tasks' ? "Görevlerde ara..." :
                    activeTab === 'resources' ? "Kaynaklarda ara..." :
                    "Ekiplerde ara..."
                  } 
                  className="pl-9" 
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="ml-2">
                    <Filter className="h-4 w-4 mr-2" />
                    Filtrele
                    <ChevronDown className="h-4 w-4 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>Sıralama</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem checked>En Yeni</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>Öncelik (Yüksek-Düşük)</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>Yakınlık</DropdownMenuCheckboxItem>
                  
                  {activeTab === 'tasks' && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuLabel>Durum</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuCheckboxItem checked>Bekleyen</DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem checked>Devam Eden</DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem>Tamamlanan</DropdownMenuCheckboxItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            <TabsContent value="tasks" className="mt-0 space-y-4">
              <TasksList searchQuery={searchQuery} />
            </TabsContent>
            
            <TabsContent value="resources" className="mt-0 space-y-4">
              <ResourcesList searchQuery={searchQuery} />
            </TabsContent>
            
            <TabsContent value="teams" className="mt-0 space-y-4">
              <TeamsList searchQuery={searchQuery} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

const TasksList = ({ searchQuery }) => {
  const tasks = [
    {
      id: 1,
      title: 'Su Dağıtımı - Kadıköy',
      description: "Kadıköy Meydanı'ndaki toplanma alanına 100 şişe su götürülmesi gerekiyor.",
      priority: 'high',
      status: 'pending',
      location: 'Kadıköy Meydanı',
      dueTime: '2 saat içinde',
      assignedTeam: 'Gönüllü Ekibi A',
      progress: 0,
      volunteers: 2,
      volunteersNeeded: 5
    },
    {
      id: 2,
      title: 'Battaniye Dağıtımı',
      description: 'Beşiktaş toplanma alanındaki ailelere 50 battaniye dağıtılacak.',
      priority: 'medium',
      status: 'in-progress',
      location: 'Beşiktaş Meydanı',
      dueTime: '5 saat içinde',
      assignedTeam: 'Gönüllü Ekibi B',
      progress: 45,
      volunteers: 4,
      volunteersNeeded: 4
    },
    {
      id: 3,
      title: 'Çocuk Bakımı Desteği',
      description: 'Fatih toplanma alanında çocuklar için geçici bakım alanı oluşturulacak.',
      priority: 'high',
      status: 'in-progress',
      location: 'Fatih Parkı',
      dueTime: '3 saat içinde',
      assignedTeam: 'Eğitimci Gönüllüler',
      progress: 25,
      volunteers: 3,
      volunteersNeeded: 6
    },
    {
      id: 4,
      title: 'İlk Yardım Malzemesi Teslimatı',
      description: 'Üsküdar toplanma noktasına acil ilk yardım malzemeleri götürülecek.',
      priority: 'urgent',
      status: 'pending',
      location: 'Üsküdar Sahili',
      dueTime: '1 saat içinde',
      assignedTeam: 'Sağlık Ekibi',
      progress: 0,
      volunteers: 1,
      volunteersNeeded: 3
    },
    {
      id: 5,
      title: 'Gıda Paketi Hazırlama',
      description: 'Beyoğlu bölgesi için 200 adet acil gıda paketi hazırlanacak.',
      priority: 'medium',
      status: 'in-progress',
      location: 'Beyoğlu Lojistik Merkezi',
      dueTime: '6 saat içinde',
      assignedTeam: 'Lojistik Ekibi',
      progress: 65,
      volunteers: 8,
      volunteersNeeded: 10
    }
  ];
  
  const filteredTasks = searchQuery
    ? tasks.filter(task => 
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.assignedTeam.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : tasks;
  
  const getPriorityBadge = (priority) => {
    switch(priority) {
      case 'urgent':
        return <Badge variant="destructive">Acil</Badge>;
      case 'high':
        return <Badge className="bg-emergency-warning">Yüksek</Badge>;
      case 'medium':
        return <Badge variant="secondary">Orta</Badge>;
      default:
        return <Badge variant="outline">Düşük</Badge>;
    }
  };
  
  const getStatusBadge = (status) => {
    switch(status) {
      case 'pending':
        return <Badge variant="outline" className="border-emergency-warning text-emergency-warning">Bekliyor</Badge>;
      case 'in-progress':
        return <Badge variant="outline" className="border-emergency-primary text-emergency-primary">Devam Ediyor</Badge>;
      case 'completed':
        return <Badge variant="outline" className="border-emergency-success text-emergency-success">Tamamlandı</Badge>;
      default:
        return <Badge variant="outline">Bilinmiyor</Badge>;
    }
  };
  
  const handleVolunteer = (taskId) => {
    toast.success("Göreve katılım talebiniz gönderildi. Ekip koordinatörü sizinle iletişime geçecek.");
  };
  
  return (
    <div className="space-y-4">
      {filteredTasks.map(task => (
        <Card key={task.id}>
          <CardHeader className="pb-2">
            <div className="flex justify-between">
              <CardTitle className="text-base">{task.title}</CardTitle>
              {getPriorityBadge(task.priority)}
            </div>
            <CardDescription className="flex items-center space-x-2">
              <MapPin className="h-3 w-3" />
              <span>{task.location}</span>
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-3">
            <p className="text-sm mb-2">{task.description}</p>
            <div className="flex justify-between items-center mt-3">
              <div className="flex items-center">
                <Clock className="h-4 w-4 text-emergency-dark/60 mr-1.5" />
                <span className="text-xs text-emergency-dark/80">{task.dueTime}</span>
              </div>
              {getStatusBadge(task.status)}
            </div>
            {task.status === 'in-progress' && (
              <div className="mt-2">
                <div className="flex justify-between text-xs mb-1">
                  <span>İlerleme</span>
                  <span>{task.progress}%</span>
                </div>
                <Progress value={task.progress} className="h-2" />
              </div>
            )}
            <div className="flex justify-between mt-3">
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-1.5 text-emergency-dark/80" />
                <span className="text-xs">{task.volunteers}/{task.volunteersNeeded} Gönüllü</span>
              </div>
              <span className="text-xs text-emergency-dark/60">{task.assignedTeam}</span>
            </div>
          </CardContent>
          <CardFooter className="pt-0 flex justify-end">
            <Button size="sm" variant="outline" className="mr-2">Detaylar</Button>
            <Button 
              size="sm" 
              variant={task.volunteers < task.volunteersNeeded ? "default" : "secondary"}
              disabled={task.volunteers >= task.volunteersNeeded}
              onClick={() => handleVolunteer(task.id)}
            >
              {task.volunteers < task.volunteersNeeded ? "Katıl" : "Doldu"}
            </Button>
          </CardFooter>
        </Card>
      ))}
      
      {filteredTasks.length === 0 && (
        <div className="text-center py-8">
          <List className="h-10 w-10 text-emergency-dark/20 mx-auto mb-2" />
          <p className="text-emergency-dark/60">"{searchQuery}" ile ilgili görev bulunamadı.</p>
        </div>
      )}
    </div>
  );
};

const ResourcesList = ({ searchQuery }) => {
  const resources = [
    {
      id: 1,
      name: 'İçme Suyu',
      type: 'essential',
      quantity: 500,
      unit: 'şişe (0.5L)',
      location: 'Kadıköy Dağıtım Merkezi',
      status: 'available',
      needsRefill: false
    },
    {
      id: 2,
      name: 'Battaniye',
      type: 'essential',
      quantity: 85,
      unit: 'adet',
      location: 'Beşiktaş Dağıtım Merkezi',
      status: 'low',
      needsRefill: true
    },
    {
      id: 3,
      name: 'İlk Yardım Seti',
      type: 'medical',
      quantity: 120,
      unit: 'adet',
      location: 'Fatih Dağıtım Merkezi',
      status: 'available',
      needsRefill: false
    },
    {
      id: 4,
      name: 'Bebek Maması',
      type: 'essential',
      quantity: 30,
      unit: 'paket',
      location: 'Üsküdar Dağıtım Merkezi',
      status: 'low',
      needsRefill: true
    },
    {
      id: 5,
      name: 'Hijyen Kiti',
      type: 'essential',
      quantity: 200,
      unit: 'adet',
      location: 'Beyoğlu Dağıtım Merkezi',
      status: 'available',
      needsRefill: false
    }
  ];
  
  const filteredResources = searchQuery
    ? resources.filter(resource => 
        resource.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        resource.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.location.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : resources;
  
  const getResourceTypeBadge = (type) => {
    switch(type) {
      case 'essential':
        return <Badge className="bg-emergency-primary">Temel İhtiyaç</Badge>;
      case 'medical':
        return <Badge className="bg-emergency-success">Tıbbi</Badge>;
      case 'food':
        return <Badge className="bg-emergency-warning">Gıda</Badge>;
      case 'equipment':
        return <Badge className="bg-emergency-secondary">Ekipman</Badge>;
      default:
        return <Badge variant="outline">Diğer</Badge>;
    }
  };
  
  const getStatusIndicator = (status) => {
    switch(status) {
      case 'available':
        return <div className="w-3 h-3 rounded-full bg-emergency-success"></div>;
      case 'low':
        return <div className="w-3 h-3 rounded-full bg-emergency-warning"></div>;
      case 'critical':
        return <div className="w-3 h-3 rounded-full bg-emergency-danger"></div>;
      default:
        return <div className="w-3 h-3 rounded-full bg-emergency-dark/30"></div>;
    }
  };
  
  const handleRefillRequest = (resourceId) => {
    toast.success("İkmal talebi kaydedildi. En kısa sürede işleme alınacaktır.");
  };
  
  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="grid grid-cols-[1fr_auto_auto_auto] gap-4 p-3 bg-emergency-light/50 border-b font-medium text-sm">
        <div>Kaynak</div>
        <div>Miktar</div>
        <div>Konum</div>
        <div>İşlemler</div>
      </div>
      
      <div className="max-h-[60vh] overflow-y-auto">
        {filteredResources.map(resource => (
          <div key={resource.id} className="grid grid-cols-[1fr_auto_auto_auto] gap-4 p-3 border-b items-center hover:bg-emergency-light/30 transition-colors">
            <div>
              <div className="flex items-center">
                {getStatusIndicator(resource.status)}
                <span className="font-medium ml-2">{resource.name}</span>
              </div>
              <div className="flex mt-1">
                {getResourceTypeBadge(resource.type)}
              </div>
            </div>
            
            <div className="text-center">
              <span className={`font-medium ${resource.status === 'low' ? 'text-emergency-warning' : resource.status === 'critical' ? 'text-emergency-danger' : ''}`}>
                {resource.quantity} {resource.unit}
              </span>
            </div>
            
            <div className="text-sm">
              <div className="flex items-center">
                <MapPin className="h-3 w-3 mr-1" />
                <span>{resource.location}</span>
              </div>
            </div>
            
            <div>
              <Button 
                variant="outline" 
                size="sm"
                className={resource.needsRefill ? "text-emergency-warning border-emergency-warning" : ""}
                onClick={() => handleRefillRequest(resource.id)}
              >
                {resource.needsRefill ? "İkmal Gerekli" : "Talep Et"}
              </Button>
            </div>
          </div>
        ))}
        
        {filteredResources.length === 0 && (
          <div className="text-center py-8">
            <PackageOpen className="h-10 w-10 text-emergency-dark/20 mx-auto mb-2" />
            <p className="text-emergency-dark/60">"{searchQuery}" ile ilgili kaynak bulunamadı.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const TeamsList = ({ searchQuery }) => {
  const teams = [
    {
      id: 1,
      name: 'Gönüllü Ekibi A',
      type: 'logistics',
      members: 8,
      maxMembers: 10,
      leader: 'Ahmet K.',
      location: 'Kadıköy Bölgesi',
      tasks: 3,
      avatars: ['AK', 'SY', 'MT', 'OE']
    },
    {
      id: 2,
      name: 'Sağlık Ekibi',
      type: 'medical',
      members: 6,
      maxMembers: 8,
      leader: 'Dr. Ayşe N.',
      location: 'Beşiktaş Bölgesi',
      tasks: 2,
      avatars: ['AN', 'BT', 'CK']
    },
    {
      id: 3,
      name: 'Arama Kurtarma Gönüllüleri',
      type: 'search',
      members: 12,
      maxMembers: 15,
      leader: 'Mehmet S.',
      location: 'Fatih Bölgesi',
      tasks: 5,
      avatars: ['MS', 'EA', 'HT', 'KL']
    },
    {
      id: 4,
      name: 'Lojistik Ekibi',
      type: 'logistics',
      members: 7,
      maxMembers: 10,
      leader: 'Zeynep R.',
      location: 'Beyoğlu Bölgesi',
      tasks: 4,
      avatars: ['ZR', 'FB', 'DM']
    },
    {
      id: 5,
      name: 'Eğitimci Gönüllüler',
      type: 'support',
      members: 5,
      maxMembers: 8,
      leader: 'İlknur T.',
      location: 'Üsküdar Bölgesi',
      tasks: 1,
      avatars: ['IT', 'SA']
    }
  ];
  
  const filteredTeams = searchQuery
    ? teams.filter(team => 
        team.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        team.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        team.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        team.leader.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : teams;
  
  const getTeamTypeBadge = (type) => {
    switch(type) {
      case 'logistics':
        return <Badge className="bg-emergency-primary">Lojistik</Badge>;
      case 'medical':
        return <Badge className="bg-emergency-success">Sağlık</Badge>;
      case 'search':
        return <Badge className="bg-emergency-warning">Arama Kurtarma</Badge>;
      case 'support':
        return <Badge className="bg-emergency-secondary">Destek</Badge>;
      default:
        return <Badge variant="outline">Diğer</Badge>;
    }
  };
  
  const handleJoinTeam = (teamId) => {
    toast.success("Ekibe katılma talebiniz iletildi. Ekip lideri onayından sonra ekibe dahil olacaksınız.");
  };
  
  return (
    <div className="space-y-4">
      {filteredTeams.map(team => (
        <Card key={team.id}>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-base">{team.name}</CardTitle>
                <CardDescription className="flex items-center space-x-2">
                  <MapPin className="h-3 w-3" />
                  <span>{team.location}</span>
                </CardDescription>
              </div>
              {getTeamTypeBadge(team.type)}
            </div>
          </CardHeader>
          <CardContent className="pb-3">
            <div className="flex justify-between">
              <div>
                <p className="text-sm flex items-center">
                  <User className="h-4 w-4 mr-1.5" />
                  <span>Ekip Lideri: <span className="font-medium">{team.leader}</span></span>
                </p>
                <p className="text-sm mt-1">
                  <span>{team.members}/{team.maxMembers} Üye</span> • <span>{team.tasks} Aktif Görev</span>
                </p>
              </div>
              <div className="flex -space-x-2">
                {team.avatars.map((avatar, index) => (
                  <Avatar key={index} className="border-2 border-background h-8 w-8">
                    <AvatarFallback className="text-xs">{avatar}</AvatarFallback>
                  </Avatar>
                ))}
                {team.members > team.avatars.length && (
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-emergency-light border-2 border-background text-xs font-medium">
                    +{team.members - team.avatars.length}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter className="pt-0 flex justify-end">
            <Button variant="outline" size="sm" className="mr-2">
              Detaylar
            </Button>
            <Button 
              size="sm"
              variant={team.members < team.maxMembers ? "default" : "secondary"}
              disabled={team.members >= team.maxMembers}
              onClick={() => handleJoinTeam(team.id)}
            >
              {team.members < team.maxMembers ? "Katıl" : "Ekip Dolu"}
            </Button>
          </CardFooter>
        </Card>
      ))}
      
      {filteredTeams.length === 0 && (
        <div className="text-center py-8">
          <Users className="h-10 w-10 text-emergency-dark/20 mx-auto mb-2" />
          <p className="text-emergency-dark/60">"{searchQuery}" ile ilgili ekip bulunamadı.</p>
        </div>
      )}
    </div>
  );
};

export default CommunityResponse;
