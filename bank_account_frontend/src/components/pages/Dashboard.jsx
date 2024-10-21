import React, { useContext, useState, useEffect } from 'react';
import TokenContext from '../../contexts/TokenContext.js';
import DashboardConstructor from '../../components/elements/DashboardConstructor.jsx';
import ErrorWindowRedirect from '../elements/ErrorWindowRedirect.jsx';
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

    const [userData, setUserData] = useState();
    const [transactionSuccess, setTransactionSuccess] = useState(false);
    const [badAccess, setBadAccess] = useState(false);
    const {token} = useContext(TokenContext);

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
    //         // console.log("userData: " + json);
    //         // console.log("userData.balance: " + json["balance"]);
    //         // console.log("userData.transactions: " + json["transactions"]);
    //         setUserData(json);
    //     }
    // }

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
    }, []);

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
                    : <DashboardConstructor data={userData} updateFunc={setTransactionSuccess}  />
            }
        </main>
    )
}