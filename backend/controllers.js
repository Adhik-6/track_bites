import User from "./models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import Razorpay from "razorpay";
import axios from "axios";
import twilio from "twilio";
import { URLSearchParams } from "url";
dotenv.config();

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "User not found" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

  res.json({
    message: "Login successful",
    token,
    user: { id: user._id, name: user.name, email: user.email, name: user.name, phone: user.phone },
  });
};

const logout = (req, res) => {
  // In a stateless JWT authentication system, logout is typically handled on the client side
  // by removing the token from local storage or cookies.
  res.json({ message: "Logout successful" });
};

const signup = async (req, res) => {
  const { form } = req.body;
  const existing = await User.findOne({ email: form.email });
  if (existing) return res.status(400).json({ message: "User already exists" });

  const user = await User.create( form );

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

  res.status(201).json({ message: "Signup successful", token, user: { id: user._id, email: user.email, name: user.name, phone: user.phone } });
};

const forgetPassword = async (req, res) => {
  const frontendUrl = process.env.NODE_ENV === "production" ? process.env.FRONTEND_URL : process.env.FRONTEND_URL_DEV;
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "15m" });
    const resetLink = `${frontendUrl}/reset-password?token=${token}`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_ID,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_ID,
      to: email,
      subject: "Password Reset",
      html: `<p>Click <a href="${resetLink}">here</a> to reset your password. This link expires in 15 minutes.</p>`,
    });
    res.json({ message: "Password reset link sent to email" });
  } catch (err) {
    return res.status(500).json({ message: "Error processing request" });
  }
};

const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("running");
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.password = newPassword;
    await user.save();
    // console.log("Password reset successful for user:", user.email);
    res.json({ message: "Password reset successful" });
  } catch (err) {
    return res.status(400).json({ message: "Invalid or expired token" });
  }
}

const sendSms = async (req, res) => {

  const { number } = req.body
  console.log("Sending SMS to:", number);
  const smsMessage = 'Your order booking has been confirmed!';

  try {
    const success = await sendFast2SMSQuickSMS([number], smsMessage);
    if (success) {
      console.log('Process completed for Quick SMS.');
      res.json({ message: 'SMS sent successfully!' });
    } else {
      console.log('Quick SMS process failed, check logs for details.');
      res.status(500).json({ message: 'Failed to send SMS.' });
    }
  } catch (error) {
    console.error('An error occurred during Quick SMS initiation:', error.message);
    res.status(500).json({ message: 'An error occurred while sending SMS.' });
  }
}

async function sendFast2SMSQuickSMS(numbers, message) {
  const url = 'https://www.fast2sms.com/dev/bulkV2';

  try {
    console.log('Sending Quick SMS...');

    const payload = new URLSearchParams();
    payload.append('message', message);
    payload.append('route', 'q');
    payload.append('numbers', numbers.join(',')); // ensure comma-separated string

    const response = await axios.post(url, payload.toString(), {
      headers: {
        authorization: process.env.FAST2SMS_API_KEY,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    console.log('Fast2SMS Quick SMS Response:', response.data);

    if (response.data.return === true) {
      console.log('✅ Quick SMS sent successfully!');
      return true;
    } else {
      console.error('❌ Fast2SMS Quick SMS failed:', response.data.message);
      return false;
    }

  } catch (error) {
    console.error('Error sending Quick SMS:', error.response?.data || error.message);
    throw error;
  }
}


const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const bookOrder = async (req, res) => {
  const { amount, currency = "INR", receipt } = req.body;

  try {
    const options = {
      amount: amount * 100, // amount in paise
      currency,
      receipt: receipt || `rcpt_${Date.now()}`,
    };

    const order = await razorpayInstance.orders.create(options);
    console.log("Razorpay order created:");
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: "Failed to create Razorpay order" });
  }
};

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: No token" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid token" });
  }
};



export { login, logout, forgetPassword, bookOrder, signup, resetPassword, sendSms, verifyToken };


// const loadRazorpay = async () => {
//   const orderRes = await axios.post("/api/payment/book", {
//     amount: 500, // INR ₹5.00
//   });

//   const options = {
//     key: "RAZORPAY_KEY_ID", // replace with your key
//     amount: orderRes.data.amount,
//     currency: "INR",
//     name: "My Shop",
//     description: "Test Transaction",
//     order_id: orderRes.data.id,
//     handler: async function (response) {
//       // Optionally verify payment on backend
//       await axios.post("/api/payment/send-sms", response);
//       alert("Payment successful!");
//     },
//     prefill: {
//       name: "A.M",
//       email: "am@example.com",
//     },
//   };

//   const rzp = new window.Razorpay(options);
//   rzp.open();
// };
