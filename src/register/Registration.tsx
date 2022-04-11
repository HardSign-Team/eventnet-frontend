import React, { useState } from "react";
import Logo from "../shared/Logo";
import "./Registration.css";
import { CustomInput } from "../shared/CustomInput/CustomInput";
import CustomButton from "../shared/CustomButton/CustomButton";
import { genders, GenderSelector } from '../shared/GenderSelector/GenderSelector';
import { CustomSelectDate } from "../shared/CustomSelectDate/CustomSelectDate";
import { FormContainer } from '../shared/FormContainer/FormContainer';

const Registration = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [mail, setMail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [acceptedPassword, setAcceptedPassword] = useState("");
  const [dateBirthday, setDateBirthday] = useState("");
  const [gender, setGender] = useState(genders.Female);
  const registration = () => {
    console.log("Registration");
  };

  return (
    <div className="registration">
      <Logo className="logo_registration" width={200} height={200} />
      <FormContainer className="form__registration">
        <CustomInput
          label="Укажите имя пользователя"
          onChange={setUserName}
          value={userName}
        />
        <CustomInput
          label="Ваш адрес эл. почты"
          onChange={setMail}
          value={mail}
          type={"mail"}
        />
        <CustomInput
          type="password"
          label="Придумайте себе пароль"
          onChange={setPassword}
          value={password}
        />
        <CustomInput
          type="password"
          label="Подтвердите пароль"
          onChange={setAcceptedPassword}
          value={acceptedPassword}
        />
        <CustomInput
          label="Введите номер телефона"
          onChange={setPhoneNumber}
          value={phoneNumber}
          type={"phoneNumber"}
        />
        <CustomSelectDate
          date={dateBirthday}
          label="Введите дату рождения"
          onChange={setDateBirthday}
        />
        <GenderSelector
          label="Укажите свой пол"
          classNameDiv="gender_selector"
          onChange={() => setGender(gender)}
          value={gender}
        />
        <CustomButton
          onClick={registration}
          classNameDiv="label_button"
          className="registration_button"
          label="Зарегистрироваться"
        />
      </FormContainer>
    </div>
  );
};

export default Registration;
