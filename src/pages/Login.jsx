import './css/login.css'
import React from 'react';
function Login() {
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
							<div className="form-outline mb-4">
								<input type="email" id="mail" className="form-control form-control-lg"
									   placeholder="Entrer une adresse mail valide"/>
								<label className="form-label" htmlFor="mail">Adresse mail</label>
							</div>

							<div className="form-outline mb-3">
								<input type="password" id="password" className="form-control form-control-lg"
									   placeholder="Entrer un mot de passe"/>
								<label className="form-label" htmlFor="password">Mot de passe</label>
							</div>

							<div className="text-center text-lg-start mt-4 pt-2">
								<button type="button" className="btn btn-primary btn-lg" id="btnLogin" onClick={login}>Se connecter
								</button>
								<p
									className="small fw-bold mt-2 pt-1 mb-0">Vous n'avez pas de compte ?<a href="/signup" className="link-danger">S'inscrire</a>
								</p>
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
