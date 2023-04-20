import { Modal } from 'antd';
import React, { useState, useContext } from 'react';
import Context from '../context/Context';
import '../assets/css/AuthForms.css';
import { CloseCircleOutlined } from '@ant-design/icons';

const SignupModal = () => {
  const { signupModal, setSignupModal, 
        handleSignUp, handleSignuOut } = useContext(Context);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted');
  };

  const validateEmail = () => {
    if (!email.includes('@')) {
      setEmailError('Invalid email');
    } else {
      setEmailError('');
    }
  };

  const validatePassword = () => {
    if (password.length < 7) {
      setPasswordError('Password must be at least 7 characters long');
    } else if (password.includes(email)) {
      setPasswordError('Password cannot contain email');
    } else if (!/\d/.test(password) || !/[a-zA-Z]/.test(password) || !/[^a-zA-Z0-9]/.test(password)) {
      setPasswordError('Password must contain numbers, letters and characters');
    } else {
      setPasswordError('');
    }
  };

  const validateConfirmPassword = () => {
    if (confirmPassword !== password) {
      setConfirmPasswordError('Passwords do not match');
    } else {
      setConfirmPasswordError('');
    }
  };

  return (
    <Modal 
        title="Signup" 
        open={signupModal}
        closable='true'
        closeIcon={<CloseCircleOutlined onClick={()=>setSignupModal(false)}/>}
        footer={null} >
        <form onSubmit={handleSubmit} className='auth-form'>
        <label className='auth-label'>
            Email:
            <input 
                type="text" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                onBlur={validateEmail}
                className='auth-input' />
            {emailError && <span>{emailError}</span>}
        </label>
        <label className='auth-label'>
            Password:
            <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                onBlur={validatePassword}
                className='auth-input' />
            {passwordError && <span>{passwordError}</span>}
        </label>
        <label className='auth-label'>
            Confirm Password:
            <input 
                type="password" 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)} 
                onBlur={validateConfirmPassword}
                className='auth-input' />
            {confirmPasswordError && <span>{confirmPasswordError}</span>}
        </label>
        <button
            type='submit' 
            disabled={!email || !password || !confirmPassword || emailError || passwordError || confirmPasswordError}
            className='auth-button'
            onClick={() => handleSignUp(email, password)}>Submit</button>
        </form>
    </Modal>
  );

};
export default SignupModal;
