//Page principal, qui affiche tous les posts
import React from 'react';
import './css/flux.css';
import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import {Button, Box, Backdrop, Container, Fab, TextField, Modal, Typography} from "@mui/material";
import Post from '../components/Post.jsx';
import AddIcon from '@mui/icons-material/Add';
import { useSpring, animated } from '@react-spring/web';
import PropTypes from 'prop-types';


const Fade = React.forwardRef(function Fade(props, ref) {
    const { in: open, children, onEnter, onExited, ...other } = props;
    const style = useSpring({
        from: { opacity: 0 },
        to: { opacity: open ? 1 : 0 },
        onStart: () => {
            if (open && onEnter) {
                onEnter();
            }
        },
        onRest: () => {
            if (!open && onExited) {
                onExited();
            }
        },
    });

    return (
        <animated.div ref={ref} style={style} {...other}>
            {children}
        </animated.div>
    );
});

Fade.propTypes = {
    children: PropTypes.element,
    in: PropTypes.bool.isRequired,
    onEnter: PropTypes.func,
    onExited: PropTypes.func,
};

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'rgb(0 30 60)',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function Flux() {

    /*------Modal------*/
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    /*------Fin Modal------*/

    const [posts, setPosts] = useState([]);

    //Recupérer les 5 derniers posts
    let from = 0;
    let to = 5;


    useEffect(() => {
        fetch('http://localhost:3001/api/posts/0/5', {
            headers: {
                Authorization: `Bearer ${document.cookie.split('=')[1]}`
            }
        } )
            .then(function (res) {
                if (res.ok) {
                    return res.json();
                }
                else if (res.status === 401) {
                    //Supprimer le cookie
                    document.cookie = `Bearer=; max-age=0; path=/;`;
                    //Rediriger vers la page de connexion
                    window.location.href = "/login";
                }
                else {
                    throw new Error('Something went wrong');
                }
            })
            .then(function (data) {
                console.log(data.posts);
                setPosts(data.posts)
                document.cookie = `Bearer=${data.token}; max-age=${720 * 60}; path=/;`;
                

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
                    <Post key={post.PostID} post={post} />
                ))}
            </Box>
            </Container>
            <Fab variant="extended" onClick={handleOpen}>
                <AddIcon sx={{ mr: 1 }} />
                Publier un nouveau post
            </Fab>
            <Modal
                aria-labelledby="spring-modal-title"
                aria-describedby="spring-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <Typography id="spring-modal-title white" variant="h6" component="h2">
                            Ajouter un post
                        </Typography>
                        <TextField fullWidth label="Titre" id="fullWidth" />
                    </Box>
                </Fade>
            </Modal>
        </Box>
    )
}
