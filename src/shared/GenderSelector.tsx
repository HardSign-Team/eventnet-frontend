import React, { useState } from "react";
import "./GenderSelector.css";
import CustomCheckbox from "./CustomCheckbox";

interface Props {
  readonly classNameLabel?: string;
  readonly label: string;
  readonly classNameDiv?: string;
  readonly onChange?: (...rest: any) => void;
}

const GenderSelector = (props: Props) => {
  const [isMale, setIsMale] = useState(false);
  const changeGender = (gender: boolean) => {
    if (gender) {
      setIsMale(true);
      if (props.onChange) props.onChange("Male");
    } else {
      setIsMale(false);
      if (props.onChange) props.onChange("Female");
    }
  };
  return (
    <div className={props.classNameDiv ?? "gender_selector"}>
      <p className={props.classNameLabel ?? "label__gender_selector"}>
        {props.label}
      </p>
      <div className="change_gender">
        <span className="male_gender">
          <CustomCheckbox
            label="Мужчина"
            checked={isMale}
            onClick={() => changeGender(true)}
          />
        </span>
        <span className="female_gender">
          <CustomCheckbox
            label="Женщина"
            checked={!isMale}
            onClick={() => changeGender(false)}
          />
        </span>
      </div>
    </div>
  );
};

export default GenderSelector;
