import React from "react";

export default function SoftwarePicker({
  options,
  selected,
  onAdd,
  onRemove,
  label = "نرم‌افزارهای انتخابی",
}) {
  return (
    <div className="form-group">
      <label>{label}</label>
      <div className="software-tags software-picker">
        {selected.length === 0 && <span>نرم‌افزاری انتخاب نشده است.</span>}
        {selected.map((item) => (
          <span key={item.id} className="software-tag">
            {item.name} {item.version}
            <button type="button" onClick={() => onRemove(item.id)} aria-label="remove">
              <i className="fas fa-times" />
            </button>
          </span>
        ))}
      </div>
      <div className="form-row" style={{ marginTop: "10px" }}>
        <div className="form-group" style={{ flex: 2 }}>
          <select
            className="form-control"
            defaultValue=""
            onChange={(event) => {
              const value = Number(event.target.value);
              if (!value) return;
              const picked = options.find((option) => option.id === value);
              if (picked) {
                onAdd(picked);
              }
              event.target.value = "";
            }}
          >
            <option value="">نرم‌افزار را انتخاب کنید</option>
            {options.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name} {option.version}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
