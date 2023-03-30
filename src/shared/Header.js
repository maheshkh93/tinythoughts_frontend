import "./Header.css";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, Button, TextField } from "@mui/material";
import HouseOutlinedIcon from "@mui/icons-material/HouseOutlined";
import SmartDisplayOutlinedIcon from "@mui/icons-material/SmartDisplayOutlined";
import { color } from "@mui/system";

export default function Header() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    let usernameValue = localStorage.getItem("usernameValue");
    if (usernameValue) {
      setUsername(usernameValue);
    } else {
      navigate("/login");
    }
  }, []);

  function logout() {
    localStorage.clear();
    navigate("/login");
  }

  return (
    <div className="header">
      <div className="header1">
        <h1>T</h1>
        <div className="searchBar"> &#128269; Search Tinythoughts</div>
      </div>
      <div className="header1">
        <HouseOutlinedIcon fontSize="large" color="red" />
        <SmartDisplayOutlinedIcon fontSize="large" />
      </div>

      <div className="header1">
        <Avatar>&#xf075;</Avatar>
        <Avatar>&#xf075;</Avatar>
        <Avatar></Avatar>
        {/* Auther {username} <button onClick={logout}>Logout</button> */}
      </div>
    </div>
  );
}
