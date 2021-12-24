import * as React from 'react';
import { styled } from '@mui/material/styles';
import {Avatar, Card, CardHeader, CardMedia, CardContent, CardActions, Collapse, IconButton, Typography} from '@mui/material/';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import CommentIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {useEffect} from "react";
import ReactDOM from "react-dom";


const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function Post(props) {

    useEffect(() => {
        fetch(`http://localhost:3001/api/comments?post=${props.post.PostID}&from=0&to=5`)
            .then(function (res) {
                if (res.ok) {
                    return res.json();
                }
            })
            .then(function (data) {
                console.log(data.posts);
                showSomeComments(from, to, data);

            })
            .catch(function () {
                console.error(
                    "Oops, an error occurred. Please contact alexandre@nitatemic.dev"
                );
            });

    }, [])
    
    let post = {
        Author: props.post.Prenom + ' ' + props.post.Nom,
        CreationDate: props.post.CreationDate,
        Body: props.post.Body,
        initials: props.post.Prenom.substring(0, 1) + props.post.Nom.substring(0, 1),
        Title : props.post.Title,
        PostID : props.post.PostID
    };
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        {post.initials}
                    </Avatar>
                }
                title={post.Title}
                subheader={post.CreationDate}
            />
            <CardMedia
                component="img"
                height="194"
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
                    <CommentIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent id="commentsContainer">
                </CardContent>
            </Collapse>
        </Card>
    );
}

function getSomeComments(from, to) {
    return fetch(`http://localhost:3001/api/comments?from=${from}&to=${to}`)
        .then(response => response.json())
        .then(data => {
            showSomeComments(from, to, data);
        })
}

function showSomeComments(from, to, data) {
    for (let i = to; i > from - 1 ; i--) {
        console.log(i);
        addPosts(data.comments[i]);
    }
}

//Sert à ajouter un post dans le flux (dans l'element Box)
function addComment(uniquePost) {
    let CommentVar = <Comment comment={uniqueComment} />;
    ReactDOM.render(CommentVar, document.getElementById('CommentsContainer'));
    console.log('Comment rendered');
}
