import { Gapped, Input } from "@skbkontur/react-ui";
import React, { useState } from "react";
import ChangePasswordModal from "../ChangePasswordModal";
import { CustomInput } from "../../shared/CustomInput/CustomInput";
import { CustomSelectDate } from "../../shared/CustomSelectDate/CustomSelectDate";
import { GenderSelector } from "../../shared/GenderSelector/GenderSelector";
import CustomButton from "../../shared/CustomButton/CustomButton";

const EditProfile = () => {
  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userGender, setUserGender] = useState("");
  const [birthDate, setBirthDate] = useState("");

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
        <CustomInput
          label="Имя пользователя"
          placeholder={"lapakota"}
          value={userName}
          onChange={setUserName}
        />
        <CustomInput
          label="Номер телефона"
          placeholder={"+78005553535"}
          value={userPhone}
          onChange={setUserPhone}
        />
        <CustomSelectDate date={birthDate} label="Дата рождения" onChange={setBirthDate} />
        <GenderSelector
          label="Пол"
          classNameDiv="gender_selector"
          onChange={setUserGender}
        />
        <CustomButton
          classNameDiv={"change-password_button"}
          label={"Изменить пароль"}
          onClick={openModal}
        />
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
