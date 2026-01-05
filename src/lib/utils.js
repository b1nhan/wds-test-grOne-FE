import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const currencyFormatter = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
});

// do dummyjson dùng tiền đô nên tạm thời đổi về VND
export const convertToVND = (num) => currencyFormatter.format(26274.5 * num);

export const clamp = (num, min = -Infinity, max = Infinity) =>
  Math.min(Math.max(num, min), max);
