import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <section id="header-articles" className="jumbotron">
      <div className="container">
        <h2>
          Retrouvez tous les articles publiés par des personnes qui ont décidées
          de s'exprimer
        </h2>
        <p>Vous souhaitez également vous exprimer ? </p>
        <Link to="/articles/new" className="btn btn-primary">
          Je veux m'exprimer !
        </Link>
      </div>
    </section>
  );
};

export default Header;
