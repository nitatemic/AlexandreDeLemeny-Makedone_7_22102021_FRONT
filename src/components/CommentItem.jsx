import * as React from 'react';
import { styled } from '@mui/material/styles';
import {useEffect, useState} from "react";
import {ListItem, ListItemAvatar, ListItemIcon, ListItemText, Avatar, IconButton, ListItemSecondaryAction} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';



function didIHaveRightsToDelete(comment, user) {
    return comment.author.id === user.id;
}

export default function CommentItem(props) {
    const [isDeleting, setIsDeleting] = React.useState(false);
    console.log("ICI")
    console.log(props.props.Prenom);

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
                    {props.props.Prenom.substring(0, 1) + props.props.Nom.substring(0, 1)}
                </Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={props.props.Prenom + ' ' + props.props.Nom}
                secondary={props.props.CommentBody}
            />
            <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete" onClick={handleDelete} disabled={isDeleting}>
                    <DeleteIcon />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
}
