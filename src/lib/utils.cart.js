import { cartAPI } from '@/api/cart.api';

export const getCart = async () => {
  const token = localStorage.getItem('token');

  if (!token) {
    return null;
  }
  try {
    const cart = await cartAPI.getCart(token);
    return cart;
  } catch {
    return null;
  }
};

export const addCartItem = async (productId, quantity) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return null;
  }
  try {
    const response = await cartAPI.addCartItem(token, productId, quantity);
    return response;
  } catch {
    return null;
  }
};

export const deleteCartItem = async (itemId) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return null;
  }
  try {
    const response = await cartAPI.deleteCartItem(token, itemId);
    return response;
  } catch {
    return null;
  }
};
export const updateCart = async (itemId, quantity) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return null;
  }
  try {
    const response = await cartAPI.updateCartItem(token, itemId, quantity);
    return response;
  } catch {
    return null;
  }
};
