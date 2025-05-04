// src/store/cartStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
    persist(
        (set) => ({
            cart: [],

            addProduct: (product) => set((state) => {
                const exists = state.cart.find((p) => p.id === product.id);
                if (exists) {
                    return {
                        cart: state.cart.map((p) =>
                            p.id === product.id
                                ? { ...p, quantity: p.quantity + (product.quantity || 1) }
                                : p
                        )
                    };
                }
                return {
                    cart: [...state.cart, { ...product, quantity: product.quantity || 1 }]
                };
            }),

            updateQuantity: (id, delta) => set((state) => ({
                cart: state.cart
                    .map((p) =>
                        p.id === id ? { ...p, quantity: Math.max(p.quantity + delta, 0) } : p
                    )
                    .filter((p) => p.quantity > 0)
            })),

            setQuantity: (id, quantity) => set((state) => ({
                cart: state.cart
                    .map((p) =>
                        p.id === id ? { ...p, quantity } : p
                    )
                    .filter((p) => p.quantity > 0)
            })),

            removeProduct: (id) => set((state) => ({
                cart: state.cart.filter((p) => p.id !== id)
            })),

            clearCart: () => set({ cart: [] })
        }),
        {
            name: 'cart-storage',         // clé dans localStorage
            getStorage: () => localStorage // ou sessionStorage si tu préfères
        }
    )
);
