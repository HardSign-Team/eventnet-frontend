import React from "react";
import "./CustomButton.scss";
import { Gapped } from "@skbkontur/react-ui";
import cn from "classnames";

interface Props {
  readonly className?: string;
  readonly onClick?: (...rest: any) => void;
  readonly label: string;
  readonly classNameDiv?: string;
  readonly width?: number | string;
  readonly height?: number;
  readonly fontSize?: number;
  readonly onKeyPress?: (...rest: any) => void;
}

const CustomButton = ({
  className = "",
  onClick,
  label,
  classNameDiv,
  width = 320,
  height = 34,
  fontSize = 20,
  onKeyPress,
}: Props) => {
  return (
    <Gapped vertical gap={7} className={classNameDiv}>
      <button
        style={{ height: height, width: width, fontSize: fontSize }}
        className={cn(className, "custom_button")}
        onClick={onClick}
        onKeyPress={onKeyPress}
      >
        {label}
      </button>
    </Gapped>
  );
};

export default CustomButton;
