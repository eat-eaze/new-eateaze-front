// src/components/modal/ModalCart.jsx
import React, { useEffect } from "react";
import "../../style/component/modal/modalCart.sass";
import { useCartStore } from "../../store/cartStore";
import { FaShoppingCart } from "react-icons/fa";

function ModalCart() {
    const {
        cart,
        updateQuantity,
        setQuantity,
        removeProduct
    } = useCartStore();

    // 🔍 debug à chaque changement de cart
    useEffect(() => {
        console.log("🛒 Panier mis à jour:", cart);
    }, [cart]);

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

                <div className="cartPage__products">
                    {cart.length > 0 ? (
                        cart.map((product) => (
                            <div key={product.id} className="cartPage__card">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="cartPage__image"
                                />
                                <h2 className="cartPage__title">{product.name}</h2>
                                <p className="cartPage__description">
                                    {product.description}
                                </p>
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
                                        onClick={() =>
                                            setQuantity(product.id, product.quantity + 1)
                                        }
                                    >
                                        +
                                    </button>
                                </div>

                                <button
                                    className="remove-btn"
                                    onClick={() => removeProduct(product.id)}
                                >
                                    Supprimer
                                </button>
                            </div>
                        ))
                    ) : (
                        <h2>Votre panier est vide</h2>
                    )}
                </div>

                {cart.length > 0 && (
                    <div className="cartPage__checkout">
                        <button className="checkout-btn">Passer au paiement</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ModalCart;
