import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getCases } from "../services/api";
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend, CartesianGrid 
} from "recharts";

export default function Dashboard() {
  const user = localStorage.getItem("user");
  const [stats, setStats] = useState({ total: 0, open: 0, closed: 0 });
  const [chartData, setChartData] = useState([]);
  const [pieData, setPieData] = useState([]);

  if (!user) return <Navigate to="/" />;

  const loadCases = async () => {
    try {
      const res = await getCases();
      const data = res.data;

      const total = data.length;
      const open = data.filter(c => c.status === "Open").length;
      const closed = data.filter(c => c.status === "Closed").length;
      setStats({ total, open, closed });

      const dateMap = {};
      data.forEach(c => {
        dateMap[c.date] = (dateMap[c.date] || 0) + 1;
      });
      setChartData(Object.keys(dateMap).map(date => ({ date, cases: dateMap[date] })));

      setPieData([
        { name: "Active", value: open },
        { name: "Closed", value: closed }
      ]);
    } catch (error) {
      console.error("Error fetching cases:", error);
    }
  };

  useEffect(() => { loadCases(); }, []);

  // Professional Theme Colors
  const THEME_COLORS = ["#b89130", "#1a2a6c"]; 

  return (
    <div className="dashboard-bg">
      <Navbar />
      
      <div className="dashboard-content container">
        <header className="page-header">
          <div>
            <h1>Executive Dashboard</h1>
            <p>Welcome back. Here is your firm's current standing.</p>
          </div>
          <button className="refresh-btn" onClick={loadCases}>↻ Refresh Data</button>
        </header>

        {/* High-Impact Stats */}
        <div className="stats-row">
          <div className="stat-card">
            <span className="icon">💼</span>
            <div className="details">
              <label>Total Caseload</label>
              <h3>{stats.total}</h3>
            </div>
          </div>
          <div className="stat-card gold-border">
            <span className="icon">⚖️</span>
            <div className="details">
              <label>Open Matters</label>
              <h3>{stats.open}</h3>
            </div>
          </div>
          <div className="stat-card">
            <span className="icon">🏛️</span>
            <div className="details">
              <label>Closed Files</label>
              <h3>{stats.closed}</h3>
            </div>
          </div>
        </div>

        {/* Intelligence Row (Charts) */}
        <div className="charts-grid">
          <div className="chart-container main-chart">
            <h3>Intake Trends</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#666', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#666', fontSize: 12}} />
                <Tooltip cursor={{fill: '#f0f0f0'}} contentStyle={{borderRadius: '10px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}} />
                <Bar dataKey="cases" fill="#1a2a6c" radius={[6, 6, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-container side-chart">
            <h3>Status Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie 
                  data={pieData} 
                  innerRadius={60} 
                  outerRadius={100} 
                  paddingAngle={5} 
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={index} fill={THEME_COLORS[index % THEME_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend iconType="circle" wrapperStyle={{paddingTop: '20px'}} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}