import { Athlete, ConnectionRequest, Conversation, Message, Notification, Scout, Sponsor, User, UserRole } from './types';
import { v4 as uuidv4 } from 'uuid';

// Helper function to generate a random date in the last year
const randomDate = (start = new Date(Date.now() - 31536000000), end = new Date()) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString();
};

// Generate Athletes with more diverse data
export const athletes: Athlete[] = [
  {
    id: '1',
    name: 'Marcus Taylor',
    role: 'athlete',
    avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
    bio: 'Olympic gold medalist in 100m sprint. Passionate about inspiring the next generation of athletes.',
    sport: 'Track & Field',
    achievements: ['Olympic Gold Medal 2020', 'World Record Holder 100m', '5x National Champion'],
    ranking: 1,
    connections: ['5', '8', '11'],
    sponsorships: 5,
    verified: true,
    joined: randomDate(new Date(2020, 0, 1)),
    lastActive: randomDate(new Date(Date.now() - 604800000)),
  },
  {
    id: '2',
    name: 'Olivia Bennett',
    role: 'athlete',
    avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
    bio: 'Professional basketball player with a focus on community outreach and youth development.',
    sport: 'Basketball',
    achievements: ['WNBA Champion 2022', 'MVP Finals 2021', 'All-Star 5x'],
    ranking: 2,
    connections: ['6', '9', '12'],
    sponsorships: 4,
    verified: true,
    joined: randomDate(new Date(2020, 0, 1)),
    lastActive: randomDate(new Date(Date.now() - 604800000)),
  },
  {
    id: '3',
    name: 'Rajan Patel',
    role: 'athlete',
    avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
    bio: 'Tennis champion with a passion for sustainability and eco-friendly sports equipment.',
    sport: 'Tennis',
    achievements: ['Grand Slam Winner 2023', 'ATP Masters Champion', 'Davis Cup Winner'],
    ranking: 3,
    connections: ['7', '10'],
    sponsorships: 3,
    verified: true,
    joined: randomDate(new Date(2020, 0, 1)),
    lastActive: randomDate(new Date(Date.now() - 604800000)),
  },
  {
    id: '4',
    name: 'Lucia Rodriguez',
    role: 'athlete',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
    bio: 'Soccer player focused on advancing women in sports. Educational advocate and coach.',
    sport: 'Soccer',
    achievements: ['World Cup Winner 2023', 'Golden Boot 2022', 'Champions League Winner'],
    ranking: 4,
    connections: ['5', '8'],
    sponsorships: 2,
    verified: true,
    joined: randomDate(new Date(2020, 0, 1)),
    lastActive: randomDate(new Date(Date.now() - 604800000)),
  },
];

// Generate Sponsors with more diverse data
export const sponsors: Sponsor[] = [
  {
    id: '5',
    name: 'NexGen Athletics',
    role: 'sponsor',
    avatar: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
    bio: 'Market leader in sports equipment and apparel. Looking to sponsor top athletes across all sports.',
    company: 'NexGen Athletics',
    specialty: 'Equipment & Apparel',
    connections: ['1', '4'],
    verified: true,
    joined: randomDate(new Date(2020, 0, 1)),
    lastActive: randomDate(new Date(Date.now() - 604800000)),
  },
  {
    id: '6',
    name: 'VitalBoost Nutrition',
    role: 'sponsor',
    avatar: 'https://images.unsplash.com/photo-1559526324-593bc073d938?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
    bio: 'Premium sports nutrition brand specializing in performance supplements and recovery products.',
    company: 'VitalBoost Nutrition',
    specialty: 'Nutrition & Supplements',
    connections: ['2'],
    verified: true,
    joined: randomDate(new Date(2020, 0, 1)),
    lastActive: randomDate(new Date(Date.now() - 604800000)),
  },
  {
    id: '7',
    name: 'Apex Tech Sports',
    role: 'sponsor',
    avatar: 'https://images.unsplash.com/photo-1521119989659-a83eee488004?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
    bio: 'Innovative sports technology company focusing on performance tracking and enhancement tools.',
    company: 'Apex Tech Sports',
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
    name: 'Daniel Harrison',
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
    name: 'Sophia Chen',
    role: 'scout',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
    bio: 'Basketball talent scout focusing on collegiate and international recruitment for professional teams.',
    company: 'Global Talent Network',
    specialty: 'Basketball',
    connections: ['2'],
    verified: true,
    joined: randomDate(new Date(2020, 0, 1)),
    lastActive: randomDate(new Date(Date.now() - 604800000)),
  },
  {
    id: '10',
    name: 'Jamal Brooks',
    role: 'scout',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
    bio: 'Tennis talent scout with connections to major tournaments and academies worldwide.',
    company: 'Premier Tennis Network',
    specialty: 'Tennis',
    connections: ['3'],
    verified: true,
    joined: randomDate(new Date(2020, 0, 1)),
    lastActive: randomDate(new Date(Date.now() - 604800000)),
  },
];

