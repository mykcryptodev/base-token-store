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
  const [referralCode, setReferralCode] = useState<string | null>(null);

  useEffect(() => {
    const cartFromStorage = localStorage.getItem('cart');
    if (cartFromStorage) {
      setCart(JSON.parse(cartFromStorage) as CartItem[]);
    }
    const referralCodeFromStorage = localStorage.getItem('referralCode');
    if (referralCodeFromStorage) {
      setReferralCode(referralCodeFromStorage);
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

  const updateReferralCode = (code: string) => {
    setReferralCode(code);
    localStorage.setItem('referralCode', code);
  }

  const deleteReferralCode = () => {
    setReferralCode(null);
    localStorage.removeItem('referralCode');
  }

  return {
    cart,
    addItem,
    updateItem,
    deleteItem,
    referralCode,
    updateReferralCode,
    deleteReferralCode,
  };
};

export default useCart;
