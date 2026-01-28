import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { Product } from '../../assets/types/product';
import { Order, OrderItem } from '../../assets/types/order';

type CartItem = OrderItem;

type CartContextValue = {
  items: CartItem[];
  orders: Order[];
  itemsCount: number;
  subtotal: number;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: number) => void;
  incrementItem: (productId: number) => void;
  decrementItem: (productId: number) => void;
  clearCart: () => void;
  checkout: () => Order | null;
};

const CartContext = createContext<CartContextValue | null>(null);

const buildId = () => `ORD-${Math.random().toString(36).slice(2, 9).toUpperCase()}`;

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [itemsMap, setItemsMap] = useState<Record<number, CartItem>>({});
  const [orders, setOrders] = useState<Order[]>([]);

  const items = useMemo(() => Object.values(itemsMap), [itemsMap]);

  const itemsCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    [items]
  );

  const addItem = useCallback((product: Product, quantity = 1) => {
    setItemsMap(prev => {
      const existing = prev[product.id];
      const nextQty = Math.min(
        product.maxQuantity,
        (existing?.quantity ?? 0) + quantity
      );
      return {
        ...prev,
        [product.id]: {
          product,
          quantity: nextQty,
        },
      };
    });
  }, []);

  const removeItem = useCallback((productId: number) => {
    setItemsMap(prev => {
      const next = { ...prev };
      delete next[productId];
      return next;
    });
  }, []);

  const incrementItem = useCallback((productId: number) => {
    setItemsMap(prev => {
      const existing = prev[productId];
      if (!existing) return prev;
      const nextQty = Math.min(existing.product.maxQuantity, existing.quantity + 1);
      return { ...prev, [productId]: { ...existing, quantity: nextQty } };
    });
  }, []);

  const decrementItem = useCallback((productId: number) => {
    setItemsMap(prev => {
      const existing = prev[productId];
      if (!existing) return prev;
      const nextQty = existing.quantity - 1;
      if (nextQty <= 0) {
        const next = { ...prev };
        delete next[productId];
        return next;
      }
      return { ...prev, [productId]: { ...existing, quantity: nextQty } };
    });
  }, []);

  const clearCart = useCallback(() => {
    setItemsMap({});
  }, []);

  const checkout = useCallback(() => {
    if (items.length === 0) return null;
    const order: Order = {
      id: buildId(),
      date: new Date().toISOString().slice(0, 10),
      status: 'Processing',
      items: items,
      total: subtotal,
    };
    setOrders(prev => [order, ...prev]);
    setItemsMap({});
    return order;
  }, [items, subtotal]);

  const value = useMemo(
    () => ({
      items,
      orders,
      itemsCount,
      subtotal,
      addItem,
      removeItem,
      incrementItem,
      decrementItem,
      clearCart,
      checkout,
    }),
    [
      items,
      orders,
      itemsCount,
      subtotal,
      addItem,
      removeItem,
      incrementItem,
      decrementItem,
      clearCart,
      checkout,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart must be used within CartProvider');
  }
  return ctx;
}
