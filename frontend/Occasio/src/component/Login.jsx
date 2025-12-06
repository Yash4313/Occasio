import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../api/api";
import "./Login.css"; // ✅ Use Login-specific CSS

const Login = () => {
  const [identifier, setIdentifier] = useState(""); // username or email
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login, setAuth } = useContext(AuthContext);
  const [otpStep, setOtpStep] = React.useState(0); // 0 = not requested, 1 = requested
  const [otpCode, setOtpCode] = React.useState("");
  const [otpLoading, setOtpLoading] = React.useState(false);
  const [otpMsg, setOtpMsg] = React.useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!identifier || !password) {
      setError("Please enter email and password");
      return;
    }

    try {
      setLoading(true);
      const payload = { identifier, password };
      const res = await api.post("auth/otp/request/", payload);
      setOtpMsg("OTP sent to your registered email/phone");
      setOtpStep(1);
    } catch (err) {
      console.error(err);
      const responseData = err?.response?.data;
      let errorMsg = "Invalid credentials";
      if (responseData) {
        if (typeof responseData === "object" && responseData.detail) {
          errorMsg = responseData.detail;
        } else if (typeof responseData === "string") {
          errorMsg = responseData;
        }
      } else if (err.message) {
        errorMsg = err.message;
      }
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    setError(null);
    if (!identifier || !otpCode) return setError("Please enter identifier and OTP");
    try {
      setOtpLoading(true);
      const res = await api.post("auth/otp/verify/", { identifier, code: otpCode });
      if (res?.data) {
        setAuth({ access: res.data.access, refresh: res.data.refresh, user: res.data.user });
        navigate("/");
      }
    } catch (e) {
      const d = e?.response?.data;
      setError(d?.detail || (typeof d === "string" ? d : "Invalid OTP"));
    } finally {
      setOtpLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Login</h2>
        <form onSubmit={handleSubmit}>
          {error && <div className="login-alert error">{error}</div>}

          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="text"
              className="form-input"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="email"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>

          {otpStep === 0 ? (
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? "Verifying credentials..." : "Login"}
            </button>
          ) : (
            <div className="otp-section">
              {otpMsg && <div className="login-alert info">{otpMsg}</div>}
              <div className="form-group">
                <label className="form-label">Enter OTP</label>
                <input
                  type="text"
                  className="form-input"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  placeholder="123456"
                />
              </div>
              <button
                type="button"
                className="btn-success"
                onClick={verifyOtp}
                disabled={otpLoading}
              >
                {otpLoading ? "Verifying..." : "Verify & Login"}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
