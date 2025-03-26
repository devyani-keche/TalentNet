
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Edit, Award, Calendar, MapPin, Link as LinkIcon, Check, Clock, Settings, UserCog } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { findUserById, getUserConnections } from '@/lib/data';
import ConnectionCard from '@/components/network/ConnectionCard';

const MyProfile = () => {
  const navigate = useNavigate();
  const userId = '1'; // Assuming user 1 is the logged-in user
  const user = findUserById(userId);
  const connections = getUserConnections(userId);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-semibold">Profile not found</h2>
          <p className="text-muted-foreground">Unable to load your profile.</p>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }).format(date);
  };

  return (
    <div className="container-custom py-16">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="neo-card overflow-hidden sticky top-24">
            {/* Banner background */}
            <div className="h-24 bg-gradient-to-r from-primary/20 to-blue-400/20"></div>
            
            <div className="px-6 pb-6 relative">
              {/* Avatar */}
              <div className="relative -mt-12 mb-4 flex justify-center">
                <div className="w-24 h-24 rounded-full border-4 border-white overflow-hidden shadow-sm">
                  <img 
                    src={user.avatar} 
                    alt={user.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Ranking badge */}
                {user.role === 'athlete' && (
                  <div className="absolute -right-2 bottom-0 bg-primary rounded-full w-8 h-8 flex items-center justify-center text-white font-bold text-xs border-2 border-white shadow-sm">
                    #{(user as any).ranking}
                  </div>
                )}
              </div>
              
              <div className="text-center mb-6">
                <div className="flex items-center justify-center space-x-1">
                  <h1 className="text-2xl font-semibold">{user.name}</h1>
                  {user.verified && (
                    <Check size={16} className="text-primary" />
                  )}
                </div>
                <p className="text-muted-foreground">
                  {user.role === 'athlete' 
                    ? (user as any).sport 
                    : user.role === 'sponsor' 
                      ? (user as any).specialty 
                      : (user as any).specialty}
                </p>
                
                {/* Sponsorships badge */}
                {user.role === 'athlete' && (user as any).sponsorships > 0 && (
                  <div className="mt-2">
                    <Badge variant="outline" className="bg-green-50 text-green-600 hover:bg-green-50">
                      {(user as any).sponsorships} Sponsorships
                    </Badge>
                  </div>
                )}
              </div>
              
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Button 
                    className="flex-1 group transition-all duration-300"
                    onClick={() => navigate('/profile/edit')}
                  >
                    <span className="flex items-center">
                      <Edit size={16} className="mr-2" />
                      Edit Profile
                    </span>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="flex-1 group"
                    onClick={() => navigate('/settings')}
                  >
                    <span className="flex items-center">
                      <Settings size={16} className="mr-2" />
                      Settings
                    </span>
                  </Button>
                </div>
                
                <div className="pt-4 border-t border-border">
                  <h3 className="text-sm font-medium mb-3">Bio</h3>
                  <p className="text-sm text-muted-foreground">{user.bio}</p>
                </div>
                
                <div className="pt-4 border-t border-border">
                  <h3 className="text-sm font-medium mb-3">Details</h3>
                  <div className="space-y-2">
                    {user.role === 'athlete' && (
                      <div className="flex items-center text-sm">
                        <Award size={16} className="mr-2 text-muted-foreground" />
                        <span>Top ranked in {(user as any).sport}</span>
                      </div>
                    )}
                    <div className="flex items-center text-sm">
                      <MapPin size={16} className="mr-2 text-muted-foreground" />
                      <span>United States</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Calendar size={16} className="mr-2 text-muted-foreground" />
                      <span>Joined {formatDate(user.joined)}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Clock size={16} className="mr-2 text-muted-foreground" />
                      <span>Last active {formatDate(user.lastActive)}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <LinkIcon size={16} className="mr-2 text-muted-foreground" />
                      <a href="#" className="text-primary hover:underline">athlete-portfolio.com</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-2">
          <Tabs defaultValue="achievements">
            <TabsList className="mb-6 w-full bg-white border border-border shadow-sm">
              <TabsTrigger value="achievements" className="flex-1">Achievements</TabsTrigger>
              <TabsTrigger value="connections" className="flex-1">Connections</TabsTrigger>
              <TabsTrigger value="sponsorships" className="flex-1">Sponsorships</TabsTrigger>
              <TabsTrigger value="stats" className="flex-1">Stats</TabsTrigger>
            </TabsList>
            
            <TabsContent value="achievements" className="space-y-6 animate-fade-in">
              {user.role === 'athlete' ? (
                <Card>
                  <CardHeader>
                    <CardTitle>Career Highlights</CardTitle>
                    <CardDescription>Your major achievements throughout your career</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      {(user as any).achievements.map((achievement: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4 mt-1">
                            <Trophy className="text-primary" size={20} />
                          </div>
                          <div>
                            <h3 className="font-medium">{achievement}</h3>
                            <p className="text-sm text-muted-foreground">
                              {['2022', '2021', '2020'][index % 3]} • {['World Championship', 'National Tournament', 'International Cup'][index % 3]}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle>Professional Milestones</CardTitle>
                    <CardDescription>Your key professional achievements</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-4">
                      <p>Add your professional achievements and milestones here.</p>
                      <Button className="mt-4">Add Achievement</Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="connections" className="animate-fade-in">
              <Card>
                <CardHeader>
                  <CardTitle>Your Network</CardTitle>
                  <CardDescription>People you've connected with</CardDescription>
                </CardHeader>
                <CardContent>
                  {connections.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {connections.map((connection) => (
                        <ConnectionCard key={connection.id} user={connection} isConnected />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No connections yet</p>
                      <Button className="mt-4" onClick={() => navigate('/network')}>Find Connections</Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="sponsorships" className="animate-fade-in">
              <Card>
                <CardHeader>
                  <CardTitle>Current Sponsorships</CardTitle>
                  <CardDescription>Your active partnerships and sponsorship deals</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {user.role === 'athlete' && (user as any).sponsorships > 0 ? (
                      Array.from({ length: (user as any).sponsorships }).map((_, index) => (
                        <div key={index} className="flex items-center p-4 rounded-lg border border-border hover:shadow-soft transition-shadow cursor-pointer">
                          <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center mr-4">
                            <img src={`https://images.unsplash.com/photo-1614680376408-81e91ffe3db7?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&h=64&q=80`} alt="Sponsor logo" className="w-10 h-10 object-contain" />
                          </div>
                          <div>
                            <h3 className="font-medium">{['Global Sports Co.', 'HealthFit Nutrition', 'Tech Athletics', 'Performance Gear', 'Elite Sportswear'][index % 5]}</h3>
                            <p className="text-sm text-muted-foreground">
                              {['Equipment & Apparel', 'Nutrition & Supplements', 'Sports Technology', 'Footwear', 'Athletic Wear'][index % 5]} • Since {2023 - index}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">No sponsorships yet</p>
                        {user.role === 'athlete' && (
                          <Button className="mt-4">Find Sponsors</Button>
                        )}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="stats" className="animate-fade-in">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Statistics</CardTitle>
                  <CardDescription>Your detailed performance metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  {user.role === 'athlete' ? (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-sm font-medium mb-3">Key Performance Indicators</h3>
                        <div className="space-y-4">
                          {['Speed', 'Endurance', 'Strength', 'Technical Skill', 'Strategic Thinking'].map((metric, index) => (
                            <div key={index}>
                              <div className="flex justify-between mb-1">
                                <span className="text-sm">{metric}</span>
                                <span className="text-sm font-medium">{85 + (index * 3 - index * index)}%</span>
                              </div>
                              <div className="w-full bg-secondary rounded-full h-2.5">
                                <div 
                                  className="bg-primary h-2.5 rounded-full" 
                                  style={{ width: `${85 + (index * 3 - index * index)}%` }}
                                ></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">Statistics are available for athlete profiles</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

const Trophy = ({ className, size }: { className?: string; size?: number }) => (
  <Award className={className} size={size} />
);

export default MyProfile;
