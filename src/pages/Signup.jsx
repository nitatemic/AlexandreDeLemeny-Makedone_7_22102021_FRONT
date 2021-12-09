import React from 'react';
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
                            <div className="form-outline mb-4">
                                <input type="text" id="lastName" className="form-control form-control-lg"/>
                                <label className="form-label" htmlFor="lastName">Nom</label>
                            </div>

                            <div className="form-outline mb-4">
                                <input type="text" id="firstName" className="form-control form-control-lg"/>
                                <label className="form-label" htmlFor="firstName">Prénom</label>
                            </div>

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
                                <button type="button" className="btn btn-primary btn-lg" id="btnSignUp" onClick={signUp}>S'inscrire
                                </button>
                                <p
                                    className="small fw-bold mt-2 pt-1 mb-0">Vous avez déjà un compte ?<a href="/" className="link-danger">Se connecter</a>
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
