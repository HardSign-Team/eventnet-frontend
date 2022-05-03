import styles from "./CustomSelector.module.scss";
import React, { Dispatch, SetStateAction, useState } from 'react';
import cn from "classnames";
import { CustomCheckbox } from "../CustomCheckbox/CustomCheckbox";

interface Props {
  readonly classNameLabel?: string;
  readonly label?: string;
  readonly classNameDiv?: string;
  readonly onChange: Dispatch<SetStateAction<any>>;
  readonly first: string,
  readonly second: string
  readonly firstLabel: string,
  readonly secondLabel: string,
  readonly value: string
}


export const CustomSelector: React.FC<Props> = ({
  classNameDiv,
  classNameLabel,
  label,
  onChange,
   first, firstLabel, second, secondLabel, value
}) => {

  const [isFirst, setIsFirst] = useState(value)

  const checkIsFirst = (gender:string) => {
    return gender === first
  }

  const changeGender = (gender: string) => {
    setIsFirst(gender);
    onChange(checkIsFirst(gender) ? first : second);
  };
  return (
    <div className={cn(styles.CustomSelector, classNameDiv)}>
      {typeof label !== 'undefined' && (
        <p className={cn(styles.classNameLabel, classNameLabel)}>{label}</p>
      )}
      <div className={styles.changeSelector}>
        <span className={styles.firstButton}>
          <CustomCheckbox
            label={firstLabel}
            checked={checkIsFirst(isFirst)}
            onClick={() => changeGender(first)}
          />
        </span>
        <span className={styles.secondButton}>
          <CustomCheckbox
            label={secondLabel}
            checked={!checkIsFirst(isFirst)}
            onClick={() => changeGender(second)}
          />
        </span>
      </div>
    </div>
  );
};