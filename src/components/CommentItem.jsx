import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import {useEffect} from "react";
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';

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
