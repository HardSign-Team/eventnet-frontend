import React, {useState} from 'react'
import Logo from "../shared/Logo";
import {Gapped, Input, PasswordInput} from "@skbkontur/react-ui";
import './Login.css'
import CustomButton from '../shared/CustomButton';
import CustomInput from '../shared/CustomInput';

type userInfo = {
    username: string,
    password: string
}

type errors = {
    name: string,
    password: string
}

const Login = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({name:'', password: ''});
    const [errorName, setErrorName] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);
    const [userInfo, setUserInfo] = useState({})
    const login = () => {
        return ''

    }

    const checkLogin = (userName: string, password: string) => {
        const user: userInfo = { username: userName, password: password }
        fetch('http://localhost:5203/swagger/v1/swagger.json', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify(user)
        }).then(res => res.json())
            .then((data) =>{
                console.log(data)
                setUserInfo(data)})
            .catch((errors) => {
                setErrors(errors)
                console.log(errors)
            })
    }

    return (<div className="login">
        <div className="logo-login">
            <Logo className="logo_dess" width={200} height={200} />
        </div>
        <Gapped gap={7} vertical>
            <CustomInput label="Эл. Почта или имя пользователя" onChange={setUserName}/>
            {(errorPassword || errorName) && <p className='Error'>Неправильный логин или пароль</p>}
            <CustomInput label='Пароль' onChange={setPassword} type='password' />
            <div  className="password_handler">
                <div className="label_helpers_source">
                    <a className="reset_password" href=''>Забыли пароль?</a><br/>
                    <div className='remember_password'>
                        <input id = "checked" type="checkbox" className="checked_remember_password"/>
                        <label className='label_checked' htmlFor="checked">Запомнить меня</label>
                    </div>
                </div>
                <CustomButton label="Войти" className='login__button' onClick={() => checkLogin(userName, password)}
                              classNameDiv="label_login_button"/>
            </div>
            <div className="change_to_registration">
                <a className="not_acc">Нет аккаунта?</a>
                <a className="change_rout_to_registration" href="">Зарегистрироваться</a>
            </div>
        </Gapped>
    </div>)
}

export default Login