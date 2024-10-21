import React, { useContext, useState, useEffect } from 'react';
import TokenContext from '../../contexts/TokenContext.js';
import ErrorWindow from './ErrorWindow.jsx';
import SuccessWindow from './SuccessWindow.jsx';
import '../pages/Dashboard.css';

//TODO
//2)update table if a transaction was succesed
//3)implement pagination
//4)add table with result data
//*https://github.com/chelmerrox/react-data-table-tutorial/blob/main/src/components/Table.tsx
//*https://www.freecodecamp.org/news/create-tables-using-the-react-datatable-component-library/
function TransactionTable (props) {
    console.log("START balance_part");
    const URL_TRANSACTION = "http://localhost:3000/api/v1/transaction";

    const [email, setEmail] = useState("");
    const [amount, setAmount] = useState("");
    const [successResponse, setSuccessResponse] = useState("");
    const [badRequest, setBadRequest] = useState("");
    const {token} = useContext(TokenContext);

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
            setSuccessResponse(json["message"]);
        } else {
            console.log('set bad request message: ' + json["error"]);
            setBadRequest(json["error"]);
        };

        return json;
    }

    return (
        <>
        <h1>TRANSACTIONS</h1>
            {/* <div className='list_transaction'>
                <h1 className='title_list_transaction'>Transactions:</h1>
            </div> */}
        </>
    )
}

export default TransactionTable;