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
    const [displayName, setDisplayName] = useState(null);
    const [uid, setUid] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const auth = firebase.auth();
    const baseURL = 'http://127.0.0.1:8000/auth';

    const handleSignIn = async (email, password) => {
        try {
          const result = await auth.signInWithEmailAndPassword(email, password);
          localStorage.setItem('token', result.user.refreshToken)
          setUid(result.user.uid)
        } catch (error) {
          console.log(error);
        }
    };
    
    const handleSignUp = async (email, username, password) => {
        try {
          const result = await auth.createUserWithEmailAndPassword(email, password);
          localStorage.setItem('token', result.user.refreshToken)
          firebase.auth().onAuthStateChanged(function(user) {
            if(user) {
              user.updateProfile({
                displayName: username 
              }).then(function() {
                console.log('Profile created, username is', user.displayName)
                setDisplayName(user.displayName)
              }, function (error) {
                console.log(error)
              });
            }
          });
          setUid(result.user.uid)
          // const refresh = {'refreshToken': result.user.refreshToken,
          //                  'uid': result.user.uid
          //                 }
          // setUid(result.user.uid)
          // const req = await fetch(`${baseURL}`, {
          //   method: 'POST',
          //   credentials: 'include',
          //   headers: {
          //     'Content-Type': 'application/json',
          //     'Access-Control-Allow-Credentials': true
          //   },
          //   body: JSON.stringify(refresh)
          // })
          // const data = await req.json()
          // console.log('res', data)
          // console.log('cookie', data.cookie)
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

    const writeToDB =  (videoType, videoLink, displayName) => {
      const data = {videoType, videoLink, displayName}
      try {
        dbRef.set(data);
      } catch (error) {
        console.log(error);
      }
    };

    const isAuth = () => {
      const token = localStorage.getItem('token') ? localStorage.getItem('token') : null
      if(token){
        setIsAuthenticated(true)
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
        writeToDB: writeToDB,
        uid: uid,
        displayName: displayName,
        setDisplayName: setDisplayName,
        isAuth: isAuth,
        isAuthenticated: isAuthenticated
    };

    return(
        <Context.Provider value={contextData} >
            { children }
        </Context.Provider>
    )
}


