
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ConnectionCard from '@/components/network/ConnectionCard';
import SearchBar, { SearchFilters } from '@/components/ui/SearchBar';
import { searchUsers } from '@/lib/data';
import { User } from '@/lib/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Network = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({});
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  
  const handleSearch = (query: string, filters: SearchFilters) => {
    setSearchQuery(query);
    setSearchFilters(filters);
    
    if (query.length > 0 || Object.values(filters).some(Boolean)) {
      setIsSearching(true);
      setSearchResults(searchUsers(query, filters));
    } else {
      setIsSearching(false);
      setSearchResults([]);
    }
  };
  
  // Generate some default recommendations for each category
  const athleteRecommendations = searchUsers('', { role: 'athlete' }).slice(0, 8);
  const sponsorRecommendations = searchUsers('', { role: 'sponsor' }).slice(0, 4);
  const scoutRecommendations = searchUsers('', { role: 'scout' }).slice(0, 4);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-32">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-display font-semibold mb-2">
              TalentNet <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">Network</span>
            </h1>
            <p className="text-muted-foreground text-lg mb-8">
              Connect with athletes, sponsors, and scouts to expand your professional network.
            </p>
            
            <div className="mb-10">
              <SearchBar onSearch={handleSearch} />
            </div>
            
            {isSearching ? (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Search Results</h2>
                
                {searchResults.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {searchResults.map(user => (
                      <ConnectionCard key={user.id} user={user} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-muted/30 rounded-lg">
                    <p className="text-muted-foreground">No results found for your search.</p>
                    <p className="text-sm mt-2">Try adjusting your search terms or filters.</p>
                  </div>
                )}
              </div>
            ) : (
              <Tabs defaultValue="all">
                <TabsList className="mb-8">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="athletes">Athletes</TabsTrigger>
                  <TabsTrigger value="sponsors">Sponsors</TabsTrigger>
                  <TabsTrigger value="scouts">Scouts</TabsTrigger>
                </TabsList>
                
                <TabsContent value="all" className="space-y-10 animate-fade-in">
                  <section>
                    <h2 className="text-xl font-semibold mb-4">Top Athletes</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {athleteRecommendations.slice(0, 4).map(athlete => (
                        <ConnectionCard key={athlete.id} user={athlete} />
                      ))}
                    </div>
                  </section>
                  
                  <section>
                    <h2 className="text-xl font-semibold mb-4">Featured Sponsors</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {sponsorRecommendations.slice(0, 2).map(sponsor => (
                        <ConnectionCard key={sponsor.id} user={sponsor} />
                      ))}
                    </div>
                  </section>
                  
                  <section>
                    <h2 className="text-xl font-semibold mb-4">Featured Scouts</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {scoutRecommendations.slice(0, 2).map(scout => (
                        <ConnectionCard key={scout.id} user={scout} />
                      ))}
                    </div>
                  </section>
                </TabsContent>
                
                <TabsContent value="athletes" className="animate-fade-in">
                  <section>
                    <h2 className="text-xl font-semibold mb-4">Athletes</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {athleteRecommendations.map(athlete => (
                        <ConnectionCard key={athlete.id} user={athlete} />
                      ))}
                    </div>
                  </section>
                </TabsContent>
                
                <TabsContent value="sponsors" className="animate-fade-in">
                  <section>
                    <h2 className="text-xl font-semibold mb-4">Sponsors</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {sponsorRecommendations.map(sponsor => (
                        <ConnectionCard key={sponsor.id} user={sponsor} />
                      ))}
                    </div>
                  </section>
                </TabsContent>
                
                <TabsContent value="scouts" className="animate-fade-in">
                  <section>
                    <h2 className="text-xl font-semibold mb-4">Scouts</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {scoutRecommendations.map(scout => (
                        <ConnectionCard key={scout.id} user={scout} />
                      ))}
                    </div>
                  </section>
                </TabsContent>
              </Tabs>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Network;
