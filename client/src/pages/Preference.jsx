import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/preference.css";
import useGlobalStore from "../stores/global.stores";
import logo from "./../assets/logo.jpg"; 


const Preference = () => {
  const {preference, setPreference} = useGlobalStore();
  const navigate = useNavigate();

  const handleSelect = (type) => {
    setPreference(type);
  };

  return (
    <div className="container">
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

      <h3>Select Food Preference</h3>
      <p>Choose your food type:</p>

      <div className="food-options">
        <div
          className={`food-box${preference === "veg" ? " selected" : ""}`}
          onClick={() => handleSelect("veg")}
        >
          🥬 Vegetarian
        </div>
        <div
          className={`food-box${preference === "nonveg" ? " selected" : ""}`}
          onClick={() => handleSelect("nonveg")}
        >
          🍗 Non-Vegetarian
        </div>
      </div>

      <div className="buttons">
        <button
          className="btn btn-prev"
          onClick={() => navigate("/location")}
        >
          ← Previous
        </button>
        <button
          className="btn btn-next"
          onClick={() => navigate("/menucategory")}
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default Preference;
