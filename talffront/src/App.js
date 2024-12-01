import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';


function App() {
  return (
    <Router>
      {/* Navbar visible sur toutes les pages */}
      <Navbar />
      <div className="App">
        {/* Définition des routes */}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
