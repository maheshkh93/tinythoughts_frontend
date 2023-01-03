import React, { useState, useEffect } from "react";
import { Avatar, Button, TextField } from "@mui/material";
import { useContext } from "react";
import { useSelector } from "react-redux";

import {
  customGet,
  customPatch,
  customPost,
} from "../../Utilitites/custom-fetch.js";
import UserGlobalContext from "../../shared/Data/UserGlobalContext.js";

export default function CommentCard(item) {
  const [comments, setComments] = useState([]);
  const [commentBox, setCommentBox] = useState("");

  const { username } = useContext(UserGlobalContext);

  const userNameFromRedux = useSelector(
    (state) => state.counter.userNameFromRedux
  );

  useEffect(() => {
    customGet(`/posts/${item._id}/comments`).then((response) => {
      setComments(response.newComments);
    });
  }, []);

  function addComment() {
    let obj = {
      username: localStorage.getItem("usernameValue"),
      commentText: commentBox,
    };
    customPost(`/posts/${item._id}/comments`, obj).then((response) => {
      setComments(response.newComments);
    });
  }

  return (
    <>
      <span>{comments.length || item.commentsCount}</span>
      <div className="commentcard">
        <ul>
          {comments.map((c) => (
            <li>
              {c.commentText} by {c.username}
            </li>
          ))}
        </ul>

        <div className="action-container">
          <TextField
            variant="outlined"
            label={"Type Comment as " + userNameFromRedux}
            value={commentBox}
            onChange={(event) => setCommentBox(event.target.value)}
          />
          <Button variant="contained" onClick={addComment}>
            Comment
          </Button>
        </div>
      </div>
    </>
  );
}
