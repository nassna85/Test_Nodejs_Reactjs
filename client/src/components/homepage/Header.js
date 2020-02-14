import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <section id="header-homepage" className="jumbotron">
      <div className="container">
        <h1>Ceci est un test d'une application avec NodeJs et React...</h1>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cumque
          dolores, sequi quibusdam quod expedita nisi consectetur nobis nihil
          iusto vero, praesentium aliquid numquam assumenda! Nam nisi
          exercitationem id repellat quae.
        </p>
        <Link to="/articles" className="btn btn-primary">
          Voir les articles
        </Link>
      </div>
    </section>
  );
};

export default Header;
