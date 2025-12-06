import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "./register.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [phone, setPhone] = useState("");
  const [isVendor, setIsVendor] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const navigate = useNavigate();
  const { register } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    const errors = {};
    if (!name) errors.name = "Name is required";
    if (!email) errors.email = "Email is required";
    else if (!/^[\w.-]+@[\w.-]+\.[A-Za-z]{2,}$/.test(email)) errors.email = "Invalid email";
    if (!phone) errors.phone = "Phone is required";
    if (!password) errors.password = "Password is required";
    if (!password2) errors.password2 = "Please confirm your password";
    if (password && password2 && password !== password2) errors.password2 = "Passwords do not match";

    // password rules
    const pwdRules = [];
    if (password.length >= 8) pwdRules.push(true); else pwdRules.push(false);
    if (/[A-Z]/.test(password)) pwdRules.push(true); else pwdRules.push(false);
    if (/[0-9]/.test(password)) pwdRules.push(true); else pwdRules.push(false);
    if (/[^A-Za-z0-9]/.test(password)) pwdRules.push(true); else pwdRules.push(false);

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }
    setFieldErrors({});

      try {
        setLoading(true);
        const role = isVendor ? 'vendor' : undefined;
        const res = await register({ username: name, email, password, password2, phone, role });
        if (res) navigate("/");
    } catch (err) {
      console.error(err);
        const resp = err?.response?.data;
        // Map server field errors to inline fieldErrors where possible
        if (resp && typeof resp === 'object') {
          const newFieldErrors = {};
          Object.keys(resp).forEach((k) => {
            // join messages if server returns list
            const v = Array.isArray(resp[k]) ? resp[k].join(' ') : String(resp[k]);
            if (k === 'non_field_errors' || k === 'detail') {
              setError(v);
            } else {
              // map backend field names to our form field names where different
              if (k === 'username') newFieldErrors['name'] = v;
              else newFieldErrors[k] = v;
            }
          });
          setFieldErrors((prev) => ({ ...prev, ...newFieldErrors }));
          // also show a compact summary of server errors in the main alert for visibility
          const summary = Object.values(resp).map((val) => Array.isArray(val) ? val.join(' ') : String(val)).join(' | ');
          if (!summary.includes('OTP sent') && summary.trim() !== '') setError(summary);
        } else {
          const msg = err?.message || "Registration failed";
          setError(msg);
        }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5" style={{ maxWidth: 700 }}>
      <h2 className="mb-4 text-center" style={{ color: "#17ddbcff" }}>Register</h2>
      <div className="card p-4 shadow-sm">
        <form onSubmit={handleSubmit}>
          {error && <div className="alert alert-danger">{error}</div>}

          <div className="mb-3">
            <label className="form-label">Full name</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your full name"
            />
            {fieldErrors.name && <div className="form-text text-danger">{fieldErrors.name}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
            {fieldErrors.email && <div className="form-text text-danger">{fieldErrors.email}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Choose a password"
            />
            {fieldErrors.password && <div className="form-text text-danger">{fieldErrors.password}</div>}

            {/* Password strength meter */}
            <div className="mt-2">
              <small>Password must have: </small>
              <ul className="mb-0" style={{ listStyle: 'none', paddingLeft: 0 }}>
                <li style={{ color: password.length >= 8 ? 'green' : 'red' }}>● At least 8 characters</li>
                <li style={{ color: /[A-Z]/.test(password) ? 'green' : 'red' }}>● An uppercase letter</li>
                <li style={{ color: /[0-9]/.test(password) ? 'green' : 'red' }}>● A number</li>
                <li style={{ color: /[^A-Za-z0-9]/.test(password) ? 'green' : 'red' }}>● A special character</li>
              </ul>
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              placeholder="Re-type your password"
            />
            {fieldErrors.password2 && <div className="form-text text-danger">{fieldErrors.password2}</div>}
          </div>

              <div className="mb-3">
                <label className="form-label">Phone</label>
                <input
                  type="tel"
                  className="form-control"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter your phone number"
                />
                {fieldErrors.phone && <div className="form-text text-danger">{fieldErrors.phone}</div>}
              </div>

              <div className="form-check mb-3">
                <input className="form-check-input" type="checkbox" value="" id="vendorCheck" checked={isVendor} onChange={(e) => setIsVendor(e.target.checked)} />
                <label className="form-check-label" htmlFor="vendorCheck">
                  Register as a vendor (I want to list services)
                </label>
              </div>

          <button type="submit" className="btn btn-success w-100" disabled={loading}>
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
