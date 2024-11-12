import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';

interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    quantity: number;
}

interface CartContextType {
    cartItems: Product[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cartItems, setCartItems] = useState<Product[]>([]);

    const addToCart = useCallback((product: Product) => {
        setCartItems((prevItems) => {
            const existingProductIndex = prevItems.findIndex(item => item.id === product.id);
            if (existingProductIndex >= 0) {
                return prevItems.map((item, index) =>
                    index === existingProductIndex
                        ? { ...item, quantity: item.quantity + product.quantity }
                        : item
                );
            } else {
                return [...prevItems, product];
            }
        });
    }, []);

    const removeFromCart = useCallback((productId: number) => {
        setCartItems((prevItems) => prevItems.filter(item => item.id !== productId));
    }, []);

    const contextValue = useMemo(() => ({
        cartItems,
        addToCart,
        removeFromCart
    }), [cartItems, addToCart, removeFromCart]);

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};