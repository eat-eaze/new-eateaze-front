// src/components/modal/ModalCart.jsx
import React, { useEffect, useState } from "react";
import "../../style/component/modal/modalCart.sass";
import { useCartStore } from "../../store/cartStore";
import { FaShoppingCart } from "react-icons/fa";
import { API_URL } from "../../config/config";

// Fonction pour générer des images de chat uniques
const getUniqueImageUrl = () => {
  const timestamp = Date.now();
  const randomNum = Math.floor(Math.random() * 1000);
  return `https://cataas.com/cat?t=${timestamp}&rand=${randomNum}`;
};

function ModalCart() {
  const { cart, updateQuantity, setQuantity, removeProduct, clearCart } =
    useCartStore();

  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stockErrors, setStockErrors] = useState({});
  const [productShow, setProductShow] = useState([]);
  const [removedProducts, setRemovedProducts] = useState([]);
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(false);

  // Étape 1 et 2: Récupérer tous les produits de l'API
  useEffect(() => {
    const fetchAllProducts = async () => {
      setLoading(true);
      try {
        // Récupérer TOUS les produits
        const response = await fetch(`${API_URL}/products`);
        let products = await response.json();
        products = products.products;
        console.log("Tous les produits récupérés:", products);

        setAllProducts(products);

        // Vérifier si des produits du panier n'existent plus et les supprimer
        const productsToRemove = [];
        cart.forEach((cartItem) => {
          const product = products.find((p) => p.id === cartItem.id);
          if (!product) {
            productsToRemove.push({
              id: cartItem.id,
              name: cartItem.name || "Produit inconnu",
            });
            removeProduct(cartItem.id);
          }
        });

        if (productsToRemove.length > 0) {
          setRemovedProducts(productsToRemove);
          setTimeout(() => setRemovedProducts([]), 5000); // Masquer le message après 5 secondes
          console.log(
            "Produits supprimés car non disponibles:",
            productsToRemove
          );
        }

        // Vérifier le stock pour chaque produit dans le panier
        const errors = {};
        cart.forEach((cartItem) => {
          const product = products.find((p) => p.id === cartItem.id);
          if (product && cartItem.quantity > product.stock) {
            errors[cartItem.id] = `Stock disponible: ${product.stock} kg`;
          }
        });

        // Mettre le produit de cart et de l'api dans le state productShow
        const productShowRst = cart
          .map((cartItem) => {
            const product = products.find((p) => p.id === cartItem.id);
            if (product) {
              return {
                ...product,
                quantity: cartItem.quantity,
              };
            }
            return null;
          })
          .filter(Boolean); // Filtrer les éléments null (produits supprimés)

        setProductShow(productShowRst);
        setStockErrors(errors);
      } catch (error) {
        console.error("Erreur lors de la récupération des produits:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllProducts();
  }, [cart, removeProduct]);

  // Récupérer le profil utilisateur
  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoadingProfile(true);
      try {
        const response = await fetch(`${API_URL}/user/profile`);
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération du profil");
        }
        const data = await response.json();
        setUserProfile(data);
        console.log("Profil utilisateur récupéré:", data);
      } catch (error) {
        console.error("Erreur lors de la récupération du profil:", error);
        // Utiliser des valeurs par défaut en cas d'erreur
        setUserProfile({
          address: "123 rue de la Paix, 75002 Paris",
          // autres valeurs par défaut si nécessaires
        });
      } finally {
        setLoadingProfile(false);
      }
    };

    fetchUserProfile();
  }, []);

  // Étape 3: Fusionner les données du panier avec les détails des produits
  const cartWithDetails = cart.map((cartItem) => {
    // Trouver le produit correspondant dans tous les produits
    const productDetails = allProducts.find((p) => p.id === cartItem.id) || {};

    console.log(`Produit ${cartItem.id}:`, {
      imageAPI: productDetails.image,
      imageCart: cartItem.image,
      nomAPI: productDetails.name,
      nomCart: cartItem.name,
    });

    // Générer une image aléatoire si aucune image n'est disponible
    const productImage =
      productDetails.image || cartItem.image || getUniqueImageUrl();

    // Fusionner les deux (priorité aux détails de l'API)
    return {
      ...cartItem, // données du panier (quantité)
      ...productDetails, // données de l'API (image, nom, etc.)
      quantity: cartItem.quantity, // on conserve la quantité du panier
      hasStockError: stockErrors[cartItem.id],
      // On force l'image à utiliser
      image: productImage,
    };
  });

  // Debug
  useEffect(() => {
    console.log("🛒 Panier mis à jour:", cart);
    console.log("Panier avec détails:", cartWithDetails);
  }, [cart, cartWithDetails]);

  const handleCreateOrder = async () => {
    if (Object.keys(stockErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);
    try {
      const orderData = {
        restaurant_id: "8ca843e2-ae12-4600-bcc8-be5458a51afb",
        payment_method: "CARD",
        delivery_address:
          userProfile?.address || "123 rue de la Paix, 75002 Paris",
        delivery_date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // Demain
        special_instructions: specialInstructions,
        total_amount: cartWithDetails.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        ),
        items: cartWithDetails.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
        })),
      };

      const response = await fetch(`${API_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la création de la commande");
      }

      const result = await response.json();
      console.log("Commande créée avec succès:", result);
      clearCart(); // Vider le panier après la commande
      window.location.href = "/customer"; // Rediriger vers la page client
    } catch (error) {
      console.error("Erreur lors de la création de la commande:", error);
      alert("Une erreur est survenue lors de la création de la commande");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="divBigModal__center">
      <div id="divBigModal__Cart">
        <div className="cartPage__header">
          <h1>Panier</h1>
          <div className="cartPage__icon">
            <FaShoppingCart size={28} />
            <span className="cartPage__badge">{cart.length}</span>
          </div>
        </div>

        {removedProducts.length > 0 && (
          <div className="cartPage__notification">
            <p>
              {removedProducts.length === 1
                ? `Le produit "${removedProducts[0].name}" a été retiré car il n'est plus disponible.`
                : `${removedProducts.length} produits ont été retirés car ils ne sont plus disponibles.`}
            </p>
          </div>
        )}

        {loading ? (
          <div className="cartPage__loading">
            <p>Chargement des produits...</p>
          </div>
        ) : (
          <div className="cartPage__products">
            {productShow.length > 0 ? (
              productShow.map((product) => {
                console.log(`Affichage produit ${product.id}:`, {
                  image: product.image,
                  imageSource: product.image || getUniqueImageUrl(),
                });

                return (
                  <div key={product.id} className="cartPage__card">
                    <img
                      src={product.image}
                      onError={(e) => {
                        console.log(
                          "Erreur de chargement d'image:",
                          e.target.src
                        );
                        e.target.src = getUniqueImageUrl();
                      }}
                      alt={product.name}
                      className="cartPage__image"
                    />
                    <h2 className="cartPage__title">{product.name}</h2>
                    <p className="cartPage__description">
                      {product.description}
                    </p>
                    {product.hasStockError && (
                      <p className="cartPage__error">{product.hasStockError}</p>
                    )}
                    <div className="cartPage__quantity">
                      <button
                        className="quantity-btn"
                        onClick={() =>
                          setQuantity(product.id, product.quantity - 1)
                        }
                      >
                        –
                      </button>

                      <span>{product.quantity} Kg</span>

                      <button
                        className="quantity-btn"
                        onClick={(e) => {
                          e.preventDefault();
                          const newQuantity = product.quantity + 1;
                          const maxStock = product.stock || Infinity;

                          if (newQuantity <= maxStock) {
                            setQuantity(product.id, newQuantity);
                          } else {
                            alert(`Stock disponible: ${maxStock} kg`);
                          }
                        }}
                      >
                        +
                      </button>
                    </div>

                    <button
                      className="remove-btn"
                      style={{
                        width: "100%",
                        padding: "2px",
                        marginTop: "10px",
                      }}
                      onClick={() => removeProduct(product.id)}
                    >
                      Supprimer
                    </button>
                  </div>
                );
              })
            ) : (
              <h2>Votre panier est vide</h2>
            )}
          </div>
        )}

        {cartWithDetails.length > 0 && (
          <div className="cartPage__checkout">
            <button
              className="checkout-btn"
              disabled={
                Object.keys(stockErrors).length > 0 ||
                isSubmitting ||
                loadingProfile
              }
              onClick={handleCreateOrder}
            >
              {isSubmitting
                ? "Création de la commande..."
                : "Passer au paiement"}
            </button>

            {loadingProfile ? (
              <p>Chargement des informations du profil...</p>
            ) : (
              <div className="cartPage__profile">
                <p className="cartPage__address">
                  Adresse de livraison:{" "}
                  {userProfile?.address || "Adresse non disponible"}
                </p>
              </div>
            )}

            <textarea
              placeholder="Instructions spéciales"
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              className="cartPage__textarea"
            />

            {Object.keys(stockErrors).length > 0 && (
              <p className="cartPage__error">
                Certains produits dépassent le stock disponible
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ModalCart;
