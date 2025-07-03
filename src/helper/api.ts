const BASE_URL = import.meta.env.VITE_GOOGLE_BOOKS_API_BASE;

export const apiFetch = (endpoint: string, options?: any) => {
  return fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  }).then((res) => {
    if (!res.ok) throw new Error('Network response was not ok');
    return res.json();
  });
}