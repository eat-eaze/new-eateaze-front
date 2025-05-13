// src/components/card/CardCustomerGrid.jsx
import React, { useState, useEffect } from "react";
import "../../style/component/card/cardProductorGrid.sass";
import CardProductCustomer from "./CardProductCustomer";
import { FaShoppingCart } from "react-icons/fa";
import { useCartStore } from "../../store/cartStore";

function CardCustomerGrid() {
  const { cart, addProduct, updateQuantity } = useCartStore();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:3000/api/products");
        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const data = await response.json();
        console.log("Produits récupérés Oui :", data.products);

        setProducts(data.products);
      } catch (err) {
        console.error("Erreur lors de la récupération des produits:", err);
        setError("Impossible de charger les produits");

        // Données fictives pour le développement
        setProducts([
          {
            id: "1",
            name: "Tomate Bio",
            description: "Tomates bio cultivées localement",
            price: "2.99",
            stock: 100,
            image:
              "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?q=80&w=1000&auto=format&fit=crop",
          },
          {
            id: "2",
            name: "Concombre",
            description: "Concombres frais de saison",
            price: "1.50",
            stock: 75,
            image:
              "https://images.unsplash.com/photo-1604977042946-1eecc30f269e?q=80&w=1000&auto=format&fit=crop",
          },
          {
            id: "3",
            name: "Carottes",
            description: "Carottes bio de nos producteurs",
            price: "1.80",
            stock: 120,
            image:
              "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?q=80&w=1000&auto=format&fit=crop",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleQuantityChange = (id, newQty) => {
    const product = products.find((p) => p.id === id);
    if (!product) return;

    const existing = cart.find((p) => p.id === id);
    if (!existing && newQty > 0) {
      // première fois : on ajoute le produit avec la quantité choisie
      addProduct({
        id,
        name: product.name,
        description: product.description,
        image: product.image,
        price: product.price,
        quantity: newQty,
      });
    } else if (existing) {
      const diff = newQty - existing.quantity;
      if (diff !== 0) {
        updateQuantity(id, diff);
      }
    }
  };

  const handleAddToCart = (id) => {
    const product = products.find((p) => p.id === id);
    if (!product) return;

    const existing = cart.find((p) => p.id === id);
    if (existing) {
      // si déjà dans le panier, on incrémente de 1
      updateQuantity(id, 1);
    } else {
      // sinon, on ajoute pour la première fois
      addProduct({
        id,
        name: product.name,
        description: product.description,
        image: product.image,
        price: product.price,
        quantity: 1,
      });
    }
  };

  console.log("Panier actuel :", cart);

  if (loading) {
    return <div className="loading-indicator">Chargement des produits...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div id="CardProuductorGrid__container">
      <button
        className="CardProuductorGrid__cart-button"
        aria-label="Voir le panier"
        onClick={() => (window.location.href = "/cart")}
      >
        <FaShoppingCart size={24} />
        {cart.length > 0 && (
          <span className="CartButton__badge">
            {cart.reduce((sum, item) => sum + item.quantity, 0)}
          </span>
        )}
      </button>

      {products.map((product) => (
        <CardProductCustomer
          key={product.id}
          id={product.id}
          img={product.image}
          titleImg={product.name || "Produit"}
          title={product.name || "Produit"}
          description={product.description || "Description non disponible"}
          price={product.price || "0.00"}
          stock={product.stock || 0}
          onAddToCart={() => handleAddToCart(product.id)}
          onQuantityChange={(qty) => handleQuantityChange(product.id, qty)}
        />
      ))}
    </div>
  );
}

export default CardCustomerGrid;
