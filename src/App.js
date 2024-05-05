import React, { useState, useEffect } from 'react';
import './App.css'; 

function ExpenseTracker() {

  const [description, setDescription] = useState(localStorage.getItem('description') || '');
  const [category, setCategory] = useState(localStorage.getItem('category') || '');
  const [amount, setAmount] = useState(localStorage.getItem('amount') || '');
  const [total, setTotal] = useState(localStorage.getItem('total') || '');
  const [expenses, setExpenses] = useState(JSON.parse(localStorage.getItem('expenses')) || []);



  useEffect(() => {
    
    const newTotal = expenses.reduce((acc, expense) => acc + parseFloat(expense.amount), 0);
    setTotal(newTotal.toFixed(2)); 
    localStorage.setItem('total', newTotal.toFixed(2)); 
  }, [expenses]);
 
  const handleSubmit = (event) => {
    event.preventDefault();
    if (document && category && !isNaN(amount)) {
      // Add the new expense to the expenses state
      const newExpense = { description, category, amount };
      setExpenses([...expenses, newExpense]);
      // Update localStorage
      localStorage.setItem('description', description);
      localStorage.setItem('category', category);
      localStorage.setItem('amount', amount);
      localStorage.setItem('expenses', JSON.stringify(expenses));
      localStorage.setItem('total', total);

   

      // Clear the form inputs
      setDescription('');
      setCategory('');
      setAmount('');
    } else {
      alert('Please fill out all fields with valid data');
    }
  };


  const handleDelete = (index) => { 
    const updatedExpenses = expenses.filter((_, i) => i!== index);
    setExpenses(updatedExpenses);
    localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
  };

  
  useEffect(() => {
    localStorage.setItem('description', description);
    localStorage.setItem('category', category);
    localStorage.setItem('amount', amount);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    localStorage.setItem('total',total);
  }, [description, category, amount, expenses,total]);

  return (
    <div className="container">
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
      <h2>Expense Tracker</h2>
      <form onSubmit={handleSubmit} className="form-group">
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Expense Description"
          required
          className="input-field"
        /><br />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          className="input-field"
        >
          <option value="">Select Category</option>
          <option value="Food">Food</option>
          <option value="Transportation">Transportation</option>
          <option value="Utilities">Cred / Amazon</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Others">Others</option>
        </select><br />
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          required
          className="input-field"
        /><br />
        <input type="submit" value="Add Expense" className="submit-button" />
      </form>
      <h3>Expense Summary</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Description</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense, index) => (
            <tr key={index}>
              <td>{expense.description}</td>
              <td>{expense.category}</td>
              <td>{expense.amount}</td>
              <td>
                <button className='del' onClick={() => handleDelete(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h1 className='total'>Total : {total} /-</h1>
    </div>
  );
}

export default ExpenseTracker;
