import React, { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (service) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find(item => item.id === service.id);
      if (existing) {
        return prevItems.map(item =>
          item.id === service.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevItems, { ...service, quantity: 1, specialRequests: '' }];
      }
    });
  };

  const removeFromCart = (serviceId) => {
    setCartItems((prevItems) => prevItems.filter(item => item.id !== serviceId));
  };

  const updateQuantity = (serviceId, quantity) => {
    setCartItems((prevItems) => {
      if (quantity <= 0) {
        return prevItems.filter(item => item.id !== serviceId);
      }
      return prevItems.map(item =>
        item.id === serviceId ? { ...item, quantity } : item
      );
    });
  };

  const updateSpecialRequests = (serviceId, text) => {
    setCartItems((prevItems) =>
      prevItems.map(item =>
        item.id === serviceId ? { ...item, specialRequests: text } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, updateSpecialRequests, clearCart, totalPrice, totalItems }}>
      {children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useCart = () => useContext(CartContext);
