
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/20 z-0"></div>
      
      {/* Decorative blob shapes */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full filter blur-3xl opacity-30 animate-float"></div>
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-blue-400/20 rounded-full filter blur-3xl opacity-20 animate-float"></div>
      
      <div className="container-custom relative z-10 pb-20 pt-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-slide-up">
            <div>
              <div className="inline-block mb-4 px-3 py-1 bg-primary/10 rounded-full">
                <span className="text-primary text-sm font-medium">The Elite Athlete Network</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold leading-tight">
                Connect with the world's
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600"> best athletes</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground max-w-lg">
                TalentNet is the premium networking platform where athletes, sponsors, and scouts connect to create extraordinary opportunities.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="group"
                onClick={() => navigate('/network')}
              >
                Start Connecting
                <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => navigate('/leaderboard')}
              >
                Learn More
              </Button>
            </div>
            
            <div className="pt-6 border-t border-border">
              <p className="text-sm text-muted-foreground mb-3">Trusted by top-tier athletes and sponsors worldwide</p>
              <div className="flex flex-wrap gap-6 items-center">
                <div className="h-8 w-24 bg-white/80 rounded-md flex items-center justify-center">
                  <img src="https://images.unsplash.com/photo-1614680376408-81e91ffe3db7?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&h=40&q=80" alt="Adidas" className="h-5 w-auto" />
                </div>
                <div className="h-8 w-24 bg-white/80 rounded-md flex items-center justify-center">
                  <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&h=40&q=80" alt="Nike" className="h-5 w-auto" />
                </div>
                <div className="h-8 w-24 bg-white/80 rounded-md flex items-center justify-center">
                  <img src="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&h=40&q=80" alt="Under Armour" className="h-5 w-auto" />
                </div>
                <div className="h-8 w-24 bg-white/80 rounded-md flex items-center justify-center">
                  <img src="https://images.unsplash.com/photo-1620288627223-53302f4e8c74?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&h=40&q=80" alt="Puma" className="h-5 w-auto" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            {/* Hero image with athlete */}
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-elevated hover-card transition-all duration-500 animate-scale-in">
              <img 
                src="https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80" 
                alt="Professional athlete" 
                className="w-full object-cover aspect-[4/3]"
              />
              
              {/* Athlete ranking card */}
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg shadow-soft p-3 flex items-center space-x-3">
                <div className="bg-primary rounded-full w-10 h-10 flex items-center justify-center text-white font-bold text-sm">
                  #1
                </div>
                <div>
                  <h3 className="font-medium text-sm">Alex Johnson</h3>
                  <p className="text-xs text-muted-foreground">Olympic Gold Medalist</p>
                </div>
              </div>
              
              {/* Connection notification */}
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg shadow-soft p-3 flex items-center space-x-3">
                <div className="text-sm">
                  <span className="font-medium">+124</span> 
                  <span className="text-muted-foreground ml-1">new connections</span>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -right-6 w-64 h-64 rounded-full border-8 border-blue-100 z-0"></div>
            <div className="absolute -top-6 -left-6 w-32 h-32 rounded-full border-8 border-primary/10 z-0"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
