import React, { useState, useContext } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext.js';
import './Pages.css';

//TODO
//1)add validation for 6 numbers
//2)implement sendData 
export default function Verification () {
    const {curUser} = useContext(CurrentUserContext);
    const [code, setCode] = useState("");

    console.log("context: " + curUser.email);

    function receiveInputCode(e) {
        setCode(e.target.value);
    }

    const sendData = (e) => {
        console.log("press submit verification form");
        return null;
    }

    return (
        <main>
            <h1> Email verification</h1>
            <div className='comment_container'>
                <p className='comment'>Please check your email.</p>
                <p className='comment'>Fill cells by 6-digit number.</p>
            </div>
            <form id="verification_form" onSubmit={sendData}>
                <input type="text" id="code" name="Code" onChange={receiveInputCode} maxLength='6' autoFocus required></input>
                <br></br><br></br><br></br>
                <span className='span_submit'>
                    <button className="submit" type="submit" value="Submit">SUBMIT</button>
                </span>
            </form>
        </main>
    )
}