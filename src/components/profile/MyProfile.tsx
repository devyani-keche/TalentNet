
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Edit, Award, Calendar, MapPin, Link as LinkIcon, Check, Clock, Settings, UserCog } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { findUserById, getUserConnections } from '@/lib/data';
import ConnectionCard from '@/components/network/ConnectionCard';
import { motion } from 'framer-motion';

interface MyProfileProps {
  onEditProfile: () => void;
  onSettings: () => void;
}

const MyProfile = ({ onEditProfile, onSettings }: MyProfileProps) => {
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

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const buttonVariants = {
    rest: { scale: 1 },
    hover: { 
      scale: 1.05,
      boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.2, ease: "easeInOut" }
    },
    tap: { scale: 0.95 }
  };

  return (
    <div className="container-custom py-16">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <motion.div 
            className="neo-card overflow-hidden sticky top-24"
            initial="hidden"
            animate="visible"
            variants={cardVariants}
          >
            {/* Banner background */}
            <div className="h-24 bg-gradient-to-r from-primary/30 via-blue-400/30 to-purple-500/30"></div>
            
            <div className="px-6 pb-6 relative">
              {/* Avatar */}
              <div className="relative -mt-12 mb-4 flex justify-center">
                <motion.div 
                  className="w-24 h-24 rounded-full border-4 border-white overflow-hidden shadow-sm"
                  whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                >
                  <img 
                    src={user.avatar} 
                    alt={user.name} 
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                
                {/* Ranking badge */}
                {user.role === 'athlete' && (
                  <motion.div 
                    className="absolute -right-2 bottom-0 bg-gradient-to-r from-primary to-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-white font-bold text-xs border-2 border-white shadow-sm"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.3, type: "spring" }}
                  >
                    #{(user as any).ranking}
                  </motion.div>
                )}
              </div>
              
              <div className="text-center mb-6">
                <div className="flex items-center justify-center space-x-1">
                  <h1 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">{user.name}</h1>
                  {user.verified && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.6, duration: 0.3, type: "spring" }}
                    >
                      <Check size={16} className="text-primary" />
                    </motion.div>
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
                  <motion.div 
                    className="mt-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.3 }}
                  >
                    <Badge variant="outline" className="bg-gradient-to-r from-green-50 to-blue-50 text-green-600 hover:from-green-100 hover:to-blue-100">
                      {(user as any).sponsorships} Sponsorships
                    </Badge>
                  </motion.div>
                )}
              </div>
              
              <div className="space-y-4">
                <div className="flex gap-2">
                  <motion.div 
                    className="flex-1"
                    variants={buttonVariants}
                    initial="rest"
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <Button 
                      className="w-full group bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-700 transition-all duration-300"
                      onClick={onEditProfile}
                    >
                      <span className="flex items-center">
                        <Edit size={16} className="mr-2 group-hover:rotate-12 transition-transform duration-300" />
                        Edit Profile
                      </span>
                    </Button>
                  </motion.div>
                  
                  <motion.div
                    className="flex-1"
                    variants={buttonVariants}
                    initial="rest"
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <Button 
                      variant="outline" 
                      className="w-full group hover:bg-slate-50"
                      onClick={onSettings}
                    >
                      <span className="flex items-center">
                        <Settings size={16} className="mr-2 group-hover:rotate-90 transition-transform duration-300" />
                        Settings
                      </span>
                    </Button>
                  </motion.div>
                </div>
                
                <motion.div 
                  className="pt-4 border-t border-border"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                >
                  <h3 className="text-sm font-medium mb-3">Bio</h3>
                  <p className="text-sm text-muted-foreground">{user.bio}</p>
                </motion.div>
                
                <motion.div 
                  className="pt-4 border-t border-border"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.0, duration: 0.5 }}
                >
                  <h3 className="text-sm font-medium mb-3">Details</h3>
                  <div className="space-y-2">
                    {user.role === 'athlete' && (
                      <div className="flex items-center text-sm">
                        <Award size={16} className="mr-2 text-primary" />
                        <span>Top ranked in {(user as any).sport}</span>
                      </div>
                    )}
                    <div className="flex items-center text-sm">
                      <MapPin size={16} className="mr-2 text-blue-500" />
                      <span>United States</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Calendar size={16} className="mr-2 text-violet-500" />
                      <span>Joined {formatDate(user.joined)}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Clock size={16} className="mr-2 text-amber-500" />
                      <span>Last active {formatDate(user.lastActive)}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <LinkIcon size={16} className="mr-2 text-teal-500" />
                      <a href="#" className="text-primary hover:underline">athlete-portfolio.com</a>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
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
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="hover:shadow-lg transition-shadow duration-300">
                    <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                      <CardTitle>Career Highlights</CardTitle>
                      <CardDescription>Your major achievements throughout your career</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-4">
                        {(user as any).achievements.map((achievement: string, index: number) => (
                          <motion.li 
                            key={index} 
                            className="flex items-start"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                          >
                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary/10 to-blue-400/10 flex items-center justify-center mr-4 mt-1">
                              <Trophy className="text-primary" size={20} />
                            </div>
                            <div>
                              <h3 className="font-medium">{achievement}</h3>
                              <p className="text-sm text-muted-foreground">
                                {['2022', '2021', '2020'][index % 3]} • {['World Championship', 'National Tournament', 'International Cup'][index % 3]}
                              </p>
                            </div>
                          </motion.li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="hover:shadow-lg transition-shadow duration-300">
                    <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
                      <CardTitle>Professional Milestones</CardTitle>
                      <CardDescription>Your key professional achievements</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-4">
                        <p>Add your professional achievements and milestones here.</p>
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Button className="mt-4 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-700">Add Achievement</Button>
                        </motion.div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </TabsContent>
            
            <TabsContent value="connections" className="animate-fade-in">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-teal-50">
                    <CardTitle>Your Network</CardTitle>
                    <CardDescription>People you've connected with</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {connections.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {connections.map((connection, index) => (
                          <motion.div
                            key={connection.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                          >
                            <ConnectionCard user={connection} isConnected />
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">No connections yet</p>
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Button 
                            className="mt-4 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-700" 
                            onClick={() => navigate('/network')}
                          >
                            Find Connections
                          </Button>
                        </motion.div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
            
            <TabsContent value="sponsorships" className="animate-fade-in">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
                    <CardTitle>Current Sponsorships</CardTitle>
                    <CardDescription>Your active partnerships and sponsorship deals</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {user.role === 'athlete' && (user as any).sponsorships > 0 ? (
                        Array.from({ length: (user as any).sponsorships }).map((_, index) => (
                          <motion.div 
                            key={index} 
                            className="flex items-center p-4 rounded-lg border border-border hover:shadow-soft transition-shadow cursor-pointer bg-gradient-to-r hover:from-slate-50 hover:to-blue-50"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            whileHover={{ 
                              y: -5,
                              transition: { duration: 0.2 }
                            }}
                          >
                            <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center mr-4 overflow-hidden shadow-sm">
                              <img src={`https://images.unsplash.com/photo-1614680376408-81e91ffe3db7?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&h=64&q=80`} alt="Sponsor logo" className="w-10 h-10 object-contain" />
                            </div>
                            <div>
                              <h3 className="font-medium">{['NexGen Athletics', 'VitalBoost Nutrition', 'Apex Tech Sports', 'Performance Pro Gear', 'Elite Sportswear'][index % 5]}</h3>
                              <p className="text-sm text-muted-foreground">
                                {['Equipment & Apparel', 'Nutrition & Supplements', 'Sports Technology', 'Footwear', 'Athletic Wear'][index % 5]} • Since {2023 - index}
                              </p>
                            </div>
                          </motion.div>
                        ))
                      ) : (
                        <div className="text-center py-8">
                          <p className="text-muted-foreground">No sponsorships yet</p>
                          {user.role === 'athlete' && (
                            <motion.div
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Button className="mt-4 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-700">Find Sponsors</Button>
                            </motion.div>
                          )}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
            
            <TabsContent value="stats" className="animate-fade-in">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50">
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
                              <motion.div 
                                key={index}
                                initial={{ width: "0%" }}
                                animate={{ width: "100%" }}
                                transition={{ delay: 0.3 + index * 0.1, duration: 0.8 }}
                              >
                                <div className="flex justify-between mb-1">
                                  <span className="text-sm">{metric}</span>
                                  <span className="text-sm font-medium">{85 + (index * 3 - index * index)}%</span>
                                </div>
                                <div className="w-full bg-secondary rounded-full h-2.5">
                                  <motion.div 
                                    className="bg-gradient-to-r from-primary to-blue-600 h-2.5 rounded-full" 
                                    style={{ width: `${85 + (index * 3 - index * index)}%` }}
                                    initial={{ width: "0%" }}
                                    animate={{ width: `${85 + (index * 3 - index * index)}%` }}
                                    transition={{ delay: 0.3 + index * 0.1, duration: 0.8 }}
                                  ></motion.div>
                                </div>
                              </motion.div>
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
              </motion.div>
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
