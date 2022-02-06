import * as React from "react";
import { styled } from "@mui/material/styles";
import {
  Avatar, Card, CardActions, CardHeader, CardMedia, CardContent, Collapse, IconButton, Tooltip, Typography, ListItem, ListItemAvatar, ListItemIcon, ListItemText, ListItemSecondaryAction
} from "@mui/material/";
import { red } from "@mui/material/colors";
import CommentIcon from "@mui/icons-material/ExpandMore";
import * as timeago from "timeago.js";
import CommentsGrid from "./CommentsGrid.jsx";
import { useEffect } from 'react';
import DeleteIcon from "@mui/icons-material/Delete";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

function didIHaveRightsToDelete(props) {
  // Ouvrir le cookie pour voir le UserID de l'utilisateur
  // Si l'utilisateur est connecté et que l'utilisateur est l'auteur du post
  // OU si l'utilisateur est admin
  let Cookie = document.cookie.split("=")[1];
  const UserRights = JSON.parse(atob(Cookie.split(".")[1]));
  console.log(UserRights);
  console.log(props.post)
  return ((UserRights.PersonID === props.post.PersonID) || (UserRights.IsAdmin === 1));
}
  
export default function Post(props) {
  const post = {
    Author: `${props.post.Prenom} ${props.post.Nom}`,
    CreationDate: props.post.CreationDate,
    Body: props.post.Body,
    initials: props.post.Prenom.substring(0, 1) + props.post.Nom.substring(0, 1),
    Title: props.post.Title,
    PostID: props.post.PostID,
  };
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [isDeleting, setIsDeleting] = React.useState(false);
  useEffect(() => {
    setIsDeleting(false);
  }, [props]);

  const handleDelete = () => {
    setIsDeleting(true);
    console.log(props.post.PostID);
    props.handleDeletePost(props.post.PostID);
  };
  
  return (
    <Card
      className="MuiCard-root"
    >
        <CardHeader
          avatar={(
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {post.initials}
            </Avatar>
          )}
          
          action={
          didIHaveRightsToDelete(props) ?
            <IconButton edge="end" aria-label="delete" onClick={handleDelete} disabled={isDeleting} >
              <Tooltip title="Supprimer">
                <DeleteIcon />
              </Tooltip>
            </IconButton>
            : null
          }
          title={post.Title}
          subheader={timeago.format(post.CreationDate, "fr")}
        />
      

      <CardMedia
        component="img"
        height="100%"
        image={post.Body}
        alt={post.Title}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {post.Title}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <Tooltip title="Afficher/Masquer les commentaires">
            <CommentIcon />
          </Tooltip>
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent id="commentsContainer">
          <CommentsGrid post={props.post} />
        </CardContent>
      </Collapse>
    </Card>
  );
}
