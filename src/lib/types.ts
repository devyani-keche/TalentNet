
export type UserRole = 'athlete' | 'sponsor' | 'scout';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  avatar: string;
  bio: string;
  ranking?: number;
  sport?: string;
  achievements?: string[];
  connections: string[];
  sponsorships?: number;
  specialty?: string;
  company?: string;
  verified: boolean;
  joined: string;
  lastActive: string;
}

export interface Athlete extends User {
  role: 'athlete';
  sport: string;
  achievements: string[];
  ranking: number;
  sponsorships: number;
}

export interface Sponsor extends User {
  role: 'sponsor';
  company: string;
  specialty: string;
}

export interface Scout extends User {
  role: 'scout';
  specialty: string;
  company: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface Conversation {
  id: string;
  participants: string[];
  lastMessage?: Message;
  unreadCount: number;
}

export interface ConnectionRequest {
  id: string;
  senderId: string;
  receiverId: string;
  message?: string;
  timestamp: string;
  status: 'pending' | 'accepted' | 'rejected';
}

export interface Notification {
  id: string;
  userId: string;
  type: 'connection' | 'message' | 'sponsorship' | 'ranking';
  content: string;
  timestamp: string;
  read: boolean;
  actionId?: string;
}
