// src/components/card/CardProuductorGrid.jsx
import React from 'react';
import '../../style/component/card/cardProductorGrid.sass';
import CardProductCustomer from "./CardProductCustomer";
import { FaShoppingCart } from 'react-icons/fa';
import { useCartStore } from "../../store/cartStore";

function CardProuductorGrid() {
    const { cart, addProduct, updateQuantity } = useCartStore();

    const handleQuantityChange = (id, newQty) => {
        const existing = cart.find(p => p.id === id);
        if (!existing && newQty > 0) {
            // première fois : on ajoute le produit avec la quantité choisie
            addProduct({
                id,
                name: `Produit ${id}`,
                description: "Produit générique",
                image: "/path/to/image.jpg",
                quantity: newQty
            });
        } else if (existing) {
            const diff = newQty - existing.quantity;
            if (diff !== 0) {
                updateQuantity(id, diff);
            }
        }
    };

    const handleAddToCart = (id) => {
        const existing = cart.find(p => p.id === id);
        if (existing) {
            // si déjà dans le panier, on incrémente de 1
            updateQuantity(id, 1);
        } else {
            // sinon, on ajoute pour la première fois
            addProduct({
                id,
                name: `Produit ${id}`,
                description: "Produit générique",
                image: "/path/to/image.jpg",
                quantity: 1
            });
        }
    };

    console.log("Panier actuel :", cart);

    return (
        <div id="CardProuductorGrid__container">
            {[1, 2, 3].map((id) => (
                <CardProductCustomer
                    key={id}
                    id={id}
                    onAddToCart={() => handleAddToCart(id)}
                    onQuantityChange={(qty) => handleQuantityChange(id, qty)}
                />
            ))}

            <button
                className="CardProuductorGrid__cart-button"
                aria-label="Voir le panier"
                onClick={() => window.location.href = '/cart'}
            >
                <FaShoppingCart size={24} />
                {cart.length > 0 && (
                    <span className="CartButton__badge">
                        {cart.reduce((sum, item) => sum + item.quantity, 0)}
                    </span>
                )}
            </button>
        </div>
    );
}

export default CardProuductorGrid;
