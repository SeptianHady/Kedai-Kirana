"use client";

import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

interface SalesData {
  month: string;
  totalSales: number;
}

interface DashboardStats {
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  salesData: SalesData[];
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    salesData: [],
  });

  useEffect(() => {
    // nanti diganti fetch dari backend
    const fakeData: DashboardStats = {
      totalProducts: 25,
      totalOrders: 120,
      totalRevenue: 5400000,
      salesData: [
        { month: "Jan", totalSales: 500000 },
        { month: "Feb", totalSales: 800000 },
        { month: "Mar", totalSales: 1200000 },
        { month: "Apr", totalSales: 900000 },
        { month: "Mei", totalSales: 1000000 },
        { month: "Jun", totalSales: 1000000 },
      ],
    };
    setStats(fakeData);
  }, []);

  const barData = {
    labels: stats.salesData.map((d) => d.month),
    datasets: [
      {
        label: "Total Penjualan (Rp)",
        data: stats.salesData.map((d) => d.totalSales),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderRadius: 8,
      },
    ],
  };

  const doughnutData = {
    labels: ["Produk", "Pesanan", "Pendapatan"],
    datasets: [
      {
        data: [stats.totalProducts, stats.totalOrders, stats.totalRevenue / 1000000],
        backgroundColor: ["#36A2EB", "#FFCE56", "#4BC0C0"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4 fw-bold">📊 Dashboard Admin Kedai Kirana</h2>

      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Total Produk</h5>
              <p className="fs-4 fw-bold">{stats.totalProducts}</p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Total Pesanan</h5>
              <p className="fs-4 fw-bold">{stats.totalOrders}</p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Total Pendapatan</h5>
              <p className="fs-4 fw-bold">Rp {stats.totalRevenue.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-8 mb-4">
          <div className="card p-3 shadow-sm">
            <h5 className="mb-3 fw-semibold">Grafik Penjualan per Bulan</h5>
            <Bar data={barData} />
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card p-3 shadow-sm">
            <h5 className="mb-3 fw-semibold">Statistik</h5>
            <Doughnut data={doughnutData} />
          </div>
        </div>
      </div>
    </div>
  );
}
