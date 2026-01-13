import axiosClient from './axiosClient';

export const cartAPI = {
  getCart: (token) => {
    return axiosClient.get('/cart', {
      headers: { Authorization: token ? `Bearer ${token}` : null },
    });
  },
  addCartItem: (token, productId, quantity) => {
    return axiosClient.post(
      '/cart/items',
      { productId, quantity },
      {
        headers: { Authorization: token ? `Bearer ${token}` : null },
      },
    );
  },
  deleteProducts: (token, itemId) => {
    return axiosClient.delete(`/cart/items/${itemId}`, {
      headers: { Authorization: token ? `Bearer ${token}` : null },
    });
  },
  updateCartItem: (token, itemId, quantity) => {
    return axiosClient.patch(
      `/cart/items/${itemId}`,
      { quantity },
      {
        headers: { Authorization: token ? `Bearer ${token}` : null },
      },
    );
  },
};
