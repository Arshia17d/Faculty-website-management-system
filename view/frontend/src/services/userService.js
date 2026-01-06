import { apiRequest } from "./apiClient";

export function fetchUsers() {
  return apiRequest("/users");
}
