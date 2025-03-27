
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { MessageSquare, UserPlus, UserCheck, ChevronRight, Check } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { findOrCreateConversation } from '@/lib/data';

interface ConnectionCardProps {
  user: User;
  isConnected?: boolean;
}

const ConnectionCard: React.FC<ConnectionCardProps> = ({ user, isConnected = false }) => {
  const [connectionStatus, setConnectionStatus] = useState<'none' | 'pending' | 'connected'>(
    isConnected ? 'connected' : 'none'
  );
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  // Function to get the role-specific gradient
  const getRoleGradient = (role: string) => {
    switch (role) {
      case 'athlete':
        return 'bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500';
      case 'sponsor':
        return 'bg-gradient-to-r from-emerald-500 to-green-400 hover:from-emerald-600 hover:to-green-500';
      case 'scout':
        return 'bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-600 hover:to-yellow-500';
      default:
        return 'bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-700';
    }
  };

  const handleConnect = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (connectionStatus === 'none') {
      setConnectionStatus('pending');
      toast('Connection request sent!', {
        description: `Your request has been sent to ${user.name}.`,
        action: {
          label: 'Undo',
          onClick: () => {
            setConnectionStatus('none');
            toast('Connection request cancelled');
          }
        },
      });
    }
  };

  const handleMessage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const userId = '1'; // Logged in user
    const targetUserId = user.id;
    
    // Find or create conversation between users
    const conversation = findOrCreateConversation(userId, targetUserId);
    
    // Navigate to messages with this specific conversation
    navigate('/messages', { state: { contactId: targetUserId } });
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'athlete':
        return 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300';
      case 'sponsor':
        return 'bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-300';
      case 'scout':
        return 'bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-300';
      default:
        return 'bg-gray-50 text-gray-600 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const getProfileLink = () => {
    return `/profile/${user.id}`;
  };

  const handleCardClick = () => {
    navigate(getProfileLink());
  };

  return (
    <motion.div
      className="block cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ 
        y: -5,
        transition: { duration: 0.2 } 
      }}
    >
      <div className={`neo-card p-4 transition-all duration-300 ${isHovered ? 'shadow-elevated -translate-y-1 border-primary/20' : ''}`}>
        <div className="flex items-center">
          <div className="relative">
            <div className="w-12 h-12 rounded-full overflow-hidden border border-slate-100">
              <img 
                src={user.avatar} 
                alt={user.name} 
                className="w-full h-full object-cover"
              />
            </div>
            {user.role === 'athlete' && (user as any).ranking && (
              <motion.div 
                className={`absolute -right-1 -bottom-1 ${getRoleGradient('athlete')} rounded-full w-5 h-5 flex items-center justify-center text-white text-[10px] font-bold border border-white shadow-sm`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
              >
                #{(user as any).ranking}
              </motion.div>
            )}
          </div>
          
          <div className="ml-4 flex-1">
            <div className="flex items-center">
              <h3 className="font-medium text-sm">{user.name}</h3>
              {user.verified && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.6, duration: 0.3, type: "spring" }}
                >
                  <Check size={14} className="text-primary ml-1" />
                </motion.div>
              )}
            </div>
            
            <div className="flex items-center mt-1">
              <span className={`text-xs px-1.5 py-0.5 rounded ${getRoleColor(user.role)}`}>
                {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
              </span>
              <span className="text-xs text-muted-foreground ml-2">
                {user.role === 'athlete' 
                  ? (user as any).sport 
                  : (user as any).specialty || (user as any).company}
              </span>
            </div>
          </div>
          
          <ChevronRight size={16} className={`text-muted-foreground transition-all duration-300 ${isHovered ? 'translate-x-1 text-primary' : ''}`} />
        </div>
        
        <div className="mt-3 text-xs text-muted-foreground line-clamp-2">
          {user.bio}
        </div>
        
        <div className="mt-3 pt-3 border-t border-border flex gap-2">
          {connectionStatus === 'connected' ? (
            <Button variant="outline" size="sm" className="flex-1 h-8">
              <UserCheck size={14} className="mr-1.5" />
              <span>Connected</span>
            </Button>
          ) : connectionStatus === 'pending' ? (
            <Button variant="outline" size="sm" className="flex-1 h-8" disabled>
              <span>Pending</span>
            </Button>
          ) : (
            <motion.div 
              className="flex-1"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="sm"
                className={`w-full h-8 ${getRoleGradient(user.role)}`}
                onClick={handleConnect}
              >
                <UserPlus size={14} className="mr-1.5" />
                <span>Connect</span>
              </Button>
            </motion.div>
          )}
          
          <motion.div 
            className="flex-1" 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="outline"
              size="sm"
              className="w-full h-8 hover:border-primary/50 hover:bg-blue-50/30"
              onClick={handleMessage}
            >
              <MessageSquare size={14} className="mr-1.5" />
              <span>Message</span>
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ConnectionCard;
