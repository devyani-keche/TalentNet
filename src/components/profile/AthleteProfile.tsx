
import React, { useState } from 'react';
import { Athlete, findUserById, getUserConnections } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageSquare, UserPlus, Award, Calendar, MapPin, Link as LinkIcon, Check, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import ConnectionCard from '@/components/network/ConnectionCard';

interface AthleteProfileProps {
  athleteId?: string;
}

const AthleteProfile: React.FC<AthleteProfileProps> = ({ athleteId = '1' }) => {
  const [isConnectHovered, setIsConnectHovered] = useState(false);
  const [isMessageHovered, setIsMessageHovered] = useState(false);
  const athlete = findUserById(athleteId) as Athlete;
  const connections = getUserConnections(athleteId);

  if (!athlete) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-semibold">Athlete not found</h2>
          <p className="text-muted-foreground">The athlete profile you're looking for doesn't exist.</p>
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

  const handleConnect = () => {
    toast('Connection request sent!', {
      description: `Your request has been sent to ${athlete.name}.`,
      action: {
        label: 'Undo',
        onClick: () => toast('Connection request cancelled')
      },
    });
  };

  const handleMessage = () => {
    toast('Starting conversation', {
      description: `Opening chat with ${athlete.name}.`,
    });
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
                    src={athlete.avatar} 
                    alt={athlete.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Ranking badge */}
                <div className="absolute -right-2 bottom-0 bg-primary rounded-full w-8 h-8 flex items-center justify-center text-white font-bold text-xs border-2 border-white shadow-sm">
                  #{athlete.ranking}
                </div>
              </div>
              
              <div className="text-center mb-6">
                <div className="flex items-center justify-center space-x-1">
                  <h1 className="text-2xl font-semibold">{athlete.name}</h1>
                  {athlete.verified && (
                    <Check size={16} className="text-primary" />
                  )}
                </div>
                <p className="text-muted-foreground">{athlete.sport}</p>
                
                {/* Sponsorships badge */}
                <div className="mt-2">
                  <Badge variant="outline" className="bg-green-50 text-green-600 hover:bg-green-50">
                    {athlete.sponsorships} Sponsorships
                  </Badge>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Button 
                    className="flex-1 group transition-all duration-300"
                    onMouseEnter={() => setIsConnectHovered(true)}
                    onMouseLeave={() => setIsConnectHovered(false)}
                    onClick={handleConnect}
                  >
                    <span className="flex items-center">
                      <UserPlus size={16} className={`mr-2 transition-all duration-300 ${isConnectHovered ? 'scale-110' : ''}`} />
                      Connect
                    </span>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="flex-1 group"
                    onMouseEnter={() => setIsMessageHovered(true)}
                    onMouseLeave={() => setIsMessageHovered(false)}
                    onClick={handleMessage}
                  >
                    <span className="flex items-center">
                      <MessageSquare size={16} className={`mr-2 transition-all duration-300 ${isMessageHovered ? 'scale-110' : ''}`} />
                      Message
                    </span>
                  </Button>
                </div>
                
                <div className="pt-4 border-t border-border">
                  <h3 className="text-sm font-medium mb-3">Bio</h3>
                  <p className="text-sm text-muted-foreground">{athlete.bio}</p>
                </div>
                
                <div className="pt-4 border-t border-border">
                  <h3 className="text-sm font-medium mb-3">Details</h3>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <Award size={16} className="mr-2 text-muted-foreground" />
                      <span>Top ranked in {athlete.sport}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <MapPin size={16} className="mr-2 text-muted-foreground" />
                      <span>United States</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Calendar size={16} className="mr-2 text-muted-foreground" />
                      <span>Joined {formatDate(athlete.joined)}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Clock size={16} className="mr-2 text-muted-foreground" />
                      <span>Last active {formatDate(athlete.lastActive)}</span>
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
              <Card>
                <CardHeader>
                  <CardTitle>Career Highlights</CardTitle>
                  <CardDescription>Major achievements throughout the athlete's career</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {athlete.achievements.map((achievement, index) => (
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
              
              <Card>
                <CardHeader>
                  <CardTitle>Recent Performance</CardTitle>
                  <CardDescription>Latest competition results and metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="p-4 rounded-lg bg-secondary">
                        <p className="text-sm text-muted-foreground">Event Wins</p>
                        <p className="text-2xl font-semibold mt-1">12</p>
                      </div>
                      <div className="p-4 rounded-lg bg-secondary">
                        <p className="text-sm text-muted-foreground">Win Rate</p>
                        <p className="text-2xl font-semibold mt-1">87%</p>
                      </div>
                      <div className="p-4 rounded-lg bg-secondary">
                        <p className="text-sm text-muted-foreground">Points</p>
                        <p className="text-2xl font-semibold mt-1">2,453</p>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium mb-3">Performance Trend</h3>
                      <div className="h-24 bg-secondary rounded-lg flex items-end p-2">
                        {[35, 50, 40, 70, 65, 90, 85].map((height, index) => (
                          <div 
                            key={index} 
                            className="flex-1 mx-1"
                            style={{ height: `${height}%` }}
                          >
                            <div 
                              className="w-full h-full rounded-t-sm bg-gradient-to-t from-primary/70 to-primary"
                              style={{ animationDelay: `${index * 0.1}s` }}
                            ></div>
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                        <span>Jan</span>
                        <span>Feb</span>
                        <span>Mar</span>
                        <span>Apr</span>
                        <span>May</span>
                        <span>Jun</span>
                        <span>Jul</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="connections" className="animate-fade-in">
              <Card>
                <CardHeader>
                  <CardTitle>Network</CardTitle>
                  <CardDescription>People connected with {athlete.name}</CardDescription>
                </CardHeader>
                <CardContent>
                  {connections.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {connections.map((connection) => (
                        <ConnectionCard key={connection.id} user={connection} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No connections yet</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="sponsorships" className="animate-fade-in">
              <Card>
                <CardHeader>
                  <CardTitle>Current Sponsorships</CardTitle>
                  <CardDescription>Active partnerships and sponsorship deals</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {athlete.sponsorships > 0 ? (
                      Array.from({ length: athlete.sponsorships }).map((_, index) => (
                        <div key={index} className="flex items-center p-4 rounded-lg border border-border hover:shadow-soft transition-shadow cursor-pointer">
                          <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center mr-4">
                            <div className="text-xs font-semibold">LOGO</div>
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
                  <CardDescription>Detailed performance metrics and comparisons</CardDescription>
                </CardHeader>
                <CardContent>
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
                    
                    <div className="pt-4 border-t border-border">
                      <h3 className="text-sm font-medium mb-3">Career Statistics</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-lg bg-secondary">
                          <p className="text-sm text-muted-foreground">Total Competitions</p>
                          <p className="text-2xl font-semibold mt-1">78</p>
                        </div>
                        <div className="p-4 rounded-lg bg-secondary">
                          <p className="text-sm text-muted-foreground">Championships</p>
                          <p className="text-2xl font-semibold mt-1">12</p>
                        </div>
                        <div className="p-4 rounded-lg bg-secondary">
                          <p className="text-sm text-muted-foreground">Career Points</p>
                          <p className="text-2xl font-semibold mt-1">14,256</p>
                        </div>
                        <div className="p-4 rounded-lg bg-secondary">
                          <p className="text-sm text-muted-foreground">Peak Ranking</p>
                          <p className="text-2xl font-semibold mt-1">#1</p>
                        </div>
                      </div>
                    </div>
                  </div>
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

export default AthleteProfile;
