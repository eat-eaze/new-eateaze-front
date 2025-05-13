// NavBar.jsx
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../../style/component/other/navBar.sass";
import "../../style/component/other/navBar-additions.sass";
import "../../style/component/button/button.scss";
import logo from "../../assets/logo.png";

const NavBarSupplier = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      .split("=")[1];
    if (token) {
      setIsLoggedIn(true);
    }
    setIsLoading(false);
  }, []);

  const toggleNav = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleDropdown = (e) => {
    e.preventDefault();
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Déterminer si un lien est actif
  const isActive = (path) => {
    return location.pathname === path ? "active-link" : "";
  };

  if (isLoading) {
    return <p style={{ textAlign: "center" }}>Chargement...</p>;
  }

  if (userRole === "admin") {
    return <div>Vous êtes un administrateur</div>;
  }

  if (userRole === "user") {
    return <div>Vous êtes un utilisateur</div>;
  }

  return (
    <div
      className={`navbar-container ${isExpanded ? "expanded" : "collapsed"}`}
    >
      <nav className="navbar">
        <div className="nav-logo">
          <Link to="/" className="logo-wrapper">
            <img
              src={logo}
              alt="Logo Eateaze"
              className="nav-logo-image"
              style={{ height: "calc( 50px + 1em )", width: "100%" }}
            />
          </Link>
        </div>

        <div className="nav-buttons">
          <Link to="/" className={`nav-button ${isActive("/")}`}>
            Accueil
          </Link>
        </div>

        <div className="nav-buttons">
          <Link
            to="/productor"
            className={`nav-button ${isActive("/productor")}`}
          >
            Mes Produits
          </Link>
        </div>

        <div className="nav-buttons">
          <Link
            to="/addproduct"
            className={`nav-button ${isActive("/addproduct")}`}
          >
            Ajouter un Produit
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
            <Link to="/profil" className="button button--profile">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#eaa521"
              >
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </Link>
          )}
        </div>
      </nav>

      <button
        className={`nav-toggle-button ${
          isExpanded ? "nav-toggle-button-open" : "nav-toggle-button-close"
        }`}
        onClick={toggleNav}
      >
        {isExpanded ? <span>&#x25B2;</span> : <span>&#x25BC;</span>}
      </button>
    </div>
  );
};

export default NavBarSupplier;
