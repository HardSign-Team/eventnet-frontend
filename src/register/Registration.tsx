import React from 'react'
import Logo from '../shared/Logo';
import './Registration.css'
import { DateInput, Gapped } from '@skbkontur/react-ui';
import CustomInput from '../shared/CustomInput';
import CustomButton from '../shared/CustomButton';
import GenderSelector from '../shared/GenderSelector';

const Registration = () => {
    const registration = () => {
        console.log(1323)
    }
    return (
        <div className="registration">
            <Logo className="logo_registration" width={200} height={200} />
            <Gapped gap={15} vertical className="form__registration">
                <CustomInput label='Ваш адрес эл.почты'/>
                <CustomInput label='Придумайте себе пароль'/>
                <CustomInput label='Подтвердите пароль'/>
                <CustomInput label='Введите номер телефона'/>
                <CustomInput label='Укажите  имя пользователя'/>
                <div className='date_registration'>
                    <p>Введите дату рождения</p>
                    <DateInput/>
                </div>
                <GenderSelector label="Укажите свой пол" classNameDiv="gender_selector"/>
                <CustomButton onClick={registration} classNameDiv="label_button"  className="registration_button" label="Зарегистрироваться"/>
            </Gapped>
        </div>
    )
}

export default Registration