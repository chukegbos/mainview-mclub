/*eslint-disable*/
export function login(payload) {
  return apiWorker.post(`/login`, payload.query);
}
export function refreshToken() {
  return apiWorker.post(`/refresh`);
}
export function logout() {
  return apiWorker.post(`/logout`);
}
