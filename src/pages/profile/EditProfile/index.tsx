import { Gapped } from "@skbkontur/react-ui";
import React, { Dispatch, SetStateAction, useState } from "react";
import ChangePasswordModal from "../ChangePasswordModal";
import { CustomInput } from "../../../shared/CustomInput/CustomInput";
import { CustomSelectDate } from "../../../shared/CustomSelectDate/CustomSelectDate";
import {
  genders,
  GenderSelector,
} from "../../../shared/GenderSelector/GenderSelector";
import CustomButton from "../../../shared/CustomButton/CustomButton";
import ImageLoader from "../../../shared/ImageLoader/ImageLoader";
import Image from "../../../models/Image";

type EditProfileProps = {
  setUserAvatar: Dispatch<SetStateAction<Image[]>>;
};

const EditProfile: React.FC<EditProfileProps> = ({ setUserAvatar }) => {
  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userGender, setUserGender] = useState(genders.Male);
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
      <ImageLoader
        labelText={"Изменить фото"}
        setImages={setUserAvatar}
        maxImagesCount={1}
        withAdditionalLoading={false}
        style={{ padding: "10px 0 25px" }}
      />
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
        <CustomSelectDate
          date={birthDate}
          label="Дата рождения"
          onChange={setBirthDate}
        />
        <GenderSelector
          value={userGender}
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
