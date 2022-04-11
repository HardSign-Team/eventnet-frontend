import React from 'react';
import {Input, PasswordInput } from "@skbkontur/react-ui";
import "./CustomInput.css";
import { FormContainer } from '../FormContainer/FormContainer';

const CorrectInputsMasks = {
  standard: "",
  password: "",
  phoneNumber: "+7(999)-99-99-99-9",
  mail: "",
};

type typesInput = "password" | "standard" | "phoneNumber" | "mail";

interface Props {
  readonly type?: typesInput;
  readonly className?: string;
  readonly value: string;
  readonly onChange: (...rest: any) => void;
  readonly onFocus?: (...rest: any) => void;
  readonly placeholder?: string;
  readonly label?: string;
}

export const CustomInput: React.FC<Props> = ({
  className,
  value,
  onChange,
  onFocus,
  placeholder,
  label,
  type = "standard",
}: Props) => {

  const addSymbol = (value: string) => {
    if (value.length < 65) onChange(value);
  };
  if (type !== "password")
    return (
      <FormContainer>
        {typeof label !== "undefined" && (
          <p className={"custom-input_label"}>{label}</p>
        )}
        <Input
          width={320}
          mask={CorrectInputsMasks[type]}
          className={className}
          value={value}
          placeholder={placeholder}
          onValueChange={(value) => addSymbol(value)}
          onFocus={onFocus}
          style={{ height: 34 }}
          maskChar={""}
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
          style={{ height: 38 }}
          className={className}
          value={value}
          mask={CorrectInputsMasks.password}
          detectCapsLock
          onValueChange={(value) => (onChange ? onChange(value) : null)}
          onFocus={onFocus}
          width={320}
        />
      </FormContainer>
    );
};
