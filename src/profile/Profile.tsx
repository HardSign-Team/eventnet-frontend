import React, { useState } from 'react';
import avatar from 'assets/avatar.jpg';
import './Profile.css';
import { DateInput, Gapped } from '@skbkontur/react-ui';
import CustomButton from '../shared/CustomButton';
import CustomInput from '../shared/CustomInput';
import UserData from './UserData';

const EditProfile = () => {
    return (
        <Gapped className={'profile_info-wrapper'} gap={15} vertical>
            <CustomInput label="Имя пользователя" placeholder={'lapakota'} />
            <CustomInput label="Почта" placeholder={'stalkerzone955@gmail.com'} />
            <CustomInput label="Номер телефона" placeholder={'+78005553535'} />
            <CustomInput label="Пароль" placeholder={'*********'} />
            <CustomInput label="Подтверждение пароля" />
            <div className="date-input">
                <p className={'custom-input_label'}>Дата рождения</p>
                <DateInput width={320} />
            </div>
        </Gapped>
    );
};

const WatchProfile = () => {
    return (
        <Gapped className={'profile_info-wrapper'} gap={15} vertical>
            <UserData label={'Имя пользователя'} text={'lapakota'} />
            <UserData label={'Почта'} text={'stalkerzone955@gmail.com'} />
            <UserData label={'Номер телефона'} text={'+78005553535'} />
            <UserData label={'Пароль'} text={'*************'} />
            <UserData label={'Дата рождения'} text={'13.06.2001'} />
            <UserData label={'Пол'} text={'Мужчина'} />
        </Gapped>
    );
};

type ProfileProps = {
    userData: undefined;
};

// должен принимать пропсы с данными о пользователе
const Profile = () => {
    const [editing, setEditing] = useState(false);

    const reverseEditing = () => {
        setEditing(!editing);
    };

    return (
        <div className="profile">
            <figure className={'profile_avatar-wrapper'}>
                <img src={avatar} alt="Avatar" className="profile_avatar" />
            </figure>
            {!editing ? (
                <CustomButton onClick={reverseEditing} classNameDiv={'edit-button'} label={'Редактировать'} />
            ) : (
                <button className={'change-avatar_button'} onClick={() => console.log('change-avatar')}>
                    Изменить фото
                </button>
            )}
            {!editing ? <WatchProfile /> : <EditProfile />}
        </div>
    );
};

export default Profile;