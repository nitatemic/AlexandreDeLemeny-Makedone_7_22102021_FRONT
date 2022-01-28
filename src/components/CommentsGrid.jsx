import * as React from "react";
import { useEffect } from "react";
import { Box, List } from "@mui/material";
import CommentItem from "./CommentItem";
import AddComment from "./AddComment";

export default function CommentsGrid(props) {
  const [dense, setDense] = React.useState(false);
  const [comments, setComments] = React.useState([]);

  useEffect(() => {
    const from = 0;
    const to = 5;
    fetch(`http://localhost:3001/api/comments/${props.post.PostID}/${from}/${to}`, {
      headers: {
        Authorization: `Bearer ${document.cookie.split("=")[1]}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        // Supprimer le cookie
        document.cookie = "Bearer=; max-age=0; path=/;";
        // Rediriger vers la page de connexion
        window.location.href = "/login";
      })
      .then((data) => {
        console.log(data.comments);
        console.log(`%c ↗️ Comments from the post number ${props.post.PostID} fetched successfully !`, "color: #0df904");
        setComments(data.comments);
      })
      .catch(() => {
        console.error(
          "Oops, an error occurred. Please contact alexandre@nitatemic.dev",
        );
      });
  }, []);
  // List qui ajoutes des components CommentItem avec les commentaires
  return (
    <Box>
      <List dense={false}>
        <AddComment post={props.post} />
        {comments.map((comment) => (
          <CommentItem
            key={comment.CommentID}
            comment={comment}
          />
        ))}
      </List>
    </Box>
  );
}
