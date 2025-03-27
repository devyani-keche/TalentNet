
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ChevronLeft, Camera, Upload, Save } from 'lucide-react';
import { findUserById, updateUserProfile } from '@/lib/data';
import { User } from '@/lib/types';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

interface EditProfileProps {
  onBack: () => void;
}

const EditProfile = ({ onBack }: EditProfileProps) => {
  const userId = '1'; // Assuming user 1 is the logged-in user
  const user = findUserById(userId);
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    bio: user?.bio || '',
    sport: user?.role === 'athlete' ? (user as any).sport : '',
    specialty: user?.role === 'sponsor' || user?.role === 'scout' ? (user as any).specialty : ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;
    
    const updates: Partial<User> = {
      name: formData.name,
      bio: formData.bio,
    };
    
    if (user.role === 'athlete' && formData.sport) {
      (updates as any).sport = formData.sport;
    }
    
    if ((user.role === 'sponsor' || user.role === 'scout') && formData.specialty) {
      (updates as any).specialty = formData.specialty;
    }
    
    updateUserProfile(userId, updates);
    
    toast.success('Profile updated successfully!', {
      description: 'Your profile information has been saved.',
    });
    
    onBack();
  };
  
  if (!user) return null;

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
        <Card className="max-w-3xl mx-auto shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
            <CardTitle>Edit Profile</CardTitle>
            <CardDescription>Update your personal information and profile details</CardDescription>
          </CardHeader>
          
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6 pt-6">
              <div className="flex flex-col sm:flex-row gap-6 items-center">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-md">
                    <img 
                      src={user.avatar} 
                      alt={user.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <Button 
                    size="icon" 
                    className="absolute bottom-0 right-0 rounded-full bg-primary hover:bg-primary/90 h-10 w-10"
                  >
                    <Camera size={16} />
                  </Button>
                </div>
                
                <div className="flex-1 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name" 
                      name="name" 
                      value={formData.name} 
                      onChange={handleChange}
                      placeholder="Your full name"
                      className="transition-all focus-within:shadow-sm"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    {user.role === 'athlete' ? (
                      <>
                        <Label htmlFor="sport">Sport</Label>
                        <Input 
                          id="sport" 
                          name="sport" 
                          value={formData.sport} 
                          onChange={handleChange}
                          placeholder="Your sport"
                          className="transition-all focus-within:shadow-sm"
                        />
                      </>
                    ) : (
                      <>
                        <Label htmlFor="specialty">Specialty</Label>
                        <Input 
                          id="specialty" 
                          name="specialty" 
                          value={formData.specialty} 
                          onChange={handleChange}
                          placeholder="Your specialty"
                          className="transition-all focus-within:shadow-sm"
                        />
                      </>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea 
                  id="bio" 
                  name="bio" 
                  value={formData.bio} 
                  onChange={handleChange}
                  placeholder="Tell us about yourself"
                  rows={5}
                  className="resize-none transition-all focus-within:shadow-sm"
                />
              </div>
              
              <div className="pt-4 border-t border-border">
                <Label className="text-base">Documents & Credentials</Label>
                <p className="text-sm text-muted-foreground mb-3">Upload verification documents and profile attachments</p>
                
                <div className="bg-slate-50 border border-dashed border-slate-200 rounded-lg p-8 text-center">
                  <Upload className="h-8 w-8 mx-auto text-slate-400 mb-3" />
                  <p className="text-sm font-medium mb-1">Drag and drop files here or click to browse</p>
                  <p className="text-xs text-muted-foreground">PDF, JPG, PNG up to 10MB</p>
                  <Button size="sm" variant="outline" className="mt-4">Browse Files</Button>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="flex justify-between border-t bg-slate-50/50 p-6">
              <Button 
                variant="outline" 
                onClick={onBack}
              >
                Cancel
              </Button>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  type="submit"
                  className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-700"
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </motion.div>
            </CardFooter>
          </form>
        </Card>
      </motion.div>
    </div>
  );
};

export default EditProfile;
