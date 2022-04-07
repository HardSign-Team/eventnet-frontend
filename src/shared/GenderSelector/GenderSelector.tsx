import React, { Dispatch, SetStateAction, useState } from "react";
import "./GenderSelector.css";
import { CustomSelector } from "../CustomSelector/CustomSelector";

enum genders {
  Male = "Male",
  Female = "Female",
}

interface Props {
  readonly classNameLabel?: string;
  readonly label: string;
  readonly classNameDiv?: string;
  readonly onChange: Dispatch<SetStateAction<string>>;
}

export const GenderSelector: React.FC<Props> = ({
  classNameLabel,
  classNameDiv,
  label,
  onChange,
}) => {
  return (
    <CustomSelector
      onChange={onChange}
      first={genders.Male}
      second={genders.Female}
      firstLabel="Мужчина"
      secondLabel="Женщина"
      label={label}
      classNameLabel={classNameLabel}
      classNameDiv={classNameDiv}
    />
  );
};
