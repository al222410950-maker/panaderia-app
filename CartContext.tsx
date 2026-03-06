// CartContext.tsx
import React, { createContext, useContext, useState } from 'react';

export type Product = { 
  id: string; 
  nombre: string; 
  precio: number; 
  imagen?: any;
  qty: number;
};

// tipo para productos del catálogo (sin qty)
type AddProduct = Omit<Product, 'qty'>;

type ContextType = {
  carrito: Product[];
  addToCart: (p: AddProduct) => void;    // acepta producto SIN qty
  increaseQty: (id: string) => void;
  decreaseQty: (id: string) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<ContextType | undefined>(undefined);

export const CartProvider = ({ children }: any) => {
  const [carrito, setCarrito] = useState<Product[]>([]);

  const addToCart = (p: AddProduct) => {
    setCarrito(prev => {
      const existe = prev.find(item => item.id === p.id);
      if (existe) {
        // si ya existe, sólo aumentamos qty
        return prev.map(item =>
          item.id === p.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      // si no existe, agregamos con qty:1
      return [...prev, { ...p, qty: 1 }];
    });
  };

  const increaseQty = (id: string) => {
    setCarrito(prev =>
      prev.map(item =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  const decreaseQty = (id: string) => {
    setCarrito(prev =>
      prev
        .map(item =>
          item.id === id ? { ...item, qty: item.qty - 1 } : item
        )
        .filter(item => item.qty > 0)
    );
  };

  const removeFromCart = (id: string) => {
    setCarrito(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => setCarrito([]);

  return (
    <CartContext.Provider value={{ carrito, addToCart, increaseQty, decreaseQty, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};



