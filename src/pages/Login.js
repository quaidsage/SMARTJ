import React, { useState, useEffect } from "react";
import { loginUser } from "../services/ProfileService";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    general: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/my-profile");
    }
  }, [navigate]);

  const validate = () => {
    let valid = true;
    let errors = { email: "", password: "", general: "" };

    if (!email) {
      errors.email = "Invalid email";
      valid = false;
    }

    if (!password) {
      errors.password = "Invalid password";
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        await loginUser({ email, password });
        if (localStorage.getItem("token")) {
          navigate("/my-profile");
          window.location.reload();
        }
      } catch (error) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          general: "Login failed. Please check your email and password.",
        }));
      }
    }
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div className="container text-center mt-5">
      <h1 className="display-4 text-center mb-5">Login</h1>

      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email}</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && (
            <div className="invalid-feedback">{errors.password}</div>
          )}
        </div>
        {errors.general && (
          <div className="alert alert-danger" role="alert">
            {errors.general}
          </div>
        )}
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
      <button className="btn btn-primary" onClick={handleRegister}>
        Register
      </button>
    </div>
  );
}

export default Login;
