import { Link } from "react-router-dom";
import React from "react";
import Logo from "../Logo/Logo";
import "./Header.scss";
import { UserStore } from "../../stores/UserStore";
import { observer } from "mobx-react-lite";
import { logoutRequest } from "../../api/auth/logout";

const LOGO_WIDTH: number = window.screen.width / 32;

interface HeaderProps {
  userStore: UserStore;
}

const Header: React.FC<HeaderProps> = observer(({ userStore }) => {
  const logout = async () => {
    if (await logoutRequest()) userStore.logout();
  };

  return (
    <header>
      <Link to="/">
        <div className="logo-with-name">
          <Logo className="logo" width={LOGO_WIDTH} height={LOGO_WIDTH} />
          <span className="logo-name">
            event<span className="logo-name-end">net</span>
          </span>
        </div>
      </Link>
      <nav className="nav navbar">
        <ul className="routes-list">
          <li className="route">
            <nav className="header__menu-down">
              <ul className="header_topmenu-container">
                <li>
                  <figure className="header__profile-photo">
                    <img
                      src={userStore.getImage()}
                      alt="Avatar"
                      className="avatar"
                    />
                  </figure>{" "}
                  {userStore.getIsAuth() ? (
                    <ul className="header__submenu-container">
                      <li>
                        <Link to={"/profile"}>Профиль</Link>
                      </li>
                      <li>
                        <Link to={"/user-events"}>События</Link>
                      </li>
                      <li>
                        <Link to={"/user-subscriptions"}>Подписки</Link>
                      </li>
                      <li>
                        <Link to={"/"} onClick={logout}>
                          Выйти
                        </Link>
                      </li>
                    </ul>
                  ) : (
                    <ul className="header__submenu-container">
                      <li>
                        <Link to={"/login"}>Войти</Link>
                      </li>
                    </ul>
                  )}
                </li>
              </ul>
            </nav>
          </li>
        </ul>
      </nav>
    </header>
  );
});

export default Header;
