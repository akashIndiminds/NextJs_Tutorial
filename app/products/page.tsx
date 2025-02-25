"use client"

import React, { useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, ComposedChart } from "recharts";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

export default function ProductSalesDashboard() {
  // Extended data with more months and additional metrics
  const chartData = [
    { month: "January", desktop: 186, mobile: 80, tablet: 45, conversion: 3.2 },
    { month: "February", desktop: 305, mobile: 200, tablet: 65, conversion: 4.1 },
    { month: "March", desktop: 237, mobile: 120, tablet: 89, conversion: 3.8 },
    { month: "April", desktop: 73, mobile: 190, tablet: 105, conversion: 2.9 },
    { month: "May", desktop: 209, mobile: 130, tablet: 95, conversion: 3.5 },
    { month: "June", desktop: 214, mobile: 140, tablet: 78, conversion: 3.9 },
    { month: "July", desktop: 265, mobile: 170, tablet: 92, conversion: 4.3 },
    { month: "August", desktop: 290, mobile: 210, tablet: 101, conversion: 4.5 },
  ];

  // Calculate totals for summary cards
  const totals = chartData.reduce(
    (acc, curr) => {
      acc.desktop += curr.desktop;
      acc.mobile += curr.mobile;
      acc.tablet += curr.tablet;
      acc.total += curr.desktop + curr.mobile + curr.tablet;
      return acc;
    },
    { desktop: 0, mobile: 0, tablet: 0, total: 0 }
  );

  // Calculate platform percentages
  const desktopPercentage = Math.round((totals.desktop / totals.total) * 100);
  const mobilePercentage = Math.round((totals.mobile / totals.total) * 100);
  const tabletPercentage = Math.round((totals.tablet / totals.total) * 100);

  // Time period filter state
  const [timeFilter, setTimeFilter] = useState("all");
  
  // Color config
  const colors = {
    desktop: "#2563eb",
    mobile: "#60a5fa",
    tablet: "#93c5fd",
    conversion: "#10b981"
  };

  // Filter data based on selected time period
  const getFilteredData = () => {
    if (timeFilter === "last3") {
      return chartData.slice(-3);
    } else if (timeFilter === "last6") {
      return chartData.slice(-6);
    }
    return chartData;
  };

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg border border-gray-200 bg-white p-3 shadow-lg text-xs">
          <p className="font-medium mb-2">{label}</p>
          {payload.map((entry, index) => (
            <div key={`item-${index}`} className="flex items-center justify-between gap-4 my-1">
              <div className="flex items-center gap-2">
                <div 
                  className="w-2 h-2 rounded-sm" 
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-gray-600">{entry.name}:</span>
              </div>
              <span className="font-mono font-medium">
                {entry.name === "Conversion Rate (%)" 
                  ? `${entry.value}%` 
                  : entry.value.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  // Custom legend component
  const CustomLegend = ({ payload }) => {
    return (
      <div className="flex justify-center gap-6 mt-4">
        {payload.map((entry, index) => (
          <div key={`item-${index}`} className="flex items-center gap-1.5">
            <div 
              className="w-2 h-2 rounded-sm" 
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-xs text-gray-700">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Product Sales Dashboard</h2>
        <div className="flex gap-2">
          <button 
            className={`px-3 py-1 rounded-md ${timeFilter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
            onClick={() => setTimeFilter('all')}
          >
            All Time
          </button>
          <button 
            className={`px-3 py-1 rounded-md ${timeFilter === 'last6' ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
            onClick={() => setTimeFilter('last6')}
          >
            Last 6 Months
          </button>
          <button 
            className={`px-3 py-1 rounded-md ${timeFilter === 'last3' ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
            onClick={() => setTimeFilter('last3')}
          >
            Last 3 Months
          </button>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-blue-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-500">Total Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totals.total.toLocaleString()}</div>
            <p className="text-xs text-gray-500 mt-1">Across all platforms</p>
          </CardContent>
        </Card>
        
        <Card className="bg-blue-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-700">Desktop</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totals.desktop.toLocaleString()}</div>
            <p className="text-xs text-gray-600 mt-1">{desktopPercentage}% of total sales</p>
          </CardContent>
        </Card>
        
        <Card className="bg-blue-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-500">Mobile</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totals.mobile.toLocaleString()}</div>
            <p className="text-xs text-gray-500 mt-1">{mobilePercentage}% of total sales</p>
          </CardContent>
        </Card>
        
        <Card className="bg-blue-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-700">Tablet</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totals.tablet.toLocaleString()}</div>
            <p className="text-xs text-gray-600 mt-1">{tabletPercentage}% of total sales</p>
          </CardContent>
        </Card>
      </div>

      {/* Sales by Platform Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Sales by Platform</CardTitle>
          <CardDescription>Monthly distribution of sales across different devices</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80 w-full">
            <BarChart
              width={800}
              height={300}
              data={getFilteredData()}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend content={<CustomLegend />} />
              <Bar 
                name="Desktop" 
                dataKey="desktop" 
                fill={colors.desktop} 
                radius={[4, 4, 0, 0]} 
              />
              <Bar 
                name="Mobile" 
                dataKey="mobile" 
                fill={colors.mobile} 
                radius={[4, 4, 0, 0]} 
              />
              <Bar 
                name="Tablet" 
                dataKey="tablet" 
                fill={colors.tablet} 
                radius={[4, 4, 0, 0]} 
              />
            </BarChart>
          </div>
        </CardContent>
      </Card>

      {/* Conversion Rate Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Conversion Rates</CardTitle>
          <CardDescription>Monthly conversion rates across all platforms</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 w-full">
            <ComposedChart
              width={800}
              height={250}
              data={getFilteredData()}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip content={<CustomTooltip/>} />
              <Legend content={<CustomLegend/>} />
              <Line 
                name="Conversion Rate (%)"
                type="monotone" 
                dataKey="conversion" 
                stroke={colors.conversion} 
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </ComposedChart>
          </div>
        </CardContent>
        <CardFooter className="text-xs text-gray-500">
          Note: Conversion rate represents the percentage of visits resulting in purchases
        </CardFooter>
      </Card>

      {/* Performance Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Insights</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-sm">
            <span className="font-medium">Desktop:</span> Consistently strong performance, with peak sales in February.
          </p>
          <p className="text-sm">
            <span className="font-medium">Mobile:</span> Growing trend, especially strong in April and August.
          </p>
          <p className="text-sm">
            <span className="font-medium">Tablet:</span> Steady increase, with best performance in April.
          </p>
          <p className="text-sm">
            <span className="font-medium">Overall:</span> {timeFilter === 'last3' ? 'Last quarter shows' : 'Data indicates'} strongest performance in August with balanced platform distribution.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}