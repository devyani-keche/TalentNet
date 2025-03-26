
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import LeaderboardSection from '@/components/leaderboard/LeaderboardSection';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        
        {/* Leaderboard Section */}
        <section className="py-24 bg-slate-50">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-semibold mb-4">
                Hall of <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">Fame</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Discover the top-ranked athletes across various sports, dominating competitions and securing prestigious sponsorships.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <LeaderboardSection limit={5} />
            </div>
          </div>
        </section>
        
        <FeaturesSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
