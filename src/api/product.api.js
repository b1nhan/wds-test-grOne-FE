import axiosClient from './axiosClient';

export const productAPI = {
  getProducts: (params) => {
    return axiosClient.get('/products', { params });
  },

  getProductById: (id) => {
    return axiosClient.get(`/products/${id}`);
  },

  searchProducts: (keyword, params) => {
    return axiosClient.get('/products', {
      params: { keyword, ...params },
    });
  },
  // admin required
  editProducts: (id, data, token) => {
    return axiosClient.put(`/products/${id}`, data, {
      headers: { Authorization: token ? `Bearer ${token}` : null },
    });
  },
  deleteProducts: (id, token) => {
    return axiosClient.delete(`/products/${id}`, {
      headers: { Authorization: token ? `Bearer ${token}` : null },
    });
  },
  createProducts: (data, token) => {
    return axiosClient.post(`/products`, data, {
      headers: { Authorization: token ? `Bearer ${token}` : null },
    });
  },
};
