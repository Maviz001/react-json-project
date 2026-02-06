import { useState } from "react";
import { addCase } from "../services/api";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function AddCase() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    client: "",
    lawyer: "",
    type: "",
    date: "",
    status: "Open",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addCase(form);
    navigate("/cases");
  };

  return (
    <div className="add-case-page">
      <Navbar />

      <div className="form-container">
        <div className="form-card">
          <header className="form-header">
            <div className="header-icon">📁</div>
            <div>
              <h2>New Case Intake</h2>
              <p>Initialize a new legal matter in the registry</p>
            </div>
          </header>

          <form onSubmit={handleSubmit} className="interactive-form">
            <div className="form-grid">
              {/* Left Column: Primary Details */}
              <div className="form-section">
                <div className="input-block">
                  <label>Case Title / Caption</label>
                  <input
                    name="title"
                    placeholder="e.g. Commonwealth vs. Miller"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="input-block">
                  <label>Client Name</label>
                  <input
                    name="client"
                    placeholder="Individual or Corporate Name"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="input-block">
                  <label>Lead Counsel</label>
                  <input
                    name="lawyer"
                    placeholder="Assigned Attorney"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Right Column: Metadata */}
              <div className="form-section">
                <div className="input-block">
                  <label>Practice Area</label>
                  <input
                    name="type"
                    placeholder="e.g. Real Estate, Criminal"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="input-block">
                  <label>Filing Date</label>
                  <input
                    type="date"
                    name="date"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="input-block">
                  <label>Initial Status</label>
                  <select name="status" onChange={handleChange} value={form.status}>
                    <option value="Open">Open / Active</option>
                    <option value="Closed">Closed / Archived</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="form-footer">
              <button type="button" className="btn-back" onClick={() => navigate("/cases")}>
                Cancel
              </button>
              <button type="submit" className="btn-add">
                Open Matter File
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}