// app/dashboard/dashboard-page.tsx

import './dashboard.css';  // Import the CSS for the dashboard layout

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h2>Commerce Dashboard</h2>
        <nav>
          <ul>
            <li><a href="/dashboard">Home</a></li>
            <li><a href="/orders">Orders</a></li>
            <li><a href="/products">Products</a></li>
            <li><a href="/customers">Customers</a></li>
            <li><a href="/reports">Reports</a></li>
            <li><a href="/settings">Settings</a></li>
            <li><a href="/odr">Odr</a></li>
          </ul>
        </nav>
      </div>
      <div className="main-content">
        <header className="top-bar">
          <div className="user-info">
            <span>Welcome, Admin</span>
            <button>Logout</button>
          </div>
        </header>
        <section className="stats">
          <div className="card sales">
            <h3>Total Sales</h3>
            <p>$ 45,000</p>
          </div>
          <div className="card orders">
            <h3>Total Orders</h3>
            <p>150</p>
          </div>
          <div className="card products">
            <h3>Total Products</h3>
            <p>450</p>
          </div>
          <div className="card customers">
            <h3>Total Customers</h3>
            <p>1200</p>
          </div>
        </section>
        <section className="recent-orders">
          <h3>Recent Orders</h3>
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
              <tr>
                <td>#1001</td>
                <td>John Doe</td>
                <td>Shipped</td>
                <td>2025-02-25</td>
              </tr>
              <tr>
                <td>#1002</td>
                <td>Jane Smith</td>
                <td>Pending</td>
                <td>2025-02-24</td>
              </tr>
              <tr>
                <td>#1003</td>
                <td>Michael Brown</td>
                <td>Delivered</td>
                <td>2025-02-23</td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
