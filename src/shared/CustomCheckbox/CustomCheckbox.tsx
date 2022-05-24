import React from "react";
import "./CustomCheckbox.css";

interface Props {
  readonly className?: string;
  readonly onClick: (...rest: any) => void;
  readonly label: string;
  readonly checked?: boolean;
}

export const CustomCheckbox: React.FC<Props> = ({
  className,
  onClick,
  label,
  checked,
}) => {
  return (
    <div className="custom_checkbox">
      <label className="container">
        {label}
        <input
          className={className ?? "radio_button"}
          type="radio"
          onChange={onClick}
          checked={checked}
        />
        <span className="checkmark"></span>
      </label>
    </div>
  );
};
