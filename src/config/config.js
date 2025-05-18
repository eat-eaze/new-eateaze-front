/**
 * Configuration globale de l'environnement
 * Ce fichier centralise les variables d'environnement utilisées dans l'application
 */

// URL de base de l'API avec valeur par défaut
export const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "https://api.tousalaferme.theo-stoffelbach.fr";

// URL complète de l'API incluant le chemin /api
// Utiliser un proxy CORS si nécessaire
// export const API_URL = `https://cors-anywhere.herokuapp.com/${API_BASE_URL}/api`;
export const API_URL = `${API_BASE_URL}/api`;

// Configuration fetch par défaut pour les requêtes API
export const fetchConfig = {
  mode: 'cors',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
    // Ajout d'en-têtes personnalisés si nécessaire
  }
};

// Autres constantes globales peuvent être ajoutées ici
export const IS_PRODUCTION = process.env.NODE_ENV === "production";
export const IS_DEVELOPMENT = process.env.NODE_ENV === "development";

/**
 * Configuration des en-têtes HTTP par défaut pour les requêtes API
 * @param {boolean} includeAuth - Si true, inclut le token d'authentification
 * @returns {Object} - Les en-têtes à utiliser pour les requêtes API
 */
export const getDefaultHeaders = (includeAuth = true) => {
  const headers = {
    "Content-Type": "application/json",
  };

  if (includeAuth) {
    // Récupérer le token depuis les cookies
    const match = document.cookie.match(/(^|;\s*)token=([^;]*)/);
    const token = match ? decodeURIComponent(match[2]) : null;
    console.log(token);
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  return headers;
};
