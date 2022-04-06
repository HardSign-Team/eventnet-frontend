import React from "react";
import "./CustomButton.css";
import { Gapped } from "@skbkontur/react-ui";

interface Props {
  readonly className?: string;
  readonly onClick?: (...rest: any) => void;
  readonly label: string;
  readonly classNameDiv?: string;
  readonly width?: number;
  readonly height?: number;
  readonly fontSize?: number;
}

const CustomButton = ({
  className,
  onClick,
  label,
  classNameDiv,
  width = 320,
  height = 34,
  fontSize = 20,
}: Props) => {
  return (
    <Gapped vertical gap={7} className={classNameDiv} >
      <button
        style={{ height: height, width: width, fontSize: fontSize }}
        className={className ?? "custom_button"}
        onClick={onClick}
      >
        {label}
      </button>
    </Gapped>
  );
};

export default CustomButton;