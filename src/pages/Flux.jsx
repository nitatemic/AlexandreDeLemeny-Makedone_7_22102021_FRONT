//Page principal, qui affiche tous les posts
import React from 'react';
import {Button, Box, Container, TextField} from "@mui/material";
import Post from '../components/Post.jsx';
function Flux() {
    //Recupérer les 5 derniers posts
    let from = 0;
    let to = 5;
    const [posts, setPosts] = React.useState([]);

    fetch('http://localhost:3001/api/posts?from=0&to=5')
        .then(function (res) {
            if (res.ok) {
                return res.json();
            }
        })
        .then(function (data) {
            console.log(data);
            showSomePosts(data);
        })
        .catch(function () {
            console.error(
                "Oops, an error occurred. Please contact alexandre@nitatemic.dev"
            );
        });

    return (
    <Container maxWidth="md">
        <Box id="PostsContainer" sx={{ bgcolor: '#cfe8fc', height: '100vh' }}>
            <Post />
        </Box>
        <h1>Flux</h1>
    </Container>
    )

}

function getSomePosts(from, to) {
    return fetch(`http://localhost:3001/api/posts?from=${from}&to=${to}`)
        .then(response => response.json())
        .then(posts => {
            showSomePosts(from, to, posts);
        })
}

function showSomePosts(from, to, posts) {
    for (let i = 0; i < to - from; i++) {
        addPosts(posts[i]);
        }
    }

//Sert à ajouter un post dans le flux (dans l'element Box)
function addPosts(uniquePost) {
    const post = <Post post={uniquePost} />;
    Document.getElementById('postsContainer').appendChild(post);
}

export default Flux
