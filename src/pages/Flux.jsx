//Page principal, qui affiche tous les posts
import React from 'react';
import './css/Login.css'
import {Button, TextField} from "@mui/material";
const imgFolder = './assets/images';
function Flux() {
    return (
        <h1>Test</h1>
    )

}

//Demander à L'API de m'envoyer les posts du numéro X à Y

function getSomePosts(from, to) {
    return fetch(`http://localhost:8080/posts?from=${from}&to=${to}`)
        .then(response => response.json())
        .then(posts => {
            return posts;
        })
}

export default Flux
