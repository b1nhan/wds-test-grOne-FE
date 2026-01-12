import { orderAPI } from '@/api/order.api';

export const getMyOrder = async () => {
  try {
    const token = localStorage.getItem('token');
    const res = await orderAPI.getMyOrder(token);
    return res;
  } catch (err) {
    return err;
  }
};

export const getOrderById = async (id) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return null;
  }
  try {
    const res = await orderAPI.getOrderById(id, token);
    return res;
  } catch (err) {
    return err;
  }
};

export const createOrder = async (data) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return null;
  }
  try {
    const res = await orderAPI.createOrder({ phone: data }, token);
    return res;
  } catch (err) {
    return err;
  }
};
