import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { updateCase } from "../services/api";
import Navbar from "../components/Navbar";

export default function EditCase() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    title: "",
    client: "",
    lawyer: "",
    type: "",
    date: "",
    status: "Open"
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    axios.get(`http://localhost:3001/cases/${id}`)
      .then((res) => {
        setForm(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateCase(id, form);
    navigate("/cases");
  };

  if (loading) return <div className="loader">Updating File Registry...</div>;

  return (
    <div className="edit-case-page">
      <Navbar />

      <div className="form-container">
        <div className="form-card">
          <header className="form-header">
            <div className="header-icon">⚖️</div>
            <div>
              <h2>Modify Legal Record</h2>
              <p>Case Reference: # {id.slice(-6).toUpperCase()}</p>
            </div>
          </header>

          <form onSubmit={handleSubmit} className="interactive-form">
            <div className="form-grid">
              {/* Left Column */}
              <div className="form-section">
                <div className="input-block">
                  <label>Case Title</label>
                  <input
                    name="title"
                    placeholder="e.g. Smith vs. Global Corp"
                    value={form.title}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="input-block">
                  <label>Client Full Name</label>
                  <input
                    name="client"
                    placeholder="Principal Party Name"
                    value={form.client}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="input-block">
                  <label>Lawyer Name</label>
                  <input
                    name="lawyer"
                    placeholder="Assigning Lawyer"
                    value={form.lawyer}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Right Column */}
              <div className="form-section">
                <div className="input-block">
                  <label>Practice Area / Type</label>
                  <input
                    name="type"
                    placeholder="e.g. Civil Litigation"
                    value={form.type}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="input-block">
                  <label>Date of Filing</label>
                  <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="input-block">
                  <label>Current Status</label>
                  <select name="status" value={form.status} onChange={handleChange}>
                    <option value="Open">Active / Open</option>
                    <option value="Closed">Closed / Resolved</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="form-footer">
              <button type="button" className="btn-cancel" onClick={() => navigate("/cases")}>
                Discard Changes
              </button>
              <button type="submit" className="btn-submit">
                Finalize & Save Record
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}