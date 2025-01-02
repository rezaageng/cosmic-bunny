import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export type OS = 'MacOS' | 'Windows' | 'Linux' | 'Android' | 'iOS' | 'Unknown';

export const cn = (...inputs: ClassValue[]): string => {
  return twMerge(clsx(inputs));
};

export const getCookies = (name: string): string => {
  if (typeof document === 'undefined') return '';

  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() ?? '';
  return '';
};

export const removeCookie = (name: string): void => {
  if (typeof document === 'undefined') return;

  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

export const detectOS = (): OS => {
  const userAgent =
    typeof window !== 'undefined' ? window.navigator.userAgent : '';
  if (/Mac/i.test(userAgent)) {
    return 'MacOS';
  } else if (/Win/i.test(userAgent)) {
    return 'Windows';
  } else if (/Linux/i.test(userAgent)) {
    return 'Linux';
  } else if (/Android/i.test(userAgent)) {
    return 'Android';
  } else if (/iOS/i.test(userAgent)) {
    return 'iOS';
  }
  return 'Unknown';
};

export const formatCurrency = (amount: number): string => {
  if (amount === 0) {
    return 'Free';
  }

  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  }).format(amount);
};
