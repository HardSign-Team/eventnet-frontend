import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './main/Main';
import Registration from './register/Registration';
import Profile from './profile/Profile';
import Login from './login/Login';
import './App.css';
import Header from './shared/Header';

export default function App() {
    return (
        <Router>
            <div>
                <Header />
                <Routes>
                    <Route path="/register" element={<Registration />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<Main />} />
                </Routes>
            </div>
        </Router>
    );
}
