import "../../style/component/modal/modalHomeProductor.sass";
import CardProuductorGrid from "../card/CardProuductorGrid";
import { useEffect, useState } from "react";
import { API_URL, getDefaultHeaders } from "../../config/config";

function ModalFormHomeProductor() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [supplierId, setSupplierId] = useState(null);

  // Récupérer les produits du fournisseur
  useEffect(() => {
    const fetchSupplierProducts = async () => {
      if (!supplierId) return; // Ne pas continuer si on n'a pas l'ID du fournisseur

      setLoading(true);
      try {
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

        // La réponse est directement un tableau de produits
        const products = await productsResponse.json();
        console.log("Produits du fournisseur récupérés:", products);
        setProducts(Array.isArray(products) ? products : []);
      } catch (error) {
        console.error("Erreur lors de la récupération des produits:", error);
        setError(`Impossible de charger les produits: ${error.message}`);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSupplierProducts();
  }, [supplierId]);

  return (
    <div id="divBigModal__center">
      {/* <h1> Mes produits </h1> */}
      <CardProuductorGrid />
    </div>
  );
}

export default ModalFormHomeProductor;
