import React from "react";
import { Link } from "react-router-dom";

const Article = props => {
  return (
    <div className="col-lg-4 mb-5">
      <div className="card">
        <img
          src={props.article.cover_image}
          className="card-img-top"
          alt={props.article.title}
        />
        <div className="card-body">
          <h5 className="card-title">{props.article.title}</h5>
          <p className="card-text">{props.article.introduction}</p>
          <Link
            to={`/articles/${props.article.id}`}
            className="btn btn-primary"
          >
            En savoir plus
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Article;
