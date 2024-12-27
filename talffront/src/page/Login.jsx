import React, { useState } from 'react';
import "../style/page/login.css";
import Modal from "../Component/modal/Modal";
import LoginForm from '../Component/LoginForm';





function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        // Ajoutez la logique de connexion ici
        console.log('Login successful');
      } catch (err) {
        setError('Login failed');
      }
    };
  
    return (
      <div id="backgroundRegister">
        <div id="div__containerRegister">
          <Modal />
          <LoginForm
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            handleSubmit={handleSubmit}
            error={error}
          />
        </div>
      </div>
    );
  }
  
  export default Login;