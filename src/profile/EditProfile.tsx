import { Gapped } from "@skbkontur/react-ui";
import CustomInput from "../shared/CustomInput";
import CustomSelectDate from "../shared/CustomSelectDate";
import GenderSelector from "../shared/GenderSelector";
import React from "react";

const EditProfile = () => {
  return (
    <Gapped className={"profile_info-wrapper"} gap={7} vertical>
      <CustomInput label="Имя пользователя" placeholder={"lapakota"} />
      <CustomInput label="Почта" placeholder={"stalkerzone955@gmail.com"} />
      <CustomInput label="Номер телефона" placeholder={"+78005553535"} />
      <CustomInput label="Пароль" placeholder={"*********"} />
      <CustomInput label="Подтверждение пароля" />
      <CustomSelectDate label="Дата рождения" />
      <GenderSelector label="Пол" classNameDiv="gender_selector" />
    </Gapped>
  );
};

export default EditProfile;