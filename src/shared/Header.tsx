import { Link } from 'react-router-dom';
import React from 'react';
import Logo from './Logo';
import './Header.css';
import avatar from '../assets/avatar.jpg';


const LOGO_WIDTH: number = window.screen.width / 32;

export default function Header() {
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
                        <nav className="header__ghost-container-down">
                            <ul className="header_ghosts-container-topmenu">
                                <li>
                                    <figure className="profile-photo">
                                        <img src={avatar} alt="Avatar" className="avatar" />
                                    </figure>
                                    <ul className="header__ghosts-container-submenu">
                                        <li>
                                            <Link to={'/profile'}>Профиль</Link>
                                        </li>
                                        <li>
                                            <Link to={'/login'}>LogOut</Link>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </nav>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
