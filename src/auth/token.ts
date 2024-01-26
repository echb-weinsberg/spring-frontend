const ACCESS_TOKEN_KEY = 'accessToken';

export function getAccessTokenFromStorage() {
  return localStorage.getItem(ACCESS_TOKEN_KEY) ?? undefined;
}

export function setAccessTokenInStorage(token: string) {
  if (token) {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
  }
}

export function removeAccessTokenFromStorage() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
}
