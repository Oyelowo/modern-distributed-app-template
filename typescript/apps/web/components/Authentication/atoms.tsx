import { atom } from 'jotai';

export const toggleAuthAtom = atom<'login' | 'register'>('login');
