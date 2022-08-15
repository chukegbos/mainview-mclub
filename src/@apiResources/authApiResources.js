/*eslint-disable*/
export function login(payload) {
  return apiWorker.post(`/auth/login`, payload.query);
}
export function refreshToken() {
  return apiWorker.post(`/auth/refresh`);
}
export function logout() {
  return apiWorker.post(`/auth/logout`);
}
