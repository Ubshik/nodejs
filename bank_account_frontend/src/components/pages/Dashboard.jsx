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
    const [badAccess, setBadAccess] = useState(false);
    const {token} = useContext(TokenContext);

    useEffect(() => {
        async function getUserData() {
            if (token === null) {
                setBadAccess(true);
                return;
            } else {
                const myHeaders = new Headers();
                const bearerToken = 'Bearer ' + token?.token;

                myHeaders.append("Authorization", bearerToken);
                myHeaders.append("Content-Type", "application/json");

                const options = {
                    method: "POST",
                    headers: myHeaders,
                }

                const response = await fetch(URL_DASHBOARD, options);
                const json = await response.json();
                console.log("userData: " + json),
                setUserData(json);
            }
        }

        getUserData();
    }, []);

    //TODO how send JSON object as props? => data={userData.map()}
    //TODO after success transaction => update table with list transactions
    return (
        <main id="dashboard">
            {
                badAccess === true 
                    ? <ErrorWindowRedirect message='Unauthorized access' navigateTo='/' /> 
                    : <DashboardConstructor  />
            }
        </main>
    )
}