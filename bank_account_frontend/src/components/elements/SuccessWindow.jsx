import React, { useContext } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext.js';
import './ErrorWindow.css';

function SuccessWindow(props) {
    const {curUser} = useContext(CurrentUserContext);

    function getEmail() {
        return curUser.email;
    }

    return (
        <div className={props.transaction ? 'popup_window success_window transaction_position' : 'popup_window success_window'}>
            <div className={props.greeting ? 'popup_title_greeting' : 'popup_title_success'}>
                {props.message}
            </div>

            <div className='popup_content'>
                {
                    props.greeting ? getEmail() : false
                }
            </div>

            <div>
                <button className='submit popup_button' onClick={() => props.resetSuccessResponse("")}>
                    OK
                </button>
            </div>
        </div>
    )
}

export default SuccessWindow;