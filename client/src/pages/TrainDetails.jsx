import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/trainDetails.css";
import useGlobalStore from "../stores/global.stores";
import logo from "./../assets/logo.jpg"; 


const TrainDetails = () => {
  const [trainName, setTrainName] = useState("");
  const [pnr, setPnr] = useState("");
  const [seat, setSeat] = useState("");
  const navigate = useNavigate();
  const { trainDetails, setTrainDetails, preference } = useGlobalStore();

  useEffect(() => {
    // Reset train details when component mounts
    setTrainName(trainDetails?.trainName || "");
    setPnr(trainDetails?.pnr || "");
    setSeat(trainDetails?.seat || "");
  }, []);

  const handleNext = () => {
    if (!trainName || !pnr || !seat) {
      alert("Please fill all the fields!");
      return;
    }
    setTrainDetails({ trainName, pnr, seat });
    navigate("/payment");
  };

  const handlePrevious = () => {
    navigate(preference==="veg"?"/veg-menu":"/nonveg-menu");
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

      <h3>Enter Train Details</h3>

      <div className="form-group">
        <label htmlFor="trainName">Train Name</label>
        <input
          type="text"
          id="trainName"
          placeholder="e.g. Indian Express"
          value={trainName}
          onChange={(e) => setTrainName(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="pnr">PNR Number</label>
        <input
          type="text"
          id="pnr"
          placeholder="e.g. 220988943"
          value={pnr}
          onChange={(e) => setPnr(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="seat">Seat Number</label>
        <input
          type="text"
          id="seat"
          placeholder="e.g. 23 A"
          value={seat}
          onChange={(e) => setSeat(e.target.value)}
        />
      </div>

      <div className="buttons">
        <button className="btn" onClick={handlePrevious}>
          ← Previous
        </button>
        <button className="btn" onClick={handleNext}>
          Next →
        </button>
      </div>
    </div>
  );
};

export default TrainDetails;
