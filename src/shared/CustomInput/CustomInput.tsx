import React from "react";
import { Gapped, Input, PasswordInput } from "@skbkontur/react-ui";
import "./CustomInput.css";

interface Props {
  readonly type?: "default" | "password";
  readonly className?: string;
  readonly value?: string;
  readonly onChange?: (...rest: any) => void;
  readonly onFocus?: (...rest: any) => void;
  readonly placeholder?: string;
  readonly label: string;
  readonly mask?: string;
}

export const CustomInput: React.FC<Props> = ({
  className,
  value,
  onChange = () => console.log("Input"),
  onFocus,
  placeholder,
  label,
  mask,
  type = "default",
}: Props) => {
  if (type === "default")
    return (
      <Gapped vertical gap={7}>
        <p className={"custom-input_label"}>{label}</p>
        <Input
          width={320}
          mask={mask}
          className={className}
          value={value}
          placeholder={placeholder}
          onValueChange={(value) => onChange(value)}
          onFocus={onFocus}
          style={{ height: 34 }}
        />
      </Gapped>
    );
  else
    return (
      <Gapped vertical gap={7}>
        <p className={"custom-input_label"}>{label}</p>
        <PasswordInput
          style={{ height: 38 }}
          className={className}
          value={value}
          detectCapsLock
          onValueChange={(value) => (onChange ? onChange(value) : null)}
          onFocus={onFocus}
          width={320}
        />
      </Gapped>
    );
};
