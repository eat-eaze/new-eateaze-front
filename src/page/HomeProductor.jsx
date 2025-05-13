import React, { useEffect } from "react";
import "../style/_allpages.sass";
import ModalFormHomeProductor from "../Component/modal/ModalFormHomeProductor";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    // Vérifier si le token existe dans les cookies
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    // Si pas de token, rediriger vers la page de login
    if (!token) {
      navigate("/login");
      return;
    }

    // Décoder le token pour obtenir l'ID du producteur et son rôle
    try {
      const decoded = jwtDecode(token);
      // Vérifier si l'utilisateur est un fournisseur (SUPPLIER_USER)
      if (decoded.role !== "SUPPLIER_USER") {
        navigate("/");
      }
      // L'ID du producteur est disponible dans decoded.id pour être utilisé
    } catch (error) {
      console.error("Erreur de décodage du token:", error);
      navigate("/login");
    }
  }, [navigate]);

  return (
    <>
      <div id="backgroundPage">
        <div id="BigModal__center">
          <ModalFormHomeProductor />
        </div>
      </div>
    </>
  );
}

export default Home;
