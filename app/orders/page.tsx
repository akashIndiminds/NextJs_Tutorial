// app/orders/Orders.tsx

import './orders.css';
import { Button } from '@/components/ui/button';

const Orders = () => {
  const orders = [
    { id: '#1001', customer: 'John Doe', status: 'Shipped', date: '2025-02-25' },
    { id: '#1002', customer: 'Jane Smith', status: 'Pending', date: '2025-02-24' },
    { id: '#1003', customer: 'Michael Brown', status: 'Delivered', date: '2025-02-23' }
  ];

  // Function to determine the class based on the order status
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Shipped':
        return 'shipped';
      case 'Pending':
        return 'pending';
      case 'Delivered':
        return 'delivered';
      default:
        return '';
    }
  };

  return (
    <div className="orders-container">
      <h2>Orders</h2>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.customer}</td>
              <td className={getStatusClass(order.status)}>{order.status}</td>
              <td>{order.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="order-actions">
        <Button >
          Add New Order
        </Button>
      </div>
    </div>

  );
};

export default Orders;
