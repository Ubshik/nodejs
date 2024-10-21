import React, { useContext, useState, useEffect } from 'react';
import TokenContext from '../../contexts/TokenContext.js';
import DashboardConstructor from '../../components/elements/DashboardConstructor.jsx';
import ErrorWindowRedirect from '../elements/ErrorWindowRedirect.jsx';
// import ErrorWindow from '../elements/ErrorWindow.jsx';
// import SuccessWindow from '../elements/SuccessWindow.jsx';
import './Dashboard.css';

//TODO
//0)check token before show
//1)add sendData
//2)update table if a transaction was succesed
//3)implement pagination
//4)add table with result data
//*https://github.com/chelmerrox/react-data-table-tutorial/blob/main/src/components/Table.tsx
//*https://www.freecodecamp.org/news/create-tables-using-the-react-datatable-component-library/
export default function Dashboard () {
    console.log("START dashboard");
    const URL_DASHBOARD = "http://localhost:3000/api/v1/dashboard";
    // const URL_TRANSACTION = "http://localhost:3000/api/v1/transaction";

    const [userData, setUserData] = useState();
    const [transactionSuccess, setTransactionSuccess] = useState(false);
    const [badAccess, setBadAccess] = useState(false);
    const {token} = useContext(TokenContext);

    // const [email, setEmail] = useState("");
    // const [amount, setAmount] = useState("");
    // const [successResponse, setSuccessResponse] = useState("");
    // const [badRequest, setBadRequest] = useState("");

    async function getUserData() {
        console.log("inside getUserData");
        if (token === null) {
            setBadAccess(true);
            return;
        } else {
            const myHeaders = new Headers();
            const bearerToken = 'Bearer ' + token?.token;

            myHeaders.append("Authorization", bearerToken);
            myHeaders.append("Content-Type", "application/json");

            const options = {
                method: "GET",
                headers: myHeaders,
            }

            const response = await fetch(URL_DASHBOARD, options);
            const json = await response.json();
            console.log("userData: " + json),
            setUserData(json);
        }
    }

    useEffect(() => {
        // async function getUserData() {
        //     console.log("inside getUserData");
        //     if (token === null) {
        //         setBadAccess(true);
        //         return;
        //     } else {
        //         const myHeaders = new Headers();
        //         const bearerToken = 'Bearer ' + token?.token;

        //         myHeaders.append("Authorization", bearerToken);
        //         myHeaders.append("Content-Type", "application/json");

        //         const options = {
        //             method: "GET",
        //             headers: myHeaders,
        //         }

        //         const response = await fetch(URL_DASHBOARD, options);
        //         const json = await response.json();
        //         console.log("userData: " + json),
        //         setUserData(json);
        //     }
        // }

        getUserData();
        console.log("userData at the end:", userData);
    }, []);

    useEffect(() => {
        getUserData();
        console.log("userData at the end:", userData);
    }, [transactionSuccess]);

    // function receiveInputEmail(e) {
    //     setEmail(e.target.value);
    // }

    // function receiveInputAmount(e) {
    //     setAmount(e.target.value);
    // }

    // const sendData = async(e) => {
    //     e.preventDefault();
    //     console.log("press submit in transaction form");

    //     const transaction_data = {
    //         addressee: email,
    //         amount: parseFloat(amount.replace(",", "."))
    //     };

    //     const transaction_data_json = JSON.stringify(transaction_data);

    //     console.log("dashboard_fe transaction_data: " + transaction_data_json);

    //     const response = await fetch(URL_TRANSACTION, {
    //         method: "POST",
    //         headers: {
    //             'Authorization': 'Bearer ' + token?.token,
    //             'Content-Type': 'application/json'
    //         },
    //         body: transaction_data_json,
    //     });

    //     console.log(response.status);
    //     const json = await response.json();
    //     json["status"] = response.status;

    //     console.log("transaction_fe response: " + json)

    //     if (response.status === 200) {
    //         setSuccessResponse(json["message"]);
    //     } else {
    //         console.log('set bad request message: ' + json["error"]);
    //         setBadRequest(json["error"]);
    //     };

    //     return json;
    // }

    //TODO how send JSON object as props? => data={userData.map()}
    //TODO after success transaction => update table with list transactions
    return (
        <main id="dashboard">
            {
                badAccess === true 
                    ? <ErrorWindowRedirect message='Unauthorized access' navigateTo='/' /> 
                    : <DashboardConstructor data={userData} function={setTransactionSuccess}  />

                // badAccess === true ? 
                //     <ErrorWindowRedirect message='Unauthorized access' navigateTo='/' /> : 
                //     <>
                //         <div className='balance_column'>
                //         <div className='balance_container'>
                //             <h1 className='h1_middle'>Balance: </h1>
                //             <h1 id='balance_amount'>{userData?.balance}</h1>
                //         </div>

                //         <h1 className='h1_little transaction_tab'> Cash transfer:</h1>
                //         <form id="transaction_form" >
                //             <label className="field transaction_tab" htmlFor="email">Beneficiary (email):</label><br></br>
                //             <input className='transaction_tab' type="email" id="email" name="Email" onChange={receiveInputEmail} autoComplete="new-password" autoFocus required></input>
                //             <br/><br/>
                //             <label className="field transaction_tab" htmlFor="amount">Amount:</label><br></br>
                //             <input className='transaction_tab' type="text" id="amount" name="Amount" onChange={receiveInputAmount} autoComplete="new-password" required></input>
                //             <br/><br/>
                //             <span className='submit_transac(item: any)tion transaction_tab'>
                //                 <button className="submit" onClick={sendData} type="submit" value="Submit">SUBMIT</button>
                //             </span>
                //         </form>

                //         <div>
                //             {
                //                 badRequest !== "" ? <ErrorWindow message={badRequest} function={setBadRequest}/> : false
                //             }
                //         </div>

                //         <div>
                //             {
                //                 successResponse !== "" ? <SuccessWindow message={successResponse} function={setSuccessResponse} /> : false
                //             }
                //         </div>

                //         </div>


                //         <div className='list_transaction'>
                //             <h1 className='title_list_transaction'>Transactions:</h1>
                //         </div>
                //     </>
            }
        </main>
    )
}