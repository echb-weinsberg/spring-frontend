import { atom } from 'jotai';

export const currentYearAtom = atom<string>(
  (parseInt(new Date().toLocaleDateString('de-DE', { year: 'numeric' }), 10) - 1).toString()
);
