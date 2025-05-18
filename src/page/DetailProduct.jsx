import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ModalProductDetail from "../Component/modal/ModalProductDetail";
import { useCartStore } from "../store/cartStore";
import "../style/component/modal/modalProductDetail.sass";
import { API_URL } from "../config/config";

function DetailProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [varieties, setVarieties] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const addProduct = useCartStore((state) => state.addProduct);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `${API_URL}/products/${id}`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Produit non trouvé");
        }

        const data = await response.json();
        console.log("Données reçues:", data);

        if (!data || Object.keys(data).length === 0) {
          throw new Error("Aucun produit associé à cet identifiant");
        }

        setProduct(data);

        // Récupérer les variétés associées
        if (data.productTypeId) {
          const varietiesResponse = await fetch(
            `${API_URL}/varieties/type-product/${data.productTypeId}`,
            {
              method: "GET",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              credentials: "include",
            }
          );

          if (varietiesResponse.ok) {
            const varietiesData = await varietiesResponse.json();
            setVarieties(varietiesData);
          }
        }

        setError(null);
      } catch (error) {
        console.error("Erreur lors de la récupération du produit:", error);
        setError(error.message || "Une erreur est survenue");
        setProduct(null);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addProduct({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: parseInt(quantity),
      });
    }
  };

  if (error) {
    return (
      <div id="backgroundPage">
        <div id="BigModal__center">
          <div className="error-message">
            <h2>{error}</h2>
          </div>
        </div>
      </div>
    );
  }

  if (!product) return null;

  return (
    <div id="backgroundPage">
      <div id="BigModal__center">
        <ModalProductDetail
          id={product.id}
          img={product.image}
          titleImg={product.name}
          title={product.name}
          description={product.description}
          price={product.price}
          stock={product.stock}
          varieties={varieties}
        />
      </div>
    </div>
  );
}

export default DetailProduct;
