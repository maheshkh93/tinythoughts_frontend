import "../App.css";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

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
      <h1>TINY THOUGHTS</h1>

      <h1>
        Auther {username} <button onClick={logout}>Logout</button>
      </h1>
    </div>
  );
}
