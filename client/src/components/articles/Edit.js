import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

class Edit extends Component {
  state = {
    article: {
      title: "",
      introduction: "",
      description: "",
      cover_image: ""
    },
    messageSuccess: false,
    time: 5,
    redirect: null
  };

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

  handleChange = e => {
    const article = { ...this.state.article };
    article[e.target.name] = e.target.value;
    this.setState({ article: article });
  };

  handleSubmit = e => {
    e.preventDefault();
    const articleID = this.props.match.params.id;
    const data = this.state.article;
    axios({
      method: "put",
      url: `/articles/${articleID}/edit`,
      data: data
    });
    this.setState({ messageSuccess: true });
    const displayTime = setInterval(() => {
      this.setState({ time: this.state.time - 1 });
      if (this.state.time === 0) {
        clearInterval(displayTime);
        this.setState({ redirect: "/articles" });
      }
    }, 1000);
  };

  componentDidMount() {
    this.getArticle();
  }
  render() {
    const { article, messageSuccess, time, redirect } = this.state;
    if (redirect) {
      return <Redirect to={redirect} />;
    }
    return (
      <React.Fragment>
        <section id="header-edit-article" className="jumbotron">
          <div className="container">
            <h2>Vous souhaitez modifier l'article : {article.title} ?</h2>
            <p>
              Remplissez le formulaire ci-dessous, ensuite confirmer vos
              modifications...
            </p>
          </div>
        </section>
        <section id="form-edit-article">
          <div className="container">
            <form className="mb-5" onSubmit={this.handleSubmit} method="POST">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Titre de votre article"
                  name="title"
                  value={article.title}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Introduction de votre article"
                  name="introduction"
                  value={article.introduction}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <textarea
                  className="form-control"
                  rows="3"
                  name="description"
                  placeholder="Description de votre article"
                  value={article.description}
                  onChange={this.handleChange}
                ></textarea>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Image principale de votre article"
                  name="cover_image"
                  value={article.cover_image}
                  onChange={this.handleChange}
                />
              </div>
              <button className="btn btn-success">Confirmer</button>
            </form>
            {messageSuccess ? (
              <div>
                <p className="text-success">Votre article a bien été modifié</p>
                <p>
                  Vous allez être redirigé vers la liste des articles dans{" "}
                  {time} secondes
                </p>
              </div>
            ) : (
              ""
            )}
          </div>
        </section>
      </React.Fragment>
    );
  }
}

export default Edit;
