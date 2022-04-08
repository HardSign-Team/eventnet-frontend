import React, { Dispatch, SetStateAction} from "react";
import "./GenderSelector.css";
import { CustomSelector } from "../CustomSelector/CustomSelector";

export enum genders {
  Male = "Male",
  Female = "Female",
}

interface Props {
  readonly classNameLabel?: string;
  readonly label: string;
  readonly classNameDiv?: string;
  readonly onChange: Dispatch<SetStateAction<string>>;
  readonly value: string
}

export const GenderSelector: React.FC<Props> = ({
  classNameLabel,
  classNameDiv,
  label,
  onChange,
    value
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
      value={value}
    />
  );
};
