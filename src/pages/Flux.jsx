//Page principal, qui affiche tous les posts
import React from 'react';
import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import {Button, Box, Container, Fab, TextField} from "@mui/material";
import Post from '../components/Post.jsx';
import AddIcon from '@mui/icons-material/Add';
import'./css/flux.css';

function Flux() {

    const [posts, setPosts] = useState([]);

    //Recupérer les 5 derniers posts
    let from = 0;
    let to = 5;


    useEffect(() => {
        fetch('http://localhost:3001/api/posts/0/5', {
            headers: {
                Authorization: `Bearer ${document.cookie}`
            }
        } )
            .then(function (res) {
                if (res.ok) {
                    return res.json();
                }
                else if (res.status === 401) {
                    window.location.href = "/login";
                }
                else {
                    throw new Error('Something went wrong');
                }
            })
            .then(function (data) {
                console.log(data.posts);
                setPosts(data.posts)
                //showSomePosts(from, to, data);

            })
            .catch(function () {
                console.error(
                    "Oops, an error occurred. Please contact alexandre@nitatemic.dev"
                );
            });

    }, [])
    
    return (
        <Box>
            <Container maxWidth="md">
            <Box id="postsContainer">
                {posts.map(post => (
                    <Post key={post.id} post={post} />
                ))}
            </Box>
        </Container>
    <Fab variant="extended">
        <AddIcon sx={{ mr: 1 }} />
        Navigate
    </Fab>
        </Box>
    )
}

export default Flux
