import { Gapped } from "@skbkontur/react-ui";
import React, { useState } from "react";
import ChangePasswordModal from "../ChangePasswordModal";
import { CustomInput } from "../../../shared/CustomInput/CustomInput";
import { CustomSelectDate } from "../../../shared/CustomSelectDate/CustomSelectDate";
import { GenderSelector } from "../../../shared/GenderSelector/GenderSelector";
import CustomButton from "../../../shared/CustomButton/CustomButton";
import ImageLoader from "../../../shared/ImageLoader/ImageLoader";
import { UserStore } from "../../../stores/UserStore";
import { observer } from "mobx-react-lite";

type EditProfileProps = {
  userStore: UserStore;
  setUserAvatar: (val: string) => void;
};

const EditProfile: React.FC<EditProfileProps> = observer(
  ({ userStore, setUserAvatar }) => {
    const [userName, setUserName] = useState(userStore.getUserName());
    const [userGender, setUserGender] = useState(userStore.getGender());
    const [birthDate, setBirthDate] = useState(
      new Date(userStore.getBirthDate()).toLocaleDateString()
    );

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
          setImages={(avatars) => setUserAvatar(avatars[0].url)}
          maxImagesCount={1}
          style={{ padding: "10px 0 25px" }}
        />
        <Gapped className={"profile_info-wrapper"} gap={7} vertical>
          <CustomInput
            label="Имя пользователя"
            placeholder={"lapakota"}
            value={userName}
            onChange={setUserName}
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
  }
);

export default EditProfile;
