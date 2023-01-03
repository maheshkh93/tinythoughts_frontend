import React, { useContext, useEffect } from "react";
import { useState } from "react";
import Post from "./Post";
import { Button, Avatar } from "@mui/material";
import Header from "../../shared/Header";
import "./post.css";
// import PortalsUsername from "../../PortalsUsername";
import { customGet, customPost } from "../../Utilitites/custom-fetch";
import Body from "../../shared/Body";

export default function PostList() {
  const [username, setUsername] = useState("");
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    let usernameValue = localStorage.getItem("usernameValue");
    setUsername(usernameValue);
  }, []);

  useEffect(() => {
    customGet("/posts?page=" + 0).then((response) => {
      setPosts(response);
    });
  }, []);

  useEffect(() => {
    customGet("/posts?page=" + 0).then((response) => {
      setPosts(response);
    });
  }, [createPost]);

  function createPost() {
    let obj = {
      author: localStorage.getItem("usernameValue"),

      content: content,
    };

    customPost(`/posts`, obj).then((response) => {
      if (response.result == true) {
        alert("Post added.");
        setContent("");
      }
    });
  }

  function loadMore() {
    customGet("/posts?page=" + posts.length * 1).then((response) => {
      setPosts(posts.concat(response));
    });
  }

  return (
    <div>
      <Header></Header>

      <div className="posts">
        <div className="post-item-container">
          <span className="post-header">
            <Avatar>{username.charAt(0)}</Avatar>
            <span>{username}</span>
          </span>
          <input
            className="postinput"
            placeholder="Write Your Thoughts"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <Button variant="contained" onClick={createPost}>
            Post
          </Button>
        </div>
        <hr></hr>

        {posts.map((item) => (
          <>
            <Post item={item} />
          </>
        ))}

        <Button variant="contained" onClick={loadMore}>
          Load more posts...
        </Button>
      </div>
    </div>
  );
}
