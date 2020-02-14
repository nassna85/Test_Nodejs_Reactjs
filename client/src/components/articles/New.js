import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

class New extends Component {
  state = {
    article: {
      title: "",
      introduction: "",
      description: "",
      cover_image: ""
    },
    redirect: null,
    messageSuccess: false,
    time: 5,
    messageError: ""
  };

  handleChange = e => {
    const article = { ...this.state.article };
    article[e.target.name] = e.target.value;
    this.setState({ article: article });
  };

  handleSubmit = e => {
    e.preventDefault();
    const data = this.state.article;

    axios({
      method: "post",
      url: "/articles/new",
      data: data
    })
      .then(response => {
        if (response.status === 201) {
          this.setState({
            messageSuccess: !this.state.messageSuccess,
            article: ""
          });

          const displayTime = setInterval(() => {
            this.setState({ time: this.state.time - 1 });
            if (this.state.time === 0) {
              clearInterval(displayTime);
              //window.location = "/articles";
              this.setState({ redirect: "/articles" });
            }
          }, 1000);
        }
      })
      .catch(error => {
        if (error.response.status === 400) {
          this.setState({ messageError: error.response.data.message });
          console.log(error.response);
        }
      });
  };

  render() {
    const {
      article,
      messageSuccess,
      time,
      messageError,
      redirect
    } = this.state;
    if (redirect) {
      return <Redirect to={redirect} />;
    }
    return (
      <React.Fragment>
        <section id="header-new-article" className="jumbotron">
          <div className="container">
            <h2>Vous avez décidé de vous exprimer ? C'est une bonne chose !</h2>
            <p>Laisser parler votre imagination...</p>
          </div>
        </section>
        <section id="form-new-article">
          <div className="container">
            {messageError ? (
              <div className="alert alert-danger">{messageError}</div>
            ) : (
              ""
            )}
            <form action="POST" onSubmit={this.handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Titre de votre article"
                  name="title"
                  value={article.title || ""}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Introduction de votre article"
                  name="introduction"
                  value={article.introduction || ""}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <textarea
                  className="form-control"
                  rows="3"
                  name="description"
                  placeholder="Description de votre article"
                  value={article.description || ""}
                  onChange={this.handleChange}
                ></textarea>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Image principale de votre article"
                  name="cover_image"
                  value={article.cover_image || ""}
                  onChange={this.handleChange}
                />
              </div>
              <button className="btn btn-success mt-2 mb-5">Confirmer</button>
            </form>
            {messageSuccess ? (
              <div>
                <p className="text-success">
                  Votre article a bien été publié ! Merci{" "}
                  <span role="img" aria-label="Emoji">
                    😄
                  </span>
                </p>
                <p>Vous allez être redigiré dans {time} secondes...</p>
              </div>
            ) : null}
          </div>
        </section>
      </React.Fragment>
    );
  }
}

export default New;
