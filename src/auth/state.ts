import { atom } from 'jotai';

import { getAccessTokenFromStorage } from './token.ts';

export const accessTokenAtom = atom<string | undefined>(getAccessTokenFromStorage());
