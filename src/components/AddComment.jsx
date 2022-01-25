import * as React from "react";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Tooltip from "@mui/material/Tooltip";

export default function AddComment(props) {
  // Fonction pour envoyer un commentaire au serveur
  const handleClickSendComment = () => {
    // Recuperation du commentaire
    const comment = document.getElementById("addCommentInput").value;
    // Envoi du commentaire au serveur
    fetch("http://localhost:3001/api/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${document.cookie.split("=")[1]}`,
      },
      body: JSON.stringify({
        CommentBody: comment, PostID: props.post.PostID,
      }),
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <FormControl
      variant="outlined"
      fullWidth
      multiline
    >
      <InputLabel htmlFor="addCommentInput">Ajouter un commentaire</InputLabel>
      <OutlinedInput
        id="addCommentInput"
        type="text"
        fullWidth
        endAdornment={(
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickSendComment}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              <Tooltip title="Envoyer">
                <SendOutlinedIcon />
              </Tooltip>
            </IconButton>
          </InputAdornment>
        )}
        label="Ajouter un commentaire"
      />
    </FormControl>
  );
}
