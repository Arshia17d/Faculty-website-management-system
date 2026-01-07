import { apiRequest } from "./apiClient";

export function fetchSoftware() {
  return apiRequest("/software");
}


export function createSoftware(payload) {
  return apiRequest("/software", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function updateSoftware(id, payload) {
  return apiRequest(`/software/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

export function deleteSoftware(id) {
  return apiRequest(`/software/${id}`, {
    method: "DELETE",
  });
}