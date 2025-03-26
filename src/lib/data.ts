
import { Athlete, ConnectionRequest, Conversation, Message, Notification, Scout, Sponsor, User } from './types';
import { v4 as uuidv4 } from 'uuid';

// Helper function to generate a random date in the last year
const randomDate = (start = new Date(Date.now() - 31536000000), end = new Date()) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString();
};

// Generate Athletes
export const athletes: Athlete[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    role: 'athlete',
    avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
    bio: 'Olympic gold medalist in 100m sprint. Passionate about inspiring the next generation of athletes.',
    sport: 'Track & Field',
    achievements: ['Olympic Gold Medal', 'World Champion', '3x National Champion'],
    ranking: 1,
    connections: ['5', '8', '11'],
    sponsorships: 5,
    verified: true,
    joined: randomDate(new Date(2020, 0, 1)),
    lastActive: randomDate(new Date(Date.now() - 604800000)),
  },
  {
    id: '2',
    name: 'Samantha Williams',
    role: 'athlete',
    avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
    bio: 'Professional basketball player with a focus on community outreach and youth development.',
    sport: 'Basketball',
    achievements: ['WNBA Champion', 'MVP', 'All-Star 5x'],
    ranking: 2,
    connections: ['6', '9', '12'],
    sponsorships: 4,
    verified: true,
    joined: randomDate(new Date(2020, 0, 1)),
    lastActive: randomDate(new Date(Date.now() - 604800000)),
  },
  {
    id: '3',
    name: 'David Chen',
    role: 'athlete',
    avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
    bio: 'Tennis champion with a passion for sustainability and eco-friendly sports equipment.',
    sport: 'Tennis',
    achievements: ['Grand Slam Winner', '2x Masters Champion', 'Davis Cup Winner'],
    ranking: 3,
    connections: ['7', '10'],
    sponsorships: 3,
    verified: true,
    joined: randomDate(new Date(2020, 0, 1)),
    lastActive: randomDate(new Date(Date.now() - 604800000)),
  },
  {
    id: '4',
    name: 'Maria Rodriguez',
    role: 'athlete',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
    bio: 'Soccer player focused on advancing women in sports. Educational advocate and coach.',
    sport: 'Soccer',
    achievements: ['World Cup Winner', 'Golden Boot', 'Champions League Winner'],
    ranking: 4,
    connections: ['5', '8'],
    sponsorships: 2,
    verified: true,
    joined: randomDate(new Date(2020, 0, 1)),
    lastActive: randomDate(new Date(Date.now() - 604800000)),
  },
];

// Generate Sponsors
export const sponsors: Sponsor[] = [
  {
    id: '5',
    name: 'Global Sports Co.',
    role: 'sponsor',
    avatar: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
    bio: 'Market leader in sports equipment and apparel. Looking to sponsor top athletes across all sports.',
    company: 'Global Sports Co.',
    specialty: 'Equipment & Apparel',
    connections: ['1', '4'],
    verified: true,
    joined: randomDate(new Date(2020, 0, 1)),
    lastActive: randomDate(new Date(Date.now() - 604800000)),
  },
  {
    id: '6',
    name: 'HealthFit Nutrition',
    role: 'sponsor',
    avatar: 'https://images.unsplash.com/photo-1559526324-593bc073d938?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
    bio: 'Premium sports nutrition brand specializing in performance supplements and recovery products.',
    company: 'HealthFit Nutrition',
    specialty: 'Nutrition & Supplements',
    connections: ['2'],
    verified: true,
    joined: randomDate(new Date(2020, 0, 1)),
    lastActive: randomDate(new Date(Date.now() - 604800000)),
  },
  {
    id: '7',
    name: 'Tech Athletics',
    role: 'sponsor',
    avatar: 'https://images.unsplash.com/photo-1521119989659-a83eee488004?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
    bio: 'Innovative sports technology company focusing on performance tracking and enhancement tools.',
    company: 'Tech Athletics',
    specialty: 'Sports Technology',
    connections: ['3'],
    verified: true,
    joined: randomDate(new Date(2020, 0, 1)),
    lastActive: randomDate(new Date(Date.now() - 604800000)),
  },
];

// Generate Scouts
export const scouts: Scout[] = [
  {
    id: '8',
    name: 'James Wilson',
    role: 'scout',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
    bio: 'Experienced talent scout specializing in track and field with over 15 years in athlete development.',
    company: 'Elite Athletics Agency',
    specialty: 'Track & Field',
    connections: ['1', '4'],
    verified: true,
    joined: randomDate(new Date(2020, 0, 1)),
    lastActive: randomDate(new Date(Date.now() - 604800000)),
  },
  {
    id: '9',
    name: 'Emily Parker',
    role: 'scout',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
    bio: 'Basketball talent scout focusing on collegiate and international recruitment for professional teams.',
    company: 'Parker Scouting',
    specialty: 'Basketball',
    connections: ['2'],
    verified: true,
    joined: randomDate(new Date(2020, 0, 1)),
    lastActive: randomDate(new Date(Date.now() - 604800000)),
  },
  {
    id: '10',
    name: 'Michael Thompson',
    role: 'scout',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
    bio: 'Tennis talent scout with connections to major tournaments and academies worldwide.',
    company: 'Global Tennis Network',
    specialty: 'Tennis',
    connections: ['3'],
    verified: true,
    joined: randomDate(new Date(2020, 0, 1)),
    lastActive: randomDate(new Date(Date.now() - 604800000)),
  },
];

