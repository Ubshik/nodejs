import React, { useState, useContext } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext.js';
import ErrorWindow from '../elements/ErrorWindow.jsx';
import SuccessWindowRedirect from '../elements/SuccessWindowRedirect.jsx';
import './Pages.css';

export default function Verification () {
    console.log("START signup/verification");
    const URL_SIGNUP = "http://127.0.0.1:3000/api/v1/signup/verification";

    const [code, setCode] = useState("");
    const [badRequest, setBadRequest] = useState("");
    const [successResponse, setSuccessResponse] = useState("");
    const {curUser} = useContext(CurrentUserContext);
    const {setCurUser} = useContext(CurrentUserContext);

    function receiveInputCode(e) {
        setCode(e.target.value);
    }

    const sendData = async(e) => {
        e.preventDefault();
        console.log("press submit in signup/verification form");

        const user_data = {
            email: curUser.email,
            code: parseInt(code, 10)
        };

        const user_data_json = JSON.stringify(user_data);

        console.log("signup/verification_fe user_data: " + user_data_json);

        const response = await fetch(URL_SIGNUP, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: user_data_json,
        });

        console.log(response.status);
        const json = await response.json();
        json["status"] = response.status;

        console.log("signup/verification_fe response: " + json)

        if (response.status === 200) {
            console.log('verification is succeed');
            setCurUser(null);
            setSuccessResponse(json["message"]);
        } else {
            console.log('set bad request message: ' + json["error"]);
            setBadRequest(json["error"]);
        };

        return json;
    }

    return (
        <main>
            <h1> Email verification</h1>
            <div className='comment_container'>
                <p className='comment'>Please check your email.</p>
                <p className='comment'>Fill cells by 6-digit number.</p>
            </div>
            <form id="verification_form">
                <input type="text" id="code" name="Code" onChange={receiveInputCode} maxLength='6' autoFocus required></input>
                <br/><br/><br/>
                <span className='span_submit'>
                    <button className="submit" onClick={sendData} type="submit" value="Submit">SUBMIT</button>
                </span>
            </form>

            <div>
                {
                    badRequest !== "" ? <ErrorWindow message={badRequest} resetBadRequest={setBadRequest}/> : false
                }
            </div>

            <div>
                {
                    successResponse !== "" ? <SuccessWindowRedirect message={successResponse} navigateTo="/"/> : false
                }
            </div>
        </main>
    )
}