import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="jumbotron">
      <div className="container">
        <div className="row">
          <div className="col-lg-4">
            <h3>NodeJs - React</h3>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quas,
              temporibus.
            </p>
          </div>
          <div className="col-lg-4">
            <h3>Liens utiles</h3>
            <ul className="list-unstyled">
              <li>
                <Link to="/">Accueil</Link>
              </li>
              <li>
                <Link to="/articles">Nos articles</Link>
              </li>
              <li>
                <Link to="/articles/new">Créer un article</Link>
              </li>
            </ul>
          </div>
          <div className="col-lg-4">
            <h3>Contact</h3>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rem,
              pariatur!
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
