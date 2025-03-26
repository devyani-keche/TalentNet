
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import LeaderboardSection from '@/components/leaderboard/LeaderboardSection';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

const Leaderboard = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-32">
        <section className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl md:text-4xl font-display font-semibold mb-2">
                  Athlete <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">Leaderboard</span>
                </h1>
                <p className="text-muted-foreground">
                  Track the top-performing athletes across all sports in real-time.
                </p>
              </div>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <RefreshCw size={14} />
                <span>Refresh</span>
              </Button>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <LeaderboardSection limit={20} showViewAll={false} />
            </div>
            
            <div className="mt-12 glass-card p-8 rounded-xl">
              <h2 className="text-xl font-semibold mb-4">How Rankings are Calculated</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-white/60 rounded-lg">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                      <span className="text-primary font-semibold">1</span>
                    </div>
                    <h3 className="font-medium mb-1">Competition Performance</h3>
                    <p className="text-sm text-muted-foreground">
                      Results from official tournaments and championships across the season.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-white/60 rounded-lg">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                      <span className="text-primary font-semibold">2</span>
                    </div>
                    <h3 className="font-medium mb-1">Sponsorship Value</h3>
                    <p className="text-sm text-muted-foreground">
                      Number and quality of sponsorships secured by the athlete.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-white/60 rounded-lg">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                      <span className="text-primary font-semibold">3</span>
                    </div>
                    <h3 className="font-medium mb-1">Career Achievements</h3>
                    <p className="text-sm text-muted-foreground">
                      Historical performance and notable career milestones.
                    </p>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground mt-4">
                  Rankings are updated weekly based on the latest performance data and sponsorship information.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Leaderboard;
