import React from 'react';
import './css/login.css'
import {Button, TextField, ThemeProvider} from "@mui/material";
import darkTheme from "./global";
import './css/global.css'

function Login() {
	return (
			<section className="vh-100">
				<div className="container-fluid h-custom">
					<div className="row d-flex justify-content-center align-items-center h-100">
						<div className="col-md-9 col-lg-6 col-xl-5">
							<img src = "../../assets/images/logo/svg/icon-left-font-monochrome-white.svg"
								 className="img-fluid"
								 alt="Logo Groupomania"/>
						</div>
						<div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
							<form>
								<div className="form-outline mb-4" >
									<TextField sx={{width: '100%'}} label="Adresse mail" variant="outlined" type="email" id="mail" />
								</div>

								<div className="form-outline mb-4" >
									<TextField sx={{width: '100%'}} label="Mot de passe" variant="outlined" type="password" id="password" />
								</div>

								<div className="text-center text-lg-start mt-4 pt-2">
									<Button variant="contained"  id="btnSignUp" onClick={login}>Se connecter
									</Button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</section>
	)
}

function login(e) {
	e.preventDefault();
	//on récupère les données du formulaire
	const mail = document.getElementById('mail').value;
	const password = document.getElementById('password').value;

	//on crée un objet user
	const user = {
		mail: mail,
		password: password
	};
	//on envoie les données au serveur
	console.log("Envoi des données au serveur");
	fetch('http://localhost:3001/api/auth/login', {
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

export default Login
