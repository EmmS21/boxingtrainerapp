import { Button, Modal } from 'antd';
import React, { useState, useContext } from 'react';
import Context from '../context/Context';
import '../assets/css/AuthForms.css';
import { CloseCircleOutlined } from '@ant-design/icons';


const LoginModal = () => {
  const { loginModal, setLoginModal, 
        handleSignIn } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const useEmailValidation = (email) => {
      const isEmailValid = /@/.test(email); 
      return isEmailValid;
    };
  const isEmailValid = useEmailValidation(email);
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
          value={email}
          className='auth-input'
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <br />
      <label className='auth-label'>
        Password:
        <input
          type="password"
          value={password}
          className='auth-input'
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <br />
      <button 
        type="submit" 
        className="auth-button" 
        disabled={!email || !password} 
        onClick={() => handleSignIn(email, password)}>Submit</button>
    </form>
      </Modal>
  );
};
export default LoginModal;


