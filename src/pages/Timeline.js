import React, { useState, useContext, useEffect } from 'react';
import Navbar from '../components/Navbar'
import Context from '../context/Context'
import LoginModal from '../components/LoginModal';
import SignupModal from '../components/SignupModal';
import UploadVideo from '../components/UploadVideo';

// setLoginModal
const Timeline = () => {
  const { user, setUser, auth } = useContext(Context);
  
  useEffect(() => {
    if(user){
      const unsubscribe = auth.onAuthStateChanged((user) => {
        setUser(user);
      });
      return unsubscribe;
    }
  }, []);

  return (
    <>
        <Navbar/>
        <LoginModal/>
        <SignupModal/>
        <UploadVideo/>
    </>
  );
};
export default Timeline;
// handleLogin

