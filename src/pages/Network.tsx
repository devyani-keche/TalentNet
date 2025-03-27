
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ConnectionCard from '@/components/network/ConnectionCard';
import SearchBar, { SearchFilters } from '@/components/ui/SearchBar';
import { searchUsers } from '@/lib/data';
import { User } from '@/lib/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';

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
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-32 gradient-bg">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl md:text-4xl font-display font-semibold mb-2">
                TalentNet <span className="gradient-text">Network</span>
              </h1>
              <p className="text-muted-foreground text-lg mb-8">
                Connect with athletes, sponsors, and scouts to expand your professional network.
              </p>
              
              <div className="mb-10">
                <SearchBar onSearch={handleSearch} />
              </div>
            </motion.div>
            
            {isSearching ? (
              <motion.div 
                className="space-y-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-xl font-semibold">Search Results</h2>
                
                {searchResults.length > 0 ? (
                  <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {searchResults.map(user => (
                      <motion.div key={user.id} variants={itemVariants}>
                        <ConnectionCard user={user} />
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div 
                    className="text-center py-12 bg-white/30 glass-card rounded-lg"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <p className="text-muted-foreground">No results found for your search.</p>
                    <p className="text-sm mt-2">Try adjusting your search terms or filters.</p>
                  </motion.div>
                )}
              </motion.div>
            ) : (
              <Tabs defaultValue="all">
                <TabsList className="mb-8 bg-white/50 dark:bg-black/20 border rounded-lg p-1">
                  <TabsTrigger value="all" className="data-[state=active]:gradient-bg data-[state=active]:text-foreground">All</TabsTrigger>
                  <TabsTrigger value="athletes" className="data-[state=active]:gradient-bg data-[state=active]:text-foreground">Athletes</TabsTrigger>
                  <TabsTrigger value="sponsors" className="data-[state=active]:gradient-bg data-[state=active]:text-foreground">Sponsors</TabsTrigger>
                  <TabsTrigger value="scouts" className="data-[state=active]:gradient-bg data-[state=active]:text-foreground">Scouts</TabsTrigger>
                </TabsList>
                
                <TabsContent value="all" className="space-y-10 animate-fade-in">
                  <section>
                    <h2 className="text-xl font-semibold mb-4">Top Athletes</h2>
                    <motion.div 
                      className="grid grid-cols-1 md:grid-cols-2 gap-4"
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      {athleteRecommendations.slice(0, 4).map(athlete => (
                        <motion.div key={athlete.id} variants={itemVariants}>
                          <ConnectionCard user={athlete} />
                        </motion.div>
                      ))}
                    </motion.div>
                  </section>
                  
                  <section>
                    <h2 className="text-xl font-semibold mb-4">Featured Sponsors</h2>
                    <motion.div 
                      className="grid grid-cols-1 md:grid-cols-2 gap-4"
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      {sponsorRecommendations.slice(0, 2).map(sponsor => (
                        <motion.div key={sponsor.id} variants={itemVariants}>
                          <ConnectionCard user={sponsor} />
                        </motion.div>
                      ))}
                    </motion.div>
                  </section>
                  
                  <section>
                    <h2 className="text-xl font-semibold mb-4">Featured Scouts</h2>
                    <motion.div 
                      className="grid grid-cols-1 md:grid-cols-2 gap-4"
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      {scoutRecommendations.slice(0, 2).map(scout => (
                        <motion.div key={scout.id} variants={itemVariants}>
                          <ConnectionCard user={scout} />
                        </motion.div>
                      ))}
                    </motion.div>
                  </section>
                </TabsContent>
                
                <TabsContent value="athletes" className="animate-fade-in">
                  <section>
                    <h2 className="text-xl font-semibold mb-4">Athletes</h2>
                    <motion.div 
                      className="grid grid-cols-1 md:grid-cols-2 gap-4"
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      {athleteRecommendations.map(athlete => (
                        <motion.div key={athlete.id} variants={itemVariants}>
                          <ConnectionCard user={athlete} />
                        </motion.div>
                      ))}
                    </motion.div>
                  </section>
                </TabsContent>
                
                <TabsContent value="sponsors" className="animate-fade-in">
                  <section>
                    <h2 className="text-xl font-semibold mb-4">Sponsors</h2>
                    <motion.div 
                      className="grid grid-cols-1 md:grid-cols-2 gap-4"
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      {sponsorRecommendations.map(sponsor => (
                        <motion.div key={sponsor.id} variants={itemVariants}>
                          <ConnectionCard user={sponsor} />
                        </motion.div>
                      ))}
                    </motion.div>
                  </section>
                </TabsContent>
                
                <TabsContent value="scouts" className="animate-fade-in">
                  <section>
                    <h2 className="text-xl font-semibold mb-4">Scouts</h2>
                    <motion.div 
                      className="grid grid-cols-1 md:grid-cols-2 gap-4"
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      {scoutRecommendations.map(scout => (
                        <motion.div key={scout.id} variants={itemVariants}>
                          <ConnectionCard user={scout} />
                        </motion.div>
                      ))}
                    </motion.div>
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
