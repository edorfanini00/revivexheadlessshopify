"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { shopifyFetch } from "@/lib/shopify";
import {
  CREATE_CART_MUTATION,
  ADD_TO_CART_MUTATION,
  UPDATE_CART_MUTATION,
  REMOVE_FROM_CART_MUTATION,
  GET_CART_QUERY,
} from "@/lib/queries";
import type { Cart } from "@/lib/types";

interface CartContextType {
  cart: Cart | null;
  loading: boolean;
  addToCart: (variantId: string, quantity?: number) => Promise<void>;
  updateCartLine: (lineId: string, quantity: number) => Promise<void>;
  removeFromCart: (lineId: string) => Promise<void>;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    const cartId = localStorage.getItem("shopify_cart_id");
    if (cartId) {
      shopifyFetch<{ cart: Cart }>({
        query: GET_CART_QUERY,
        variables: { cartId },
      })
        .then((data) => {
          if (data.cart) setCart(data.cart);
          else localStorage.removeItem("shopify_cart_id");
        })
        .catch(() => localStorage.removeItem("shopify_cart_id"));
    }
  }, []);

  const addToCart = useCallback(
    async (variantId: string, quantity = 1) => {
      setLoading(true);
      try {
        if (!cart) {
          const data = await shopifyFetch<{
            cartCreate: { cart: Cart };
          }>({
            query: CREATE_CART_MUTATION,
            variables: {
              input: {
                lines: [{ merchandiseId: variantId, quantity }],
              },
            },
          });
          const newCart = data.cartCreate.cart;
          setCart(newCart);
          localStorage.setItem("shopify_cart_id", newCart.id);
        } else {
          const data = await shopifyFetch<{
            cartLinesAdd: { cart: Cart };
          }>({
            query: ADD_TO_CART_MUTATION,
            variables: {
              cartId: cart.id,
              lines: [{ merchandiseId: variantId, quantity }],
            },
          });
          setCart(data.cartLinesAdd.cart);
        }
        setCartOpen(true);
      } finally {
        setLoading(false);
      }
    },
    [cart]
  );

  const updateCartLine = useCallback(
    async (lineId: string, quantity: number) => {
      if (!cart) return;
      setLoading(true);
      try {
        const data = await shopifyFetch<{
          cartLinesUpdate: { cart: Cart };
        }>({
          query: UPDATE_CART_MUTATION,
          variables: {
            cartId: cart.id,
            lines: [{ id: lineId, quantity }],
          },
        });
        setCart(data.cartLinesUpdate.cart);
      } finally {
        setLoading(false);
      }
    },
    [cart]
  );

  const removeFromCart = useCallback(
    async (lineId: string) => {
      if (!cart) return;
      setLoading(true);
      try {
        const data = await shopifyFetch<{
          cartLinesRemove: { cart: Cart };
        }>({
          query: REMOVE_FROM_CART_MUTATION,
          variables: {
            cartId: cart.id,
            lineIds: [lineId],
          },
        });
        setCart(data.cartLinesRemove.cart);
      } finally {
        setLoading(false);
      }
    },
    [cart]
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        addToCart,
        updateCartLine,
        removeFromCart,
        cartOpen,
        setCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}
