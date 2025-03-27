
import React from 'react';
import { ArrowRight, Trophy, Users, MessageSquare, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const features = [
  {
    title: 'Dynamic Athlete Ranking',
    description: 'Track real-time performance metrics and sponsorship rankings to see where you stand among the elite.',
    icon: Trophy,
    color: 'bg-amber-100 text-amber-600',
    badge: 'Premium',
    badgeVariant: 'warning' as const,
  },
  {
    title: 'Premium Networking',
    description: 'Connect with top sponsors, scouts, and fellow athletes through our elegant connection system.',
    icon: Users,
    color: 'bg-purple-100 text-purple-600',
    badge: 'Popular',
    badgeVariant: 'purple' as const,
  },
  {
    title: 'Secure Messaging',
    description: 'Communicate directly with your connections through our encrypted messaging platform.',
    icon: MessageSquare,
    color: 'bg-teal-100 text-teal-600',
    badge: 'New',
    badgeVariant: 'teal' as const,
  },
  {
    title: 'Advanced Search',
    description: 'Find exactly who you\'re looking for with our powerful search and filter system.',
    icon: Search,
    color: 'bg-pink-100 text-pink-600',
    badge: 'Enhanced',
    badgeVariant: 'pink' as const,
  }
];

const FeaturesSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section className="py-24 gradient-bg-alt relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-purple-200/30 dark:bg-purple-900/20 blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-teal-200/30 dark:bg-teal-900/20 blur-3xl"></div>
      
      <div className="container-custom relative z-10">
        <motion.div 
          className="text-center max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-display font-semibold mb-4">
            Designed for the <span className="gradient-text">elite</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Our premium platform offers features specifically tailored for high-performing athletes and industry professionals.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card 
                variant="glass"
                className="hover-card group h-full"
              >
                <CardContent className="p-8">
                  <div className="flex justify-between items-start mb-5">
                    <div className={`${feature.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                      <feature.icon size={24} />
                    </div>
                    <Badge variant={feature.badgeVariant}>{feature.badge}</Badge>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground mb-5">{feature.description}</p>
                  <Button variant="ghost" className="p-0 group">
                    <span className="text-primary">Learn more</span>
                    <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="mt-24 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <Card
            variant="gradient"
            className="mx-auto max-w-4xl py-16 px-6 rounded-3xl relative overflow-hidden"
          >
            <motion.div
              className="relative z-10"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-display font-semibold mb-4">
                Ready to elevate your athletic career?
              </h2>
              <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-8">
                Join the most prestigious network of athletes, sponsors, and scouts in the industry.
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button variant="gradient" size="lg" className="group">
                  Join TalentNet
                  <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            </motion.div>
            
            {/* Decorative circles */}
            <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full border-8 border-purple-200/30 dark:border-purple-900/20"></div>
            <div className="absolute -top-20 -left-20 w-40 h-40 rounded-full border-8 border-pink-200/30 dark:border-pink-900/20"></div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
