
import React, { useState, useRef, useEffect } from 'react';
import { Search, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { UserRole } from '@/lib/types';

interface SearchBarProps {
  onSearch: (query: string, filters: SearchFilters) => void;
  placeholder?: string;
}

export interface SearchFilters {
  role?: UserRole;
  sport?: string;
  ranking?: number;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  placeholder = 'Search athletes, sponsors, or scouts...' 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<SearchFilters>({});
  const [isOpen, setIsOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const roleOptions: { value: UserRole; label: string }[] = [
    { value: 'athlete', label: 'Athletes' },
    { value: 'sponsor', label: 'Sponsors' },
    { value: 'scout', label: 'Scouts' },
  ];

  const sportOptions = [
    'Basketball', 
    'Soccer', 
    'Tennis', 
    'Swimming', 
    'Track & Field', 
    'Gymnastics', 
    'Golf', 
    'Football',
    'Baseball',
    'Volleyball'
  ];

  const rankingOptions = [
    { value: 10, label: 'Top 10' },
    { value: 50, label: 'Top 50' },
    { value: 100, label: 'Top 100' },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(searchQuery, filters);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, filters, onSearch]);

  const handleClearSearch = () => {
    setSearchQuery('');
    searchInputRef.current?.focus();
  };

  const handleClearFilters = () => {
    setFilters({});
  };

  const handleRoleChange = (role: UserRole) => {
    setFilters(prev => ({ ...prev, role }));
    setIsOpen(false);
  };

  const handleSportChange = (sport: string) => {
    setFilters(prev => ({ ...prev, sport }));
    setIsOpen(false);
  };

  const handleRankingChange = (ranking: number) => {
    setFilters(prev => ({ ...prev, ranking }));
    setIsOpen(false);
  };

  const countActiveFilters = () => {
    return Object.values(filters).filter(Boolean).length;
  };

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row gap-2">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search size={18} className="text-muted-foreground" />
          </div>
          
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 pl-10 pr-10 rounded-lg border border-input bg-background ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder={placeholder}
          />
          
          {searchQuery && (
            <button
              onClick={handleClearSearch}
              className="absolute inset-y-0 right-3 flex items-center"
              aria-label="Clear search"
            >
              <X size={18} className="text-muted-foreground hover:text-foreground" />
            </button>
          )}
        </div>
        
        <div className="flex gap-2">
          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
              <Button 
                variant="outline" 
                className="h-10"
              >
                <span>Filters</span>
                {countActiveFilters() > 0 && (
                  <Badge className="ml-1 bg-primary text-xs h-5 min-w-5 flex items-center justify-center">
                    {countActiveFilters()}
                  </Badge>
                )}
                <ChevronDown size={14} className="ml-2" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-0" align="end">
              <Command>
                <CommandList>
                  <CommandGroup heading="Role">
                    {roleOptions.map((option) => (
                      <CommandItem 
                        key={option.value}
                        onSelect={() => handleRoleChange(option.value)}
                        className="flex items-center justify-between"
                      >
                        <span>{option.label}</span>
                        {filters.role === option.value && <Check size={16} />}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                  
                  <CommandGroup heading="Sport">
                    <CommandInput placeholder="Search sports..." />
                    <CommandEmpty>No sport found</CommandEmpty>
                    {sportOptions.map((sport) => (
                      <CommandItem 
                        key={sport}
                        onSelect={() => handleSportChange(sport)}
                        className="flex items-center justify-between"
                      >
                        <span>{sport}</span>
                        {filters.sport === sport && <Check size={16} />}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                  
                  <CommandGroup heading="Ranking">
                    {rankingOptions.map((option) => (
                      <CommandItem 
                        key={option.value}
                        onSelect={() => handleRankingChange(option.value)}
                        className="flex items-center justify-between"
                      >
                        <span>{option.label}</span>
                        {filters.ranking === option.value && <Check size={16} />}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
                
                <div className="border-t p-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleClearFilters}
                    className="w-full justify-center"
                    disabled={countActiveFilters() === 0}
                  >
                    Clear Filters
                  </Button>
                </div>
              </Command>
            </PopoverContent>
          </Popover>
          
          <Button className="h-10">
            Search
          </Button>
        </div>
      </div>
      
      {countActiveFilters() > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {filters.role && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Role: {filters.role.charAt(0).toUpperCase() + filters.role.slice(1)}
              <X
                size={14}
                className="cursor-pointer"
                onClick={() => setFilters(prev => ({ ...prev, role: undefined }))}
              />
            </Badge>
          )}
          
          {filters.sport && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Sport: {filters.sport}
              <X
                size={14}
                className="cursor-pointer"
                onClick={() => setFilters(prev => ({ ...prev, sport: undefined }))}
              />
            </Badge>
          )}
          
          {filters.ranking && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Ranking: Top {filters.ranking}
              <X
                size={14}
                className="cursor-pointer"
                onClick={() => setFilters(prev => ({ ...prev, ranking: undefined }))}
              />
            </Badge>
          )}
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearFilters}
            className="text-xs h-6 px-2"
          >
            Clear All
          </Button>
        </div>
      )}
    </div>
  );
};

const Check = ({ size, className }: { size: number; className?: string }) => (
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
      <polyline points="20 6 9 17 4 12" />
    </svg>
  </div>
);

export default SearchBar;
