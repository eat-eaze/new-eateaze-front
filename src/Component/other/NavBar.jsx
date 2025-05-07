// NavBar.jsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../style/component/other/navBar.sass';
import '../../style/component/other/navBar-additions.sass';
import '../../style/component/button/button.scss';

const NavBar = () => {
    const [isExpanded, setIsExpanded] = useState(true);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const location = useLocation();

    const toggleNav = () => {
        setIsExpanded(!isExpanded);
    };

    const toggleDropdown = (e) => {
        e.preventDefault();
        setIsDropdownOpen(!isDropdownOpen);
    };

    // Déterminer si un lien est actif
    const isActive = (path) => {
        return location.pathname === path ? 'active-link' : '';
    };

    return (
        <div className={`navbar-container ${isExpanded ? 'expanded' : 'collapsed'}`}>
            <nav className="navbar">
                <div className="nav-logo">
                    <Link to="/" className="logo-wrapper">
                        <span className="logo-icon" role="img" aria-label="Ferme">🛡️</span>
                        <span className="logo-text">EATEAZE</span>
                    </Link>
                </div>

                <div className="nav-buttons">
                    <Link to="/" className={`nav-button ${isActive('/')}`}>
                        Accueil
                    </Link>
                </div>

                <div className="auth-buttons">
                    {!isLoggedIn ? (
                        <>
                            <Link to="/login" className="button button--login">
                                Se Connecter
                            </Link>
                            <Link to="/register" className="button button--register">
                                S'inscrire
                            </Link>
                        </>
                    ) : (
                        <Link to="/profile" className="button button--profile">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#eaa521">
                                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                            </svg>
                        </Link>
                    )}
                </div>
            </nav>

            <button
                className={`nav-toggle-button ${isExpanded ? 'nav-toggle-button-open' : 'nav-toggle-button-close'}`}
                onClick={toggleNav}
            >
                {isExpanded ? <span>&#x25B2;</span> : <span>&#x25BC;</span>}
            </button>
        </div>
    );
};

export default NavBar;