// Generate more users by cloning and modifying existing ones
const generateMoreUsers = (count: number): User[] => {
  const additionalUsers: User[] = [];
  const sports = ['Soccer', 'Basketball', 'Tennis', 'Swimming', 'Gymnastics', 'Track & Field', 'Baseball', 'Football', 'Volleyball', 'Golf'];
  const companies = ['PowerSport Inc.', 'Athletic Vision', 'Peak Performance', 'GoldMedal Agency', 'Champion Sponsors', 'Victory Talent', 'Elite Scouting'];
  const specialties = ['Equipment', 'Apparel', 'Nutrition', 'Technology', 'Media', 'Youth Development', 'Professional'];
  const avatars = [
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
    'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
  ];

  for (let i = 0; i < count; i++) {
    const roles: UserRole[] = ['athlete', 'sponsor', 'scout'];
    const role = roles[Math.floor(Math.random() * roles.length)];
    const id = (athletes.length + sponsors.length + scouts.length + i + 1).toString();
    const baseUser: User = {
      id,
      name: `User ${id}`,
      role,
      avatar: avatars[Math.floor(Math.random() * avatars.length)],
      bio: `Bio for user ${id} in the role of ${role}.`,
      connections: [],
      verified: Math.random() > 0.3,
      joined: randomDate(new Date(2020, 0, 1)),
      lastActive: randomDate(new Date(Date.now() - 604800000)),
    };

    if (role === 'athlete') {
      const athleteUser = baseUser as Athlete;
      athleteUser.sport = sports[Math.floor(Math.random() * sports.length)];
      athleteUser.achievements = [
        `Achievement 1 for ${id}`,
        `Achievement 2 for ${id}`,
        `Achievement 3 for ${id}`,
      ];
      athleteUser.ranking = Math.floor(Math.random() * 100) + 5;
      athleteUser.sponsorships = Math.floor(Math.random() * 5);
      additionalUsers.push(athleteUser);
    } else if (role === 'sponsor') {
      const sponsorUser = baseUser as Sponsor;
      sponsorUser.company = companies[Math.floor(Math.random() * companies.length)];
      sponsorUser.specialty = specialties[Math.floor(Math.random() * specialties.length)];
      additionalUsers.push(sponsorUser);
    } else if (role === 'scout') {
      const scoutUser = baseUser as Scout;
      scoutUser.company = companies[Math.floor(Math.random() * companies.length)];
      scoutUser.specialty = sports[Math.floor(Math.random() * sports.length)];
      additionalUsers.push(scoutUser);
    }
  }

  return additionalUsers;
};

// Create additional users
const additionalUsers = generateMoreUsers(16);

// Merge all users
export const allUsers: User[] = [
  ...athletes,
  ...sponsors,
  ...scouts,
  ...additionalUsers,
];

// Generate Conversations
export const conversations: Conversation[] = [
  {
    id: '1',
    participants: ['1', '5'],
    unreadCount: 0,
  },
  {
    id: '2',
    participants: ['2', '6'],
    unreadCount: 2,
  },
  {
    id: '3',
    participants: ['3', '7'],
    unreadCount: 0,
  },
  {
    id: '4',
    participants: ['1', '8'],
    unreadCount: 1,
  },
];

// Generate Messages
export const messages: Message[] = [
  {
    id: '1',
    senderId: '5',
    receiverId: '1',
    content: 'Hi Alex, we\'re interested in discussing a potential sponsorship opportunity with you.',
    timestamp: new Date(Date.now() - 86400000 * 3).toISOString(),
    read: true,
  },
  {
    id: '2',
    senderId: '1',
    receiverId: '5',
    content: 'Thanks for reaching out! I\'d be very interested in hearing more about the opportunity.',
    timestamp: new Date(Date.now() - 86400000 * 2).toISOString(),
    read: true,
  },
  {
    id: '3',
    senderId: '5',
    receiverId: '1',
    content: 'Great! We\'re preparing a proposal with details. Are you available for a call next week?',
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    read: true,
  },
  {
    id: '4',
    senderId: '6',
    receiverId: '2',
    content: 'Samantha, we loved your recent championship performance. Would you be interested in a nutrition sponsorship?',
    timestamp: new Date(Date.now() - 86400000 * 2).toISOString(),
    read: true,
  },
  {
    id: '5',
    senderId: '6',
    receiverId: '2',
    content: 'We have a new product line launching next month that would align perfectly with your brand.',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    read: false,
  },
  {
    id: '6',
    senderId: '7',
    receiverId: '3',
    content: 'David, our new racket technology would be perfect for your style of play. Would you be interested in testing it?',
    timestamp: new Date(Date.now() - 86400000 * 4).toISOString(),
    read: true,
  },
  {
    id: '7',
    senderId: '3',
    receiverId: '7',
    content: 'That sounds interesting. I\'m always looking for equipment that can enhance my performance.',
    timestamp: new Date(Date.now() - 86400000 * 3).toISOString(),
    read: true,
  },
  {
    id: '8',
    senderId: '8',
    receiverId: '1',
    content: 'Alex, I was impressed by your recent performance. Let\'s discuss some potential opportunities.',
    timestamp: new Date(Date.now() - 1800000).toISOString(),
    read: false,
  },
];

