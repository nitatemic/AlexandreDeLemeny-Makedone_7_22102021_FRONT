import React from "react";
import { useEffect } from "react";
import './css/dragNDrop.css';
import { Button }  from "@mui/material"

export default function DragNDrop(props) {
    useEffect(() => {
        console.log(props);
        const dropArea = document.querySelector(".drag-image"),
            dragText = dropArea.querySelector("h6"),
            button = dropArea.querySelector("button"),
            input = dropArea.querySelector("input");
            let file;
        button.addEventListener("click", function(event) {
            event.preventDefault();
            input.click();
        });

        input.addEventListener("change", function () {
            file = this.files[0];
            dropArea.classList.add("active");
            console.log(file);
            props.fileToUpload = file;
            viewfile(file);
        });

        dropArea.addEventListener("dragover", (event) => {
            event.preventDefault();
            dropArea.classList.add("active");
            dragText.textContent = "Relâchez pour envoyer le fichier";
        });


        dropArea.addEventListener("dragleave", () => {
            dropArea.classList.remove("active");
            dragText.textContent = "Glisser & Déposer pour envoyer un fichier";
        });

        dropArea.addEventListener("drop", (event) => {
            event.preventDefault();

            file = event.dataTransfer.files[0];
            props.fileUpload(file);
            viewfile(file);
        });

    })
    return(
        <div className="drag-image">
            <div className="icon"><i className="fas fa-cloud-upload-alt"></i></div>
            <h6>Glissez-déposez un fichier</h6> <span>OU</span>
            <Button variant="outlined" id="uploadButton">Sélectionner un fichier</Button>
            <input type="file" id="fileToUpload" hidden/>
        </div>
    )
}

function viewfile(file) {
    const dropArea = document.querySelector(".drag-image"),
        dragText = dropArea.querySelector("h6"),
        button = dropArea.querySelector("button"),
        input = dropArea.querySelector("input");
    let fileType = file.type;
    let validExtensions = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
    if (validExtensions.includes(fileType)) {
        let fileReader = new FileReader();
        fileReader.onload = () => {
            let fileURL = fileReader.result;
            let imgTag = `<img src="${fileURL}" alt="image">`;
            dropArea.innerHTML = imgTag;
        }
        fileReader.readAsDataURL(file);
    } else {
        alert("Ce n'est pas une image, veuillez recommencer avec un autre fichier.");
        dropArea.classList.remove("active");
        dragText.textContent = "Glisser & Déposer pour envoyer le fichier";
    }
}
