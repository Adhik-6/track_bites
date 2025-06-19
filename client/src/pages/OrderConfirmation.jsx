import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/orderConfirmation.css";
import useGlobalStore from "../stores/global.stores";


const OrderConfirmation = () => {
  const navigate = useNavigate();
  const { userData, trainDetails, setUser, setTrainDetails, clearSelectedItems } = useGlobalStore();

  const handleAnotherOrder = () => {
    setUser({}); // Reset user data
    setTrainDetails({}); // Reset train details
    clearSelectedItems(); // Clear selected items if you have such a function
    navigate("/menucategory");
  };

  return (
    <div className="card">
      <div className="checkmark">
        <i className="fa-solid fa-circle-check"></i>
      </div>
      <h2>Order Confirmed!</h2>
      <p>
        Thank you for your order, <span className="highlight">{userData.name}</span>!
      </p>
      <p>
        Your meal will be delivered to seat <span className="highlight">{trainDetails.seat}</span>
      </p>
      <p>
        on train <span className="highlight">{trainDetails.trainName}</span>
      </p>
      <p>
        Transaction ID (PNR): <span className="transaction">{trainDetails.pnr}</span>
      </p>
      <p>
        Estimated delivery: <span className="highlight">30 minutes</span>
      </p>
      <button className="btn" onClick={handleAnotherOrder}>
        Place Another Order 🍽️
      </button>
    </div>
  );
};

export default OrderConfirmation;