// Generate Connection Requests
export const connectionRequests: ConnectionRequest[] = [
  {
    id: '1',
    senderId: '11',
    receiverId: '1',
    message: 'I\'d like to connect with you as a fellow athlete.',
    timestamp: new Date(Date.now() - 259200000).toISOString(),
    status: 'pending',
  },
  {
    id: '2',
    senderId: '12',
    receiverId: '2',
    message: 'I\'m a scout specializing in basketball and would love to connect.',
    timestamp: new Date(Date.now() - 172800000).toISOString(),
    status: 'accepted',
  },
  {
    id: '3',
    senderId: '13',
    receiverId: '3',
    message: 'We\'re a sports tech company and would like to discuss a potential partnership.',
    timestamp: new Date(Date.now() - 432000000).toISOString(),
    status: 'rejected',
  },
];

// Generate Notifications
export const notifications: Notification[] = [
  {
    id: '1',
    userId: '1',
    type: 'connection',
    content: 'Global Sports Co. accepted your connection request',
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    read: false,
    actionId: '5',
  },
  {
    id: '2',
    userId: '1',
    type: 'message',
    content: 'You have a new message from Global Sports Co.',
    timestamp: new Date(Date.now() - 43200000).toISOString(),
    read: true,
    actionId: '3',
  },
  {
    id: '3',
    userId: '2',
    type: 'sponsorship',
    content: 'HealthFit Nutrition has offered you a sponsorship',
    timestamp: new Date(Date.now() - 172800000).toISOString(),
    read: false,
    actionId: '6',
  },
  {
    id: '4',
    userId: '3',
    type: 'ranking',
    content: 'Congratulations! Your ranking has improved to #3',
    timestamp: new Date(Date.now() - 604800000).toISOString(),
    read: true,
  },
];

// Helper functions to find entities
export const findUserById = (id: string): User | undefined => {
  return allUsers.find(user => user.id === id);
};

export const findAthleteById = (id: string): Athlete | undefined => {
  const user = findUserById(id);
  return user?.role === 'athlete' ? user as Athlete : undefined;
};

export const findSponsorById = (id: string): Sponsor | undefined => {
  const user = findUserById(id);
  return user?.role === 'sponsor' ? user as Sponsor : undefined;
};

export const findScoutById = (id: string): Scout | undefined => {
  const user = findUserById(id);
  return user?.role === 'scout' ? user as Scout : undefined;
};

export const getTopAthletes = (limit: number = 10): Athlete[] => {
  return athletes
    .concat(allUsers.filter(user => user.role === 'athlete') as Athlete[])
    .sort((a, b) => a.ranking - b.ranking)
    .slice(0, limit);
};

export const getUserConnections = (userId: string): User[] => {
  const user = findUserById(userId);
  if (!user) return [];
  
  return allUsers.filter(u => user.connections.includes(u.id));
};

export const getConversationMessages = (conversationId: string): Message[] => {
  const conversation = conversations.find(c => c.id === conversationId);
  if (!conversation) return [];
  
  return messages.filter(m => 
    conversation.participants.includes(m.senderId) && 
    conversation.participants.includes(m.receiverId)
  ).sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
};

export const getUserConversations = (userId: string): Conversation[] => {
  return conversations.filter(c => c.participants.includes(userId));
};

export const getConnectionRequests = (userId: string, status?: 'pending' | 'accepted' | 'rejected'): ConnectionRequest[] => {
  return connectionRequests.filter(
    cr => cr.receiverId === userId && (status ? cr.status === status : true)
  );
};

export const getUserNotifications = (userId: string): Notification[] => {
  return notifications.filter(n => n.userId === userId);
};

// Function to search users
export const searchUsers = (query: string, filters?: { role?: UserRole; sport?: string; ranking?: number; }): User[] => {
  return allUsers.filter(user => {
    const matchesQuery = user.name.toLowerCase().includes(query.toLowerCase()) || 
                         user.bio.toLowerCase().includes(query.toLowerCase());
    
    const matchesRole = !filters?.role || user.role === filters.role;
    
    const matchesSport = !filters?.sport || 
                         (user.role === 'athlete' && (user as Athlete).sport === filters.sport) ||
                         (user.role === 'scout' && (user as Scout).specialty === filters.sport);
    
    const matchesRanking = !filters?.ranking || 
                           (user.role === 'athlete' && (user as Athlete).ranking <= filters.ranking);
    
    return matchesQuery && matchesRole && matchesSport && matchesRanking;
  });
};

// Generate fake ID for new entities
export const generateId = (): string => {
  return uuidv4();
};
