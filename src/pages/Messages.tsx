
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MessageInterface from '@/components/messaging/MessageInterface';

const Messages = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-32">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-display font-semibold mb-2">
              Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">Messages</span>
            </h1>
            <p className="text-muted-foreground mb-8">
              Connect with your network through secure, direct messaging.
            </p>
            
            <MessageInterface />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Messages;
