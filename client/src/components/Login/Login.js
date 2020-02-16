import React, {Component} from 'react';
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

class Login extends Component {
    state = {
        email: "",
        password: "",
        messageError: "",
        messageSuccess: false,
        time: 3,
        redirect: null
    };

    handleSubmit = e => {
        e.preventDefault();
        const email = this.state.email;
        const password = this.state.password;
        axios.post('/users/login', {
            email,
            password
        })
            .then(response => {
                console.log(response);
                console.log(response.headers);
                if(response.status === 200) {
                    this.setState({ messageError: "", email: "", password: "", messageSuccess: true });
                    //localStorage.setItem("sess", response.data.session);
                    const timeRedirect = setInterval(() => {
                        this.setState({ time: this.state.time - 1 });
                        if (this.state.time === 0) {
                            clearInterval(timeRedirect);
                            this.setState({ redirect: "/" });
                        }
                    }, 1000)
                }
            })
            .catch(error => {
                console.log(error.response);
                if(error.response.status === 400) {
                    this.setState({ messageError: error.response.data.message })
                } else if(error.response.status === 401) {
                    this.setState({ messageError: error.response.data.message.message })
                }
            })
    };

    handleChange = e => {
        this.setState({ [e.target.name] : e.target.value });
    };

    render() {
        const { email, password, messageError, messageSuccess, time, redirect } = this.state;
        if(redirect) return <Redirect to={redirect} />
        return (
            <React.Fragment>
                <section id="header-signin" className="jumbotron">
                    <div className="container">
                        <h2>Page de connexion...</h2>
                        <Link to="/signup">S'inscrire</Link>
                    </div>
                </section>

                <section id="form-signin" className="my-5">
                    <div className="container">
                        <form method="POST" onSubmit={this.handleSubmit}>
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-4 m-auto bg-light p-4">
                                        {
                                            messageError ? <div className="alert alert-danger">{messageError}</div> : null
                                        }
                                        <div className="form-group">
                                            <label htmlFor="email">Email</label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                id="email"
                                                name="email"
                                                value={email || ""}
                                                onChange={this.handleChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="password">Mot de passe</label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                id="password"
                                                name="password"
                                                value={password || ""}
                                                onChange={this.handleChange}
                                            />
                                        </div>
                                        <button className="btn btn-success">Se connecter</button>
                                        {
                                            messageSuccess ? <div className="text-success">Vous êtes désormais connecté...<br /> <span className="text-secondary">Vous allez être redirigé dans {time}...</span></div> : null
                                        }
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </section>
            </React.Fragment>
        );
    }
}

export default Login;