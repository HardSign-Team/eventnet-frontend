import React from "react";
import "./index.css";
import { Gapped } from "@skbkontur/react-ui";

type userDataProps = {
  label: string;
  text: string;
};
const UserData: React.FC<userDataProps> = ({ label, text }) => {
  return (
    <Gapped gap={7} vertical className="user-data">
      <p className={"user-data_label"}>{label}</p>
      <div className={"user-data_text"}>{text}</div>
    </Gapped>
  );
};

export default UserData;
