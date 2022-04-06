import { Gapped } from "@skbkontur/react-ui";
import { useState } from "react";
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
    <Gapped className={"profile_info-wrapper"} gap={7} vertical>
      {modalOpened && <ChangePasswordModal onClose={closeModal} />}
      <CustomInput label="Имя пользователя" placeholder={"lapakota"} />
      <CustomInput label="Почта" placeholder={"stalkerzone955@gmail.com"} />
      <CustomInput label="Номер телефона" placeholder={"+78005553535"} />
      <CustomInput
        label="Пароль"
        placeholder={"*********"}
        onFocus={openModal}
      />
      <CustomSelectDate date="" label="Дата рождения" onChange={setDate} />
      <GenderSelector label="Пол" classNameDiv="gender_selector" />
      <CustomButton
        onClick={saveProfileState}
        classNameDiv={"save_button"}
        label={"Сохранить"}
        height={36}
      />
    </Gapped>
  );
};

export default EditProfile;
