import React, { useState } from "react";
import Logo from "../shared/Logo";
import "./Registration.css";
import { Gapped } from "@skbkontur/react-ui";
import { CustomInput } from "../shared/CustomInput/CustomInput";
import CustomButton from "../shared/CustomButton/CustomButton";
import { GenderSelector } from "../shared/GenderSelector/GenderSelector";
import { CustomSelectDate } from "../shared/CustomSelectDate/CustomSelectDate";

const Registration = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [mail, setMail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [acceptedPassword, setAcceptedPassword] = useState("");
  const [dateBirthday, setDateBirthday] = useState("");
  const [gender, setGender] = useState("Male");
  const registration = () => {
    console.log("Registration");
  };

  return (
    <div className="registration">
      <Logo className="logo_registration" width={200} height={200} />
      <Gapped gap={7} vertical className="form__registration">
        <CustomInput label="Ваш адрес эл.почты" onChange={setMail} />
        <CustomInput
          type="password"
          label="Придумайте себе пароль"
          onChange={setPassword}
        />
        <CustomInput
          type="password"
          label="Подтвердите пароль"
          onChange={setAcceptedPassword}
        />
        <CustomInput label="Введите номер телефона" onChange={setPhoneNumber} />
        <CustomInput label="Укажите имя пользователя" onChange={setUserName} />
        <CustomSelectDate
          date={dateBirthday}
          label="Введите дату рождения"
          onChange={setDateBirthday}
        />
        <GenderSelector
          label="Укажите свой пол"
          classNameDiv="gender_selector"
          onChange={setGender}
        />
        <CustomButton
          onClick={registration}
          classNameDiv="label_button"
          className="registration_button"
          label="Зарегистрироваться"
        />
      </Gapped>
    </div>
  );
};

export default Registration;
