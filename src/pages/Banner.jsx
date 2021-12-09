import React from 'react';
import {Link} from "react-router-dom";

function Banner() {
	return(
	<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
		<div className="container-fluid">
			<a href="#" className="navbar-brand">
				<img src="../../assets/images/logo/svg/icon-left-font-monochrome-white.svg" alt="Logo de Groupomania" className="d-inline-block align-middle mr-2" height="20rem"/>	{/* TODO : Revoir la taille de l'image */}
			</a>

			<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor02"
					aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
				<span className="navbar-toggler-icon"/>
			</button>
			<div className="collapse navbar-collapse" id="navbarColor02">
				<ul className="navbar-nav me-auto">
					<li className="nav-item active">
						<Link to={"./"} className="nav-link">Connexion</Link>
					</li>

					<li className="nav-item">
						<Link to={"./signup"} className="nav-link">Inscription</Link>
					</li>
				</ul>
			</div>
		</div>
	</nav>
	)}

export default Banner;
