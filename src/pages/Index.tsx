
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import LeaderboardSection from '@/components/leaderboard/LeaderboardSection';
import { motion } from 'framer-motion';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        
        {/* Leaderboard Section with vibrant colors */}
        <section className="py-24 gradient-bg">
          <div className="container-custom">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <motion.h2 
                className="text-3xl md:text-4xl font-display font-semibold mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                Hall of <span className="gradient-text">Fame</span>
              </motion.h2>
              <motion.p 
                className="text-muted-foreground text-lg max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                Discover the top-ranked athletes across various sports, dominating competitions and securing prestigious sponsorships.
              </motion.p>
            </motion.div>
            
            <motion.div 
              className="max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <LeaderboardSection limit={5} />
            </motion.div>
          </div>
        </section>
        
        <FeaturesSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
