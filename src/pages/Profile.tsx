
import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AthleteProfile from '@/components/profile/AthleteProfile';

const Profile = () => {
  const { id } = useParams<{ id: string }>();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24">
        <AthleteProfile athleteId={id} />
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
