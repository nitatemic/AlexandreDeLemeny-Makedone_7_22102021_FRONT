import React from "react";
import "./css/Login.css";
import {
  Button, Box, Snackbar, Stack, TextField, ThemeProvider, Alert,
} from "@mui/material";
import "./css/global.css";
import logo from "../../assets/images/logo/svg/icon-left-font-monochrome-white.svg";

function Login() {
  const [message, setMessage] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  function login(e) {
    e.preventDefault();
    // on récupère les données du formulaire
    const mail = document.getElementById("mail").value;
    const password = document.getElementById("password").value;

    // on crée un objet user
    const user = {
      mail,
      password,
    };
    // on envoie les données au serveur
    
    fetch("http://localhost:3001/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {
      // Si la réponse est un token le placer dans un cookie et rediriger vers la page d'accueil
        if (data.token) {
          
          // Cookie qui expire dans 12 heures
          document.cookie = `Bearer=${data.token}; max-age=${720 * 60}; path=/;`;
          window.location.href = "/";
        }
        // Sinon afficher un message d'erreur
        else {
          setMessage(data.message);
          setOpen(true);
          
        }
      })
      .catch((error) => {});
  }

  return (
    <Box>
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
                  <TextField sx={{ width: "100%" }} label="Adresse mail" variant="outlined" type="email" id="mail" />
                </div>

                <div className="form-outline mb-4">
                  <TextField sx={{ width: "100%" }} label="Mot de passe" variant="outlined" type="password" id="password" />
                </div>

                <div className="text-center text-lg-start mt-4 pt-2">
                  <Button variant="contained" id="btnSignUp" onClick={login}>
                    Se connecter
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Login;
