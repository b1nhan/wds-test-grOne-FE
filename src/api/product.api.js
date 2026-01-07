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
  editProducts: (id, data) => {
    return axiosClient.put(`/products/${id}`, data);
  },
  deleteProducts: (id) => {
    return axiosClient.delete(`/products/${id}`);
  },
  createProducts: (data) => {
    return axiosClient.post(`/products`, data);
  },
};
