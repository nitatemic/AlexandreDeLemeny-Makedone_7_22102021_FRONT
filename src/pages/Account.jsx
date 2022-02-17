import React, { useEffect } from "react";
import "./css/Login.css";
import {
  Button, Box, Snackbar, Stack, TextField, ThemeProvider, Tooltip, Typography, tooltipClasses,
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
        });
    });
  });
  return (
    <Box>
      <section className="vh-100">
        <div className="container-fluid h-custom">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-9 col-lg-6 col-xl-5">
              /* TODO : Faire un message en gros */
              <p>
                Bonjour Alexandre
              </p>
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
                  <TextField sx={{ width: "100%" }} label="Confirmation du nouveau mot de passe" variant="outlined" type="password" id="confNewPassword" />
                </div>

                <div className="text-center text-lg-start mt-4 pt-2">
                  <Button variant="contained" id="UpdatePassword">
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
                  <Button variant="contained" id="UpdatePassword" color="error">
                    Supprimer mon compte
                  </Button>
                </HtmlTooltip>

              </div>
            </div>
          </div>
        </div>
      </section>
    </Box>
  );
}
