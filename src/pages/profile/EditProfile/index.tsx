import { Gapped } from "@skbkontur/react-ui";
import styles from "./index.module.scss";
import React, { Dispatch, useState } from "react";
import ChangePasswordModal from "../ChangePasswordModal";
import { CustomInput } from "../../../shared/CustomInput/CustomInput";
import { CustomSelectDate } from "../../../shared/CustomSelectDate/CustomSelectDate";
import { GenderSelector } from "../../../shared/GenderSelector/GenderSelector";
import CustomButton from "../../../shared/CustomButton/CustomButton";
import ImageLoader from "../../../shared/ImageLoader/ImageLoader";
import { UserStore } from "../../../stores/UserStore";
import { observer } from "mobx-react-lite";
import { changeInfo } from "../../../api/profile/changeInfo";

type EditProfileProps = {
  userStore: UserStore;
  setEditProfile: Dispatch<boolean>;
};

const EditProfile: React.FC<EditProfileProps> = observer(
  ({ userStore, setEditProfile }) => {
    const [userName, setUserName] = useState(userStore.getUserName());
    const [userGender, setUserGender] = useState(userStore.getGender());
    const [birthDate, setBirthDate] = useState(
      new Date(userStore.getBirthDate()).toLocaleDateString()
    );
    const [isError, setIsError] = useState(false);

    const [modalOpened, setModalOpened] = useState(false);

    const openModal = () => {
      setModalOpened(true);
    };

    const closeModal = () => {
      setModalOpened(false);
    };

    const getDate = (date: string) => {
      const dates = date.split(".");
      return dates[1] + "." + dates[0] + "." + dates[2];
    };

    const saveProfileState = async () => {
      setIsError(false);
      if (await changeInfo(userName, birthDate, userGender)) {
        userStore.setUserName(userName);
        userStore.setGender(userGender);
        userStore.setBirthDate(getDate(birthDate));
        userStore.save();
        setEditProfile(false);
      } else {
        setIsError(true);
      }
    };

    return (
      <>
        {modalOpened && <ChangePasswordModal onClose={closeModal} />}
        <ImageLoader
          labelText={"Изменить фото"}
          setImages={(avatars) => userStore.setImage(avatars[0].url)}
          maxImagesCount={1}
          style={{ padding: "10px 0 25px" }}
        />
        {isError && (
          <p className={styles.errorMessage}>Возникла непредвиденная ошибка</p>
        )}
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
