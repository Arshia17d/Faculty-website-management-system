import React from "react";

const iconMap = {
  success: "check-circle",
  error: "exclamation-circle",
  warning: "exclamation-triangle",
};

const titleMap = {
  success: "موفقیت",
  error: "خطا",
  warning: "هشدار",
};

export default function Notification({ notification }) {
  if (!notification) return null;

  const { message, type } = notification;
  const icon = iconMap[type] ?? iconMap.success;
  const title = titleMap[type] ?? titleMap.success;

  return (
    <div className={`notification ${type}`} role="status" aria-live="polite">
      <i className={`fas fa-${icon}`} />
      <div className="notification-content">
        <h4>{title}</h4>
        <p>{message}</p>
      </div>
    </div>
  );
}
