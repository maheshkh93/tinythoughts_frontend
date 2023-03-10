import { Button, TextField } from "@mui/material";
import React, { useContext } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changeGlobalUsername } from "../../counterSlice";
import "./login.css";
import UserGlobalContext from "../../shared/Data/UserGlobalContext";
import { customGet, customPost } from "../../Utilitites/custom-fetch";
import { color } from "@mui/system";
import Header from "../../shared/Header";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { setGlobalUsername } = useContext(UserGlobalContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function login() {
    if (username && password) {
      customGet(`/authenticate?username=${username}&password=${password}`).then(
        (response) => {
          if (response.result == true) {
            // setting info in local-storage to have global access
            //setGlobalUsername(username)

            dispatch(changeGlobalUsername(username));

            localStorage.setItem("usernameValue", username);
            localStorage.setItem("token", response.token);
            ////  we want to change this line
            // just to navigate user to post page after successful login
            // are you with me on that?
            navigate("/posts-list"); /// navigate
            //redirect
          } else {
            alert("Invalid");
            //no redirect
          }

          setUsername("");
          setPassword("");
        }
      );
    } else {
      alert("Required username and password");
    }
  }

  function signUp() {
    if (username && password) {
      let obj = {
        username: username,
        password: password,
      };

      customPost(`/create-new-user`, obj).then((response) => {
        if (response.result == true) {
          alert("Your account created successfully login to proceed");
        } else {
          alert("Already present.");
        }
      });
    } else {
      alert("Required username and password");
    }
  }

  return (
    <div className="login-page">
      <h1>TinyThouhts</h1>
      <div class="login-form">
        <h2>LogIn/SignUp</h2>
        <TextField
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          label="Username"
        />
        <br></br>
        <br></br>
        <TextField
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          label="Password"
        />
        <br></br>
        <br></br>
        <Button variant="contained" onClick={login}>
          {" "}
          Login{" "}
        </Button>
        <br></br>
        <a className="link">Forgotten Password?</a>
        <hr></hr>
        <Button variant="outlined" onClick={signUp}>
          SignUp
        </Button>
      </div>
    </div>
  );
}
