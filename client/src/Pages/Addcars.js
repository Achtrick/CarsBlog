import { useState, React } from "react";
import axios from "axios";

function Addcars() {
  const [carName, setCarName] = useState("");
  const [carDescription, setCarDescription] = useState("");
  function setCar(e) {
    axios
      .post("http://localhost:3001/api/addcars", { carName, carDescription })
      .then((result) => {
        if (result.data === "SUCCESS") {
          alert("SUCCESS");
        } else {
          alert("ERROR!");
        }
      });
    e.preventDefault();
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-8">
          <h4>Add Cars</h4>
          <form onSubmit={setCar}>
            <div className="form-group w-75">
              <input
                onChange={(e) => {
                  setCarName(e.target.value);
                }}
                className="form-control"
                placeholder="Car Name"
                required={true}
                type="text"
              ></input>
            </div>
            <div className="form-group w-75">
              <textarea
                onChange={(e) => {
                  setCarDescription(e.target.value);
                }}
                className="form-control"
                placeholder="Car Description"
                required={true}
              ></textarea>
            </div>
            <div>
              <button className="btn btn-success">Add</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Addcars;
