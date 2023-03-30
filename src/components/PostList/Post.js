import { Avatar, Button, TextField } from "@mui/material";
import React, { useContext } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import UserGlobalContext from "../../shared/Data/UserGlobalContext.js";
import {
  customDelete,
  customGet,
  customPatch,
  customPost,
} from "../../Utilitites/custom-fetch.js";
import CommentCard from "./CommentCard.js";

export default function Post({ item }) {
  const { username } = useContext(UserGlobalContext);
  const userNameFromRedux = useSelector(
    (state) => state.counter.userNameFromRedux
  );
  const [likes, setLikes] = useState([]);
  const [comments, setComments] = useState([]);
  const [showcard, setShowcard] = useState(false);

  function increaseLikes() {
    let obj = {
      username: localStorage.getItem("usernameValue"),
    };
    customPost(`/posts/${item._id}/likes`, obj).then((response) => {
      //do something // create a state
      setLikes(response.likes);

      //get all the post one more
    });
  }

  function loadLikes() {
    customGet(`/posts/${item._id}/likes`).then((response) => {
      setLikes(response.likes);
    });
  }

  function deletepost() {
    customDelete(`/posts/${item._id}`).then((response) => {
      alert("post deleted");
    });
  }
  return (
    <>
      <div className="post-item-container">
        <div className="post-header">
          <Avatar>{item.author.charAt(0)}</Avatar>
          <span>{item.author}</span>
        </div>

        <div className="postoutput">{item.content}</div>

        <div className="action-container">
          <div>
            <span className="likeButton" onClick={increaseLikes}>
              <i class="fa fa-thumbs-o-up" aria-hidden="true"></i>
            </span>
            <span onClick={loadLikes}>
              &nbsp;&nbsp;{likes.length || item.likes}
            </span>

            <ul>
              {likes.map((monkey) => (
                <li>{monkey.username}</li>
              ))}
            </ul>
          </div>
          {/* <div>
            <span>
              <i
                class="fa fa-comment-o"
                onClick={() => {
                  setShowcard(!showcard);
                }}
                aria-hidden="true"
              ></i>
            </span>

            {showcard ? <CommentCard item={item} /> : <></>}
          </div> */}
          <div>
            <span onClick={deletepost}>
              <i class="fa fa-trash-o" aria-hidden="true"></i>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
