import React, { useContext } from 'react';
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

    const handlePressEnter = (e) => {
        if (e.key === 'Enter') {
            console.log('INPUT ' + e.target.value);
            const input = e.target.value;
            if (input === "") {
                props.setTransactions(curUser.transactions);
            } else {
                const resultArray = [];
                curUser.transactions.map(row => {
                    if (row.creationTime.includes(input) ||
                        ('' + row.amount).includes(input) ||
                        row.from.includes(input) ||
                        row.to.includes(input)) {
                            resultArray.push(row);
                        }
                });
                props.setTransactions(resultArray);
            }
        }
    }


    return (
        <>
            <div className='list_transaction'>
                <h1 className='title_list_transaction'>Transactions:</h1>
                <input type="search" onKeyDown={handlePressEnter} placeholder='Serch' />

                <div className='rows'>
                    <DataTable customStyles={tableCustomStyles} 
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