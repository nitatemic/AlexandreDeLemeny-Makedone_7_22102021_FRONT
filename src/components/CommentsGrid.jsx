import * as React from "react";
import { useEffect } from "react";
import { Box, List } from "@mui/material";
import CommentItem from "./CommentItem";
import AddComment from "./AddComment";

export default function CommentsGrid(props) {
  const [dense, setDense] = React.useState(false);
  const [comments, setComments] = React.useState([]);

  // Gérer la suppression d'un commenaire enfant
  const handleDeleteComment = (CommentID) => {
    

    // fetch à l'API pour supprimer le commentaire
    fetch(`http://localhost:3001/api/comments/${CommentID}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${document.cookie.split("=")[1]}`,
      },
    })
      .then((response) => {
        if (response.status === 204) {
        // Mettre à jour le state
          setComments(comments.filter((comment) => comment.CommentID !== CommentID));
        } else {
          
        }
      })
      .catch((error) => {
        
      });
  };

  useEffect(() => {
    fetch(`http://localhost:3001/api/comments/${props.post.PostID}/`, {
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
        
        
        setComments(data.comments);
      })
      .catch(() => {
        
      });
  }, []);
  // List qui ajoutes des components CommentItem avec les commentaires
  return (
    <Box>
      <List dense={false}>
        <AddComment post={props.post} setComments={setComments} />
        {comments.map((comment) => (
          <CommentItem
            key={comment.CommentID}
            comment={comment}
            handleDeleteComment={handleDeleteComment}
          />
        ))}
      </List>
    </Box>
  );
}
