import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./../styles/menuCategory.css"; // Assume you have corresponding CSS
import useGlobalStore from "../stores/global.stores";
import logo from "./../assets/logo.jpg"; 


export default function MenuCategory() {
  const {selectedCategory, setSelectedCategory, categories, preference} = useGlobalStore();
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

      <h3>Select Menu Category</h3>
      <p>Choose your meal category:</p>

      <div className="meal-options">
        {categories.map((cat) => (
          <div
            key={cat}
            className={`meal-box${selectedCategory === cat ? " selected" : ""}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </div>
        ))}
      </div>

      <div className="buttons">
        <button
          className="btn btn-prev"
          onClick={() => navigate("/preference")}
        >
          ← Previous
        </button>
        <button
          className="btn btn-next"
          onClick={() => navigate(preference==="veg"?"/veg-menu":"/nonveg-menu")}
        >
          Next →
        </button>
      </div>
    </div>
  );
}
