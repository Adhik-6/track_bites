import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import "./../styles/forgotPassword.css"; // Optional: if you have a CSS file
import axios from "axios";
import toast from "react-hot-toast";
import logo from "./../assets/logo.jpg"; 


export default function ForgotPassword() {
  const navigate = useNavigate();
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const token = queryParams.get("token");
  console.log("Token:", token); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPass !== confirmPass) {
      alert("Passwords do not match!");
      return;
    }
    // Add your password reset logic here
    // navigate("/login");
    if(!token) {
      alert("Invalid token");
      return;
    }
    try{
      const res = await axios.post("http://localhost:8000/api/auth/reset-password", { newPassword: newPass, token });
      if (res.data) {
        toast.success("Password reset successful");
        navigate("/");
      } else {
        toast.error("Password reset failed");
      }
    } catch (err) {
      console.error("Error while resetting password:", err);
      toast.error("An error occurred while processing your request");
    }
  };

  return (
    <div className="box">
      <h2>Reset Your Password</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="newpass">New Password</label>
        <input
          type="password"
          id="newpass"
          placeholder="Enter new password"
          required
          value={newPass}
          onChange={(e) => setNewPass(e.target.value)}
        />

        <label htmlFor="confirmpass">Confirm Password</label>
        <input
          type="password"
          id="confirmpass"
          placeholder="Confirm new password"
          required
          value={confirmPass}
          onChange={(e) => setConfirmPass(e.target.value)}
        />

        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
}
