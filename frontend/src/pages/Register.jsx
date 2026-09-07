import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await register(name, email, password, role);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div style={{ padding: 24, maxWidth: 360 }}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <br />
        <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <br />
        <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <br />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="user">User (attend events)</option>
          <option value="organizer">Organizer (create events)</option>
        </select>
        <br />
        <button type="submit">Register</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
}
