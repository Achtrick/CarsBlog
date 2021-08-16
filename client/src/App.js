import "./App.css";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import Navigation from "./Navigation";
import { LoginContext } from "./Contexts/LoginContext";
import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [user, setUser] = useState({});

  useEffect(() => {
    axios.get("http://localhost:3001/api/getlogin").then((result) => {
      setUser(result.data);
    });
  }, []);

  return (
    <BrowserRouter>
      <LoginContext.Provider value={{ user, setUser }}>
        <Navigation>
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            {user.userName !== "" ? (
              <Redirect to="/" />
            ) : (
              <Route path="/login" exact>
                <Login />
              </Route>
            )}
            <div align="center">
              <br />
              <h1>404 NOT FOUND !</h1>
            </div>
          </Switch>
        </Navigation>
      </LoginContext.Provider>
    </BrowserRouter>
  );
}

export default App;
