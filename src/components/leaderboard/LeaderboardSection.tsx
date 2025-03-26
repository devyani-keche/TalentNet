
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getTopAthletes } from '@/lib/data';
import { Athlete } from '@/lib/types';
import { ArrowUp, ChevronUp, ChevronDown, Trophy, Star, TrendingUp, Medal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface LeaderboardSectionProps {
  limit?: number;
  showViewAll?: boolean;
}

const LeaderboardSection: React.FC<LeaderboardSectionProps> = ({ 
  limit = 10,
  showViewAll = true,
}) => {
  const [visibleAthletes, setVisibleAthletes] = useState(limit);
  const topAthletes = getTopAthletes(20);
  
  const displayedAthletes = topAthletes.slice(0, visibleAthletes);
  
  const loadMore = () => {
    setVisibleAthletes(prev => Math.min(prev + 5, topAthletes.length));
  };

  return (
    <div className="space-y-6">
      <div>
        <Tabs defaultValue="ranking">
          <TabsList className="mb-6">
            <TabsTrigger value="ranking">Overall Ranking</TabsTrigger>
            <TabsTrigger value="trending">Trending</TabsTrigger>
            <TabsTrigger value="sponsorships">Most Sponsored</TabsTrigger>
          </TabsList>
          
          <TabsContent value="ranking" className="space-y-4 animate-fade-in">
            <LeaderboardList 
              athletes={displayedAthletes}
              rankingKey="ranking"
              rankingLabel="Rank"
              statsKey="achievements"
              statsLabel="Achievements"
            />
          </TabsContent>
          
          <TabsContent value="trending" className="space-y-4 animate-fade-in">
            <LeaderboardList 
              athletes={displayedAthletes}
              rankingKey="ranking"
              rankingLabel="Trend"
              statsKey="trending"
              statsLabel="Change"
              trendingDisplay
            />
          </TabsContent>
          
          <TabsContent value="sponsorships" className="space-y-4 animate-fade-in">
            <LeaderboardList 
              athletes={displayedAthletes}
              rankingKey="sponsorships"
              rankingLabel="Sponsors"
              statsKey="sponsorships"
              statsLabel="Sponsorships"
              isSponsorshipRanking
            />
          </TabsContent>
        </Tabs>
      </div>
      
      {visibleAthletes < topAthletes.length && (
        <div className="text-center pt-4">
          <Button variant="outline" onClick={loadMore}>
            Load More
          </Button>
        </div>
      )}
      
      {showViewAll && (
        <div className="text-center pt-2">
          <Link to="/leaderboard">
            <Button variant="ghost" className="text-primary">
              View Complete Leaderboard
              <ArrowUp className="ml-2 rotate-45" size={16} />
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

interface LeaderboardListProps {
  athletes: Athlete[];
  rankingKey: 'ranking' | 'sponsorships';
  rankingLabel: string;
  statsKey: 'achievements' | 'sponsorships' | 'trending';
  statsLabel: string;
  trendingDisplay?: boolean;
  isSponsorshipRanking?: boolean;
}

const LeaderboardList: React.FC<LeaderboardListProps> = ({
  athletes,
  rankingKey,
  rankingLabel,
  statsKey,
  statsLabel,
  trendingDisplay = false,
  isSponsorshipRanking = false,
}) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-sm font-medium text-muted-foreground px-4">
        <div className="w-12">{rankingLabel}</div>
        <div className="flex-1">Athlete</div>
        <div className="w-32 text-right">{statsLabel}</div>
      </div>
      
      {athletes.map((athlete, index) => {
        // Generate random trending value for demo
        const trendingValue = Math.floor(Math.random() * 20) - 10; // -10 to +10
        const trendingDirection = trendingValue >= 0 ? 'up' : 'down';
        
        // Calculate medal for top 3
        const medalIndex = index < 3 ? index : null;
        
        return (
          <LeaderboardItem 
            key={athlete.id}
            athlete={athlete}
            rank={index + 1}
            medalIndex={medalIndex}
            trendingValue={trendingValue}
            trendingDirection={trendingDirection}
            trendingDisplay={trendingDisplay}
            isSponsorshipRanking={isSponsorshipRanking}
          />
        );
      })}
    </div>
  );
};

interface LeaderboardItemProps {
  athlete: Athlete;
  rank: number;
  medalIndex: number | null;
  trendingValue: number;
  trendingDirection: 'up' | 'down';
  trendingDisplay?: boolean;
  isSponsorshipRanking?: boolean;
}

const LeaderboardItem: React.FC<LeaderboardItemProps> = ({
  athlete,
  rank,
  medalIndex,
  trendingValue,
  trendingDirection,
  trendingDisplay = false,
  isSponsorshipRanking = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const getMedalIcon = (index: number | null) => {
    if (index === null) return null;
    
    const colors = ['text-amber-500', 'text-slate-400', 'text-amber-700'];
    
    return (
      <Medal size={18} className={colors[index]} />
    );
  };
  
  const getTrendingIcon = () => {
    return trendingDirection === 'up' ? (
      <ChevronUp size={18} className="text-green-500" />
    ) : (
      <ChevronDown size={18} className="text-red-500" />
    );
  };
  
  return (
    <Link 
      to={`/profile/${athlete.id}`}
      className="block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className={`glass-card flex items-center p-4 transition-all duration-300 ${
          isHovered ? 'shadow-elevated -translate-y-1' : ''
        }`}
      >
        <div className="w-12 flex justify-center">
          {trendingDisplay ? (
            getTrendingIcon()
          ) : (
            medalIndex !== null ? (
              getMedalIcon(medalIndex)
            ) : (
              <span className="font-semibold text-muted-foreground">#{rank}</span>
            )
          )}
        </div>
        
        <div className="flex-1 flex items-center">
          <div className="relative">
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <img 
                src={athlete.avatar} 
                alt={athlete.name} 
                className="w-full h-full object-cover"
              />
            </div>
            
            {!isSponsorshipRanking && (
              <div className="absolute -right-1 -bottom-1 bg-primary rounded-full w-5 h-5 flex items-center justify-center text-white text-[10px] font-bold border border-white">
                #{athlete.ranking}
              </div>
            )}
          </div>
          
          <div className="ml-3">
            <h3 className="font-medium">{athlete.name}</h3>
            <p className="text-xs text-muted-foreground">{athlete.sport}</p>
          </div>
        </div>
        
        <div className="w-32 text-right">
          {trendingDisplay ? (
            <div className="flex items-center justify-end">
              <span className={trendingDirection === 'up' ? 'text-green-500' : 'text-red-500'}>
                {trendingDirection === 'up' ? '+' : ''}{trendingValue}%
              </span>
            </div>
          ) : isSponsorshipRanking ? (
            <div className="flex items-center justify-end space-x-1">
              <Star size={16} className="text-amber-400" />
              <span>{athlete.sponsorships}</span>
            </div>
          ) : (
            <div className="flex items-center justify-end">
              <span>{athlete.achievements.length}</span>
            </div>
          )}
        </div>
        
        <div className={`ml-2 transition-all duration-300 ${isHovered ? 'translate-x-1 text-primary' : 'text-transparent'}`}>
          <ChevronRight size={16} />
        </div>
      </div>
    </Link>
  );
};

const ChevronRight = ({ size, className }: { size: number; className?: string }) => (
  <div className={className}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  </div>
);

export default LeaderboardSection;
