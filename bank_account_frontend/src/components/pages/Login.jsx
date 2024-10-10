import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Pages.css';


//TODO 
//2)send request: + => redirect to user page or - => stay here + incorrect data
//4)check useRef => remove
//5)if success => welcome, UserName => redirect to dashboard, 
//6)if fail => show a rectangle with a message => reload this page
export default function Login () {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function receiveInputEmail(e) {
        setEmail(e.target.value);
    }

    function receiveInputPassword(e) {
        setPassword(e.target.value);
    }

    const navigate = useNavigate();

    function linkToSignUp() {
        navigate("/signup");
    }

    const formRef = useRef();

    const sendData = (e) => {
        console.log("press submit in login form");
        return null;
    }

    return (
        <main>
            <h1> Log in</h1>
            <form id="login_form" onSubmit={sendData} ref={formRef}>
                <label className="field" htmlFor="email">Email:</label><br></br>
                <input type="email" id="email" name="Email" onChange={receiveInputEmail} autoFocus required></input>
                <br></br><br></br><br></br>
                <label className="field" htmlFor="password">Password:</label><br></br>
                <input type="password" id="password" name="Password" onChange={receiveInputPassword} required></input><br></br>
                <span>
                    <a id="link_sign_up" onClick={linkToSignUp}>sign up</a>
                </span>
                <br></br><br></br><br></br>
                <span className='span_submit'>
                    <button className="submit" type="submit" value="Submit">SUBMIT</button>
                </span>
            </form>
        </main>
    )
}






// import React, { useRef } from 'react';
// import '../../App.css';
// import '../AddProduct.css';
// import { useNavigate } from 'react-router-dom';

// export default function AddProduct() {
//   const URL_REGISTER_PRODUCT = "http://127.0.0.1:4466/product";
//   const URL_REGISTER_PRODUCT_COMMON = 'product';

//   console.log("inside add product");

//   const navigate = useNavigate();

//   function getGatewayURI(path) {
//     return `${document.location.protocol}//${document.location.hostname}:4466/${path || ''}`;
//   }

//   const formRef = useRef();

//   const sendData = async (e) => {
//     e.preventDefault();
//     console.log("inside sendData");
//     let formData = new FormData(formRef.current);
//     let requestJson = JSON.stringify(Object.fromEntries(formData));
//     console.log("request json " + requestJson);
//     console.log("company_id " + localStorage.getItem("company_id"));

//     const response  = await fetch(getGatewayURI(URL_REGISTER_PRODUCT_COMMON + "/" + localStorage.getItem("company_id")), {
//         method: "POST",
//         body: requestJson,
//     });
//     console.log(response.status);
//     const json = await response.json();
//     json["status"] = response.status;

//     if (response.status === 201) {
//       navigate("/success");
//     } else {
//       navigate("/fail");
//     };

//     return json;
// };