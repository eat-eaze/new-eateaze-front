// import "../style/page/register.css";
// change path of css and right css file
import React, { useState } from 'react';
import Modal from "../Component/modal/Modal";
import RegisterForm from '../Component/RegisterForm';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      // Ajoutez la logique d'inscription ici
      console.log('Registration successful');
    } catch (err) {
      setError('Registration failed');
    }
  };

  return (
    <div id="backgroundRegister">
      <div id="div__containerRegister">
        <Modal />
        <RegisterForm
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          handleSubmit={handleSubmit}
          error={error}
        />
      </div>
    </div>
  );
}

export default Register;