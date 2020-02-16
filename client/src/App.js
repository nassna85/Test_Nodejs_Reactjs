import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import Home from "./components/homepage/Home";
import Articles from "./components/articles/Articles";
import New from "./components/articles/New";
import showArticle from "./components/articles/showArticle";
import Edit from "./components/articles/Edit";
import Register from "./components/registration/Register";
import Login from "./components/Login/Login";
import Footer from "./components/footer/Footer";

function App() {
  return (
    <Router>
      <Navigation />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/articles/new" component={New} />
        <Route path="/articles/:id/edit" component={Edit} />
        <Route path="/articles/:id" component={showArticle} />
        <Route path="/articles" component={Articles} />
          <Route path="/signup" component={Register} />
          <Route path="/signin" component={Login} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
