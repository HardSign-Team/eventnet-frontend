import styles from "./FormContainer.module.scss";
import { Gapped } from "@skbkontur/react-ui";
import React from "react";

interface Props {
  children: React.ReactNode;
  height?: number;
  className?: string
}

export const FormContainer: React.FC<Props> = ({ children, height, className }) => {
  return (
      <Gapped gap={height ?? 7} vertical className={className ?? styles.root}>
        {children}
      </Gapped>
  );
};
