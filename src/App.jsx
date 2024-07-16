 
import   { useState, useEffect } from 'react';
import CustomerTable from './components/Table';
import TransactionGraphModal from './components/Chart';
import NavBar from './components/Navbar/indes';

function App() {
  const [customers, setCustomers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    fetch('https://mocki.io/v1/a73d7d4d-32b2-4f1d-9d07-7a2ac6771b0f')
      .then(response => response.json())
      .then(data => {
        setCustomers(data.customers);
        setTransactions(data.transactions);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const openTransactionsModal = (customerId) => {
    setSelectedCustomer(customerId);
  };

  return (
    <div className=" ">
<NavBar/>
      <h1 className="text-center mb-4">Customer Transactions</h1>
      <div className='d-flex justify-content-center'>
      <CustomerTable
        customers={customers}
        transactions={transactions}
        openTransactionsModal={openTransactionsModal}
      />
      </div>
      {selectedCustomer && (
        <TransactionGraphModal
          customerId={selectedCustomer}
          transactions={transactions}
          onClose={() => setSelectedCustomer(null)}
       />
      )}

    </div>
  );
}

export default App;
