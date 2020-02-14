import React, { Component } from "react";
import axios from "axios";
import Header from "./Header";
import Article from "./Article";

class Articles extends Component {
  constructor() {
    super();
    this.state = {
      articles: []
    };
  }

  getArticles = () => {
    axios
      .get("/articles")
      .then(response => {
        this.setState({ articles: response.data.articles });
      })
      .catch(error => {
        console.log(error);
      });
  };

  componentDidMount() {
    this.getArticles();
  }
  render() {
    const { articles } = this.state;
    return (
      <React.Fragment>
        <Header />
        <div className="container">
          <h2 className="text-center my-5">Nos articles</h2>
          <div className="row">
            {articles.map(article => (
              <Article key={article.id} article={article} />
            ))}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Articles;
