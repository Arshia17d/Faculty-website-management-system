import { apiRequest } from "./apiClient";

export function fetchSites() {
  return apiRequest("/sites");
}
