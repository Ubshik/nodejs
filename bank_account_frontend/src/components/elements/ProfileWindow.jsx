import { useNavigate } from 'react-router-dom';
import React, { useContext, useState } from 'react';
import Popup from 'reactjs-popup';
import CurrentUserContext from '../../contexts/CurrentUserContext.js';
import TokenContext from '../../contexts/TokenContext.js';
import './ProfileWindow.css';


function ProfileWindow(props) {
    const {curUser} = useContext(CurrentUserContext);
    const {setCurUser} = useContext(CurrentUserContext);
    const {setToken} = useContext(TokenContext);

    const navigate = useNavigate();

    const logout = () => {
        setCurUser(null);
        setToken(null);
        navigate('/');
    }

    return (
            <Popup trigger={<p> {curUser.email} </p>} nested>
            {
                close => (
                    <div className='modal'>
                        <div>
                            <button className='popup_button' onClick={logout}>
                                    Logout
                            </button>
                        </div>
                    </div>
                )
            }
        </Popup>
    )
}

export default ProfileWindow;