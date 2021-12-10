import React from 'react';
import ReactDOM from 'react-dom';
import {Button, TextField} from "@mui/material";

import './css/login.css'

function Signup() {
    return (
        <section className="vh-100">
            <div className="container-fluid h-custom">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-md-9 col-lg-6 col-xl-5">
                        <img src = "../../assets/images/logo/svg/icon-left-font-monochrome-black.svg"
                             className="img-fluid"
                             alt="Logo Groupomania"/>
                    </div>
                    <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                        <form>

                            <div className="form-outline mb-4" >
                                <TextField sx={{width: '100%'}} label="Prénom" variant="outlined" type="text" id="firstName" />
                            </div>

                            <div className="form-outline mb-4" >
                                <TextField sx={{width: '100%'}} label="Nom de famille" variant="outlined" type="text" id="lastName" />
                            </div>

                            <div className="form-outline mb-4" >
                                <TextField sx={{width: '100%'}} label="Adresse mail" variant="outlined" type="email" id="mail" />
                            </div>

                            <div className="form-outline mb-4" >
                                <TextField sx={{width: '100%'}} label="Mot de passe" variant="outlined" type="password" id="password" />
                            </div>


                            <div className="text-center text-lg-start mt-4 pt-2">
                                <Button variant="contained"  id="btnSignUp" onClick={signUp}>S'inscrire
                                </Button>
                                <p
                                    className="small fw-bold mt-2 pt-1 mb-0">Vous avez déjà un compte ? <a href="/" className="link-danger">Se connecter</a>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

//fonction qui permet de créer un compte

function signUp(e) {
    e.preventDefault();
    //on récupère les données du formulaire
    const lastName = document.getElementById('lastName').value;
    const firstName = document.getElementById('firstName').value;
    const mail = document.getElementById('mail').value;
    const password = document.getElementById('password').value;

    //on crée un objet user
    const user = {
        lastName: lastName,
        firstName: firstName,
        mail: mail,
        password: password

    };
    //on envoie les données au serveur
    console.log("Envoi des données au serveur");
    fetch('http://localhost:3001/api/auth/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => console.error(error));
}
export default Signup
