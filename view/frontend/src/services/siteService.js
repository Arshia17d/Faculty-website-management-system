import { apiRequest } from "./apiClient";

export function fetchSites() {
  return apiRequest("/sites");
}


export function createSite(payload) {
  return apiRequest("/sites", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function updateSiteSoftware(siteId, software) {
  return apiRequest(`/sites/${siteId}/software`, {
    method: "PATCH",
    body: JSON.stringify({ software }),
  });
}

export function fetchSiteDesks(siteId) {
  return apiRequest(`/sites/${siteId}/desks`);
}