import * as React from "react";
import { useEffect } from "react";
import {
  ListItem, ListItemAvatar, ListItemText, Avatar, IconButton, ListItemSecondaryAction, Tooltip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function didIHaveRightsToDelete(props) {
  // Ouvrir le cookie pour voir le UserID de l'utilisateur
  // Si l'utilisateur est connecté et que l'utilisateur est l'auteur du commentaire
  // OU si l'utilisateur est admin
  const Cookie = document.cookie.split("=")[1];
  const UserRights = JSON.parse(atob(Cookie.split(".")[1]));
  
  
  return ((UserRights.PersonID === props.comment.PersonID) || (UserRights.IsAdmin === 1));
}

export default function CommentItem(props) {
  const [isDeleting, setIsDeleting] = React.useState(false);
  useEffect(() => {
    setIsDeleting(false);
  }, [props]);

  const handleDelete = () => {
    setIsDeleting(true);
    // Dire au parent que le commentaire a été supprimé grâce à handleDeleteComment
    props.handleDeleteComment(props.comment.CommentID);
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
      {didIHaveRightsToDelete(props) && (
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
