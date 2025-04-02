// NavBar.jsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../style/component/other/navBar.sass';
import '../../style/component/other/navBar-additions.sass';

const NavBar = () => {
    const [isExpanded, setIsExpanded] = useState(true);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [role, setRole] = useState("admin");
    const location = useLocation();

    const toggleNav = () => {
        setIsExpanded(!isExpanded);
    };

    const toggleDropdown = (e) => {
        e.preventDefault();
        setIsDropdownOpen(!isDropdownOpen);
    };

    const changeRole = (newRole) => {
        setRole(newRole);
        setIsDropdownOpen(false);
    };

    // Déterminer si un lien est actif
    const isActive = (path) => {
        return location.pathname === path ? 'active-link' : '';
    };

    // Routes pour chaque rôle
    const getLinks = () => {
        switch (role) {
            case 'admin':
                return [
                    { to: "/", label: "Accueil" },
                    { to: "/productor", label: "Producteurs" },
                    { to: "/customer", label: "Clients" },
                    { to: "/profil/admin", label: "Profil" }
                ];
            case 'producteur':
                return [
                    { to: "/productor", label: "Accueil" },
                    { to: "/addproduct", label: "Ajouter Produit" },
                    { to: "/profil/producteur", label: "Profil" }
                ];
            case 'client':
                return [
                    { to: "/customer", label: "Accueil" },
                    { to: "/profil/client", label: "Profil" }
                ];
            default:
                return [];
        }
    };

    return (
        <div className={`navbar-container ${isExpanded ? 'expanded' : 'collapsed'}`}>
            <p>NavBar MAIS TU PUE</p>
            <nav className="navbar">
                <div className="nav-logo">
                    <Link to="/" className="logo-wrapper">
                        <span className="logo-icon" role="img" aria-label="Ferme">🛡️</span>
                        <span className="logo-text">ADMIN PANEL</span>
                    </Link>
                </div>

                <div className="nav-buttons">
                    {getLinks().map((link, index) => (
                        <Link
                            key={index}
                            to={link.to}
                            className={`nav-button ${isActive(link.to)}`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                <div className="dropdown-container">
                    <button
                        className="role-dropdown-button"
                        onClick={toggleDropdown}
                    >
                        {role.charAt(0).toUpperCase() + role.slice(1)}
                        <span className="dropdown-arrow">{isDropdownOpen ? '▲' : '▼'}</span>
                    </button>

                    {isDropdownOpen && (
                        <div className="role-dropdown-menu">
                            <button onClick={() => changeRole("admin")}>Admin</button>
                            <button onClick={() => changeRole("producteur")}>Producteur</button>
                            <button onClick={() => changeRole("client")}>Client</button>
                        </div>
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
