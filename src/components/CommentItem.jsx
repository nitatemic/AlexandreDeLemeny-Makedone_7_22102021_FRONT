import * as React from 'react';
import { styled } from '@mui/material/styles';
import {useEffect, useState} from "react";
import {ListItem, ListItemAvatar, ListItemIcon, ListItemText, Avatar, IconButton, ListItemSecondaryAction, Tooltip} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function didIHaveRightsToDelete(comment, user) {
    return comment.author.id === user.id;
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
                primary={props.comment.Prenom + ' ' + props.comment.Nom}
                secondary={props.comment.CommentBody}
            />
            <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete" onClick={handleDelete} disabled={isDeleting}>
                    <Tooltip title="Supprimer">
                        <DeleteIcon />
                    </Tooltip>
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
}
