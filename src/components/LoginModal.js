import { Button, Modal } from 'antd';
import React, { useState, useContext } from 'react';
import Context from '../context/Context';
import '../assets/css/AuthForms.css';
import { CloseCircleOutlined } from '@ant-design/icons';

const LoginModal = () => {
  const { loginModal, setLoginModal, handleSignIn, 
          loginEmail, setLoginEmail, loginPassword, 
          setLoginPassword } = useContext(Context);
  
  const useEmailValidation = (loginEmail) => {
      const isEmailValid = /@/.test(loginEmail); 
      return isEmailValid;
    };
  const isEmailValid = useEmailValidation(loginEmail);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEmailValid) {
        console.log("Form submitted");
    } 
    else {
        console.log("Invalid email");
    }
  };
  return (
      <Modal 
        title="Login" 
        open={loginModal}
        closable='true'
        closeIcon={<CloseCircleOutlined onClick={()=>setLoginModal(false)}/>}
        footer={null} >
      <form onSubmit={handleSubmit} className='auth-form'>
      <label className='auth-label'>
        Email:
        <input
          type="email"
          value={loginEmail}
          className='auth-input'
          onChange={(e) => setLoginEmail(e.target.value)}
        />
      </label>
      <br />
      <label className='auth-label'>
        Password:
        <input
          type="password"
          value={loginPassword}
          className='auth-input'
          onChange={(e) => setLoginPassword(e.target.value)}
        />
      </label>
      <br />
      <button 
        type="submit" 
        className="auth-button" 
        disabled={!loginEmail || !loginPassword} 
        onClick={() => handleSignIn(loginEmail, loginPassword)}>Submit</button>
    </form>
      </Modal>
  );
};
export default LoginModal;


