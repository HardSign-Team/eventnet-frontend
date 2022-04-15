import React from "react";
import { Input, PasswordInput } from "@skbkontur/react-ui";
import "./CustomInput.css";
import { FormContainer } from "../FormContainer/FormContainer";

const CorrectInputsMasks = {
  standard: "",
  password: "",
  phoneNumber: "+7(999)999-99-99",
  mail: "",
};

const Placeholders = {
  standard: "",
  password: "",
  phoneNumber: "+7(999)999-99-99",
  mail: "jopajopa@gmail.com",
};

type typesInput = "password" | "standard" | "phoneNumber" | "mail";

const MAX_INPUT_LENGTH = 65;

interface Props {
  readonly type?: typesInput;
  readonly className?: string;
  readonly value: string;
  readonly onChange: (value: string) => void;
  readonly onFocus?: (...rest: any) => void;
  readonly placeholder?: string;
  readonly label?: string;
  readonly error?: boolean;
  readonly width?: number;
}

export const CustomInput: React.FC<Props> = ({
  className,
  value,
  onChange,
  onFocus,
  placeholder,
  label,
  type = "standard",
  error = false,
  width = 320,
}: Props) => {
  const addSymbol = (value: string) => {
    if (value.length < MAX_INPUT_LENGTH) onChange(value);
  };
  if (type !== "password")
    return (
      <FormContainer>
        {typeof label !== "undefined" && (
          <p className={"custom-input_label"}>{label}</p>
        )}
        <Input
          width={width}
          mask={CorrectInputsMasks[type]}
          className={className}
          value={value}
          placeholder={placeholder ?? Placeholders[type]}
          onValueChange={(value) => addSymbol(value)}
          onFocus={onFocus}
          style={{ height: 34 }}
          maskChar={""}
          error={error}
        />
      </FormContainer>
    );
  else
    return (
      <FormContainer>
        {typeof label !== "undefined" && (
          <p className={"custom-input_label"}>{label}</p>
        )}
        <PasswordInput
          style={{ height: 34 }}
          className={className}
          value={value}
          mask={CorrectInputsMasks.password}
          detectCapsLock
          onValueChange={(value) => (onChange ? onChange(value) : null)}
          onFocus={onFocus}
          width={width}
          error={error}
        />
      </FormContainer>
    );
};
