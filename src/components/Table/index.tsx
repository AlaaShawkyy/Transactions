// CustomerTable.js
import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';

const CustomerTable = ({ customers, transactions, openTransactionsModal }) => {
  const [nameFilter, setNameFilter] = useState('');
  const [amountFilter, setAmountFilter] = useState('');

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(nameFilter.toLowerCase())
    && (amountFilter === '' || transactions.some(transaction =>
      transaction.customer_id === customer.id &&
      transaction.amount.toString().includes(amountFilter)
    ))
  );

  return (
    <div className='m-2 container'>
        <div className='d-flex gap-5 '>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search by customer name"
        value={nameFilter}
        onChange={(e) => setNameFilter(e.target.value)}
      />
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search by transaction amount"
        value={amountFilter}
        onChange={(e) => setAmountFilter(e.target.value)}
      />
        </div>
      <Table className=' shadow-lg'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredCustomers.map(customer => (
            <tr key={customer.id}>
              <td>{customer.id}</td>
              <td>{customer.name}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => openTransactionsModal(customer.id)}
                >
                  View Transactions
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default CustomerTable;
