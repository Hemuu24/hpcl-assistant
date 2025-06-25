import React, { useState } from "react";
import type { ChangeEvent, FC } from "react";
import "./AuthForm.css";
import hpclLogo from "../assets/images/hpcl-logo.png"; // Ensure the file is renamed without spaces

interface AuthFormProps {
  isSignup: boolean;
  onSwitch: () => void;
  onSuccess: () => void;
}

const AuthForm: FC<AuthFormProps> = ({ isSignup, onSwitch, onSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [department, setDepartment] = useState("operations");

  const handleSubmit = () => {
    if (isSignup) {
      localStorage.setItem(
        "user",
        JSON.stringify({ email, password, employeeId, department })
      );
      alert("✅ Account created! Please login.");
      onSwitch();
    } else {
      const stored = localStorage.getItem("user");
      if (!stored) return alert("⚠️ No account found. Please register.");
      const parsed = JSON.parse(stored);
      if (parsed.email === email && parsed.password === password) {
        localStorage.setItem("loggedIn", "true");
        onSuccess();
      } else {
        alert("❌ Invalid credentials");
      }
    }
  };

  return (
    <div className="page-container" style={styles.container}>
      <div style={styles.card}>
        <div style={styles.logoContainer}>
          <img src={hpclLogo} alt="HPCL Logo" style={styles.logo} />
          <h1 style={styles.header}>Emergency Response System</h1>
        </div>

        <h2 style={styles.title}>{isSignup ? "Employee Registration" : "Emergency Login"}</h2>

        {isSignup && (
          <>
            <input
              type="text"
              placeholder="Employee ID"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              style={styles.input}
            />
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              style={styles.input}
            >
              <option value="operations">Operations</option>
              <option value="maintenance">Maintenance</option>
              <option value="safety">Safety</option>
              <option value="emergency">Emergency Response</option>
              <option value="management">Management</option>
            </select>
          </>
        )}

        <input
          type="email"
          placeholder="Company Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        <button onClick={handleSubmit} style={styles.button}>
          {isSignup ? "Register" : "Login"}
        </button>

        <p style={styles.text}>
          {isSignup ? "Already registered?" : "Need an account?"}{" "}
          <span onClick={onSwitch} style={styles.link}>
            {isSignup ? "Login here" : "Register here"}
          </span>
        </p>

        {!isSignup && (
          <p style={styles.emergencyText}>
            For urgent help, call Security at <strong>X5555</strong>
          </p>
        )}
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    height: "100vh",
    background: "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(https://viscan.in/wp-content/uploads/2021/11/HPCL-Visakh-Refinery.jpg)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    background: "#fff",
    borderRadius: 10,
    padding: "2rem",
    width: 400,
    boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    borderTop: "5px solid #e31937",
  },
  logoContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "1rem",
  },
  logo: {
    height: 60,
    marginBottom: "0.5rem",
  },
  header: {
    fontSize: "1.3rem",
    textAlign: "center",
    color: "#333",
  },
  title: {
    textAlign: "center",
    fontSize: "1.1rem",
    fontWeight: 600,
    marginBottom: "0.5rem",
  },
  input: {
    padding: "0.75rem",
    fontSize: "1rem",
    borderRadius: 4,
    border: "1px solid #ccc",
    backgroundColor: "#fff",
  },
  button: {
    padding: "0.75rem",
    backgroundColor: "#e31937",
    color: "#fff",
    fontWeight: "bold",
    border: "none",
    borderRadius: 4,
    fontSize: "1rem",
    cursor: "pointer",
  },
  text: {
    fontSize: "0.9rem",
    textAlign: "center",
    color: "#444",
  },
  link: {
    color: "#e31937",
    cursor: "pointer",
    fontWeight: "bold",
  },
  emergencyText: {
    marginTop: "1rem",
    textAlign: "center",
    fontSize: "0.85rem",
    color: "#e31937",
    fontWeight: "bold",
    backgroundColor: "rgba(227, 25, 55, 0.1)",
    padding: "0.5rem",
    borderRadius: 4,
  },
};

export default AuthForm;
