import { productAPI } from '@/api/product.api';

export const getProducts = async (params) => {
  try {
    const res = await productAPI.getProducts(params);
    return res;
  } catch (err) {
    return err;
  }
};

export const createProducts = async (data) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return null;
  }
  try {
    const res = await productAPI.createProducts(data, token);
    return res;
  } catch (err) {
    return err;
  }
};

export const editProducts = async (id, data) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return null;
  }
  try {
    const res = await productAPI.editProducts(id, data, token);
    return res;
  } catch (err) {
    return err;
  }
};
export const deleteProducts = async (id) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return null;
  }
  try {
    const res = await productAPI.deleteProducts(id, token);
    return res;
  } catch (err) {
    return err;
  }
};
