import React, { useState } from "react";
import Logo from "../../shared/Logo/Logo";
import "./Registration.css";
import { CustomInput } from "../../shared/CustomInput/CustomInput";
import CustomButton from "../../shared/CustomButton/CustomButton";
import {
  genders,
  GenderSelector,
} from "../../shared/GenderSelector/GenderSelector";
import { CustomSelectDate } from "../../shared/CustomSelectDate/CustomSelectDate";
import { FormContainer } from "../../shared/FormContainer/FormContainer";
import { registerRequest } from "../../api/auth/registration/registerRequest";

import {
  text,
  ValidationContainer,
  ValidationWrapper,
} from "@skbkontur/react-ui-validations";
import {
  container,
  refContainer,
  registrationValidator,
} from "../../utils/Validators";
import { STATUS_CODES } from "../../api/utils";
import { RegisterModel } from "../../dto/RegisterModel";
import { ModalAcceptRegistration } from "./ModalAcceptRegistration";

export const Registration: React.FC = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [mail, setMail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [dateBirthday, setDateBirthday] = useState("");
  const [gender, setGender] = useState(genders.Male);
  const [isAcceptRegister, setIsAcceptRegister] = useState(false);
  const [isErrorRegister, setIsErrorRegister] = useState(false);

  const registration = async (): Promise<void> => {
    setIsErrorRegister(false);
    if (!container) {
      return;
    }

    if (await container.validate()) {
      const userInfoRegister: RegisterModel = {
        birthDate: dateBirthday.split(".").reverse().join("-"),
        confirmPassword: confirmPassword,
        gender: gender,
        userName: userName,
        email: mail,
        password: password,
      };

      registerRequest(userInfoRegister).then((x) => {
        if (x !== undefined && x.status === STATUS_CODES.OK) {
          setIsAcceptRegister(true);
        } else setIsErrorRegister(true);
      });
    }
  };

  const validator = registrationValidator({
    name: userName,
    email: mail,
    password: password,
    acceptedPassword: confirmPassword,
    born: dateBirthday,
    sex: gender,
  });

  return (
    <div className="registration">
      <Logo className="logo_registration" width={200} height={200} />
      {isAcceptRegister && (
        <ModalAcceptRegistration mail={mail} userName={userName} />
      )}
      {isErrorRegister && (
        <p className="errorMessage">Данные почта или имя уже ипользуются</p>
      )}
      <ValidationContainer ref={refContainer}>
        <FormContainer className="form__registration">
          <ValidationWrapper
            validationInfo={validator.getNode((x) => x.name).get()}
            renderMessage={text("right")}
          >
            <CustomInput
              label="Укажите имя пользователя"
              onChange={setUserName}
              value={userName}
            />
          </ValidationWrapper>
          <ValidationWrapper
            validationInfo={validator.getNode((x) => x.email).get()}
            renderMessage={text("right")}
          >
            <CustomInput
              label="Ваш адрес эл. почты"
              onChange={setMail}
              value={mail}
              type={"mail"}
            />
          </ValidationWrapper>
          <ValidationWrapper
            validationInfo={validator.getNode((x) => x.password).get()}
            renderMessage={text("right")}
          >
            <CustomInput
              type="password"
              label="Придумайте себе пароль"
              onChange={setPassword}
              value={password}
            />
          </ValidationWrapper>
          <ValidationWrapper
            validationInfo={validator.getNode((x) => x).get()}
            renderMessage={text("right")}
          >
            <CustomInput
              type="password"
              label="Подтвердите пароль"
              onChange={setConfirmPassword}
              value={confirmPassword}
            />
          </ValidationWrapper>
          <ValidationWrapper
            validationInfo={validator.getNode((x) => x.born).get()}
            renderMessage={text("right")}
          >
            <CustomSelectDate
              date={dateBirthday}
              label="Введите дату рождения"
              onChange={setDateBirthday}
            />
          </ValidationWrapper>
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
      </ValidationContainer>
    </div>
  );
};
