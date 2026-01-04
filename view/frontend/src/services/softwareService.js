import { apiRequest } from "./apiClient";

export function fetchSoftware() {
  return apiRequest("/software");
}
