import React, { useState, useEffect } from "react";
import CardProductView from "./CardProductView";
// import img from '../assets/img.png';
import "../../style/component/card/cardProductorGrid.sass";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../config/config";
import Cookies from "js-cookie";
import { getDefaultHeaders } from "../../config/config";

function CardProuductorGrid() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [supplierId, setSupplierId] = useState(null);

  // Récupérer le supplier_id depuis le profil utilisateur
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // Récupérer le token depuis les cookies
        const token = Cookies.get("token");

        if (!token) {
          console.warn("Aucun token d'authentification trouvé");
          setError("Vous devez être connecté pour voir vos produits");
          navigate("/login");
          return;
        }

        // Appel à l'API pour récupérer le profil utilisateur
        const response = await fetch(`${API_URL}/users/profile`, {
          method: "GET",
          headers: getDefaultHeaders(),
          credentials: "include"
        });
        
        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const profileResponse = await response.json();
        console.log("Réponse complète du profil:", profileResponse);

        // Adapter selon la structure réelle
        const userData = profileResponse.user || profileResponse;

        console.log("Profil utilisateur récupéré:", userData);

        // Vérifier si l'utilisateur est un fournisseur
        if (userData.role !== "SUPPLIER_USER") {
          setError("Vous devez être un fournisseur pour accéder à cette page");
          navigate("/");
          return;
        }

        // Trouver le supplier_id dans les liens fournisseur
        if (userData.supplierLinks && userData.supplierLinks.length > 0) {
          console.log("userData.supplierLinks", userData.supplierLinks);
          const supplierId = userData.supplierLinks[0].supplier_id;
          console.log("ID fournisseur récupéré:", supplierId);
          setSupplierId(supplierId);
        } else {
          console.warn("Aucun lien fournisseur trouvé pour cet utilisateur");
          setError("Votre compte n'est associé à aucun fournisseur");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération du profil:", error);
        setError("Impossible de récupérer vos informations de fournisseur");
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  // Récupérer les produits du fournisseur
  useEffect(() => {
    const fetchSupplierProducts = async () => {
      console.log("supplierId pas de prod ? : ", supplierId);
      if (!supplierId) return; // Ne pas continuer si on n'a pas l'ID du fournisseur
      
      setLoading(true);
      try {

        console.log("supplierId : ", supplierId);
        // Appel à l'API pour récupérer les produits du fournisseur
        const productsResponse = await fetch(
          `${API_URL}/products/supplier/${supplierId}`,
          {
            method: "GET",
            headers: getDefaultHeaders(),
            credentials: "include"
          }
        );
        if (!productsResponse.ok) {
          throw new Error(`Erreur HTTP: ${productsResponse.status}`);
        }

        console.log("productsResponse : ", productsResponse);

        const productsData = await productsResponse.json();
        console.log("Produits du fournisseur récupérés:", productsData);
        setProducts(productsData || []);
      } catch (error) {
        console.error("Erreur lors de la récupération des produits:", error);
        setError(`Impossible de charger les produits: ${error.message}`);
        setProducts([]); // Réinitialiser les produits à un tableau vide en cas d'erreur
      } finally {
        setLoading(false);
      }
    };

    fetchSupplierProducts();
  }, [supplierId]);

  // Fonction pour supprimer un produit
  const handleDeleteProduct = (productId) => {
    setProducts(products.filter((product) => product.id !== productId));
  };

  return (
    <>
      <div id="CardProuductorGrid__container">
        <div className="add-product-section">
          <h3>Ajouter un produit</h3>
          <button
            onClick={() => navigate("/addproduct")}
            style={{ width: "100px" }}
          >
            +
          </button>
          {!loading && !error && products?.length === 0 && (
            <div className="no-products-message">
              Vous n'avez pas encore de produits. Cliquez sur "Ajouter un
              produit" pour commencer.
            </div>
          )}
          {/* <CardAddProduct onClick={() => navigate("/addproduct")} /> */}
        </div>

        {loading && (
          <div className="loading-indicator">Chargement des produits...</div>
        )}
        {error && <div className="error-message">{error}</div>}

        {products.map((product) => (
          <CardProductView
            key={product.id}
            product={product}
            onDelete={handleDeleteProduct}
          />
        ))}
      </div>
    </>
  );
}

export default CardProuductorGrid;
