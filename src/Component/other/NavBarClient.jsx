import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../../style/component/other/navBar.sass";
import "../../style/component/other/navBar-additions.sass";
import "../../style/component/button/button.scss";
import { jwtDecode } from "jwt-decode";

const NavBarClient = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      .split("=")[1];
    if (token) {
      setIsLoggedIn(true);
      const payload = jwtDecode(token);
      setUserId(payload.id);
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

  const isActive = (path) => {
    return location.pathname === path ? "active-link" : "";
  };

  return (
    <div
      className={`navbar-container ${isExpanded ? "expanded" : "collapsed"}`}
    >
      <nav className="navbar">
        <div className="nav-logo">
          <Link to="/" className="logo-wrapper">
            <span className="logo-icon" role="img" aria-label="Ferme">
              🥗
            </span>
            <span className="logo-text">TousALaFerme</span>
          </Link>
        </div>
        <div className="nav-buttons">
          <Link to="/" className={`nav-button ${isActive("/")}`}>
            Accueil
          </Link>
        </div>
        <div className="nav-buttons">
          <Link
            to="/customer"
            className={`nav-button ${isActive("/productor")}`}
          >
            Produits
          </Link>
        </div>
        <div className="nav-buttons">
          <Link to="/cart" className={`nav-button ${isActive("/cart")}`}>
            Panier
          </Link>
        </div>

        <div className="nav-buttons">
          <Link to="/payment" className={`nav-button ${isActive("/payment")}`}>
            Mes commandes
          </Link>
        </div>

        <div className="auth-buttons">
          <Link to={`/profil`} className="button button--profile">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#eaa521"
            >
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </Link>
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

export default NavBarClient;
