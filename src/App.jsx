import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Table,
  Button,
  Modal,
  Navbar,
} from "react-bootstrap";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/Navbar/indes";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function App() {
  const [customers, setCustomers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const customerRes = await axios.get("http://localhost:3001/customers");
      const transactionRes = await axios.get(
        "http://localhost:3001/transactions"
      );
      setCustomers(customerRes.data);
      setTransactions(transactionRes.data);
    };

    fetchData();
  }, []);

  // Function to filter customers by name and transaction amount
  const handleFilter = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setFilter(searchTerm);
  };

  // Function to handle click on a customer row
  const handleCustomerClick = (customer) => {
    setSelectedCustomer(customer);
    setShowModal(true);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCustomer(null);
  };

  // Function to get transactions of a specific customer
  const getCustomerTransactions = (customerId) => {
    return transactions.filter(
      (transaction) => transaction.customer_id === customerId
    );
  };
  // Filtered customers based on name search
  const filteredCustomers = customers.filter((customer) => {
    const nameMatch = customer.name.toLowerCase().includes(filter);
    const totalAmount = getCustomerTransactions(customer.id).reduce(
      (acc, t) => acc + t.amount,
      0
    );
    const amountMatch = totalAmount.toString().includes(filter);
    return nameMatch || amountMatch;
  });

  // Function to get total transactions per day for a specific customer
  const getTotalTransactionsPerDay = (customerId) => {
    const customerTransactions = getCustomerTransactions(customerId);
    const groupedByDate = customerTransactions.reduce((acc, transaction) => {
      acc[transaction.date] = (acc[transaction.date] || 0) + transaction.amount;
      return acc;
    }, {});

    return {
      labels: Object.keys(groupedByDate),
      datasets: [
        {
          label: "Total Amount",
          data: Object.values(groupedByDate),
          fill: false,
          borderColor: "rgba(75,192,192,1)",
        },
      ],
    };
  };

  return (
    <>
      <NavBar />
      <Container>
        <Row className="my-3">
          <Col>
            <input
              type="text"
              placeholder="Search by name or amount"
              value={filter}
              onChange={handleFilter}
              className="form-control shadow-lg"
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Table className="shadow-lg">
              <thead>
                <tr>
                  <th>Customer Name</th>
                  <th>Transaction Amount</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((customer) => (
                  <tr key={customer.id}>
                    <td>{customer.name}</td>
                    <td>
                      {getCustomerTransactions(customer.id).reduce(
                        (acc, t) => acc + t.amount,
                        0
                      )}
                    </td>
                    <td>
                      <Button
                        variant="primary"
                        onClick={() => handleCustomerClick(customer)}
                      >
                        View Transactions
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
        {selectedCustomer && (
          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>{selectedCustomer.name}'s Transactions</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Line data={getTotalTransactionsPerDay(selectedCustomer.id)} />
            </Modal.Body>
          </Modal>
        )}
      </Container>
    </>
  );
}

export default App;
