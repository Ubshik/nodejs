import React from 'react';
import BalancePart from './BalancePart.jsx';
import TransactionTable from './TransactionTable.jsx';
import '../pages/Dashboard.css';

function DashboardConstructor (props) {
    console.log("START dashboard_constructor");

    return (
        <>
            <BalancePart data={props.data} markTransactionsuccess={props.markTransactionsuccess} />
            <TransactionTable data={props.data}/>
        </>
    )
}

export default DashboardConstructor;