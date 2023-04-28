import React, { useState, useContext, useEffect } from 'react';
import Navbar from '../components/Navbar'
import Context from '../context/Context'
import LoginModal from '../components/LoginModal';
import SignupModal from '../components/SignupModal';
import UploadVideo from '../components/UploadVideo';
import FirebaseData from '../components/FirebaseData';

// setLoginModal
const Timeline = () => {

  return (
    <>
        <Navbar/>
        <LoginModal/>
        <SignupModal/>
        <UploadVideo/>
        <FirebaseData/>
    </>
  );
};
export default Timeline;
// handleLogin

