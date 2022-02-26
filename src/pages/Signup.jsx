import React from "react";
import {
  Alert, Button, Snackbar, TextField
} from "@mui/material";
import "./css/Login.css";

import logo from "../../assets/images/logo/svg/icon-left-font-monochrome-white.svg";
export default function Signup() {
  const [message, setMessage] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  function signUp(e) {
    e.preventDefault();
    // on récupère les données du formulaire
    const lastName = document.getElementById("lastName").value;
    const firstName = document.getElementById("firstName").value;
    const mail = document.getElementById("mail").value;
    const password = document.getElementById("password").value;

    // on crée un objet user
    const user = {
      lastName,
      firstName,
      mail,
      password,

    };
    // on envoie les données au serveur
    
    fetch("http://localhost:3001/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        if (response.status === 201) {
          Window.location.href = "/login";
        } else {
          response.json().then((data) => {
            setMessage(data.error);
            setOpen(true);
          });
        }
      });
  }

  return (

    <section className="vh-100">
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-9 col-lg-6 col-xl-5">
            <img
              src={logo}
              className="img-fluid"
              alt="Logo Groupomania"
            />
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <form>

              <div className="form-outline mb-4">
                <TextField sx={{ width: "100%" }} label="Prénom" variant="outlined" type="text" id="firstName" />
              </div>

              <div className="form-outline mb-4">
                <TextField sx={{ width: "100%" }} label="Nom de famille" variant="outlined" type="text" id="lastName" />
              </div>

              <div className="form-outline mb-4">
                <TextField sx={{ width: "100%" }} label="Adresse mail" variant="outlined" type="email" id="mail" />
              </div>

              <div className="form-outline mb-4">
                <TextField sx={{ width: "100%" }} label="Mot de passe" variant="outlined" type="password" id="password" />
              </div>

              <div className="text-center text-lg-start mt-4 pt-2">
                <Button variant="contained" id="btnSignUp" onClick={signUp}>
                  S'inscrire
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </section>
  );
}
