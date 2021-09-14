import React, { useEffect, useState, useContext } from "react";
import { LoginContext } from "../Contexts/LoginContext";
import axios from "axios";
import classes from "../Css/Home.module.css";

function Home() {
  const { user } = useContext(LoginContext);
  const [comment, setComment] = useState("");
  const [carsList, setCarsList] = useState([]);

  function insertComment(e, id) {
    axios
      .put("http://localhost:3001/api/insertComment", {
        id: id,
        comment: comment,
        user: user,
      })
      .then(() => {
        axios.get("http://localhost:3001/api/getCars").then((result) => {
          setCarsList(result.data);
        });
      });
    e.preventDefault();
  }

  useEffect(() => {
    axios.get("http://localhost:3001/api/getCars").then((result) => {
      setCarsList(result.data);
    });
  }, []);
  return (
    <div>
      {carsList.map((car) => {
        return (
          <div key={car._id} className={classes.card}>
            <h6>{car.name}</h6>
            <br />
            <img className={classes.image} src={car.image} alt={car.name}></img>
            <hr />
            <pre className={classes.description}>{car.description}</pre>
            <br />
            {user.userName !== "" ? (
              <div>
                <div className="container">
                  <div className="row">
                    <div className="col-2" align="right">
                      <button
                        type="submit"
                        form={car._id + car.name}
                        className="btn btn-outline-success"
                      >
                        <i className="fas fa-paper-plane"></i>
                      </button>
                    </div>
                    <div className="col-8" align="left">
                      <form
                        id={car._id + car.name}
                        onSubmit={(e) => {
                          insertComment(e, car._id);
                          document.getElementById(car._id).value = "";
                        }}
                      >
                        <div className="form-group">
                          <textarea
                            onKeyUp={() => {
                              let element = document.getElementById(car._id);
                              element.style.height = "1px";
                              element.style.height =
                                25 + element.scrollHeight + "px";
                            }}
                            onChange={(e) => {
                              setComment(e.target.value);
                            }}
                            className="form-control sm"
                            id={car._id}
                            rows="1"
                            required={true}
                          ></textarea>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <br />
                {car.comments.map((comment) => {
                  return (
                    <div key={comment.id} className="container">
                      <div className="row">
                        <div className="col-2" align="right">
                          <div className={classes.user}>{comment.name}</div>
                        </div>
                        <div className="col-10" align="left">
                          <div className={classes.comment}>
                            {comment.comment}
                          </div>
                        </div>
                        <br />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div></div>
            )}
          </div>
        );
      })}
    </div>
  );
}
export default Home;
