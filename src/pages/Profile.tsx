
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AthleteProfile from '@/components/profile/AthleteProfile';
import MyProfile from '@/components/profile/MyProfile';
import EditProfile from '@/components/profile/EditProfile';
import Settings from '@/components/profile/Settings';

const Profile = () => {
  const { id } = useParams<{ id: string }>();
  const [view, setView] = useState<'profile' | 'edit' | 'settings'>('profile');
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24">
        {id ? (
          <AthleteProfile athleteId={id} />
        ) : (
          <>
            {view === 'profile' && <MyProfile onEditProfile={() => setView('edit')} onSettings={() => setView('settings')} />}
            {view === 'edit' && <EditProfile onBack={() => setView('profile')} />}
            {view === 'settings' && <Settings onBack={() => setView('profile')} />}
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
