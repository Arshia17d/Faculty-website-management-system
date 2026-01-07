const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://127.0.0.1:8000/api";

export async function apiRequest(path, options = {}) {
  const rawUser = localStorage.getItem("currentUser");
  let user;
  try {
    user = rawUser ? JSON.parse(rawUser) : null;
  } catch (error) {
    user = null;
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(user?.id ? { "X-User-Id": user.id } : {}),
      ...(user?.role ? { "X-User-Role": user.role } : {}),
      ...(options.headers ?? {}),
    },
    ...options,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "خطا در ارتباط با سرور");
  }

   if (response.status === 204) {
     return null;
   }


  return response.json();
}
