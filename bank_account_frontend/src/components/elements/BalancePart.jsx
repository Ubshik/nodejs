import React, { useContext, useState } from 'react';
import TokenContext from '../../contexts/TokenContext.js';
import CurrentUserContext from '../../contexts/CurrentUserContext.js';
import ErrorWindow from './ErrorWindow.jsx';
import SuccessWindow from './SuccessWindow.jsx';
import '../pages/Dashboard.css';

function BalancePart (props) {
    console.log("START balance_part");
    const URL_TRANSACTION = "http://localhost:3000/api/v1/transaction";

    const [email, setEmail] = useState("");
    const [amount, setAmount] = useState("");
    const [successResponse, setSuccessResponse] = useState("");
    const [badRequest, setBadRequest] = useState("");
    const {token} = useContext(TokenContext);
    const {curUser} = useContext(CurrentUserContext);

    function receiveInputEmail(e) {
        setEmail(e.target.value);
    }

    function receiveInputAmount(e) {
        setAmount(e.target.value);
    }

    const sendData = async(e) => {
        e.preventDefault();
        console.log("press submit in transaction form");

        const transaction_data = {
            addressee: email,
            amount: parseFloat(amount.replace(",", "."))
        };

        const transaction_data_json = JSON.stringify(transaction_data);

        console.log("dashboard_fe transaction_data: " + transaction_data_json);

        const response = await fetch(URL_TRANSACTION, {
            method: "POST",
            headers: {
                'Authorization': 'Bearer ' + token?.token,
                'Content-Type': 'application/json'
            },
            body: transaction_data_json,
        });

        console.log(response.status);
        const json = await response.json();
        json["status"] = response.status;

        console.log("transaction_fe response: " + json)

        if (response.status === 200) {
            props.markTransactionsuccess(true);
            setEmail("");
            setAmount("");
            setSuccessResponse(json["message"]);
        } else {
            console.log('set bad request message: ' + json["error"]);
            setBadRequest(json["error"]);
        };

        return json;
    }

    return (
        <>

            <div className='balance_column'>
            <div className='balance_container'>
                <h1 className='h1_middle'>Balance: </h1>
                {/* <h1 id='balance_amount'>{props?.data?.balance}</h1> */}
                <h1 id='balance_amount'>{curUser.balance}</h1>
            </div>

            <h1 className='h1_little transaction_tab'> Cash transfer:</h1>
            <form id="transaction_form" >
                <label className="field transaction_tab" htmlFor="email">Beneficiary (email):</label><br></br>
                <input className='transaction_tab' type="email" id="email" name="Email" onChange={receiveInputEmail} value={email} autoFocus required></input>
                <br/><br/>
                <label className="field transaction_tab" htmlFor="amount">Amount:</label><br></br>
                <input className='transaction_tab' type="text" id="amount" name="Amount" onChange={receiveInputAmount} value={amount} required></input>
                <br/><br/>
                <span className='submit_transaction transaction_tab'>
                    <button className="submit" onClick={sendData} type="submit" value="Submit">SUBMIT</button>
                </span>
            </form>

            <div>
                {
                    badRequest !== "" ? <ErrorWindow message={badRequest} resetBadRequest={setBadRequest} transaction /> : false
                }
            </div>

            <div>
                {
                    successResponse !== "" ? <SuccessWindow message={successResponse} resetSuccessResponse={setSuccessResponse} transaction /> : false
                }
            </div>

            </div>
        </>
    )
}

export default BalancePart;