import { authAPI } from '@/api/auth.api';

export const getProfile = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    return null;
  }

  try {
    const me = await authAPI.me(token);
    return me.data;
  } catch {
    return null;
  }
};

export const getProfileDetail = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    return null;
  }

  try {
    const user = await authAPI.userInfo(token);
    return user.data;
  } catch {
    return null;
  }
};

export const login = async (data) => {
  const res = await authAPI.login(data);
  const token = res.data.token;
  localStorage.setItem('token', token);
};

export const register = async (data) => {
  await authAPI.register(data);

  await login({ email: data.email, password: data.password });
};

export const logout = () => localStorage.setItem('token', null);
