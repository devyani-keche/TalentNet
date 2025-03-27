
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 gradient-bg-alt z-0"></div>
      
      {/* Decorative blob shapes */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-400/10 rounded-full filter blur-3xl opacity-30"
        animate={{ 
          y: [0, 30, 0],
          scale: [1, 1.1, 1],
          rotate: [0, 5, 0]
        }}
        transition={{ 
          duration: 20, 
          repeat: Infinity,
          repeatType: "reverse" 
        }}
      />
      <motion.div
        className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-teal-400/20 rounded-full filter blur-3xl opacity-20"
        animate={{ 
          y: [0, -30, 0],
          scale: [1, 1.1, 1],
          rotate: [0, -5, 0]
        }}
        transition={{ 
          duration: 15, 
          repeat: Infinity,
          repeatType: "reverse" 
        }}
      />
      
      <div className="container-custom relative z-10 pb-20 pt-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div>
              <motion.div 
                className="inline-block mb-4 px-3 py-1 bg-primary/10 rounded-full"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <span className="text-primary text-sm font-medium">The Elite Athlete Network</span>
              </motion.div>
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Connect with the world's
                <span className="gradient-text"> best athletes</span>
              </motion.h1>
              <motion.p 
                className="mt-6 text-lg text-muted-foreground max-w-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                TalentNet is the premium networking platform where athletes, sponsors, and scouts connect to create extraordinary opportunities.
              </motion.p>
            </div>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  variant="gradient"
                  size="lg" 
                  className="group"
                  onClick={() => navigate('/network')}
                >
                  Start Connecting
                  <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => navigate('/leaderboard')}
                  className="border-2"
                >
                  Learn More
                </Button>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="pt-6 border-t border-border"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <p className="text-sm text-muted-foreground mb-3">Trusted by top-tier athletes and sponsors worldwide</p>
              <div className="flex flex-wrap gap-6 items-center">
                <motion.div 
                  className="h-10 w-28 glass-card flex items-center justify-center hover-scale"
                  whileHover={{ y: -3, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                >
                  <img src="https://images.unsplash.com/photo-1614680376408-81e91ffe3db7?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&h=40&q=80" alt="Adidas" className="h-5 w-auto" />
                </motion.div>
                <motion.div 
                  className="h-10 w-28 glass-card flex items-center justify-center hover-scale"
                  whileHover={{ y: -3, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                >
                  <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&h=40&q=80" alt="Nike" className="h-5 w-auto" />
                </motion.div>
                <motion.div 
                  className="h-10 w-28 glass-card flex items-center justify-center hover-scale"
                  whileHover={{ y: -3, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                >
                  <img src="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&h=40&q=80" alt="Under Armour" className="h-5 w-auto" />
                </motion.div>
                <motion.div 
                  className="h-10 w-28 glass-card flex items-center justify-center hover-scale"
                  whileHover={{ y: -3, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                >
                  <img src="https://images.unsplash.com/photo-1620288627223-53302f4e8c74?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&h=40&q=80" alt="Puma" className="h-5 w-auto" />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            {/* Hero image with athlete */}
            <motion.div 
              className="relative z-10 rounded-2xl overflow-hidden shadow-elevated hover-card transition-all duration-500"
              whileHover={{ y: -10, boxShadow: "0 30px 60px -10px rgba(0, 0, 0, 0.15)" }}
            >
              <img 
                src="https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80" 
                alt="Professional athlete" 
                className="w-full object-cover aspect-[4/3]"
              />
              
              {/* Athlete ranking card */}
              <motion.div 
                className="absolute bottom-4 left-4 glass-card rounded-lg shadow-soft p-3 flex items-center space-x-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.2 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="bg-gradient-to-r from-purple-600 to-pink-500 rounded-full w-10 h-10 flex items-center justify-center text-white font-bold text-sm">
                  #1
                </div>
                <div>
                  <h3 className="font-medium text-sm">Alex Johnson</h3>
                  <p className="text-xs text-muted-foreground">Olympic Gold Medalist</p>
                </div>
              </motion.div>
              
              {/* Connection notification */}
              <motion.div 
                className="absolute top-4 right-4 glass-card rounded-lg shadow-soft p-3 flex items-center space-x-3"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.4 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-sm">
                  <span className="font-medium">+124</span> 
                  <span className="text-muted-foreground ml-1">new connections</span>
                </div>
              </motion.div>
            </motion.div>
            
            {/* Decorative elements */}
            <motion.div 
              className="absolute -bottom-6 -right-6 w-64 h-64 rounded-full border-8 border-teal-100 dark:border-teal-900/30 z-0"
              animate={{ rotate: 360 }}
              transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            />
            <motion.div 
              className="absolute -top-6 -left-6 w-32 h-32 rounded-full border-8 border-purple-100 dark:border-purple-900/30 z-0"
              animate={{ rotate: -360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
