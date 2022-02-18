import React, { useEffect } from "react";
import "./css/Login.css";
import {
  Button,
  Box,
  Snackbar,
  TextField,
  Tooltip,
  Typography,
  tooltipClasses,
  Alert,
} from "@mui/material";

import "./css/global.css";
import { styled } from "@mui/material/styles";

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#242424",
    color: "#f44336",
    maxWidth: 220,
    border: "none",
  },
}));

export default function Account() {
  const [message, setMessage] = React.useState("");
  const [typeMessage, setTypeMessage] = React.useState("error");
  const [name, setName] = React.useState("");

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  function bonjourBonsoir() {
    const date = new Date();
    if (date.getHours() < 18 && date.getHours() > 5) {
      return "Bonjour";
    }
    return "Bonsoir";
  }

  function deleteAccount() {
    fetch("http://localhost:3001/api/account/", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${document.cookie.split("=")[1]}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "success") {
          setMessage("Votre compte a bien été supprimé");
          setTypeMessage("success");
          setOpen();
          document.cookie = "Bearer=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          window.location.href = "/login";
        } else {
          setTypeMessage("error");
          setMessage("Une erreur est survenue");
          setOpen();
        }
      })
      .catch((error) => {
        setTypeMessage("error");
        setMessage("Une erreur est survenue");
        setOpen();
      });
  }
  function updatePassword() {
    /* Récupérer les données du formulaire */
    const oldPassword = document.getElementById("oldPassword").value;
    const newPassword = document.getElementById("newPassword").value;

    const confirmPassword = document.getElementById("confNewPassword").value;
    console.log(oldPassword, newPassword, confirmPassword);

    /* Vérifier que les mots de passe sont identiques */
    if (newPassword !== confirmPassword) {
      setTypeMessage("error");
      setMessage("Les mots de passe ne sont pas identiques");
      setOpen();
      console.log("Les mots de passe ne sont pas identiques");
      handleClick();
      return;
    }
    if (oldPassword === newPassword) {
      setTypeMessage("error");
      setMessage("Le nouveau mot de passe doit être différent de l'ancien");
      setOpen();
      console.log("Le nouveau mot de passe doit être différent de l'ancien");
      handleClick();
      return;
    }
    if (newPassword.length < 12) {
      setTypeMessage("error");
      setMessage("Le nouveau mot de passe doit contenir au moins 12 caractères");
      setOpen();
      console.log("Le nouveau mot de passe doit contenir au moins 12 caractères");
      handleClick();
      return;
    }
    fetch("http://localhost:3001/api/account/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${document.cookie.split("=")[1]}`,
      },
      body: JSON.stringify({
        oldPassword,
        newPassword,
        confirmPassword,
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          setTypeMessage("success");
          setMessage("Mot de passe modifié avec succès");
          setOpen();
          document.getElementById("oldPassword").value = "";
          document.getElementById("newPassword").value = "";
          document.getElementById("confNewPassword").value = "";
          console.log("Mot de passe modifié avec succès");
          handleClick();
        } else {
          setTypeMessage("error");
          setMessage("Mot de passe incorrect");
          setOpen();
          console.log("Mot de passe incorrect");
          handleClick();
        }
      });
  }

  let user;

  useEffect(() => {
    /* Faire un fetch à l'API pour récupérer les informations du compte utilisateur */
    fetch("http://localhost:3001/api/account/", {
      headers: {
        Authorization: `Bearer ${document.cookie.split("=")[1]}`,
      },
    }).then((response) => {
      response.json()
        .then((data) => {
          user = data.user[0];
          prenomInputFormContainer.value = user.Prenom;
          nomInputFormContainer.value = user.Nom;
          mailInputFormContainer.value = user.Mail;
          setName(user.Prenom);
        });
    });
  });
  return (
    <Box>
      <section className="vh-100">
        <div className="container-fluid h-custom">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-9 col-lg-6 col-xl-5">
              <Typography variant="h1" color="white" id="welcomeMessage">
                {bonjourBonsoir()} {name}
              </Typography>
            </div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <form>
                <div className="form-outline mb-4" id="PrenomFormContainer">
                  <TextField sx={{ width: "100%" }} label="Prenom" variant="outlined" type="text" id="prenomInputFormContainer" defaultValue="Chargement en cours..." disabled />
                </div>
                <div className="form-outline mb-4" id="NomFormContainer">
                  <TextField sx={{ width: "100%" }} label="Nom" variant="outlined" type="text" id="nomInputFormContainer" defaultValue="Chargement en cours..." disabled />
                </div>
                <div className="form-outline mb-4" id="MailFormContainer">
                  <TextField sx={{ width: "100%" }} label="Adresse mail" variant="outlined" type="email" id="mailInputFormContainer" defaultValue="Chargement en cours..." disabled />
                </div>

                <div className="form-outline mb-4">
                  <TextField sx={{ width: "100%" }} label="Mot de passe" variant="outlined" type="password" id="oldPassword" />
                </div>
                <div className="form-outline mb-4">
                  <TextField sx={{ width: "100%" }} label="Nouveau mot de passe" variant="outlined" type="password" id="newPassword" />
                </div>
                <div className="form-outline mb-4">
                  <TextField sx={{ width: "100%" }} label="Confirmation du nouveau mot de passe" variant="outlined" autoComplete="new-password" type="password" id="confNewPassword" />
                </div>

                <div className="text-center text-lg-start mt-4 pt-2">
                  <Button variant="contained" id="UpdatePassword" onClick={updatePassword}>
                    Modifier le mot de passe
                  </Button>
                </div>
              </form>
              <div className="text-center text-lg-start mt-4 pt-2">

                <HtmlTooltip
                  title={(
                    <>
                      <Typography color="inherit">Attention !</Typography>
                      Une fois que vous avez supprimé votre compte,
                      il est impossible de revenir en arrière.
                    </>
                  )}
                >
                  <Button variant="contained" id="UpdatePassword" onClick={deleteAccount()} color="error">
                    Supprimer mon compte
                  </Button>
                </HtmlTooltip>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={typeMessage} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
