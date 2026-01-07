import { apiRequest } from "./apiClient";

export function fetchAnnouncements() {
  return apiRequest("/announcements");
}

export function createAnnouncement(payload) {
  return apiRequest("/announcements", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}


export function deleteAnnouncement(id) {
  return apiRequest(`/announcements/${id}`, {
    method: "DELETE",
  });
}