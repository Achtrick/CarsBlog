import React, { useContext } from "react";
import { Link } from "react-router-dom";
import classes from "../Css/Navigation.module.css";
import { LoginContext } from "../Contexts/LoginContext";
import axios from "axios";
function Navigation(props) {
  const { setUser, user } = useContext(LoginContext);

  function logout() {
    axios.post("http://localhost:3001/api/logout").then((result) => {
      setUser(result.data);
    });
  }

  return (
    <div>
      <nav className="navbar navbar-light bg-light">
        <div className="navbar-brand">
          <Link to="/" className={classes.link}>
            <img src="./images/car.png" width="52px" height="52px" alt="Logo" />
          </Link>
        </div>
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            {user.userName ? (
              <Link to="/addcars" className={classes.link}>
                <h5 className={classes.navLink}>Add Cars </h5>
              </Link>
            ) : (
              <div />
            )}
          </li>
        </ul>
        <ul className="nav-item">
          {user.userName ? (
            <li className="nav-link">
              <div className={classes.link}>
                <div className="container">
                  <div className="row">
                    <div className="col-4">
                      <div className={classes.user}>{user.userName}</div>
                    </div>
                    <div className="col-4">
                      <button
                        style={{ margin: "7px" }}
                        className={classes.btnlogout}
                        onClick={logout}
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ) : (
            <li className="nav-link">
              <Link to="/login" className={classes.link}>
                <button className={classes.btnlogin}>Login</button>
              </Link>
            </li>
          )}
        </ul>
      </nav>
      <div className="container">
        <br />
        <div className="row">
          <div className="col-12"></div>
          {props.children}
        </div>
      </div>
    </div>
  );
}
export default Navigation;
