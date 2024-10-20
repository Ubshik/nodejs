import React, { useContext, useState } from 'react';
import TokenContext from '../contexts/TokenContext.js';
import ProfileWindow from '../components/elements/ProfileWindow.jsx';
import './Header.css';

//TODO:
//1)User name should be shown ONLY on dashboard page
//2)Add logout for user
export default function Header() {
    const {token} = useContext(TokenContext);

    const triggerMenu = () => {
        setShowProfile(true);
    }

    return (
        <header>
            <p id="logo">luBANK</p>
            {/* <p id="header-user">
                {
                    token !== null ? <span onClick={triggerMenu}>{curUser.email}</span> : false
                }
            </p>
            <span>
                {
                    showProfile === true ? <ProfileWindow function={setShowProfile}/> : false
                }
            </span> */}


            <p id="header-user">
                {
                    token !== null ? <ProfileWindow /> : false
                }
            </p>
        </header>
    )
}