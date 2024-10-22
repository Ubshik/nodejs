import React, { useContext, useState, useEffect } from 'react';
import TokenContext from '../../contexts/TokenContext.js';
import DashboardConstructor from '../../components/elements/DashboardConstructor.jsx';
import ErrorWindowRedirect from '../elements/ErrorWindowRedirect.jsx';
import './Dashboard.css';

export default function Dashboard () {
    console.log("START dashboard");
    const URL_DASHBOARD = "http://localhost:3000/api/v1/dashboard";

    const [userData, setUserData] = useState();
    const [transactionSuccess, setTransactionSuccess] = useState(false);
    const [badAccess, setBadAccess] = useState(false);
    const {token} = useContext(TokenContext);

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
                console.log("userData: " + json);
                console.log("userData.balance: " + json["balance"]);
                console.log("userData.transactions: " + json["transactions"]);
                setUserData(json);
            }
        }
        
        getUserData();
    }, [transactionSuccess]);

    return (
        <main id="dashboard">
            {
                badAccess === true 
                    ? <ErrorWindowRedirect message='Unauthorized access' navigateTo='/' /> 
                    : <DashboardConstructor data={userData} markTransactionsuccess={setTransactionSuccess}  />
            }
        </main>
    )
}