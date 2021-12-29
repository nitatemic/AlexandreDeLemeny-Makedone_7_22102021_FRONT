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
import CommentItem from '../components/CommentItem.jsx';

function generate(element) {
    return [0, 1, 2].map((value) =>
        React.cloneElement(element, {
            key: value,
        }),
    );
}

export default function CommentsGrid(props) {
    const [dense, setDense] = React.useState(false);
    const [secondary, setSecondary] = React.useState(true);
    const [comments, setComments] = React.useState([]);

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
                console.log(`%c ↗️ Comments from the post number ${props.post.PostID} fetched successfully !`, 'color: #0df904');
                setComments(data.comments);

            })
            .catch(function () {
                console.error(
                    "Oops, an error occurred. Please contact alexandre@nitatemic.dev"
                );
            });

    }, [])
    //List qui ajoutes des components CommentItem avec les commentaires
    return (
        <Box>
            <List dense={dense}>
                {comments.map((comment) => {
                    return (
                        <CommentItem
                            props={comment}
                        />
                    );
                })}
            </List>
        </Box>
    );
}
