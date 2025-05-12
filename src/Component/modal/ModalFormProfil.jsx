import "../../style/component/modal/modalProfil.sass";
import "../../style/component/modal/modal.sass";
import LoyaltyCard from "../other/LoyaltyCard";
import CardProfil from "../card/CardProfil";
import { useState, useEffect } from "react";

// URL de l'API
const API_BASE_URL = "http://localhost:3000/api";

function ModalFormProfil() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // cookie token
        const token = document.cookie
          .split("; ")
          .find((row) => row.startsWith("token="))
          ?.split("=")[1];

        if (!token) {
          setError("Vous devez être connecté pour accéder à votre profil");
          setLoading(false);
          return;
        }

        console.log("token :", token);

        // Essayer d'abord avec 'profile'
        let response = await fetch(`${API_BASE_URL}/users/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Si 404, essayer avec 'me'
        if (response.status === 404) {
          response = await fetch(`${API_BASE_URL}/users/me`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        }

        // Si toujours 404, essayer sans 's' dans users
        if (response.status === 404) {
          response = await fetch(`${API_BASE_URL}/user/profile`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        }

        console.log("response :", response);

        if (!response.ok) {
          throw new Error(
            `Erreur API: ${response.status} ${response.statusText}`
          );
        }

        const data = await response.json();
        console.log("Données utilisateur:", data);
        setUserData(data.user || data);
      } catch (error) {
        console.error("Erreur lors de la récupération du profil:", error);
        setError("Impossible de récupérer les données du profil");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!userData) {
    return <div>Erreur lors du chargement du profil</div>;
  }

  // S'adapter aux différentes structures de données possibles
  const restaurant =
    userData.restaurantLinks?.[0]?.restaurant || userData.restaurant;
  const firstName = userData.first_name || userData.firstName;
  const lastName = userData.last_name || userData.lastName;
  const email = userData.email;
  const role = userData.role;
  const createdAt = userData.createdAt || userData.created_at;

  return (
    <>
      <div id="divModal__center">
        <div id="divModal__container">
          {/*LOGO ICI*/}
          <h1>Profil</h1>
          <p>
            Nom : {firstName} {lastName}
          </p>
          <p>Email : {email}</p>
          <p>Rôle : {role}</p>
          {restaurant && (
            <>
              <p>Nom du restaurant : {restaurant.name}</p>
              <p>
                Date de création : {new Date(createdAt).toLocaleDateString()}
              </p>
            </>
          )}
          <LoyaltyCard />
          <div id="divModalProfil__containerProduct">
            <h2 id="divModalProfil__underTitle">
              {role === "RESTAURANT_USER"
                ? "Produits en vente"
                : "Produits achetés"}
            </h2>
            <div id="divModalProfil__Product">
              <CardProfil />
              <CardProfil />
              <CardProfil />
            </div>
          </div>

          {/*logout*/}
          <button
            onClick={() => {
              document.cookie =
                "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
              window.location.reload();
            }}
            id="button__logout"
          >
            Déconnexion
          </button>
        </div>
      </div>
    </>
  );
}

export default ModalFormProfil;
