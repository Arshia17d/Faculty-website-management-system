import { apiRequest } from "./apiClient";

export function updateDeskSoftware(deskId, softwareIds) {
  return apiRequest(`/desks/${deskId}/software`, {
    method: "PATCH",
    body: JSON.stringify({ softwareIds }),
  });
}
