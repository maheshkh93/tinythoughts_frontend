import "./App.css";
import UserGlobalContext from "./shared/Data/UserGlobalContext";
import { Link, Navigate, Route, Routes } from "react-router-dom";
import { useState } from "react";
import Login from "./components/Login/Login";
import PostList from "./components/PostList/PostList";

function App() {
  let [username, setGlobalUsername] = useState("");
  return (
    <div>
      <UserGlobalContext.Provider
        value={{ username: username, setGlobalUsername: setGlobalUsername }}
      >
        <div className="App">
          <Routes>
            <Route path="/login" element={<Login />} />

            <Route path="/posts-list" element={<PostList />} />
            <Route path="/" element={<Navigate to={"/login"} />} />
          </Routes>
        </div>
      </UserGlobalContext.Provider>
    </div>
  );
}

export default App;
