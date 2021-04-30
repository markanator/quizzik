import React, { ReactElement, ReactNode } from "react";
import "./form.css";

interface IFormProps {
  onSubmit: (e: any) => void;
  disabled: boolean;
  children: ReactNode;
}

function Form({ onSubmit, disabled, children }: IFormProps): ReactElement {
  return (
    <form onSubmit={onSubmit}>
      <fieldset disabled={disabled} className="form__fieldset-wrapper">
        {children}
      </fieldset>
    </form>
  );
}

interface TextInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function TextInput({
  value,
  onChange,
  label,
  name,
}: TextInputProps): ReactElement {
  return (
    <div className="form__block">
      <label htmlFor={name} className="form__label">
        {label}
      </label>
      <input
        className="form__field"
        placeholder={label}
        type="text"
        name={name}
        id={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

interface SelectInputProps {
  label: string;
  name: string;
  options: {
    value: string;
    label: string;
  }[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

function SelectInput({
  label,
  name,
  options,
  value,
  onChange,
}: SelectInputProps): ReactElement {
  return (
    <div className="form__block">
      <label htmlFor={name} className="form__label">
        {label}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="form__field"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export { TextInput, SelectInput, Form };
