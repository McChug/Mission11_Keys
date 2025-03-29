import { createContext, ReactNode, useContext, useState } from "react";
import { CartItem } from "../types/CartItem";

interface CartContextType {
  cart: CartItem[];
  addCartItem: (item: CartItem) => void;
  removeCartItem: (bookId: number) => void;
  emptyCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addCartItem = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((c) => c.bookId === item.bookId);
      const updatedCart = prevCart.map((c) =>
        c.bookId === item.bookId
          ? { ...c, price: c.price + item.price, quantity: c.quantity + 1 }
          : c
      );

      return existingItem ? updatedCart : [...prevCart, item];
    });
  };

  const removeCartItem = (bookId: number) => {
    setCart(
      (prevCart) =>
        prevCart
          .map((c) =>
            c.bookId === bookId
              ? {
                  ...c,
                  quantity: c.quantity - 1,
                  price: c.price - c.price / c.quantity,
                }
              : c
          )
          .filter((c) => c.quantity > 0) // Remove items with quantity 0
    );
  };

  const emptyCart = () => {
    setCart(() => []);
  };

  return (
    <CartContext.Provider
      value={{ cart, addCartItem, removeCartItem, emptyCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart requires a CartProvider.");
  }
  return context;
};
