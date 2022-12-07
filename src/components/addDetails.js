import React, { useState } from "react";
import Pdf from "../components/WHO.pdf";
var bg = require("../CVDback10.jpg");

// const styles = {
//     main: {
//         backgroundImage: `url(${bg})`,
//         backgroundPosition: 'center',
//         backgroundSize: 'cover',
//         backgroundRepeat: 'no-repeat',
//         width: '100vw',
//         height: '100vh'
//     }
// };

export default function AddDetails() {
  const [age, setAge] = useState("");
  const [sex, setSex] = useState("");
  const [bloodpressure, setbloodpressure] = useState("");
  const [cholesterol, setCholesterol] = useState("");
  const [diabetes, setDiabetes] = useState("");
  const [smoking, setSmoking] = useState("");
  const [output, setOutput] = useState("");
  const [resultColor, setResultColor] = useState("");
  const [resultBackColor, setResultBackColor] = useState("");
  const [cholesterolError, setcholesterolError] = useState("");
  const [bloodpressureError, setbloodpressureError] = useState("");

  function sendData(e) {
    e.preventDefault();

    const jsonObj = {
      age: age,
      sex: sex,
      bloodpressure: bloodpressure,
      cholesterol: cholesterol,
      diabetes: diabetes,
      smoking: smoking,
    };

    function validate() {
      let bloodpressureError = "";
      let cholesterolError = "";

      if (bloodpressure < 70 || bloodpressure > 260) {
        bloodpressureError = "Blood pressure should be between 70 - 260";
        // setbloodpressureError("Blood pressure should be between 90 - 200");
      }
      if (cholesterol < 100 || cholesterol > 400) {
        cholesterolError = "Cholesterol level should be between 100 - 400";
        // setcholesterolError("Cholesterol level should be between 129 - 321");
      }

      if (bloodpressureError || cholesterolError) {
        setbloodpressureError(bloodpressureError);
        setcholesterolError(cholesterolError);
        return false;
      } else {
        setbloodpressureError("");
        setcholesterolError("");
        return true;
      }
    }

    function generateResult(data) {
      if (data === 0) {
        setResultColor("rgb(33, 195, 84)");
        setResultBackColor("rgba(9, 171, 59, 0.2)");
        setOutput("No risk of cardiovascular disease in the next ten years");
        //setOutput("Your Risk is < 20% ");
      } else if (data === 1) {
        setResultColor("rgb(255, 75, 75)");
        setResultBackColor("rgba(255, 75, 75, 0.2)");
        //setOutput("Your Risk is > 20%");
        setOutput("High risk of cardiovascular disease in the next ten years");
      } else {
        alert("All the inputs are required");
      }
    }

    const isValid = validate();

    // Simple POST request with a JSON body using fetch
    if (isValid) {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jsonObj),
      };
      fetch(
        "https://cvd-restapi.herokuapp.com/cardiac_prediction",
        requestOptions
      )
        .then((response) => response.json())
        .then((data) => generateResult(data));
    }
  }

  const resetHandler = () => {
    setAge("");
    setSex("");
    setbloodpressure("");
    setCholesterol("");
    setDiabetes("");
    setSmoking("");
    setOutput("");
    setResultBackColor("");
    setbloodpressureError("");
    setcholesterolError("");
  };

  return (
    <div
      class="div1"
      style={{
        backgroundImage: `url(${bg})`,
      }}
    >
      <nav class="navbar navbar-light" style={{ backgroundColor: "#600" }}>
        <span class="navbar-brand mb-0 h1" style={{ color: "white" }}>
          CVD Predictor
        </span>
        <span class="navbar-brand mb-0 h1">
          <a href={Pdf} target="_blank">
            <button
              class="btn btn-shadow-lg btn-warning "
              id="btnPdf"
              title="Download WHO Chart"
              float="right"
              style={{
                fontSize: "13px",
                textAlign: "center",
                verticalAlign: "middle",
                borderRadius: "16px",
                fontWeight: "bold",
                outline: "#b36104 solid 3px",
                // paddingTop:'4px',
                // paddingBottom:'4px'
              }}
            >
              WHO Chart{" "}
            </button>
          </a>
        </span>
      </nav>
      <div class="borderClass" id="borderClass">
        <div
          className="d-flex justify-content-center"
          id="d-flex-justify-content-center"
        >
          <h1 id="d-flex-justify-content-center-h">
            {" "}
            10 - Year CVD Risk Prediction of Sri Lankans
          </h1>
        </div>

        <div class="form-group" className="d-flex justify-content-center">
          <form onSubmit={sendData}>
            <div class="form-group row">
              <label class="col-sm col-form-label" id="col-sm-col-form-label">
                Age
              </label>
              <div class="col-sm text-center">
                <input
                  style={{
                    backgroundColor: "#201b1b",
                    color: "white",
                    width: "100%",
                  }}
                  type="number"
                  class="form-control"
                  id="age"
                  placeholder="years"
                  value={age}
                  onChange={(e) => {
                    setAge(e.target.value);
                  }}
                  required
                />
                <div class="placeholder" style={{ color: "white" }}>
                  years
                </div>
              </div>
            </div>

            <div class="form-group row">
              <label class="col-sm col-form-label" id="col-sm-col-form-label">
                Gender
              </label>
              <div class="col-sm text-center">
                <select
                  style={{
                    backgroundColor: "#201b1b",
                    color: "white",
                    width: "100%",
                  }}
                  class="custom-select my-1 mr-sm-2"
                  id="gender"
                  onChange={(e) => {
                    setSex(e.target.value);
                  }}
                  required
                >
                  <option value="" selected>
                    Choose...
                  </option>
                  <option value="1">Male</option>
                  <option value="0">Female</option>
                </select>
              </div>
            </div>

            <div class="form-group row">
              <label class="col-sm col-form-label" id="col-sm-col-form-label">
                Blood Pressure
              </label>
              <div class="col-sm">
                <input
                  style={{
                    backgroundColor: "#201b1b",
                    color: "white",
                    width: "100%",
                  }}
                  type="decimal"
                  class="form-control"
                  id="bloodPressure"
                  placeholder="mmHg"
                  value={bloodpressure}
                  onChange={(e) => {
                    setbloodpressure(e.target.value);
                  }}
                  required
                />
                <div class="placeholder" style={{ color: "white" }}>
                  mmHg
                </div>
              </div>
            </div>

            <div
              class="d-flex justify-content-center align-top"
              id="bloodpressureError"
            >
              {bloodpressureError}
            </div>

            <div class="form-group row">
              <label class="col-sm col-form-label" id="col-sm-col-form-label">
                Cholesterol Level
              </label>
              <div class="col-sm">
                <input
                  style={{
                    backgroundColor: "#201b1b",
                    color: "white",
                    width: "100%",
                  }}
                  type="float"
                  class="form-control"
                  id="cholesterolLevel"
                  placeholder="mg/dl"
                  onChange={(e) => {
                    setCholesterol(e.target.value);
                  }}
                  required
                />
                <div class="placeholder" style={{ color: "white" }}>
                  mg/dl
                </div>
              </div>
            </div>

            <div
              class="d-flex justify-content-center align-top"
              id="cholesterolError"
            >
              {cholesterolError}
            </div>

            <div class="form-group row">
              <label class="col-sm col-form-label" id="col-sm-col-form-label">
                Diabetes Patient
              </label>
              <div class="col-sm text-center">
                <select
                  style={{
                    backgroundColor: "#201b1b",
                    color: "white",
                    width: "100%",
                  }}
                  class="custom-select my-1 mr-sm-2"
                  id="diabetes"
                  onChange={(e) => {
                    setDiabetes(e.target.value);
                  }}
                  required
                >
                  <option value="" selected>
                    Choose...
                  </option>
                  <option value="1">Yes</option>
                  <option value="2">No</option>
                </select>
              </div>
            </div>

            <div class="form-group row">
              <label class="col-sm col-form-label" id="col-sm-col-form-label">
                Smoking
              </label>
              <div class="col-sm text-center">
                <select
                  style={{
                    backgroundColor: "#201b1b",
                    color: "white",
                    width: "100%",
                  }}
                  class="custom-select my-1 mr-sm-2"
                  id="smoking"
                  onChange={(e) => {
                    setSmoking(e.target.value);
                  }}
                  required
                >
                  <option value="" selected>
                    Choose...
                  </option>
                  <option value="1" style={{}}>
                    Never
                  </option>
                  <option value="2">Stopped Recently</option>
                  <option value="3">Occasionally</option>
                  <option value="4">Everday</option>
                </select>
              </div>
            </div>

            <button
              style={{
                borderColor: "white",
              }}
              type="submit"
              class="btn btn-danger"
              id="btn-btn-primary"
              disabled={
                !age ||
                !sex ||
                !bloodpressure ||
                !cholesterol ||
                !diabetes ||
                !smoking
              }
            >
              SUBMIT
            </button>
            <div></div>
            <button
              style={{
                marginTop: 25,
                borderColor: "white",
              }}
              type="reset"
              class="btn"
              id="btn-btn-outline-primary"
              onClick={resetHandler}
            >
              RESET
            </button>
          </form>
        </div>

        <div
          style={{ marginTop: 40 }}
          className="d-flex justify-content-center"
        >
          <div
            className="card-header text-center font-weight-bold"
            id="card-header-text-center-font-weight-bold"
            style={{ backgroundColor: resultBackColor, width: "110%" }}
          >
            <p
              className="card-text text-center"
              id="card-text-text-center"
              style={{ color: resultColor }}
            >
              {output}
            </p>

            {/* <div className="card-body" style={{minHeight:45, backgroundColor: '#D1F1E6'}}>

                        
                     </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
