import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import Logo from './Logo';
import './Header.css';
import avatar from 'assets/avatar.jpg';
const commonLinkStyle = {
    textDecoration: 'none',
    color: '#171f1d',
    display: 'block',
    'text-decoration': 'none'
};

const linkStyle = {
    ...commonLinkStyle,
    margin: 'auto 0',
    padding: '1rem 2rem',
    verticalAlign: 'middle'
};

const linkStyleProfile = {
    ...commonLinkStyle,
    margin: '0 2rem',
    padding: '0'
};

const LOGO_WIDTH: number = window.screen.width / 32;

export default function Header() {
    const [isOpenDropdownMenu, setIsOpenDropdownMenu] = useState<boolean>(false);
    const onMouseOutCapture = () => {
        setIsOpenDropdownMenu(false);
    };

    const onMouseOverCapture = () => {
        setIsOpenDropdownMenu(true);
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
                        <nav className="header__ghost-container-down">
                            <ul className="header_ghosts-container-topmenu">
                                <li>
                                    <figure
                                        className="profile-photo"
                                        onMouseOverCapture={onMouseOverCapture}
                                        onMouseOutCapture={onMouseOutCapture}
                                    >
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
