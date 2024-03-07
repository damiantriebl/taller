import { useState, useEffect } from 'react';
import { mockTransactionData } from './MockData';
import './style.css';
// Add more mock data as needed
const PaymentDashboard = () => {
  const [transactionData, setTransactionData] = useState([]);
  const [from, setFrom] = useState<null | Date>(null);
  const [to, setTo] = useState<null | Date>(null);

  const [error, setError] = useState(null);
  useEffect(() => {
    fetchTransactionData();
  }, []);
  const fetchTransactionData = () => {
    // Simulate API request delay
    setTimeout(() => {
      const mock = mockTransactionData.slice(0, 10);
      setTransactionData(mockTransactionData);
    }, 1000);
  };

  const handleChange = (evt: any) => {
    console.log(evt);
    if (evt.target.name === 'from') {
      setFrom(evt.target.value)
    } else if (evt.target.name === 'to') {
      setTo(evt.target.value)
    }
  }
  useEffect(() => {
    let fromDate = new Date("1-1-1900");
    let toDate: Date = new Date();
    if (from) fromDate = from;
    if (to) toDate = to;
    const filterData = transactionData.filter((transaction) => {
      const transactionDate = new Date(transaction.date)
      console.log("Datos", transactionDate.toUTCString(), "from.....", fromDate.toUTCString(), "to....", toDate.toUTCString())
      if (transactionDate.toUTCString() > fromDate.toUTCString() && transactionDate.toUTCString() < toDate.toUTCString()) {
        return transaction
      } else {
        return false
      }
    });
    setTransactionData(filterData);
  }, [from, to])

  return (
    <div className="payment-dashboard">
      <h1>Payment Transaction Dashboard</h1>
      {error && <p className="error-message">Error: {error}</p>}
      <div className="nav-filter">
        From: <input name="from" type="date" onChange={(evt) => handleChange(evt)} />
        to: <input name="to" type="date" onChange={(evt) => handleChange(evt)} />
      </div>
      <div className="transaction-list">
        {transactionData.map((transaction) => (
          <div className="flex flex-row bac " key={transaction.id}>
            <p>Transaction ID: {transaction.id}</p>
            <p>Date: {transaction.date}</p>
            <p>Description: {transaction.description}</p>
            <p>Amount: ${transaction.amount.toFixed(2)}</p>
          </div>
        ))}
      </div>
      {/* Pagination and Summary Section (optional, to be implemented) */} </div >
  );
};
export default PaymentDashboard;