//Page principal, qui affiche tous les posts
import React from 'react';
import {Button, Box, Container, TextField} from "@mui/material";
import Post from '../components/Post.jsx';
function Flux() {
    return (
    <Container maxWidth="md">
        <Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }}>
            <Post />
        </Box>
        <h1>Flux</h1>
    </Container>
    )

}

function getSomePosts(from, to) {
    return fetch(`http://localhost:8080/posts?from=${from}&to=${to}`)
        .then(response => response.json())
        .then(posts => {
            return posts;
        })
}
//Sert à ajouter un post dans le flux (dans l'element Box)
function addPosts(post) {
    
}

export default Flux
