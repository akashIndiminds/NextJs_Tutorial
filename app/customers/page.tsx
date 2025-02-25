// app/customers/Customers.tsx

'use client'; // Explicitly mark this as a client-side component

import './customers.css';
import { useState } from 'react';

const Customers = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Sample customer data
  const customers = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', totalSpent: 1200, recentOrders: 5 },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', totalSpent: 850, recentOrders: 3 },
    { id: 3, name: 'Michael Brown', email: 'michael.brown@example.com', totalSpent: 2500, recentOrders: 10 },
    // Add more customers as needed
  ];

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="customers-container">
      <h2>Customer Management</h2>

      {/* Search and Filter Section */}
      <div className="customer-search">
        <input
          type="text"
          placeholder="Search customers by name or email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Customer List */}
      <div className="customer-list">
        {filteredCustomers.length > 0 ? (
          filteredCustomers.map((customer) => (
            <div key={customer.id} className="customer-card">
              <div className="customer-info">
                <h3>{customer.name}</h3>
                <p>Email: {customer.email}</p>
                <p>Total Spent: ${customer.totalSpent}</p>
                <p>Recent Orders: {customer.recentOrders}</p>
              </div>

              <div className="customer-actions">
                <button className="btn-view">View Details</button>
                <button className="btn-edit">Edit</button>
                <button className="btn-delete">Delete</button>
              </div>
            </div>
          ))
        ) : (
          <p>No customers found</p>
        )}
      </div>
    </div>
  );
};

export default Customers;
