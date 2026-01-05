import React from "react";

export default function Header({ title, action }) {
  return (
    <div className="content-header">
      <h2>{title}</h2>
      {action && <div>{action}</div>}
    </div>
  );
}
