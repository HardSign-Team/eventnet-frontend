import React, {useState} from 'react'
import Logo from "../shared/Logo";
import {Gapped, Input, PasswordInput} from "@skbkontur/react-ui";
import './Login.css'

type userInfo = {
    name: string,
    password: string
}

const Login = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({name:'', password: ''});
    const [errorName, setErrorName] = useState(true);
    const [errorPassword, setErrorPassword] = useState(true);
    return (<div className="login">
        <div className="logo-login">
        <Logo className="logo_dess" width={200} height={200} />
        </div>
        <Gapped gap={30} vertical>
            <div className="userName">
                <p>Эл.Почта или имя пользователя</p>
                <Input width={'100%'} onValueChange={(value) => setUserName(value)}>Логин</Input>
            </div>
            <div className="password">
                {errorPassword && <p className='Error'>Неправильный логин или пароль</p>}
                <p>Пароль</p>
                <PasswordInput  detectCapsLock onValueChange={(value) => setPassword(value)} width={320}>password</PasswordInput>
            </div>
            <Gapped gap={5}  className="password_handler">
                <div className="label_helpers_source">
                    <a className="reset_password" href=''>Забыли пароль?</a><br/>
                    <input id = "checked" type="checkbox" className="checked_remember_password"/>
                    <label className='label_checked' htmlFor="checked">Запомнить меня</label>
                </div>
                <div className="label_login_button">
                    <button className="login__button">Войти</button>
                </div>
            </Gapped>
            <div className="registration">
                <a className="not_acc">Нет аккаунта?</a>
                <a className="registration_button" href="">Зарегистрироваться</a>
            </div>
        </Gapped>
    </div>)
}
export default Login