import { useState, useEffect } from "react";
import { getCases, deleteCase } from "../services/api";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

export default function CaseList() {
  const [cases, setCases] = useState([]);
  const [searchClient, setSearchClient] = useState("");
  const [searchLawyer, setSearchLawyer] = useState("");
  const [searchType, setSearchType] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const loadCases = async () => {
    try {
      const res = await getCases();
      setCases(res.data);
    } catch (err) {
      console.error("Failed to fetch cases");
    }
  };

  useEffect(() => { loadCases(); }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this case? This action cannot be undone.")) {
      await deleteCase(id);
      loadCases();
    }
  };

  const filteredCases = cases.filter(c => 
    c.client.toLowerCase().includes(searchClient.toLowerCase()) &&
    c.lawyer.toLowerCase().includes(searchLawyer.toLowerCase()) &&
    c.type.toLowerCase().includes(searchType.toLowerCase()) &&
    (statusFilter === "" || c.status === statusFilter) &&
    (!fromDate || c.date >= fromDate) &&
    (!toDate || c.date <= toDate)
  );

  return (
    <div className="case-list-page">
      <Navbar />

      <div className="content-container">
        <div className="container">
        <div className="glass-header">
          <div className="header-text">
            <h2>Litigation Records</h2>
            <p>{filteredCases.length} active files found</p>
          </div>
          <Link to="/add-case" className="btn-gold">+ Open New File</Link>
        </div>

        {/* Interactive Filter Suite */}
        <div className="filter-card">
          <div className="filter-group">
            <div className="input-wrapper">
              <span className="input-icon">🔍</span>
              <input placeholder="Client Name" value={searchClient} onChange={e => setSearchClient(e.target.value)} />
            </div>
            <div className="input-wrapper">
              <span className="input-icon">👨‍⚖️</span>
              <input placeholder="Lawyer" value={searchLawyer} onChange={e => setSearchLawyer(e.target.value)} />
            </div>
            <div className="input-wrapper">
              <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                <option value="">All Status</option>
                <option value="Open">Open Cases</option>
                <option value="Closed">Closed Cases</option>
              </select>
            </div>
            <div className="date-inputs">
              <input type="date" value={fromDate} onChange={e => setFromDate(e.target.value)} />
              <input type="date" value={toDate} onChange={e => setToDate(e.target.value)} />
            </div>
          </div>
        </div>

        {/* The Interactive Table */}
        <div className="table-wrapper">
          <table className="interactive-table">
            <thead>
              <tr>
                <th>Case Details</th>
                <th>Client Name</th>
                <th>Practice Area</th>
                <th>Filing Date</th>
                <th>Status</th>
                <th className="text-right">Manage</th>
              </tr>
            </thead>
            <tbody>
              {filteredCases.map(c => (
                <tr key={c.id} className="case-row">
                  <td>
                    <div className="case-info">
                      <span className="case-title">{c.title}</span>
                      <span className="case-lawyer">Lawyer Name: {c.lawyer}</span>
                    </div>
                  </td>
                  <td className="client-cell">{c.client}</td>
                  <td><span className="tag-outline">{c.type}</span></td>
                  <td>{new Date(c.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                  <td>
                    <div className={`status-indicator ${c.status.toLowerCase()}`}>
                      <span className="pulse-dot"></span>
                      {c.status}
                    </div>
                  </td>
                  <td className="text-right">
                    <div className="action-btns">
                      <Link to={`/edit/${c.id}`} className="icon-btn edit-btn" title="Edit">✏️</Link>
                      <button onClick={() => handleDelete(c.id)} className="icon-btn delete-btn" title="Delete">🗑️</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredCases.length === 0 && (
            <div className="empty-state">
              <p>No legal records match your current filters.</p>
            </div>
          )}
        </div>
      </div>
      </div>
    </div>
  );
}