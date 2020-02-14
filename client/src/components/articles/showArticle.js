import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class showArticle extends Component {
  constructor() {
    super();
    this.state = {
      article: {}
    };
  }

  getArticle = () => {
    const articleID = this.props.match.params.id;
    axios
      .get(`/articles/${articleID}/show`)
      .then(response => {
        this.setState({ article: response.data.article[0] });
      })
      .catch(error => {
        console.log(error);
      });
  };

  componentDidMount() {
    this.getArticle();
  }
  render() {
    const { article } = this.state;
    const date = article.created_at;
    const formatDate = new Date(date).toDateString();
    return (
      <React.Fragment>
        <section id="show-article">
          <img
            src={article.cover_image}
            className="img-fluid"
            alt="Responsiveimage"
            style={{ width: "100%", maxHeight: "550px" }}
          />
          <div className="container">
            <div className="mt-5">
              <Link
                to={`/articles/${article.id}/edit`}
                className="btn btn-success mr-2"
              >
                Modifier
              </Link>
              <Link to="#" className="btn btn-danger">
                Supprimer
              </Link>
            </div>
            <h2 className="my-5">{article.title}</h2>
            <small>{formatDate}</small>
            <p>{article.introduction}</p>
            <hr />
            <p className="mt-5">{article.description}</p>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

export default showArticle;
