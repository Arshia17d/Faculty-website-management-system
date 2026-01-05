import { apiRequest } from "./apiClient";

export function fetchReservations() {
  return apiRequest("/reservations");
}

export function createReservation(payload) {
  return apiRequest("/reservations", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
