import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import Popup from 'reactjs-popup';
import Eyeicon from '../../assets/icons/eye-fill.svg';
import Eyeofficon from '../../assets/icons/eye-off.svg';
import ErrorWindow from '../elements/ErrorWindow.jsx';
import './Pages.css';

//TODO:
//1)add sendData
//*I removed useRef
//*https://www.geeksforgeeks.org/how-to-create-popup-box-in-reactjs/    => pop up window
export default function Signup () {
    console.log("START signup");
    const URL_SIGNUP = "http://127.0.0.1:3000/api/v1/signup";

    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [badRequest, setBadRequest] = useState("");

    const navigate = useNavigate();

    function receiveInputEmail(e) {
        setEmail(e.target.value);
    }

    function receiveInputPhone(e) {
        setPhone(e.target.value);
    }

    function receiveInputPassword(e) {
        setPassword(e.target.value);
    }

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const sendData = async(e) => {
        e.preventDefault();
        console.log("press submit in registration form");

        const new_user = {
            email: email,
            phone: phone,
            password: password
        };

        const new_user_json = JSON.stringify(new_user);

        console.log("signup_fe new_user: " + new_user_json);

        const response = await fetch(URL_SIGNUP, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: new_user_json,
        });

        console.log(response.status);
        const json = await response.json();
        json["status"] = response.status;

        console.log("signup_fe response: " + json)

        //TODO useContext to save email
        if (response.status === 201) {
            navigate("/signup/verification");
        } else {
            console.log('set bad request message: ' + json["error"]);
            setBadRequest(json["error"]);
        };

        return json;
    }

    const test = (e) => {
        e.preventDefault();
        console.log('hey');
        setBadRequest("Error explanation");
    }

    return (
        <main>
            <h1> Registration form</h1>
            <form id="signup_form">
                <label className="field" htmlFor="email">Email:</label><br></br>
                <input type="email" id="email" name="Email" onChange={receiveInputEmail} autoFocus autoComplete="new-password" required></input>
                <br/><br/>
                <label className="field" htmlFor="phone">Phone:</label><br></br>
                <input type="phone" id="phone" name="Phone" onChange={receiveInputPhone} pattern='(0)\d{9}' required></input>
                <br/><br/>
                <label className="field" htmlFor="password">Password:</label><br></br>
                <input type={(showPassword === true)? "text": "password"} id="password" name="Password" onChange={receiveInputPassword} autoComplete="new-password" required></input>
                <span className='password-eye'>
                    {(showPassword === true)? <img src={Eyeicon} onClick={handleShowPassword}/>:<img src={Eyeofficon} onClick={handleShowPassword}/>}
                </span>
                <br/>
                <span className='span_submit'>
                    <button className="submit" onClick={sendData} type="submit" value="Submit">SUBMIT</button>
                </span>
            </form>

            <div>
                {
                    // badRequest !== "" ? <h1>Thank you</h1> : false
                    badRequest !== "" ? <ErrorWindow message={badRequest} function={setBadRequest}/> : false
                }
            </div>

        </main>
    );
}