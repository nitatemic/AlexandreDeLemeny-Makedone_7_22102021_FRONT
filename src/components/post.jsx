import React from 'react';
import { Link } from 'react-router-dom';

//Un post avec un titre, un contenu, un auteur et les commentaires associés
function Post(props) {
  return (
    <div className="post">
      <h2 className="post-title">{props.Title}</h2>
      <img className="img-fluid" src={props.Body} alt="Image"/>  {/*Utiliser une service comme Azure computer vision pour le alt ?*/}
      <p className="post-author">{props.Author}</p>
      <p className="post-comments-count">{props.comments.length} comments</p>
      <ul className="post-comments-list">
        {props.comments.map((comment, index) => (
          <li key={index}>
            <p>{comment.content}</p>
            <p>{comment.Author}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
