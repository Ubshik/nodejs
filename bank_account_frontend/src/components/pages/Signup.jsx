import React, { useState } from 'react';
import './Pages.css';

//TODO:
//1)add sendData
//2)add email validation
//3)add phone validation
//4)add password validation
//5)you can validate when all form is filled
//*I removed useRef
export default function Signup () {
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");

    function receiveInputEmail(e) {
        setEmail(e.target.value);
    }

    function receiveInputPhone(e) {
        setPhone(e.target.value);
    }

    function receiveInputPassword(e) {
        setPassword(e.target.value);
    }

    const sendData = (e) => {
        console.log("press submit in registration form");
        return null;
    }

    return (
        <main>
            <h1> Registration form</h1>
            <form id="signup_form" onSubmit={sendData}>
                <label className="field" htmlFor="email">Email:</label><br></br>
                <input type="email" id="email" name="Email" onChange={receiveInputEmail} autoFocus required></input>
                <br/><br/>
                <label className="field" htmlFor="phone">Phone:</label><br></br>
                <input type="phone" id="phone" name="Phone" onChange={receiveInputPhone} required></input>
                <br/><br/>
                <label className="field" htmlFor="password">Password:</label><br></br>
                <input type="password" id="password" name="Password" onChange={receiveInputPassword} required></input><br></br>
                <br/>
                <span className='span_submit span_submit_signup'>
                    <button className="submit" type="submit" value="Submit">SUBMIT</button>
                </span>
            </form>
        </main>
    )
}