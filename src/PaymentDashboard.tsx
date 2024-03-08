import { useState, useEffect } from 'react';
import { mockTransactionData } from './MockData';
import './style.css';
// Add more mock data as needed
const PaymentDashboard = () => {
  const TRANSACTION_PER_PAGE = 5;
  const [transactionData, setTransactionData] = useState([]);
  const [from, setFrom] = useState<null | Date>(null);
  const [to, setTo] = useState<null | Date>(null);
  const [paginate, setPaginated] = useState(1)
  const [allElements, setAllElements] = useState(0)

  const [error, setError] = useState(null);
  useEffect(() => {
    fetchTransactionData();
  }, [paginate]);
  const fetchTransactionData = () => {
    // Simulate API request delay
    setTimeout(() => {
      const mock = mockTransactionData.slice(paginate * TRANSACTION_PER_PAGE - TRANSACTION_PER_PAGE, paginate * TRANSACTION_PER_PAGE);
      setAllElements(mockTransactionData.length);
      setTransactionData(mock);
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
  const handlePaginate = (type) => {
    console.log(type, paginate)
    if (type === 'prev') {
      if (paginate > 1) setPaginated(pg => pg - 1)
    } else {
      if (paginate * TRANSACTION_PER_PAGE < allElements) setPaginated(pg => pg + 1)
    }
  }

  useEffect(() => {
    let fromDate = new Date("1-1-1980");
    let toDate: Date = new Date();
    if (from) fromDate = from;
    if (to) toDate = to;
  
    const filterData = transactionData.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
  
      if (transactionDate >= fromDate && transactionDate <= toDate) {
        return true;
      } else {
        return false;
      }
    });
  
    setTransactionData(filterData);
  }, [from, to]);


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
      we have {allElements} transctions
      <button onClick={() => handlePaginate("prev")} >
        <h1> prev</h1>
      </button>
      <button onClick={() => handlePaginate("next")} >
        <h1>  next </h1>
      </button>
      {/* Pagination and Summary Section (optional, to be implemented) */} </div >
  );
};
export default PaymentDashboard;