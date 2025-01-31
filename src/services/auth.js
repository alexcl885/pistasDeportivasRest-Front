export const getToken = () => localStorage.getItem('tokenIstalacionesDeportivas');

export const setToken = (token) => {
  localStorage.setItem('tokenIstalacionesDeportivas', token);
};

export const clearToken = () => {
  localStorage.removeItem('tokenIstalacionesDeportivas');
};
