import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/signup.css";
import toast from "react-hot-toast";
import axios from "axios"; // If you need to make API calls
import useGlobalStore from "../stores/global.stores";
import logo from "./../assets/logo.jpg"; 



const Signup = () => {
  const { setUser, setToken } = useGlobalStore();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    phone: "",
    aadhaar: "",
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const res = await axios.post("http://localhost:8000/api/auth/signup", { form });
      if (res.data) {
        setUser(res.data?.user);
        setToken(res.data?.token);
        toast.success("Signup successful");
        navigate("/location");
      } else {
        toast.error("Signup failed:", res.data?.message);
      }
    } catch (err) {
      console.log("Error while signing up:", err);
      toast.error(err.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="signup-box">
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
        <h3>Create a New Account</h3>

        <label htmlFor="phone">Phone Number</label>
        <input
          type="text"
          id="phone"
          name="phone"
          placeholder="Enter phone number"
          value={form.phone}
          onChange={handleChange}
          required
        />

        <label htmlFor="aadhaar">Aadhaar Number</label>
        <input
          type="text"
          id="aadhaar"
          name="aadhaar"
          placeholder="Enter Aadhaar number"
          value={form.aadhaar}
          onChange={handleChange}
          required
        />

        <label htmlFor="name">Full Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter your name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">Email ID</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Create password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Sign Up & Continue</button>

        <div className="auth-links">
          <p>
            Already have an account?{" "}
            <span
              className="login-link"
              style={{ color: "#007bff", cursor: "pointer" }}
              onClick={() => navigate("/")}
            >
              Log In
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Signup;
