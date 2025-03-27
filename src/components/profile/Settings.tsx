
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { ChevronLeft, Bell, Eye, Lock, Globe, PaintBucket, Mail, Moon, Sun } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

interface SettingsProps {
  onBack: () => void;
}

const Settings = ({ onBack }: SettingsProps) => {
  const handleSaveNotifications = () => {
    toast.success('Notification settings saved!');
  };

  const handleSavePrivacy = () => {
    toast.success('Privacy settings saved!');
  };

  const handleAccountChange = () => {
    toast.success('Account settings updated!');
  };

  return (
    <div className="container-custom py-6">
      <motion.div 
        className="mb-6 flex items-center"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="group"
        >
          <ChevronLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to Profile
        </Button>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="max-w-4xl mx-auto shadow-lg">
          <CardHeader className="bg-gradient-to-r from-slate-50 to-blue-50">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-primary to-blue-600 p-2 rounded-lg text-white mr-3">
                <Lock className="h-6 w-6" />
              </div>
              <div>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Manage your account preferences and privacy</CardDescription>
              </div>
            </div>
          </CardHeader>
          
          <Tabs defaultValue="notifications" className="w-full">
            <div className="border-b">
              <div className="container-custom">
                <TabsList className="h-auto p-0 bg-transparent flex justify-start -mb-px space-x-6">
                  <TabsTrigger 
                    value="notifications" 
                    className="py-3 px-1 relative data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
                  >
                    <Bell className="h-4 w-4 mr-2" />
                    Notifications
                  </TabsTrigger>
                  <TabsTrigger 
                    value="privacy" 
                    className="py-3 px-1 relative data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Privacy
                  </TabsTrigger>
                  <TabsTrigger 
                    value="appearance" 
                    className="py-3 px-1 relative data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
                  >
                    <PaintBucket className="h-4 w-4 mr-2" />
                    Appearance
                  </TabsTrigger>
                  <TabsTrigger 
                    value="account" 
                    className="py-3 px-1 relative data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
                  >
                    <Globe className="h-4 w-4 mr-2" />
                    Account
                  </TabsTrigger>
                </TabsList>
              </div>
            </div>
            
            <TabsContent value="notifications" className="p-6 animate-fade-in">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium">Notification Preferences</h3>
                  <p className="text-sm text-muted-foreground mb-4">Configure how and when you receive notifications</p>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive email notifications about activity</p>
                      </div>
                      <Switch />
                    </div>
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Push Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive push notifications on your devices</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Connection Requests</Label>
                        <p className="text-sm text-muted-foreground">Notifications about new connection requests</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Message Notifications</Label>
                        <p className="text-sm text-muted-foreground">Notifications about new messages</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Sponsorship Offers</Label>
                        <p className="text-sm text-muted-foreground">Notifications about new sponsorship offers</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button 
                      onClick={handleSaveNotifications}
                      className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-700"
                    >
                      Save Preferences
                    </Button>
                  </motion.div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="privacy" className="p-6 animate-fade-in">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium">Privacy Settings</h3>
                  <p className="text-sm text-muted-foreground mb-4">Control your privacy and visibility on the platform</p>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Profile Visibility</Label>
                        <p className="text-sm text-muted-foreground">Make your profile visible to everyone</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Show Rankings</Label>
                        <p className="text-sm text-muted-foreground">Display your rankings on your profile</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Show Achievements</Label>
                        <p className="text-sm text-muted-foreground">Display your achievements on your profile</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Connection Visibility</Label>
                        <p className="text-sm text-muted-foreground">Allow others to see your connections</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Activity Status</Label>
                        <p className="text-sm text-muted-foreground">Show when you're active on the platform</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button 
                      onClick={handleSavePrivacy}
                      className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-700"
                    >
                      Save Settings
                    </Button>
                  </motion.div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="appearance" className="p-6 animate-fade-in">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium">Appearance Settings</h3>
                  <p className="text-sm text-muted-foreground mb-4">Customize how TalentNet looks for you</p>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card className="border-2 cursor-pointer hover:border-primary transition-all">
                        <CardContent className="p-6 flex flex-col items-center justify-center">
                          <Sun className="h-12 w-12 text-amber-500 mb-4" />
                          <h3 className="font-medium text-center">Light Mode</h3>
                          <p className="text-sm text-muted-foreground text-center">Bright and clear interface</p>
                        </CardContent>
                      </Card>
                      <Card className="border-2 border-muted cursor-pointer hover:border-primary transition-all">
                        <CardContent className="p-6 flex flex-col items-center justify-center">
                          <Moon className="h-12 w-12 text-indigo-400 mb-4" />
                          <h3 className="font-medium text-center">Dark Mode</h3>
                          <p className="text-sm text-muted-foreground text-center">Easy on the eyes at night</p>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <Separator className="my-2" />
                    
                    <div className="space-y-4">
                      <Label className="text-base">Color Theme</Label>
                      <div className="flex flex-wrap gap-3">
                        {['bg-blue-500', 'bg-indigo-500', 'bg-violet-500', 'bg-purple-500', 'bg-pink-500', 'bg-emerald-500'].map((color, i) => (
                          <motion.div 
                            key={i}
                            className={`w-10 h-10 rounded-full ${color} cursor-pointer ${i === 0 ? 'ring-2 ring-offset-2 ring-black/10' : ''}`}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-700">
                      Apply Theme
                    </Button>
                  </motion.div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="account" className="p-6 animate-fade-in">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium">Account Information</h3>
                  <p className="text-sm text-muted-foreground mb-4">Manage your account details and preferences</p>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Email Address</Label>
                        <p className="text-sm">user@example.com</p>
                      </div>
                      <Button variant="outline" size="sm">Change</Button>
                    </div>
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Password</Label>
                        <p className="text-sm text-muted-foreground">Last changed 3 months ago</p>
                      </div>
                      <Button variant="outline" size="sm">Change</Button>
                    </div>
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Two-Factor Authentication</Label>
                        <p className="text-sm text-muted-foreground">Add extra security to your account</p>
                      </div>
                      <Button variant="outline" size="sm">Setup</Button>
                    </div>
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Language</Label>
                        <p className="text-sm">English (US)</p>
                      </div>
                      <Button variant="outline" size="sm">Change</Button>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <h3 className="text-lg font-medium text-red-500">Danger Zone</h3>
                  <p className="text-sm text-muted-foreground mb-4">Irreversible actions for your account</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base text-red-500">Delete Account</Label>
                      <p className="text-sm text-muted-foreground">Delete your account and all associated data</p>
                    </div>
                    <Button variant="destructive" size="sm" onClick={() => handleAccountChange()}>Delete</Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </motion.div>
    </div>
  );
};

export default Settings;
