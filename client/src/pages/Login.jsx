import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./../styles/login.css"; // Assume you have a CSS file for styles
import axiosInstance from "./../utils/axiosInstance.utils.js"; // If you need to make API calls
import toast from "react-hot-toast";
import useGlobalStore from "../stores/global.stores";
import logo from "./../assets/logo.jpg"; 
import { useEffect } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { setUser, setToken, resetAll } = useGlobalStore()

  useEffect(() => {
    resetAll(null);
  }, []);

  const togglePassword = () => setShowPassword((prev) => !prev);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const res = await axiosInstance.post("/auth/login", { email, password });
      if (res.data) {
        setUser(res.data?.user);
        setToken(res.data?.token);
        toast.success("Login successful");
        navigate("/location");
      } else {
        toast.error("Login failed:", res.data?.message);
      }
    } catch (err) {
      console.log("Error while logging in:", err);
      toast.error(err.response?.data?.message || "An error occurred");
    }
  };

  const handleForgotPassword = async () => {
    if(!email) {
      toast.error("Please enter your email & click on forgot password");
      return;
    }
    try {
      const res = await axiosInstance.post("/auth/forgot-password", { email });
      if (res.data) {
        toast.success("Password reset link sent to your email");
      } else {
        toast.error("Failed to send password reset link");
      }
    } catch (err) {
      console.error("Error while handling forgot password:", err);
      toast.error("An error occurred while processing your request");
      
    }
    // navigate("/forgot-password");
  }

  return (
    <div className="login-page">
      <div className="login-box">
        <div className="header">
          <div className="head-cont">
            <div className="logo-container">
              <img style={{ width: "100%", height: "auto" }} src={logo} alt="Track bites logo" />
            </div>
            <h2>
              Track bites
            </h2>
          </div>
          <p>Pick my food</p>
        </div>

        <form onSubmit={handleSubmit}>
          <h3>Login to Your Account</h3>

          <label htmlFor="email">Email ID</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            id="email"
            placeholder="Enter your Email ID"
            required
          />

          <label htmlFor="password">Password</label>
          <div className="password-field">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Enter your password"
              required
            />
            <i
              className={`fa-regular ${showPassword ? "fa-eye-slash" : "fa-eye"} toggle-password`}
              onClick={togglePassword}
              style={{ cursor: "pointer" }}
              aria-label="Toggle password visibility"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") togglePassword();
              }}
            ></i>
          </div>

          <Link onClick={handleForgotPassword} className="forgot">
            Forgot Password?
          </Link>
          <button type="submit">
            Next <i className="fa-solid fa-arrow-right"></i>
          </button>

          <div className="auth-links">
            <p>
              Don’t have an account? <Link to="/signup">Sign Up</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
