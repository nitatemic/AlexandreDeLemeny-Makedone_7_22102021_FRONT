//Page principal, qui affiche tous les posts
import React from 'react';
import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import {Button, Box, Container, TextField} from "@mui/material";
import Post from '../components/Post.jsx';
function Flux() {
    //Recupérer les 5 derniers posts
    let from = 0;
    let to = 5;

    useEffect(() => {
        fetch('http://localhost:3001/api/posts?from=0&to=5')
            .then(function (res) {
                if (res.ok) {
                    return res.json();
                }
            })
            .then(function (data) {
                console.log(data.posts);
                showSomePosts(from, to, data);
                
            })
            .catch(function () {
                console.error(
                    "Oops, an error occurred. Please contact alexandre@nitatemic.dev"
                );
            });

    }, [])
    
    return (
    <Container maxWidth="md">
        <Box id="postsContainer" sx={{ bgcolor: '#cfe8fc', height: '100vh' }}>
        </Box>
    </Container>
    )
}

function getSomePosts(from, to) {
    return fetch(`http://localhost:3001/api/posts?from=${from}&to=${to}`)
        .then(response => response.json())
        .then(data => {
            showSomePosts(from, to, data);
        })
}

function showSomePosts(from, to, data) {
    for (let i = to; i > from - 1 ; i--) {
        console.log(i);
        addPosts(data.posts[i]);
        }
    }

//Sert à ajouter un post dans le flux (dans l'element Box)
function addPosts(uniquePost) {
    let postVar = <Post post={uniquePost} />;
    ReactDOM.render(postVar, document.getElementById('postsContainer'));
    console.log('Post rendered');
}

export default Flux
