import { apiRequest } from "./apiClient";

const STORAGE_KEY = "currentUser";

export async function login(payload) {
  const data = await apiRequest("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data.user));
  return data.user;
}

export function logout() {
  localStorage.removeItem(STORAGE_KEY);
}

export function getCurrentUser() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch (error) {
    localStorage.removeItem(STORAGE_KEY);
    return null;
  }
}
