import axiosClient from './axiosClient';

export const authAPI = {
  login: (data) => {
    return axiosClient.post('/auth/login', data);
  },
  register: (data) => {
    return axiosClient.post('/auth/register', data);
  },
  me: (token) => {
    return axiosClient.get('/auth/me', {
      headers: { Authorization: token ? `Bearer ${token}` : null },
    });
  },
};
