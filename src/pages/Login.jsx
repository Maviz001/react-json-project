import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api"; // API call to check DB
import Navbar from "../components/Navbar"; // optional, can skip on login

export default function Login() {

 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const navigate = useNavigate();

 const handleLogin = async (e) => {
  e.preventDefault();

  try {
   const res = await loginUser(email, password); // returns array of users
   if (res.data.length > 0) {
    // User found in DB
    localStorage.setItem("user", JSON.stringify(res.data[0])); // save user in localStorage
    navigate("/dashboard"); // redirect to dashboard
   } else {
    alert("Invalid credentials");
   }
  } catch (error) {
   console.error("Login error:", error);
   alert("Something went wrong. Try again.");
  }
 };

 return (
//     <div classNameName="container">
//   <div classNameName="login-form">
//    <h2 classNameName="mb-4 text-center">Lawyer Case Management Login</h2>

//    <form onSubmit={handleLogin}>
//     <input
//      type="email"
//      classNameName="form-control mb-3"
//      placeholder="Email"
//      value={email}
//      onChange={(e) => setEmail(e.target.value)}
//      required
//     />

//     <input
//      type="password"
//      classNameName="form-control mb-3"
//      placeholder="Password"
//      value={password}
//      onChange={(e) => setPassword(e.target.value)}
//      required
//     />

//     <button classNameName="btn btn-primary w-100">Login</button>
//    </form>
//   </div>
  
//   </div>
<section classNameName="login-section">
    <div classNameName="container">
    <div className="login-container">
        <div className="login-card">
            <div className="brand-section">
            <div className="logo">⚖️</div>
            <h2>Case Management Portal</h2>
            {/* <p>Case Management Portal</p> */}
            </div>
            
            <form className="login-form" onSubmit={handleLogin}>
            <div className="input-group">
                <label>Email Address</label>
                <input
                    type="email"
                    classNameName="form-control mb-3"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    />
            </div>

            <div className="input-group">
                <label>Password</label>
                <input
                        type="password"
                        classNameName="form-control mb-3"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        />
            </div>
            <button type="submit" className="login-btn">
                Login
                <span className="arrow">→</span>
            </button>
            </form>
        </div>
</div>
</div>
</section>
 );
}
