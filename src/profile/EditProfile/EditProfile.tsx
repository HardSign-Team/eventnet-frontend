import { Gapped, Input } from "@skbkontur/react-ui";
import React, { useState } from "react";
import ChangePasswordModal from "../ChangePasswordModal";
import { CustomInput } from "../../shared/CustomInput/CustomInput";
import { CustomSelectDate } from "../../shared/CustomSelectDate/CustomSelectDate";
import { GenderSelector } from "../../shared/GenderSelector/GenderSelector";
import CustomButton from "../../shared/CustomButton/CustomButton";

const EditProfile = () => {
  const [date, setDate] = useState("");
  const [modalOpened, setModalOpened] = useState(false);

  const openModal = () => {
    setModalOpened(true);
  };

  const closeModal = () => {
    setModalOpened(false);
  };

  const saveProfileState = () => {
    console.log("saving");
  };

  return (
    <>
      {modalOpened && <ChangePasswordModal onClose={closeModal} />}
      <Gapped className={"profile_info-wrapper"} gap={7} vertical>
        <CustomInput label="Имя пользователя" placeholder={"lapakota"} />
        <CustomInput label="Почта" placeholder={"stalkerzone955@gmail.com"} />
        <CustomInput label="Номер телефона" placeholder={"+78005553535"} />
        <Gapped vertical gap={7}>
          <p className={"custom-input_label"}>Пароль</p>
          <CustomButton
            classNameDiv={"change-password_button"}
            label={"Изменить"}
            width={160}
            onClick={openModal}
          />
        </Gapped>
        <CustomSelectDate date="" label="Дата рождения" onChange={setDate} />
        <GenderSelector label="Пол" classNameDiv="gender_selector" />
        <CustomButton
          onClick={saveProfileState}
          classNameDiv={"save_button"}
          label={"Сохранить"}
          height={36}
        />
      </Gapped>
    </>
  );
};

export default EditProfile;
