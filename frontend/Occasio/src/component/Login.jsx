import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../api/api";

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
      setError("Please enter username/email and password");
      return;
    }
    
    try {
      setLoading(true);
      // First verify credentials and request OTP
      const payload = { 
        identifier, 
        password // Always send password for credential verification
      };
      const res = await api.post('auth/otp/request/', payload);
      setOtpMsg('OTP sent to your registered email/phone');
      setOtpStep(1); // Show OTP input after successful credential verification
    } catch (err) {
      console.error(err);
      const responseData = err?.response?.data;
      let errorMsg = "Invalid credentials";
      if (responseData) {
        if (typeof responseData === 'object' && responseData.detail) {
          errorMsg = responseData.detail;
        } else if (typeof responseData === 'string') {
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
    if (!identifier || !otpCode) return setError('Please enter identifier and OTP');
    try {
      setOtpLoading(true);
      const res = await api.post('auth/otp/verify/', { identifier, code: otpCode });
      if (res?.data) {
        // set auth tokens
        setAuth({ access: res.data.access, refresh: res.data.refresh, user: res.data.user });
        navigate('/');
      }
    } catch (e) {
      const d = e?.response?.data;
      setError(d?.detail || (typeof d === 'string' ? d : 'Invalid OTP'));
    } finally {
      setOtpLoading(false);
    }
  };

  return (
    <div className="container py-5" style={{ maxWidth: 600 }}>
      <h2 className="mb-4 text-center" style={{ color: "#17ddbcff" }}>Login</h2>
      <div className="card p-4 shadow-sm">
        <form onSubmit={handleSubmit}>
          {error && <div className="alert alert-danger">{error}</div>}

          <div className="mb-3">
            <label className="form-label">Username or Email</label>
            <input
              type="text"
              className="form-control"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="username or email"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>

          {otpStep === 0 ? (
            // Step 1: Show login button for credential verification
            <button type="submit" className="btn btn-primary w-100" disabled={loading}>
              {loading ? "Verifying credentials..." : "Login"}
            </button>
          ) : (
            // Step 2: Show OTP verification after credentials are verified
            <div className="mt-3">
              {otpMsg && <div className="alert alert-info mb-3">{otpMsg}</div>}
              <div className="mb-3">
                <label className="form-label">Enter OTP</label>
                <input type="text" className="form-control" value={otpCode} onChange={(e) => setOtpCode(e.target.value)} placeholder="123456" />
              </div>
              <button type="button" className="btn btn-success w-100" onClick={verifyOtp} disabled={otpLoading}>
                {otpLoading ? 'Verifying...' : 'Verify & Login'}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
