import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import { AuthContext } from '../context/AuthContext';

const OTPLogin = () => {
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [step, setStep] = useState(1); // 1=request, 2=verify
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);

  const requestOtp = async () => {
    setError(null);
    setMsg(null);
    if (!phone) return setError('Please enter phone number');
    try {
      setLoading(true);
      const res = await api.post('auth/otp/request/', { phone });
      setMsg(res.data.detail || 'OTP sent');
      // In DEBUG the backend may return otp; show it for dev convenience
      if (res.data.otp) setMsg((p) => p + ` (dev-otp: ${res.data.otp})`);
      setStep(2);
    } catch (e) {
      const d = e?.response?.data;
      setError(d?.detail || (typeof d === 'string' ? d : 'Failed to request OTP'));
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    setError(null);
    setMsg(null);
    if (!phone || !code) return setError('Phone and code are required');
    try {
      setLoading(true);
      const res = await api.post('auth/otp/verify/', { phone, code });
      if (res?.data) {
        // set auth (access, refresh, user)
        setAuth({ access: res.data.access, refresh: res.data.refresh, user: res.data.user });
        navigate('/');
      }
    } catch (e) {
      const d = e?.response?.data;
      setError(d?.detail || (typeof d === 'string' ? d : 'Invalid OTP'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5" style={{ maxWidth: 600 }}>
      <h2 className="mb-4 text-center" style={{ color: '#17ddbcff' }}>Login with OTP</h2>
      <div className="card p-4 shadow-sm">
        <div>
          {msg && <div className="alert alert-success">{msg}</div>}
          {error && <div className="alert alert-danger">{error}</div>}

          {step === 1 && (
            <>
              <div className="mb-3">
                <label className="form-label">Phone</label>
                <input type="tel" className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+919876543210" />
              </div>
              <button className="btn btn-primary w-100" onClick={requestOtp} disabled={loading}>{loading ? 'Requesting...' : 'Request OTP'}</button>
            </>
          )}

          {step === 2 && (
            <>
              <div className="mb-3">
                <label className="form-label">Enter OTP</label>
                <input type="text" className="form-control" value={code} onChange={(e) => setCode(e.target.value)} placeholder="123456" />
              </div>
              <button className="btn btn-primary w-100" onClick={verifyOtp} disabled={loading}>{loading ? 'Verifying...' : 'Verify & Login'}</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default OTPLogin;
