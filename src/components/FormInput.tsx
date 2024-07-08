// components/FormInput.tsx
import React from "react";

interface FormInputProps {
  label: string;
  type: string;
  placeholder: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  type,
  placeholder,
  value,
  error,
  onChange,
}) => (
  <div className="form-control">
    <label className="label">
      <span className="label-text">{label}</span>
    </label>
    <input
      type={type}
      placeholder={placeholder}
      className={`input input-bordered ${error ? "input-error" : ""}`}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
    {error && <p className="text-xs text-error">{error}</p>}
  </div>
);

export default FormInput;
