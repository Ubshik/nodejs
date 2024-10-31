import React, { useContext, useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import CurrentUserContext from '../../contexts/CurrentUserContext.js';
import '../pages/Dashboard.css';

function TransactionTable (props) {
    console.log("START transaction_table");

    const {curUser} = useContext(CurrentUserContext);

    const columns = [
        {
            name: "Time",
            selector: row => row.creationTime,
            sortable: true,
        },
        {
            name: "Amount",
            selector: row => (row.from === curUser.email ? row.amount * (-1) : row.amount),
            sortable: true,
        },
        {
            name: "From/To",
            selector: row => (row.from === curUser.email ? row.to : row.from),
            sortable: true,
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

    // function handleSearch(e) {
    //     let searchValue;
    //     let dateValue;
    //     let amountValue;
    //     let addresseeValue;

    //     const newRows = props.transactionList.filter((row) => {
    //         dateValue = row.creationTime.includes(e.target.value);
    //         amountValue = row.amount.includes(e.target.value);

    //         if (dateValue) {
    //             searchValue = dateValue;
    //         } else {
    //             searchValue = amountValue;
    //         }
    
    //         return searchValue;
    //     });

    //     props.setTransactions(newRows);
    // }

    const handlePressEnter = (e) => {
        if (e.key === 'Enter') {
            console.log('INPUT ' + e.target.value);
          }
    }


    return (
        <>
            {/* {console.log(props.data)} */}
            <div className='list_transaction'>
                <h1 className='title_list_transaction'>Transactions:</h1>
                <input type="search" onKeyDown={handlePressEnter} placeholder='Serch' />

                <div className='rows'>
                    <DataTable customStyles={tableCustomStyles} 
                        // columns={columns} data={props?.data?.transactions}
                        // columns={columns} data={curUser.transactions}
                        columns={columns} data={props.transactionList}
                        pagination 
                        paginationPerPage='8'
                        paginationRowsPerPageOptions={[6, 8, 10]}
                        />
                </div>
            </div>            
        </>
    )
}

export default TransactionTable;



//useful links:
// - custom pagination: https://github.com/jbetancur/react-data-table-component/issues/1191
// - DataTable css: https://github.com/jbetancur/react-data-table-component/blob/master/src/DataTable/styles.ts
// - DataTable creation instraction: https://www.freecodecamp.org/news/create-tables-using-the-react-datatable-component-library/