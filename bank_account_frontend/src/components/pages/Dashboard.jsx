import React, { useState } from 'react';
import './Dashboard.css';

//TODO
//0)check token before show
//1)add sendData
//2)update table if a transaction was succesed
//3)implement pagination
//4)add table with result data
//*https://github.com/chelmerrox/react-data-table-tutorial/blob/main/src/components/Table.tsx
//*https://www.freecodecamp.org/news/create-tables-using-the-react-datatable-component-library/
export default function Login () {
    const [email, setEmail] = useState("");
    const [amount, setAmount] = useState("");

    function receiveInputEmail(e) {
        setEmail(e.target.value);
    }

    function receiveInputAmount(e) {
        setAmount(e.target.value);
    }

    const sendData = (e) => {
        console.log("press submit in transaction form");
        return null;
    }

    return (
        <main id="dashboard">
            <div className='balance_column'>
                <div className='balance_container'>
                    <h1 className='h1_middle'>Balance: </h1>
                    <h1 id='balance_amount'>1012.74</h1>
                </div>

                <h1 className='h1_little transaction_tab'> Cash transfer:</h1>
                <form id="transaction_form" onSubmit={sendData} >
                    <label className="field transaction_tab" htmlFor="email">Beneficiary (email):</label><br></br>
                    <input className='transaction_tab' type="email" id="email" name="Email" onChange={receiveInputEmail} autoFocus required></input>
                    <br/><br/>
                    <label className="field transaction_tab" htmlFor="amount">Amount:</label><br></br>
                    <input className='transaction_tab' type="text" id="amount" name="Amount" onChange={receiveInputAmount} required></input>
                    <br/><br/>
                    <span className='submit_transaction transaction_tab'>
                        <button className="submit" type="submit" value="Submit">SUBMIT</button>
                    </span>
                </form>

            </div>
            <div className='list_transaction'>
                <h1 className='title_list_transaction'>Transactions:</h1>
            </div>
        </main>
    )
}