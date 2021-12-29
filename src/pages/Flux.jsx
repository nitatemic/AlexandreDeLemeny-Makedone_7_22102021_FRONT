//Page principal, qui affiche tous les posts
import React from 'react';
import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import {Button, Box, Container, TextField} from "@mui/material";
import Post from '../components/Post.jsx';

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
    <Container maxWidth="md">
        <Box id="postsContainer">
            {posts.map(post => (
                <Post key={post.id} post={post} />
            ))}
        </Box>
    </Container>
    )
}

export default Flux
