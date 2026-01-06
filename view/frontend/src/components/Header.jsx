import React, { useMemo } from "react";

export default function Header({ title, icon, action, showDate = true }) {
  const dateLabel = useMemo(() => {
    if (!showDate) return null;
    const now = new Date();
    return now.toLocaleDateString("fa-IR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }, [showDate]);

  return (
    <div className="content-header">
      <h2>
        {icon && <i className={`fas ${icon}`} />} {title}
      </h2>
      {action && <div>{action}</div>}
      {showDate && <div className="date-display">{dateLabel}</div>}
    </div>
  );
}
