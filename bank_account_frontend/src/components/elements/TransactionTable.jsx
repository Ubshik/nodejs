import React, { useContext, useState } from 'react';
import DataTable from 'react-data-table-component';
import CurrentUserContext from '../../contexts/CurrentUserContext.js';
import '../pages/Dashboard.css';

//TODO
//2)update table if a transaction was succesed
//3)implement pagination
//4)add table with result data
//*https://github.com/chelmerrox/react-data-table-tutorial/blob/main/src/components/Table.tsx
//*https://www.freecodecamp.org/news/create-tables-using-the-react-datatable-component-library/
function TransactionTable (props) {
    console.log("START transaction_table");
    // console.log("props.data: " + props.data);
    // console.log("props.data.balance: " + props.data.balance);
    // console.log("props.data.transactions: " + props.data.transactions);

    const[rows, setRows] = useState();
    const {curUser} = useContext(CurrentUserContext);

    const columns = [
        {
            name: "Time",
            selector: row => row.creationTime
        },
        {
            //TODO change data on backend
            name: "Amount",
            selector: row => (row.from === curUser.email ? row.amount * (-1) / 100 : row.amount / 100),
        },
        {
            name: "From/To",
            selector: row => (row.from === curUser.email ? row.to : row.from)
        },
    ]

    const tableCustomStyles = {
        headCells: {
          style: {
            fontSize: '20px',
            fontWeight: 'bold',
            paddingLeft: '0 8px',
            justifyContent: 'center',
            backgroundColor: '#ebfff0'
          },
        },
        cells: {
            style: {
              fontSize: '14px',
              paddingLeft: '0 8px',
              justifyContent: 'center',
            },
          },
      }


    return (
        <>
            {console.log(props.data)}
            <div className='list_transaction'>
                <h1 className='title_list_transaction'>Transactions:</h1>

                <div className='rows'>
                    <DataTable customStyles={tableCustomStyles} columns={columns} data={props?.data?.transactions } />
                </div>
            </div>            
        </>
    )
}

export default TransactionTable;