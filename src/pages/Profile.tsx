
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AthleteProfile from '@/components/profile/AthleteProfile';
import MyProfile from '@/components/profile/MyProfile';
import EditProfile from '@/components/profile/EditProfile';
import Settings from '@/components/profile/Settings';
import { motion, AnimatePresence } from 'framer-motion';

const Profile = () => {
  const { id } = useParams<{ id: string }>();
  const [view, setView] = useState<'profile' | 'edit' | 'settings'>('profile');
  
  // Animation variants
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 gradient-bg-alt">
        <AnimatePresence mode="wait">
          {id ? (
            <motion.div
              key="athlete-profile"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageVariants}
            >
              <AthleteProfile athleteId={id} />
            </motion.div>
          ) : (
            <>
              {view === 'profile' && (
                <motion.div
                  key="my-profile"
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={pageVariants}
                >
                  <MyProfile onEditProfile={() => setView('edit')} onSettings={() => setView('settings')} />
                </motion.div>
              )}
              {view === 'edit' && (
                <motion.div
                  key="edit-profile"
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={pageVariants}
                >
                  <EditProfile onBack={() => setView('profile')} />
                </motion.div>
              )}
              {view === 'settings' && (
                <motion.div
                  key="settings"
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={pageVariants}
                >
                  <Settings onBack={() => setView('profile')} />
                </motion.div>
              )}
            </>
          )}
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
