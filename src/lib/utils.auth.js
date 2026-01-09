import { authAPI } from '@/api/auth.api';

export const getProfile = async () => {
  const token = localStorage.getItem('token');

  if (!token) {
    return null;
  }

  try {
    const me = await authAPI.me(token);
    return me;
  } catch {
    return null;
  }
};

export const login = async (data) => {
  const res = await authAPI.login(data);
  localStorage.setItem('token', res.token);
};

export const register = async (data) => {
  await authAPI.register(data);

  await login({ email: data.email, password: data.password });
};

export const logout = () => localStorage.setItem('token', null);
