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
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [username, setUsername] = useState('');
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [boxingVid, setBoxingVid] = useState('');
    const [comments, setComments] = useState([]);
    // const comments = useRef([])
    const loginToken = useRef('');
  
  
    const auth = firebase.auth();
    const baseURL = 'http://127.0.0.1:8000';

    const handleSignIn = async (email, password) => {
        try {
          const result = await auth.signInWithEmailAndPassword(email, password);
          localStorage.setItem('token', result.user.refreshToken)
          firebase.auth().onAuthStateChanged(function(user) {
            if(user) {
              console.log('user', user)
              user.updateProfile({
                displayName: username
              }).then(function() {
                console.log('Profile logged in with', user.displayName)
                setDisplayName(user.displayName)
                setLoginEmail('')
                setLoginPassword('')
              })
            }
          })
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
                setUsername('')
                setEmail('')
                setPassword('')
                setConfirmPassword('')
                setSignupModal(false)
              }, function (error) {
                console.log(error)
              });
            }
          });
          setUid(result.user.uid)
          //code to create session cookie upon signup
          
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

    const videoId = (n) => {
      console.log('func triggered')
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
      let res = '';
      for(let i = 0; i < n; i++){
        res += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return res
    }

    const writeToDB =  (videoType, videoLink, displayName) => {
      const id = videoId(10)
      const data = {videoType, videoLink, displayName, id}
      console.log('data', JSON.stringify(data))
      try {
        dbRef.push(data)
      } catch (error) {
        console.log(error);
      }
    };

    // const handleSignIn = async (email, password) => {


    const fetchComments = async () => {
      await axios.get(`${baseURL}/getReviews`).then((res) =>{
        setComments(res.data['message'])
        console.log('comments state contains', comments)
        // comments.current = res.data['message']
        // console.log('current state', comments.current)
        // const newComments = [];
        // for(const comment of res.data['message']){
        //   if(comment['vidKey']['stringValue'] === boxingVid){
        //     newComments.push(comment)
        //   }
        // }
        // console.log('pushing into comments', newComments)
        // comments.current = newComments
      });
    }
    

    const isAuth = () => {
      // const token = localStorage.getItem('token') ? localStorage.getItem('token') : null
      // if(token){
      //   setIsAuthenticated(true)
      // }
      const subscribe = firebase.auth().onAuthStateChanged(user => {
        setUser(user);
        setDisplayName(user.displayName)
        loginToken.current = user.refreshToken
      });
      return () => subscribe();
    };

    let contextData = {
        baseURL: baseURL,
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
        setUsername: setUsername,
        username: username,
        setEmail: setEmail,
        email: email,
        setPassword: setPassword,
        password: password,
        setConfirmPassword: setConfirmPassword,
        confirmPassword: confirmPassword,
        loginEmail: loginEmail,
        setLoginEmail: setLoginEmail,
        loginPassword: loginPassword,
        setLoginPassword: setLoginPassword,
        loginToken: loginToken,
        fetchComments: fetchComments,
        boxingVid: boxingVid,
        setBoxingVid: setBoxingVid,
        comments: comments,
    };
    return(
        <Context.Provider value={contextData} >
            { children }
        </Context.Provider>
    )
}


