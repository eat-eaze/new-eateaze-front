import React, { useMemo, useState } from "react";
// import img from '../assets/img.png';
import "../../style/component/card/cardProductView.sass";
import { FaTrash } from "react-icons/fa";

// URL de l'API
const API_BASE_URL = "http://localhost:3000/api";

/**
 * Génère une URL unique pour l'image du chat afin d'éviter la mise en cache
 * @returns {string} URL unique d'une image de chat
 */
const getUniqueImageUrl = () => {
  // Ajout d'un timestamp et d'un nombre aléatoire pour rendre chaque URL unique
  const timestamp = Date.now();
  const randomNum = Math.floor(Math.random() * 1000);
  return `https://cataas.com/cat?t=${timestamp}&rand=${randomNum}`;
};

function CardProductView({ product, onDelete }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);

  const { id, name, description, price, stock, image } = product;

  // Si l'image par défaut n'est pas fournie ou si elle contient cataas.com, générer une URL unique
  const imageUrl = useMemo(() => {
    if (
      image === "https://via.placeholder.com/150" ||
      (typeof image === "string" && image.includes("cataas.com"))
    ) {
      return getUniqueImageUrl();
    }
    return image;
  }, [image]);

  const handleDelete = async (e) => {
    e.stopPropagation(); // Empêcher la propagation au parent

    if (
      !window.confirm(
        `Êtes-vous sûr de vouloir supprimer "${name || "ce produit"}" ?`
      )
    ) {
      return;
    }

    setIsDeleting(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Erreur HTTP: ${response.status}`);
      }

      console.log(`Produit ${id} supprimé avec succès`);

      // Si un callback onDelete est fourni, l'appeler pour mettre à jour la liste des produits
      if (typeof onDelete === "function") {
        onDelete(id);
      } else {
        // Actualiser la page si aucun callback n'est fourni
        window.location.reload();
      }
    } catch (err) {
      console.error("Erreur lors de la suppression du produit:", err);
      setError(err.message);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="CardProductView__Container">
      {error && <div className="CardProductView__error">{error}</div>}

      <div className="CardProductView__image-container">
        <img src={imageUrl} alt={name} className="CardProductView__banner" />
        <button
          className="CardProductView__delete-button"
          aria-label="Supprimer"
          onClick={handleDelete}
          disabled={isDeleting}
        >
          {isDeleting ? "..." : <FaTrash />}
        </button>
      </div>
      <div className="CardProductView__body">
        <p className="CardProductView__titreProduct">{name}</p>
        <p className="CardProductView__textProduct">{description}</p>
        <p className="CardProductView__textProduct">Prix : {price}€/Kg</p>
      </div>
    </div>
  );
}

export default CardProductView;
