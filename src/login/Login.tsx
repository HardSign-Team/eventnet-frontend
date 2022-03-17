import React, {useState} from 'react'
import Logo from "../shared/Logo";
import {Gapped, Input, PasswordInput} from "@skbkontur/react-ui";

const Login = () => {
    const [userName, setUserName] = useState();
    const [password, setPassword] = useState();
    const [errors, setErrors] = useState({name:'', password: ''});

    return (<div className="login">
        <Logo className="logo" width={250} height={250} />
        <Gapped gap={30} vertical>
            <div className="userName">Эл.Почта или имя пользователя
            <Input>Логин</Input>
            </div>
            <div className="password"> Пароль
                <PasswordInput>password</PasswordInput>
            </div>
            <div>
                <label>
                    <a className="resetPassword" href=''>Забыли пароль?</a>
                </label>
                <label>
                    <button>Войти</button>
                </label>
            </div>
            <div>
                <a>Нет аккаунта?</a><br/>
                <a href="">Зарегистрироваться</a>
            </div>
        </Gapped>
    </div>)
}
export default Login