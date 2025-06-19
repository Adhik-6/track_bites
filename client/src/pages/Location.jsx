import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./../styles/location.css"; // Assume you have a CSS file for styles
import useGlobalStore from "../stores/global.stores";
import logo from "./../assets/logo.jpg"; 


export default function Location() {
  const { location, setLocation, stations } = useGlobalStore();
  const navigate = useNavigate();

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

      <h3>Select Your Zone</h3>

      <div className="zones">
        {stations.map((s, idx) => (
          <div
            key={idx}
            className={`station-box ${location === idx ? "selected" : ""}`}
            onClick={() => setLocation(idx)}
          >
            {s.zone}
            <br />
            {s.station}
          </div>
        ))}
      </div>

      <div className="buttons">
        <button className="btn" onClick={() => navigate("/")}>
          ← Previous
        </button>
        <button
          className="btn"
          onClick={() => navigate("/preference")}
          disabled={location === null}
        >
          Next →
        </button>
      </div>
    </div>
  );
}
