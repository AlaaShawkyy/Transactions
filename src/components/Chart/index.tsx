// TransactionGraphModal.js
import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
 
Chart.register(...registerables);
const TransactionGraphModal = ({ customerId, transactions, onClose }) => {
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
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Transactions for Customer {customerId}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Line data={data} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TransactionGraphModal;
