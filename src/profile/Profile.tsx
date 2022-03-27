import React from 'react';
import avatar from '../assets/avatar.jpg';
import './Profile.css';
import {DateInput, Gapped} from "@skbkontur/react-ui";
import CustomButton from "../shared/CustomButton";
import CustomInput from "../shared/CustomInput";

export default function Profile(){
    return (
        <div className="profile">
            <figure className={'profile_avatar-wrapper'}>
                <img src={avatar} alt="Avatar" className="profile_avatar" />
            </figure>
            <CustomButton classNameDiv={'edit-button'} label={'Редактировать'} />
            <Gapped className={'profile_info-wrapper'} gap={15} vertical>
                <CustomInput label='Имя пользователя'/>
                <CustomInput label='Почта'/>
                <CustomInput label='Номер телефона'/>
                <CustomInput label='Пароль'/>
                <div className='date-input'>
                    <p className={'custom-input_label'}>Дата рождения</p>
                    <DateInput width={320}/>
                </div>
                <div className='sex_registration'>
                    <p className={'custom-input_label'}>Пол</p>
                    <div className='change_sex'>
                        <span className='male_sex'>
                            <input type='checkbox'/>
                            Мужчина
                        </span>
                        <span className='female_sex'>
                            <input type='checkbox'/>
                            Женщина
                        </span>
                    </div>
                </div>
            </Gapped>
        </div>
    )
}