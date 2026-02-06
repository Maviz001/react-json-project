import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="lawyer-nav">
      <div className="container">
        <div className="nav-content">
        {/* Brand */}
        <Link className="nav-logo" to="/dashboard">
          <span className="logo-icon">⚖️</span>
          <div className="logo-text">
            <span className="main-logo">LEXGUARD</span>
            <span className="sub-logo">CASE MANAGEMENT</span>
          </div>
        </Link>

        {/* Mobile Toggle Button */}
        <button className={`menu-toggle ${isMenuOpen ? "active" : ""}`} onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>

        {/* Links & User Actions */}
        <div className={`nav-elements ${isMenuOpen ? "show" : ""}`}>
          <ul className="nav-links">
            <li><Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>Dashboard</Link></li>
            <li><Link to="/cases" onClick={() => setIsMenuOpen(false)}>Case List</Link></li>
            <li><Link to="/add-case" className="nav-cta" onClick={() => setIsMenuOpen(false)}>+ New Case</Link></li>
          </ul>

          <div className="nav-user">
            {user && (
              <div className="user-info">
                <span className="user-badge">{user.name.charAt(0)}</span>
                <span className="user-name">Hello, {user.name}</span>
              </div>
            )}
            <button className="logout-button" onClick={logout}>Logout</button>
          </div>
        </div>
      </div>
      </div>
    </nav>
  );
}