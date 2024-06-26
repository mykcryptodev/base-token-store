// hooks/useCart.ts
import { useState, useEffect } from 'react';

export interface CartItem {
  id: string;
  address: string;
  decimals: number;
  symbol: string;
  img: string;
  name: string;
  usdAmountDesired: number;
  price: number;
  isNft?: boolean;
  nftCollectionName?: string;
  nftOrderHash?: string;
  nftExchangeAddress?: string;
  isDonation?: boolean;
}

const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const cartFromStorage = localStorage.getItem('cart');
    if (cartFromStorage) {
      setCart(JSON.parse(cartFromStorage) as CartItem[]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addItem = (item: CartItem) => {
    setCart((prevCart) => [...prevCart, item]);
  };

  const updateItem = (id: string, updatedItem: Partial<CartItem>) => {
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === id ? { ...item, ...updatedItem } : item))
    );
  };

  const deleteItem = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  return {
    cart,
    addItem,
    updateItem,
    deleteItem,
  };
};

export default useCart;
