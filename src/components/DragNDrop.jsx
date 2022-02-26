import React, { useEffect } from "react";

import "./css/dragNDrop.css";
import { Button } from "@mui/material";

export default function DragNDrop(props) {
  // Lorsque le composant est monté, on lance la fonction
  useEffect(() => {
    const dropArea = document.querySelector(".drag-image");
    const dragText = dropArea.querySelector("h6");
    const button = dropArea.querySelector("button");
    const input = dropArea.querySelector("input");
    let file;

    function clickOnButton(e) {
      e.preventDefault();
      input.click();
    }
    button.addEventListener("click", clickOnButton);

    function inputClick() {
      dropArea.classList.add("active");
      file = input.files[0];
      props.fileUpload(file);
      viewfile(file);
    }
    input.addEventListener("change", inputClick);

    function dragOver(e) {
      e.preventDefault();
      dropArea.classList.add("active");
      dragText.textContent = "Relâchez pour envoyer le fichier";
    }
    dropArea.addEventListener("dragover", dragOver);

    function dragLeave(e) {
      dropArea.classList.remove("active");
      dragText.textContent = "Glisser & Déposer pour envoyer un fichier";
    }
    dropArea.addEventListener("dragleave", dragLeave);

    function drop(e) {
      e.preventDefault();
      file = e.dataTransfer.files[0];
      props.fileUpload(file);
      
      viewfile(file);
    }
    dropArea.addEventListener("drop", drop);
  }, []);

  return (
    <div className="drag-image">
      <div className="icon"><i className="fas fa-cloud-upload-alt" /></div>
      <h6>Glissez-déposez un fichier</h6>
      {" "}
      <span>OU</span>
      <Button variant="outlined" id="uploadButton">Sélectionner un fichier</Button>
      <input type="file" id="fileToUpload" hidden />
    </div>
  );
}

function viewfile(file) {
  const dropArea = document.querySelector(".drag-image");
  const dragText = dropArea.querySelector("h6");
  const fileType = file.type;
  const validExtensions = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
  if (validExtensions.includes(fileType)) {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      const fileURL = fileReader.result;
      const imgTag = `<img src="${fileURL}" alt="image">`;
      dropArea.innerHTML = imgTag;
    };
    fileReader.readAsDataURL(file);
  } else {
    alert("Ce n'est pas une image, veuillez recommencer avec un autre fichier.");
    dropArea.classList.remove("active");
    dragText.textContent = "Glisser & Déposer pour envoyer le fichier";
  }
}
