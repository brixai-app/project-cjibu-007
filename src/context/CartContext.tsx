import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import type { CartItem } from '@/types';

export type CartState = {
  items: CartItem[];
  isOpen: boolean;
};

export type CartContextValue = {
  items: CartItem[];
  isOpen: boolean;
  subtotal: number;
  itemCount: number;
  shippingProgress: number;
  freeShippingThreshold: number;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  removeItem: (id: string) => void;
  setItemQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

const FREE_SHIPPING_THRESHOLD = 5000;

export function CartProvider({ children }: { children?: React.ReactNode }) {
  const [state, setState] = useState<CartState>({ items: [], isOpen: false });

  const openCart = useCallback(() => {
    setState(prev => ({ ...prev, isOpen: true }));
  }, []);

  const closeCart = useCallback(() => {
    setState(prev => ({ ...prev, isOpen: false }));
  }, []);

  const toggleCart = useCallback(() => {
    setState(prev => ({ ...prev, isOpen: !prev.isOpen }));
  }, []);

  const addItem = useCallback(
    (item: Omit<CartItem, 'quantity'>, quantity: number = 1) => {
      if (!item?.id) return;
      setState(prev => {
        const existing = prev.items.find(i => i.id === item.id);
        let nextItems: CartItem[];
        if (existing) {
          nextItems = prev.items.map(i =>
            i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i
          );
        } else {
          nextItems = [...prev.items, { ...item, quantity }];
        }
        return { ...prev, items: nextItems, isOpen: true };
      });
    },
    []
  );

  const removeItem = useCallback((id: string) => {
    if (!id) return;
    setState(prev => ({ ...prev, items: prev.items.filter(i => i.id !== id) }));
  }, []);

  const setItemQuantity = useCallback((id: string, quantity: number) => {
    if (!id) return;
    setState(prev => {
      if (quantity <= 0) {
        return { ...prev, items: prev.items.filter(i => i.id !== id) };
      }
      const nextItems = prev.items.map(i =>
        i.id === id ? { ...i, quantity } : i
      );
      return { ...prev, items: nextItems };
    });
  }, []);

  const clearCart = useCallback(() => {
    setState(prev => ({ ...prev, items: [] }));
  }, []);

  const subtotal = useMemo(
    () =>
      state.items.reduce(
        (sum, item) => sum + (item?.price ?? 0) * (item?.quantity ?? 0),
        0
      ),
    [state.items]
  );

  const itemCount = useMemo(
    () => state.items.reduce((sum, item) => sum + (item?.quantity ?? 0), 0),
    [state.items]
  );

  const shippingProgress = useMemo(() => {
    const raw = subtotal / FREE_SHIPPING_THRESHOLD;
    const clamped = Math.max(0, Math.min(1, raw));
    return clamped * 100;
  }, [subtotal]);

  const value: CartContextValue = useMemo(
    () => ({
      items: state.items,
      isOpen: state.isOpen,
      subtotal,
      itemCount,
      shippingProgress,
      freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
      openCart,
      closeCart,
      toggleCart,
      addItem,
      removeItem,
      setItemQuantity,
      clearCart,
    }),
    [
      state.items,
      state.isOpen,
      subtotal,
      itemCount,
      shippingProgress,
      openCart,
      closeCart,
      toggleCart,
      addItem,
      removeItem,
      setItemQuantity,
      clearCart,
    ]
  );

  return <CartContext.Provider value={value}>{children ?? null}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return ctx;
}

export { CartContext };
export default CartContext;