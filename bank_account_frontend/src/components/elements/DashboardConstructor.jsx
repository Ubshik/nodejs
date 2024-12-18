import React from 'react';
import BalancePart from './BalancePart.jsx';
import TransactionTable from './TransactionTable.jsx';
import '../pages/Dashboard.css';

function DashboardConstructor (props) {
    console.log("START dashboard_constructor");

    return (
        <>
            <BalancePart markTransactionsuccess={props.markTransactionsuccess} />
            <TransactionTable transactionList={props.transactionList} setTransactions={props.setTransactions} />
        </>
    )
}

export default DashboardConstructor;