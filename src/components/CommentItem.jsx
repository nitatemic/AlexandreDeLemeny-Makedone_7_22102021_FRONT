import * as React from "react";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import {
  ListItem, ListItemAvatar, ListItemIcon, ListItemText, Avatar, IconButton, ListItemSecondaryAction, Tooltip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function didIHaveRightsToDelete() {
  // Ouvrir le cookie pour voir le UserID de l'utilisateur
  // Si l'utilisateur est connecté et que l'utilisateur est l'auteur du commentaire
  // OU si l'utilisateur est admin
  let Cookie = document.cookie;
  Cookie = Cookie.split("=")[1];
  let UserRights = atob(Cookie.split(".")[1]);
  console.log('Et la réponse est....' + (UserRights[0] === comment.author) || (UserRights[1] === true));
  return (UserRights[0] === props.comment.author) || (UserRights[1] == 1);
}

export default function CommentItem(props) {
  const [isDeleting, setIsDeleting] = React.useState(false);
  useEffect(() => {
    setIsDeleting(false);
  }, [props]);

  const handleDelete = () => {
    setIsDeleting(true);
    onDelete(comment.id);
  };

  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar>
          {props.comment.Prenom.substring(0, 1) + props.comment.Nom.substring(0, 1)}
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={`${props.comment.Prenom} ${props.comment.Nom}`}
        secondary={props.comment.CommentBody}
      />
      {didIHaveRightsToDelete && (
        <ListItemSecondaryAction>
          <IconButton edge="end" aria-label="delete" onClick={handleDelete} disabled={isDeleting}>
            <Tooltip title="Supprimer">
              <DeleteIcon />
            </Tooltip>
          </IconButton>
        </ListItemSecondaryAction>
      )}
    </ListItem>
  );
}
