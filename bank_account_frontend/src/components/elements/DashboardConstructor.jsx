import React from 'react';
import BalancePart from './BalancePart.jsx';
import TransactionTable from './TransactionTable.jsx';
import '../pages/Dashboard.css';

function DashboardConstructor (props) {
    console.log("START dashboard_constructor");

    function getBalance() {
        console.log("balance: " + data?.balance);
        return data?.balance;
    }

    function getTransactionList() {
        console.log("transactions: " + data.transactions);
        return data.transactions;
    }

    return (
        <>
            <BalancePart data={props.data} function={props.function} />
            <TransactionTable data={props.data}/>
            {/* <BalancePart balance={() => getBalance()} function={updateFunc} />
            <TransactionTable data={() => getTransactionList()}/> */}
        </>
    )
}

export default DashboardConstructor;