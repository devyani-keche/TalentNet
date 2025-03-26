
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { MessageSquare, UserPlus, UserCheck, ChevronRight, Check } from 'lucide-react';
import { toast } from 'sonner';

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
    
    // Navigate to messages with this contact
    navigate('/messages');
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'athlete':
        return 'bg-blue-50 text-blue-600';
      case 'sponsor':
        return 'bg-green-50 text-green-600';
      case 'scout':
        return 'bg-amber-50 text-amber-600';
      default:
        return 'bg-gray-50 text-gray-600';
    }
  };

  const getProfileLink = () => {
    if (user.role === 'athlete') {
      return `/profile/${user.id}`;
    }
    return `/profile/${user.id}`;
  };

  const handleCardClick = () => {
    navigate(getProfileLink());
  };

  return (
    <div
      className="block cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      <div className={`neo-card p-4 transition-all duration-300 ${isHovered ? 'shadow-elevated -translate-y-1' : ''}`}>
        <div className="flex items-center">
          <div className="relative">
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <img 
                src={user.avatar} 
                alt={user.name} 
                className="w-full h-full object-cover"
              />
            </div>
            {user.role === 'athlete' && (user as any).ranking && (
              <div className="absolute -right-1 -bottom-1 bg-primary rounded-full w-5 h-5 flex items-center justify-center text-white text-[10px] font-bold border border-white">
                #{(user as any).ranking}
              </div>
            )}
          </div>
          
          <div className="ml-4 flex-1">
            <div className="flex items-center">
              <h3 className="font-medium text-sm">{user.name}</h3>
              {user.verified && (
                <Check size={14} className="text-primary ml-1" />
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
            <Button
              size="sm"
              className="flex-1 h-8"
              onClick={handleConnect}
            >
              <UserPlus size={14} className="mr-1.5" />
              <span>Connect</span>
            </Button>
          )}
          
          <Button
            variant="outline"
            size="sm"
            className="flex-1 h-8"
            onClick={handleMessage}
          >
            <MessageSquare size={14} className="mr-1.5" />
            <span>Message</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConnectionCard;