// Generate more diverse users with unique profiles
const generateMoreUsers = (count: number): User[] => {
  const additionalUsers: User[] = [];
  const sports = ['Swimming', 'Gymnastics', 'Boxing', 'Cricket', 'Volleyball', 'Golf', 'Rugby', 'Badminton', 'Fencing', 'Archery'];
  const companies = ['Quantum Athletics', 'Gold Medal Partners', 'Victory Sports Group', 'Elite Talent Agency', 'Champion Endorsements', 'Future Stars', 'Premier Scouting'];
  const specialties = ['Performance Gear', 'Footwear', 'Recovery Products', 'Data Analytics', 'Media & Broadcast', 'Youth Development', 'International Talent'];
  
  const names = [
    'Kenji Nakamura', 'Zara Mohamed', 'Diego Fernandez', 'Aisha Khan', 'Wei Chen', 
    'Fatima Al-Sayed', 'Jackson Powell', 'Priya Sharma', 'Liam O\'Connell', 'Elena Petrova',
    'Mateo Gonzalez', 'Nadia Rahman', 'Xavier Thomas', 'Layla Patel', 'Takeshi Yamamoto',
    'Gabriela Costa', 'Ibrahim Hassan', 'Sasha Ivanova', 'Kai Wong', 'Amara Okafor'
  ];
  
  const avatars = [
    'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
    'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
    'https://images.unsplash.com/photo-1546961329-78bef0414d7c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
    'https://images.unsplash.com/photo-1502378735452-bc7d86632805?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
    'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
    'https://images.unsplash.com/photo-1504203772830-87fba72385ee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
    'https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
    'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
    'https://images.unsplash.com/photo-1549351236-caca0f174515?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
    'https://images.unsplash.com/photo-1624224971170-2f84fed5eb5e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
  ];

  for (let i = 0; i < count; i++) {
    const roles: UserRole[] = ['athlete', 'sponsor', 'scout'];
    const role = roles[Math.floor(Math.random() * roles.length)];
    const id = (athletes.length + sponsors.length + scouts.length + i + 1).toString();
    const name = names[i % names.length];
    const baseUser: User = {
      id,
      name,
      role,
      avatar: avatars[i % avatars.length],
      bio: `${name} is a ${role === 'athlete' ? 'professional athlete' : role === 'sponsor' ? 'sports sponsor' : 'talent scout'} with a passion for excellence in the sports industry.`,
      connections: [],
      verified: Math.random() > 0.3,
      joined: randomDate(new Date(2020, 0, 1)),
      lastActive: randomDate(new Date(Date.now() - 604800000)),
    };

    if (role === 'athlete') {
      const athleteUser = baseUser as Athlete;
      athleteUser.sport = sports[Math.floor(Math.random() * sports.length)];
      
      // Varied achievements with more realistic data
      const achievements = [
        `${Math.floor(Math.random() * 3) + 1}x National Champion in ${athleteUser.sport}`,
        `Silver Medalist, ${2020 + Math.floor(Math.random() * 3)} World Championships`,
        `${athleteUser.sport} League MVP ${2020 + Math.floor(Math.random() * 3)}`,
        `Team Captain, National ${athleteUser.sport} Team`,
        `Continental Games Gold Medal ${2021 + Math.floor(Math.random() * 2)}`,
        `Ranked #${Math.floor(Math.random() * 10) + 1} in ${athleteUser.sport} ${2022 + Math.floor(Math.random() * 2)}`,
        `${athleteUser.sport} Young Player of the Year ${2020 + Math.floor(Math.random() * 3)}`,
        `Olympics Quarter-finalist ${2021 + Math.floor(Math.random() * 2)}`
      ];
      
      athleteUser.achievements = [
        achievements[Math.floor(Math.random() * achievements.length)],
        achievements[Math.floor(Math.random() * achievements.length)],
        achievements[Math.floor(Math.random() * achievements.length)]
      ].filter((value, index, self) => self.indexOf(value) === index); // Remove duplicates
      
      // If we removed too many (because of duplicates), add more
      while (athleteUser.achievements.length < 3) {
        const newAchievement = achievements[Math.floor(Math.random() * achievements.length)];
        if (!athleteUser.achievements.includes(newAchievement)) {
          athleteUser.achievements.push(newAchievement);
        }
      }
      
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
    unreadCount: 2,
  },
  {
    id: '2',
    participants: ['2', '6'],
    unreadCount: 3,
  },
  {
    id: '3',
    participants: ['3', '7'],
    unreadCount: 0,
  },
  {
    id: '4',
    participants: ['1', '8'],
    unreadCount: 2,
  },
  {
    id: '5',
    participants: ['1', '9'],
    unreadCount: 1,
  },
  {
    id: '6',
    participants: ['1', '11'],
    unreadCount: 0,
  },
];

// Generate Messages
export const messages: Message[] = [
  {
    id: '1',
    senderId: '5',
    receiverId: '1',
    content: 'Hi Marcus, we\'re interested in discussing a potential sponsorship opportunity with you.',
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
    read: false,
  },
  {
    id: '4',
    senderId: '5',
    receiverId: '1',
    content: 'We\'d like to offer you our premium sponsorship package worth $150,000 annually.',
    timestamp: new Date(Date.now() - 43200000).toISOString(),
    read: false,
  },
  {
    id: '5',
    senderId: '6',
    receiverId: '2',
    content: 'Olivia, we loved your recent championship performance. Would you be interested in a nutrition sponsorship?',
    timestamp: new Date(Date.now() - 86400000 * 2).toISOString(),
    read: true,
  },
  {
    id: '6',
    senderId: '6',
    receiverId: '2',
    content: 'We have a new product line launching next month that would align perfectly with your brand.',
    timestamp: new Date(Date.now() - 3600000 * 10).toISOString(),
    read: false,
  },
  {
    id: '7',
    senderId: '6',
    receiverId: '2',
    content: 'The campaign would involve social media promotion and appearances at our product launch events.',
    timestamp: new Date(Date.now() - 3600000 * 5).toISOString(),
    read: false,
  },
  {
    id: '8',
    senderId: '6',
    receiverId: '2',
    content: 'Let us know if you\'re available to discuss this opportunity in more detail.',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    read: false,
  },
  {
    id: '9',
    senderId: '7',
    receiverId: '3',
    content: 'Rajan, our new racket technology would be perfect for your style of play. Would you be interested in testing it?',
    timestamp: new Date(Date.now() - 86400000 * 4).toISOString(),
    read: true,
  },
  {
    id: '10',
    senderId: '3',
    receiverId: '7',
    content: 'That sounds interesting. I\'m always looking for equipment that can enhance my performance.',
    timestamp: new Date(Date.now() - 86400000 * 3).toISOString(),
    read: true,
  },
  {
    id: '11',
    senderId: '8',
    receiverId: '1',
    content: 'Marcus, I was impressed by your recent performance. Let\'s discuss some potential opportunities.',
    timestamp: new Date(Date.now() - 1800000 * 3).toISOString(),
    read: false,
  },
  {
    id: '12',
    senderId: '8',
    receiverId: '1',
    content: 'My agency is representing several major international competitions looking for athletes of your caliber.',
    timestamp: new Date(Date.now() - 1800000).toISOString(),
    read: false,
  },
  {
    id: '13',
    senderId: '9',
    receiverId: '1',
    content: 'Hello Marcus, I\'m reaching out from Global Talent Network. We\'d love to have you join our roster of elite athletes.',
    timestamp: new Date(Date.now() - 86400000 * 1.5).toISOString(),
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
  {
    id: '4',
    senderId: '14',
    receiverId: '1',
    message: 'Impressed with your achievements! Would love to connect.',
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    status: 'pending',
  },
  {
    id: '5',
    senderId: '15',
    receiverId: '1',
    message: 'Looking for ambassadors for our new sports line. Interested?',
    timestamp: new Date(Date.now() - 129600000).toISOString(),
    status: 'pending',
  },
];

// Generate Notifications
export const notifications: Notification[] = [
  {
    id: '1',
    userId: '1',
    type: 'connection',
    content: 'NexGen Athletics accepted your connection request',
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    read: false,
    actionId: '5',
  },
  {
    id: '2',
    userId: '1',
    type: 'message',
    content: 'You have a new message from NexGen Athletics',
    timestamp: new Date(Date.now() - 43200000).toISOString(),
    read: false,
    actionId: '3',
  },
  {
    id: '3',
    userId: '1',
    type: 'message',
    content: 'You have a new message from Daniel Harrison',
    timestamp: new Date(Date.now() - 21600000).toISOString(),
    read: false,
    actionId: '11',
  },
  {
    id: '4',
    userId: '1',
    type: 'connection',
    content: 'You have 3 pending connection requests',
    timestamp: new Date(Date.now() - 10800000).toISOString(),
    read: false,
  },
  {
    id: '5',
    userId: '1',
    type: 'sponsorship',
    content: 'NexGen Athletics has offered you a sponsorship',
    timestamp: new Date(Date.now() - 5400000).toISOString(),
    read: false,
    actionId: '5',
  },
  {
    id: '6',
    userId: '2',
    type: 'sponsorship',
    content: 'VitalBoost Nutrition has offered you a sponsorship',
    timestamp: new Date(Date.now() - 172800000).toISOString(),
    read: false,
    actionId: '6',
  },
  {
    id: '7',
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

// Find or create a conversation between two users
export const findOrCreateConversation = (userId1: string, userId2: string): Conversation => {
  const existingConversation = conversations.find(
    c => c.participants.includes(userId1) && c.participants.includes(userId2)
  );
  
  if (existingConversation) {
    return existingConversation;
  }
  
  // Create a new conversation
  const newConversation: Conversation = {
    id: generateId(),
    participants: [userId1, userId2],
    unreadCount: 0
  };
  
  conversations.push(newConversation);
  return newConversation;
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

// Get unread message count for a user
export const getUnreadMessageCount = (userId: string): number => {
  const userConversations = getUserConversations(userId);
  return userConversations.reduce((total, conv) => total + conv.unreadCount, 0);
};

// Get unread notification count for a user
export const getUnreadNotificationCount = (userId: string): number => {
  const userNotifications = getUserNotifications(userId);
  return userNotifications.filter(n => !n.read).length;
};

// Update user profile info
export const updateUserProfile = (userId: string, updates: Partial<User>): User | undefined => {
  const userIndex = allUsers.findIndex(u => u.id === userId);
  if (userIndex === -1) return undefined;
  
  allUsers[userIndex] = { ...allUsers[userIndex], ...updates };
  return allUsers[userIndex];
};
