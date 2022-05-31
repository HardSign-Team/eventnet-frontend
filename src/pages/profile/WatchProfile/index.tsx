import UserData from "../UserData";
import React from "react";
import { observer } from "mobx-react-lite";
import { UserStore } from "../../../stores/UserStore";
import { FormContainer } from "../../../shared/FormContainer/FormContainer";

interface PropsWatchProfile {
  userStore: UserStore;
}

const WatchProfile: React.FC<PropsWatchProfile> = observer(({ userStore }) => {
  return (
    <FormContainer className={"profile_info-wrapper"}>
      <UserData label={"Имя пользователя"} text={userStore.getUserName()} />
      <UserData label={"Почта"} text={userStore.getEmail()} />
      <UserData
        label={"Дата рождения"}
        text={new Date(userStore.getBirthDate()).toLocaleDateString()}
      />
      <UserData
        label={"Пол"}
        text={userStore.getGender() === "Male" ? "Мужчина" : "Женщина"}
      />
    </FormContainer>
  );
});

export default WatchProfile;
