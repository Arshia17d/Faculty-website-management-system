import React from "react";

export default function Modal({ open, title, onClose, children, footer }) {
  if (!open) return null;

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal-card">
        <div className="modal-header">
          <h3>{title}</h3>
          <button
            type="button"
            className="btn btn-outline btn-sm"
            onClick={onClose}
          >
            بستن
          </button>
        </div>
        <div className="modal-body">{children}</div>
        {footer && <div className="modal-footer">{footer}</div>}
      </div>
    </div>
  );
}
