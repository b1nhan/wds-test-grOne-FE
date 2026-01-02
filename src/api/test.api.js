import axiosClient from './axiosClient';

export const pingBE = () => {
  return axiosClient.get('/test/ping');
};
