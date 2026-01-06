import { apiRequest } from "./apiClient";

export function fetchReservations(userId) {
  const query = userId ? `?user_id=${encodeURIComponent(userId)}` : "";
  return apiRequest(`/reservations${query}`);
}

export function createReservation(payload) {
  return apiRequest("/reservations", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function updateReservationStatus(reservationId, status) {
  return apiRequest(`/reservations/${reservationId}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
}
