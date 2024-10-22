import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CurrentUserContext from '../../contexts/CurrentUserContext.js';
import TokenContext from '../../contexts/TokenContext.js';
import ErrorWindow from '../elements/ErrorWindow.jsx';
import SuccessWindowRedirect from '../elements/SuccessWindowRedirect.jsx';
import Eyeicon from '../../assets/icons/eye-fill.svg';
import Eyeofficon from '../../assets/icons/eye-off.svg';
import './Pages.css';

export default function Login () {
    console.log("START login");
    const URL_LOGIN = "http://127.0.0.1:3000/api/v1/login";

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [successResponse, setSuccessResponse] = useState(false);
    const [badRequest, setBadRequest] = useState("");
    const {setCurUser} = useContext(CurrentUserContext);
    const {setToken} = useContext(TokenContext);

    const navigate = useNavigate();

    function receiveInputEmail(e) {
        setEmail(e.target.value);
    }

    function receiveInputPassword(e) {
        setPassword(e.target.value);
    }

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const linkToSignUp = () => {
        navigate("/signup");
    }

    const sendData = async(e) => {
        e.preventDefault();
        console.log("press submit in login form");

        const user_login = {
            email: email,
            password: password
        };

        const user_login_json = JSON.stringify(user_login);

        console.log("login_fe user_login: " + user_login_json);

        const response = await fetch(URL_LOGIN, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: user_login_json,
        });

        console.log(response.status);
        const json = await response.json();
        json["status"] = response.status;

        console.log("login_fe response: " + json)

        if (response.status === 200) {
            console.log('login is succeed: ' + json["token"]);
            setCurUser({email: email});
            setToken({token: json["token"]});
            setSuccessResponse(true);
        } else {
            console.log('set bad request message: ' + json["error"]);
            setBadRequest(json["error"]);
        };

        return json;
    }

    function greeting() {
        const today = new Date();
        const curHr = today.getHours();

        if (curHr >= 23 || curHr < 5) {
            return 'Good night, ';
        } else if (curHr < 12) {
            return 'Good morning, ';
        } else if (curHr < 17) {
            return 'Good afternoon, ';
        } else {
            return 'Good evening, ';
        }
    }

    function getEmail() {
        return email;
    }

    return (
        <main>
            <h1> Log in</h1>
            <form id="login_form">
                <label className="field" htmlFor="email">Email:</label><br></br>
                <input type="email" id="email" name="Email" onChange={receiveInputEmail} autoComplete="new-password" autoFocus required></input>
                <br/><br/><br/>
                <label className="field" htmlFor="password">Password:</label><br></br>
                <input type={(showPassword === true)? "text": "password"} id="password" name="Password" onChange={receiveInputPassword} autoComplete="new-password" required></input>
                <span className='password-eye'>
                    {(showPassword === true)? <img src={Eyeicon} onClick={handleShowPassword}/>:<img src={Eyeofficon} onClick={handleShowPassword}/>}
                </span>
                <span>
                    <a id="link_sign_up" onClick={linkToSignUp}>sign up</a>
                </span>
                <br/>
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
                    successResponse === true ? <SuccessWindowRedirect message={greeting()} navigateTo='/dashboard' greeting /> : false
                }
            </div>
        </main>
    )
}