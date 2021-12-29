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
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import {useEffect} from "react";

function generate(element) {
    return [0, 1, 2].map((value) =>
        React.cloneElement(element, {
            key: value,
        }),
    );
}

const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
}));

export default function CommentsGrid(props) {
    const [dense, setDense] = React.useState(false);
    const [secondary, setSecondary] = React.useState(true);

    let from = 0;
    let to = 5;

    useEffect(() => {
        fetch(`http://localhost:3001/api/comments/${props.post.PostID}/${from}/${to}`)
            .then(function (res) {
                if (res.ok) {
                    return res.json();
                }
            })
            .then(function (data) {
                console.log(data.comments);
                console.log(props.post.PostID);
                setComments(data.comments);

            })
            .catch(function () {
                console.error(
                    "Oops, an error occurred. Please contact alexandre@nitatemic.dev"
                );
            });

    }, [])
    
    return (
        <Box>
            <List dense={dense}>
                {generate(
                    <ListItem
                        secondaryAction={
                            <IconButton edge="end" aria-label="delete">
                                <DeleteIcon/>
                            </IconButton>
                        }
                    >
                        <ListItemAvatar>
                            <Avatar>
                                <FolderIcon/>
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary="Single-line item"
                            secondary={secondary ? 'Secondary text' : null}
                        />
                    </ListItem>,
                )}
            </List>
        </Box>
    )
}
