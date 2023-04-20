import React, { createContext, useState, useRef, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { dbRef } from '../index';
import axios from 'axios';

const Context = createContext();

export default Context;

export const ContextProvider = ({ children }) => {
    const [loginModal, setLoginModal] = useState(false);
    const [signupModal, setSignupModal] = useState(false)
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState(null);
    const [uid, setUid] = useState(null);
    const auth = firebase.auth();
    const baseURL = 'http://127.0.0.1:8000/auth';

    const handleSignIn = async (email, password) => {
        try {
          const res = await auth.signInWithEmailAndPassword(email, password);
          localStorage.setItem('token', res)
        } catch (error) {
          console.log(error);
        }
    };
    
    const handleSignUp = async (email, password) => {
        try {
          const result = await auth.createUserWithEmailAndPassword(email, password);
          const refresh = {'refreshToken': result.user.refreshToken,
                           'uid': result.user.uid
                          }
          setUid(result.user.uid)
          axios.post(`${baseURL}`, refresh).then((res) => {
            console.log('cookie', res)
          })          
        } catch (error) {
          console.log(error);
        }
    };
    
    const handleSignOut = async () => {
        try {
          await auth.signOut();
        } catch (error) {
          console.log(error);
        }
    };

    const writeToDB =  (videoType, videoLink, username) => {
      const data = {videoType, videoLink, username}
      try {
        dbRef.set(data);
      } catch (error) {
        console.log(error);
      }
    };

    let contextData = {
        loginModal: loginModal,
        setLoginModal: setLoginModal,
        setSignupModal: setSignupModal,
        signupModal: signupModal,
        user: user,
        setUser: setUser,
        auth: auth,
        handleSignIn: handleSignIn,
        handleSignUp: handleSignUp,
        handleSignOut: handleSignOut,
        writeToDB: writeToDB
    };

    return(
        <Context.Provider value={contextData} >
            { children }
        </Context.Provider>
    )
}


