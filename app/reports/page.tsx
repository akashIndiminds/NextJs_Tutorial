// app/reports/Reports.tsx

import './reports.css';

const Reports = () => {
  return (
    <div className="reports-container">
      <h2>Reports</h2>

      <div className="report-cards-container">
        {/* Sales Report */}
        <div className="report-card">
          <h3>Sales Report</h3>
          <p>Total Sales: $45,000</p>
          <p>Growth: +15% from last month</p>
        </div>

        {/* Order Report */}
        <div className="report-card">
          <h3>Order Report</h3>
          <p>Total Orders: 150</p>
          <p>Completed Orders: 140</p>
        </div>

        {/* Revenue Report */}
        <div className="report-card">
          <h3>Revenue Report</h3>
          <p>Total Revenue: $65,000</p>
          <p>Revenue Growth: +20% from last month</p>
        </div>

        {/* Customer Report */}
        <div className="report-card">
          <h3>Customer Report</h3>
          <p>Total Customers: 1200</p>
          <p>New Customers: 150</p>
        </div>

        {/* Inventory Report */}
        <div className="report-card">
          <h3>Inventory Report</h3>
          <p>Total Products in Stock: 450</p>
          <p>Low Stock Items: 12</p>
        </div>

        {/* Returns Report */}
        <div className="report-card">
          <h3>Returns Report</h3>
          <p>Total Returns: 5</p>
          <p>Returned Items Value: $1,000</p>
        </div>
      </div>
    </div>
  );
};

export default Reports;
