import classes from "../Css/Home.module.css";
import React, { useContext, useState } from "react";
import { LoginContext } from "../Contexts/LoginContext";
import axios from "axios";
import { useHistory } from "react-router-dom";

axios.defaults.withCredentials = true;

function Login() {
  const history = useHistory();
  const { setUser } = useContext(LoginContext);

  const [userName, setuserName] = useState("");
  const [password, setpassword] = useState("");

  function login(e) {
    axios
      .post("http://localhost:3001/api/login", {
        userName: userName,
        password: password,
      })
      .then((result) => {
        if (result.data.userName !== "") {
          setUser(result.data);
          history.push("/");
        } else {
          document.getElementById("error").hidden = false;
        }
      });
    e.preventDefault();
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-8">
          <h4>Login</h4>
          <br />
          <div className={classes.card}>
            <form onSubmit={login}>
              <div className="form-group w-75">
                <input
                  onChange={(e) => {
                    setuserName(e.target.value);
                  }}
                  className="form-control"
                  type="text"
                  placeholder="Username"
                  required={true}
                />
              </div>
              <div className="form-group w-75">
                <input
                  onChange={(e) => {
                    setpassword(e.target.value);
                  }}
                  className="form-control"
                  type="password"
                  placeholder="Password"
                  required={true}
                />
              </div>
              <button className="btn btn-outline-success">Login</button>
            </form>
          </div>
          <br />
          <div
            id="error"
            hidden={true}
            className="alert alert-danger"
            role="alert"
          >
            Please check your credentials!
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;
