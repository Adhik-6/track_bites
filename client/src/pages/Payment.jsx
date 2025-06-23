import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/payment.css";
import axiosInstance from "./../utils/axiosInstance.utils.js"; // Ensure axios is installed and imported
import useGlobalStore from "../stores/global.stores"; // Import your global store if needed
import toast from "react-hot-toast";
import logo from "./../assets/logo.jpg"; 


const Payment = () => {
  const navigate = useNavigate();
  const { stations, location, selectedCategory, preference, userData, trainDetails, token, selectedItems } = useGlobalStore();
  const handlePrev = () => {
    navigate("/traindetails");
  };

  const handleConfirm = () => {
    loadRazorpay();
  };

  const loadRazorpay = async () => {
    const orderRes = await axiosInstance.post("/payment/book", {
      amount: 500, // INR ₹5.00
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: orderRes.data.amount,
      currency: "INR",
      name: "My Shop",
      description: "Test Transaction",
      order_id: orderRes.data.id,
      handler: async function (response) {
        try {
          // Attempt to send SMS but don't let it block navigation
          const res = await axiosInstance.post(
            "/payment/send-sms",
            { paymentResponse: response, number: userData.phone, email: userData.email },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          navigate("/order-confirmation");
        } catch (error) {
          console.error("Failed to send SMS:", error);
          // Optionally, you can show a non-blocking toast message
          toast.error("Could not send order confirmation SMS.");
        } finally {
          toast.success("Order placed successfully!"); // Show success toast regardless of SMS status
        }
        // Attempt to show the toast, but don't let it crash the app
        try {
          toast.success("Payment successful!");
        } catch (e) {
          console.error("Toast notification failed:", e);
        }
        // These lines will now execute even if the SMS sending fails
        console.log("✅ Payment Successful", response);
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.on('payment.failed', function (response) {
      console.log("❌ Payment Failed", response.error);
      toast.error("Payment failed: " + response.error.description);
    });
    rzp.open();
  };

  return (
    <div className="container">
      <div className="header">
        <div className="head-cont">
          <div className="logo-container">
            <img style={{ width: "100%", height: "100%" }} src={logo} alt="Track bites logo" />
          </div>
          <h2>
            Track bites
          </h2>
        </div>
        <p>Pick my food</p>
      </div>


      <h3>Order Summary & Payment</h3>

      <div className="summary">
        <p>
          <span>Mail ID:</span> {userData.name}
        </p>
        <p>
          <span>Location:</span> {stations[location].zone}
        </p>
        <p>
          <span>Menu Category:</span> {selectedCategory}
        </p>
        <p>
          <span>Food Preference:</span> {preference.toLowerCase() === "veg" ? "Vegetarian" : "Non-Vegetarian"}
        </p>
        <p>
          <span>Train Name:</span> {trainDetails.trainName}
        </p>
        <p>
          <span>PNR Number:</span> {trainDetails.pnr}
        </p>
        <p>
          <span>Seat Number:</span> {trainDetails.seat}
        </p>
        <p>
          <span>Items:</span>
          <div className="ordered-items">
          {selectedItems.map((item, idx) => (
            <p key={idx}>
              {idx + 1}. {item}
              <br />
            </p>
          ))}
          </div>
        </p>
      </div>

      <div className="buttons">
        <button className="btn btn-prev" onClick={handlePrev}>
          ← Previous
        </button>
        <button className="btn btn-confirm" onClick={handleConfirm}>
          Proceed →
        </button>
      </div>
    </div>
  );
};

export default Payment;
