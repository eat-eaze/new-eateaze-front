// NavBar.jsx
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../../style/component/other/navBar.sass";
import "../../style/component/other/navBar-additions.sass";
import "../../style/component/button/button.scss";

const NavBarAdmin = () => {
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
      <div>
        <p>Vous êtes un administrateur</p>
      </div>
    </div>
  );
};

export default NavBarAdmin;
