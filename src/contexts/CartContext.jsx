import { createContext, useContext, useState, useCallback } from 'react';
import {
  getCart,
  addCartItem as addCartItemAPI,
  updateCart as updateCartAPI,
  deleteCartItem as deleteCartItemAPI,
} from '@/lib/utils.cart';

const CartContext = createContext(null);

export const CartProvider = ({ children, initialCart = null }) => {
  const [cart, setCart] = useState(initialCart);
  const [loading, setLoading] = useState(false);

  // Refresh cart data from the server
  const refreshCart = useCallback(async () => {
    setLoading(true);
    try {
      const cartData = await getCart();
      setCart(cartData);
      return cartData;
    } catch (error) {
      console.error('Failed to refresh cart:', error);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Add item to cart
  const addItem = useCallback(
    async (productId, quantity) => {
      setLoading(true);
      try {
        const response = await addCartItemAPI(productId, quantity);
        if (response) {
          await refreshCart();
          return response;
        }
        return null;
      } catch (error) {
        console.error('Failed to add item to cart:', error);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [refreshCart],
  );

  // Update item quantity in cart
  const updateItem = useCallback(
    async (itemId, quantity) => {
      setLoading(true);
      try {
        const response = await updateCartAPI(itemId, quantity);
        if (response) {
          await refreshCart();
          return response;
        }
        return null;
      } catch (error) {
        console.error('Failed to update cart item:', error);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [refreshCart],
  );

  // Remove item from cart
  const removeItem = useCallback(
    async (itemId) => {
      setLoading(true);
      try {
        const response = await deleteCartItemAPI(itemId);
        if (response) {
          await refreshCart();
          return response;
        }
        return null;
      } catch (error) {
        console.error('Failed to remove cart item:', error);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [refreshCart],
  );

  // Calculate total price
  const getTotalPrice = useCallback(() => {
    if (!cart?.data) return 0;
    return cart.data.reduce((total, item) => total + item.totalPrice, 0);
  }, [cart]);

  // Get total items count
  const getItemsCount = useCallback(() => {
    if (!cart?.data) return 0;
    return cart.data.reduce((count, item) => count + item.quantity, 0);
  }, [cart]);

  const value = {
    cart,
    loading,
    refreshCart,
    addItem,
    updateItem,
    removeItem,
    getTotalPrice,
    getItemsCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext;

