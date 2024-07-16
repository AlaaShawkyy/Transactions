// TransactionGraphModal.js
import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
 
Chart.register(...registerables);
const TransactionGraphModal = ({ customerId, transactions }) => {
  const customerTransactions = transactions.filter(transaction => transaction.customer_id === customerId);
  
  // Prepare data for the chart (e.g., total amount per day)
  const data = {
    // Chart.js data format
    labels: customerTransactions.map(transaction => transaction.date),
    datasets: [
      {
        label: 'Total Amount per Day',
        data: customerTransactions.map(transaction => transaction.amount),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  return (
   
    <div className="modal"id="chartModal" >
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">Transactions for Customer {customerId}</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <p> <Line data={data} /></p>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button> 
      </div>
    </div>
  </div>
</div>
  );
};

export default TransactionGraphModal;
