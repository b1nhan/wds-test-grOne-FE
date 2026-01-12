import axiosClient from './axiosClient';

export const orderAPI = {
  getMyOrder: (token) => {
    return axiosClient.get('/orders', {
      headers: { Authorization: token ? `Bearer ${token}` : null },
    });
  },

  getOrderById: (id, token) => {
    return axiosClient.get(`/orders/${id}`, {
      headers: { Authorization: token ? `Bearer ${token}` : null },
    });
  },

  createOrder: (data, token) => {
    return axiosClient.post(`/orders`, data, {
      headers: { Authorization: token ? `Bearer ${token}` : null },
    });
  },
};
