import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/login">Connexion</Link></li>
        <li><Link to="/profile">Profil</Link></li>
        <li><Link to="/register">Enregistrement</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
