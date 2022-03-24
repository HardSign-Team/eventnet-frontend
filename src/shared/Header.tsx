import { Link } from 'react-router-dom';
import React from 'react';
import Logo from './Logo';
import './Header.css';
import avatar from 'assets/avatar.jpg';

const commonLinkStyle = {
    textDecoration: 'none',
    color: '#171f1d',
    display: 'block',
    "text-decoration": 'none'
}


const linkStyle = {
    ...commonLinkStyle,
    margin: 'auto 0',
    padding: '1rem 2rem',
    verticalAlign: 'middle'
};

const linkStyleProfile = {
    ...commonLinkStyle,
    margin: '0 2rem',
    padding: '0',
};

const LOGO_WIDTH: number = window.screen.width / 32;

export default function Header() {
    return (
        <header>
            <div className="logo-with-name">
                <Logo className="logo" width={LOGO_WIDTH} height={LOGO_WIDTH} />
                <span className="logo-name">
                    event<span className="logo-name-end">net</span>
                </span>
            </div>
            <nav className="nav navbar">
                <ul className="routes-list">
                    <li className="route">
                        <Link to="/" style={linkStyle}>
                            Home
                        </Link>
                    </li>
                    <li className="route">
                        <Link to="/register" style={linkStyle}>
                            Registration
                        </Link>
                    </li>
                    <li className="route">
                        <Link to="/login" style={linkStyle}>
                            Login
                        </Link>
                    </li>
                    <li className="route">
                        <Link to="/profile" style={linkStyleProfile}>
                            <figure>
                                <img src={avatar} alt="Avatar" className="avatar" />
                            </figure>
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
