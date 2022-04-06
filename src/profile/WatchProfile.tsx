import { Gapped } from "@skbkontur/react-ui";
import UserData from "./UserData";
import React from "react";

const WatchProfile = () => {
  return (
    <Gapped className={"profile_info-wrapper"} gap={7} vertical>
      <UserData label={"Имя пользователя"} text={"lapakota"} />
      <UserData label={"Почта"} text={"stalkerzone955@gmail.com"} />
      <UserData label={"Номер телефона"} text={"+78005553535"} />
      <UserData label={"Дата рождения"} text={"13.06.2001"} />
      <UserData label={"Пол"} text={"Мужчина"} />
    </Gapped>
  );
};

export default WatchProfile;