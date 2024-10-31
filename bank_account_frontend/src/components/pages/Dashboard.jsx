import React, { useContext, useState, useEffect } from 'react';
import TokenContext from '../../contexts/TokenContext.js';
import CurrentUserContext from '../../contexts/CurrentUserContext.js';
import DashboardConstructor from '../../components/elements/DashboardConstructor.jsx';
import ErrorWindowRedirect from '../elements/ErrorWindowRedirect.jsx';
import './Dashboard.css';

export default function Dashboard () {
    console.log("START dashboard");
    const URL_DASHBOARD = "http://localhost:3000/api/v1/dashboard";

    const[rows, setRows] = useState([]);
    const [transactionSuccess, setTransactionSuccess] = useState(false);
    const [badAccess, setBadAccess] = useState(false);
    const {token} = useContext(TokenContext);
    const {curUser, setCurUser} = useContext(CurrentUserContext);

    useEffect(() => {
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
                const objectJson = JSON.parse(json);
                console.log("userData.balance: " + objectJson.balance);
                console.log("userData.transactions: " + objectJson.transactions);
                console.log("userData.transactions.object: " + JSON.parse(objectJson.transactions));

                let arrayTransactions = [];
                JSON.parse(objectJson.transactions).map(row => {
                    arrayTransactions.push(
                        {
                            creationTime: row.creationTime,
                            amount: row.amount,
                            from: row.from,
                            to: row.to
                        }          
                    )
                })

                setCurUser({
                    ...curUser,
                    balance: objectJson.balance,
                    transactions: arrayTransactions
                })
                setRows(arrayTransactions);
            }
        }

        getUserData();
    }, [transactionSuccess]);

    return (
        <main id="dashboard">
            {
                badAccess === true 
                    ? <ErrorWindowRedirect message='Unauthorized access' navigateTo='/' /> 
                    : <DashboardConstructor transactionList={rows} setTransactions={setRows} markTransactionsuccess={setTransactionSuccess}  />
            }
        </main>
    )
}