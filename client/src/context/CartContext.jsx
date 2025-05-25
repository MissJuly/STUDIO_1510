import React, { createContext, useState, useContext } from "react";

// Create the context
const CartContext = createContext();

// Custom hook to access context easily
export const useCart = () => useContext(CartContext);

// Provider component
export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen((prev) => !prev);

  return (
    <CartContext.Provider value={{ isCartOpen, openCart, closeCart, toggleCart }}>
      {children}
    </CartContext.Provider>
  );
};
