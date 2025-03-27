
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import LeaderboardSection from '@/components/leaderboard/LeaderboardSection';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

const Leaderboard = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-32 gradient-bg">
        <section className="container-custom">
          <div className="max-w-4xl mx-auto">
            <motion.div 
              className="flex items-center justify-between mb-8"
              variants={fadeInUp}
              initial="initial"
              animate="animate"
            >
              <div>
                <h1 className="text-3xl md:text-4xl font-display font-semibold mb-2">
                  Athlete <span className="gradient-text">Leaderboard</span>
                </h1>
                <p className="text-muted-foreground">
                  Track the top-performing athletes across all sports in real-time.
                </p>
              </div>
              <Button variant="outline" size="sm" className="flex items-center gap-1 hover:shadow-glow transition-all">
                <RefreshCw size={14} className="animate-rotate-slow" />
                <span>Refresh</span>
              </Button>
            </motion.div>
            
            <motion.div 
              className="glass-card rounded-xl shadow-sm border p-6"
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.2 }}
            >
              <LeaderboardSection limit={20} showViewAll={false} />
            </motion.div>
            
            <motion.div 
              className="mt-12 glass-card p-8 rounded-xl"
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-xl font-semibold mb-4">How Rankings are Calculated</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <motion.div 
                    className="p-4 bg-white/60 rounded-lg hover:shadow-glow-pink transition-all cursor-pointer"
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  >
                    <div className="w-10 h-10 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center mb-3">
                      <span className="font-semibold">1</span>
                    </div>
                    <h3 className="font-medium mb-1">Competition Performance</h3>
                    <p className="text-sm text-muted-foreground">
                      Results from official tournaments and championships across the season.
                    </p>
                  </motion.div>
                  
                  <motion.div 
                    className="p-4 bg-white/60 rounded-lg hover:shadow-glow transition-all cursor-pointer"
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  >
                    <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mb-3">
                      <span className="font-semibold">2</span>
                    </div>
                    <h3 className="font-medium mb-1">Sponsorship Value</h3>
                    <p className="text-sm text-muted-foreground">
                      Number and quality of sponsorships secured by the athlete.
                    </p>
                  </motion.div>
                  
                  <motion.div 
                    className="p-4 bg-white/60 rounded-lg hover:shadow-glow-teal transition-all cursor-pointer"
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  >
                    <div className="w-10 h-10 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center mb-3">
                      <span className="font-semibold">3</span>
                    </div>
                    <h3 className="font-medium mb-1">Career Achievements</h3>
                    <p className="text-sm text-muted-foreground">
                      Historical performance and notable career milestones.
                    </p>
                  </motion.div>
                </div>
                
                <p className="text-sm text-muted-foreground mt-4">
                  Rankings are updated weekly based on the latest performance data and sponsorship information.
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Leaderboard;
