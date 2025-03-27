
import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MessageInterface from '@/components/messaging/MessageInterface';
import { motion } from 'framer-motion';

const Messages = () => {
  const location = useLocation();
  const contactId = location.state?.contactId || undefined;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-32 gradient-bg-alt">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl md:text-4xl font-display font-semibold mb-2">
                Your <span className="gradient-text">Messages</span>
              </h1>
              <p className="text-muted-foreground mb-8">
                Connect with your network through secure, direct messaging.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="shadow-elevated rounded-xl overflow-hidden border"
            >
              <MessageInterface initialContactId={contactId} />
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Messages;
