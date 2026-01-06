import { apiRequest } from "./apiClient";

export function fetchReports(userId) {
  const query = userId ? `?user_id=${encodeURIComponent(userId)}` : "";
  return apiRequest(`/reports${query}`);
}

export function createReport(payload) {
  return apiRequest("/reports", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function updateReportStatus(reportId, status) {
  return apiRequest(`/reports/${reportId}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
}
