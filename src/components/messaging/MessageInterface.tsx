
import React, { useState, useRef, useEffect } from 'react';
import { 
  conversations, 
  messages,
  findUserById, 
  getUserConversations, 
  getConversationMessages,
  generateId 
} from '@/lib/data';
import { Conversation, Message, User } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Send, Info, MoreVertical, Phone, Video, Search, PaperclipIcon, Smile, Image, File, CheckCheck } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { formatDistanceToNow } from 'date-fns';

interface MessageInterfaceProps {
  userId?: string;
  initialContactId?: string;
}

const MessageInterface: React.FC<MessageInterfaceProps> = ({ userId = '1', initialContactId }) => {
  const [conversationList, setConversationList] = useState<Conversation[]>(getUserConversations(userId));
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
  const [conversationMessages, setConversationMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [otherUser, setOtherUser] = useState<User | null>(null);

  // If initialContactId is provided, find or create that conversation
  useEffect(() => {
    if (initialContactId) {
      // Find if conversation exists
      const existingConversation = conversationList.find(
        c => c.participants.includes(initialContactId)
      );
      
      if (existingConversation) {
        setActiveConversation(existingConversation);
      } else {
        // Create a new conversation
        const newConversation: Conversation = {
          id: generateId(),
          participants: [userId, initialContactId],
          unreadCount: 0
        };
        
        // Update conversations and set as active
        setConversationList(prev => [...prev, newConversation]);
        setActiveConversation(newConversation);
        conversations.push(newConversation);
      }
    } else if (conversationList.length > 0) {
      // If no initialContactId is provided, use the first conversation
      setActiveConversation(conversationList[0]);
    }
  }, [initialContactId, userId, conversationList]);

  // Update otherUser when activeConversation changes
  useEffect(() => {
    if (activeConversation) {
      const otherParticipantId = activeConversation.participants.find(id => id !== userId);
      if (otherParticipantId) {
        const user = findUserById(otherParticipantId);
        if (user) {
          setOtherUser(user);
        }
      }
      
      setConversationMessages(getConversationMessages(activeConversation.id));
    }
  }, [activeConversation, userId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversationMessages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim() || !activeConversation || !otherUser) return;
    
    const message: Message = {
      id: generateId(),
      senderId: userId,
      receiverId: otherUser.id,
      content: newMessage,
      timestamp: new Date().toISOString(),
      read: false,
    };
    
    setConversationMessages(prev => [...prev, message]);
    messages.push(message);
    setNewMessage('');
  };

  const formatMessageDate = (timestamp: string) => {
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
  };

  return (
    <div className="flex h-[calc(100vh-7rem)] overflow-hidden rounded-lg border bg-white shadow-sm">
      {/* Conversation list */}
      <div className="w-80 border-r flex flex-col">
        <div className="p-4 border-b">
          <h2 className="font-semibold">Messages</h2>
        </div>
        
        <div className="p-3">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search conversations..."
              className="pl-8"
            />
          </div>
        </div>
        
        <Tabs defaultValue="all" className="flex-1 flex flex-col">
          <div className="px-3">
            <TabsList className="w-full grid grid-cols-2">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="unread">Unread</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="all" className="flex-1 data-[state=active]:flex flex-col overflow-hidden">
            <ScrollArea className="flex-1">
              <div className="space-y-1 p-2">
                {conversationList.map(conversation => {
                  const otherParticipantId = conversation.participants.find(id => id !== userId);
                  const otherParticipant = findUserById(otherParticipantId || '');
                  const lastMessage = getConversationMessages(conversation.id).pop();
                  
                  if (!otherParticipant || !lastMessage) return null;
                  
                  const isActive = activeConversation?.id === conversation.id;
                  
                  return (
                    <button
                      key={conversation.id}
                      className={`w-full flex items-start p-3 space-x-3 rounded-md hover:bg-muted transition-colors text-left ${
                        isActive ? 'bg-primary/5 hover:bg-primary/10' : ''
                      }`}
                      onClick={() => setActiveConversation(conversation)}
                    >
                      <div className="relative flex-shrink-0">
                        <div className="w-10 h-10 rounded-full overflow-hidden">
                          <img 
                            src={otherParticipant.avatar} 
                            alt={otherParticipant.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        {conversation.unreadCount > 0 && (
                          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                            <span className="text-[10px] text-white font-semibold">
                              {conversation.unreadCount}
                            </span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-baseline">
                          <h3 className="font-medium truncate">{otherParticipant.name}</h3>
                          <span className="text-xs text-muted-foreground">
                            {formatDistanceToNow(new Date(lastMessage.timestamp), { addSuffix: false })}
                          </span>
                        </div>
                        <p className={`text-sm truncate ${
                          lastMessage.senderId !== userId && !lastMessage.read 
                            ? 'font-medium text-foreground' 
                            : 'text-muted-foreground'
                        }`}>
                          {lastMessage.senderId === userId ? 'You: ' : ''}
                          {lastMessage.content}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="unread" className="flex-1 data-[state=active]:flex flex-col overflow-hidden">
            <ScrollArea className="flex-1">
              <div className="space-y-1 p-2">
                {conversationList.filter(c => c.unreadCount > 0).map(conversation => {
                  const otherParticipantId = conversation.participants.find(id => id !== userId);
                  const otherParticipant = findUserById(otherParticipantId || '');
                  const lastMessage = getConversationMessages(conversation.id).pop();
                  
                  if (!otherParticipant || !lastMessage) return null;
                  
                  const isActive = activeConversation?.id === conversation.id;
                  
                  return (
                    <button
                      key={conversation.id}
                      className={`w-full flex items-start p-3 space-x-3 rounded-md hover:bg-muted transition-colors text-left ${
                        isActive ? 'bg-primary/5 hover:bg-primary/10' : ''
                      }`}
                      onClick={() => setActiveConversation(conversation)}
                    >
                      <div className="relative flex-shrink-0">
                        <div className="w-10 h-10 rounded-full overflow-hidden">
                          <img 
                            src={otherParticipant.avatar} 
                            alt={otherParticipant.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                          <span className="text-[10px] text-white font-semibold">
                            {conversation.unreadCount}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-baseline">
                          <h3 className="font-medium truncate">{otherParticipant.name}</h3>
                          <span className="text-xs text-muted-foreground">
                            {formatDistanceToNow(new Date(lastMessage.timestamp), { addSuffix: false })}
                          </span>
                        </div>
                        <p className="text-sm truncate font-medium">
                          {lastMessage.content}
                        </p>
                      </div>
                    </button>
                  );
                })}
                
                {conversationList.filter(c => c.unreadCount > 0).length === 0 && (
                  <div className="p-8 text-center">
                    <p className="text-muted-foreground">No unread messages</p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Message thread */}
      {activeConversation && otherUser ? (
        <div className="flex-1 flex flex-col">
          <div className="p-4 border-b flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                <img 
                  src={otherUser.avatar} 
                  alt={otherUser.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="font-semibold">{otherUser.name}</h2>
                <p className="text-xs text-muted-foreground">
                  {otherUser.role.charAt(0).toUpperCase() + otherUser.role.slice(1)} • 
                  {otherUser.role === 'athlete' 
                    ? ` ${(otherUser as any).sport}`
                    : ` ${(otherUser as any).specialty}`
                  }
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Phone size={18} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Call</p>
                  </TooltipContent>
                </Tooltip>
                
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Video size={18} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Video Call</p>
                  </TooltipContent>
                </Tooltip>
                
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Info size={18} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Conversation Info</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical size={18} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>View Profile</DropdownMenuItem>
                  <DropdownMenuItem>Mark as Unread</DropdownMenuItem>
                  <DropdownMenuItem>Mute Conversation</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-500">Block User</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-6">
              {conversationMessages.map((message, index) => {
                const isCurrentUser = message.senderId === userId;
                const sender = findUserById(message.senderId);
                const dateLabel = formatMessageDate(message.timestamp);
                
                // Check if we should show a date separator
                const showDateSeparator = index === 0 || (
                  new Date(message.timestamp).toDateString() !== 
                  new Date(conversationMessages[index - 1].timestamp).toDateString()
                );
                
                return (
                  <React.Fragment key={message.id}>
                    {showDateSeparator && (
                      <div className="flex items-center justify-center my-4">
                        <Separator className="flex-grow" />
                        <span className="mx-2 text-xs text-muted-foreground">
                          {new Date(message.timestamp).toLocaleDateString()}
                        </span>
                        <Separator className="flex-grow" />
                      </div>
                    )}
                    
                    <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
                      <div className={`flex space-x-2 max-w-[70%] ${isCurrentUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
                        {!isCurrentUser && (
                          <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                            <img 
                              src={sender?.avatar} 
                              alt={sender?.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        
                        <div>
                          <div 
                            className={`rounded-2xl p-3 ${
                              isCurrentUser 
                                ? 'bg-primary text-white' 
                                : 'bg-muted'
                            }`}
                          >
                            <p className="text-sm">{message.content}</p>
                          </div>
                          <div className={`flex items-center mt-1 text-xs text-muted-foreground ${isCurrentUser ? 'justify-end' : ''}`}>
                            <span>{dateLabel}</span>
                            {isCurrentUser && (
                              <span className="ml-1">
                                <CheckCheck size={14} className="text-primary" />
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </React.Fragment>
                );
              })}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
          
          <div className="p-4 border-t">
            <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="flex-shrink-0"
              >
                <PaperclipIcon size={18} />
              </Button>
              
              <Input
                type="text"
                placeholder="Type a message..."
                className="flex-1"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              
              <div className="flex items-center space-x-1 flex-shrink-0">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Smile size={18} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Emoji</p>
                    </TooltipContent>
                  </Tooltip>
                  
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Image size={18} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Send Image</p>
                    </TooltipContent>
                  </Tooltip>
                  
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <File size={18} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Send File</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
                <Button type="submit" size="icon" className="rounded-full">
                  <Send size={18} />
                </Button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center max-w-sm">
            <h2 className="text-xl font-semibold mb-2">Select a conversation</h2>
            <p className="text-muted-foreground">
              Choose a conversation from the list or start a new one by searching for users.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageInterface;
