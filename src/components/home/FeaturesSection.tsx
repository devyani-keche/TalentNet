
import React from 'react';
import { ArrowRight, Trophy, Users, MessageSquare, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

const features = [
  {
    title: 'Dynamic Athlete Ranking',
    description: 'Track real-time performance metrics and sponsorship rankings to see where you stand among the elite.',
    icon: Trophy,
    color: 'bg-amber-100 text-amber-600',
  },
  {
    title: 'Premium Networking',
    description: 'Connect with top sponsors, scouts, and fellow athletes through our elegant connection system.',
    icon: Users,
    color: 'bg-blue-100 text-blue-600',
  },
  {
    title: 'Secure Messaging',
    description: 'Communicate directly with your connections through our encrypted messaging platform.',
    icon: MessageSquare,
    color: 'bg-green-100 text-green-600',
  },
  {
    title: 'Advanced Search',
    description: 'Find exactly who you\'re looking for with our powerful search and filter system.',
    icon: Search,
    color: 'bg-purple-100 text-purple-600',
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container-custom">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-semibold mb-4">
            Designed for the <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">elite</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Our premium platform offers features specifically tailored for high-performing athletes and industry professionals.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="neo-card p-8 hover-card group"
            >
              <div className={`${feature.color} w-12 h-12 rounded-lg flex items-center justify-center mb-5`}>
                <feature.icon size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground mb-5">{feature.description}</p>
              <Button variant="ghost" className="p-0 group">
                <span className="text-primary">Learn more</span>
                <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          ))}
        </div>
        
        <div className="mt-24 text-center">
          <div className="glass-card mx-auto max-w-4xl py-16 px-6 rounded-3xl relative overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-70 z-0"></div>
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-display font-semibold mb-4">
                Ready to elevate your athletic career?
              </h2>
              <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-8">
                Join the most prestigious network of athletes, sponsors, and scouts in the industry.
              </p>
              <Button size="lg" className="group">
                Join TalentNet
                <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
