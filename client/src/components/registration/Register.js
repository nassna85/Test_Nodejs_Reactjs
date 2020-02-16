import React, {Component} from 'react';
import axios from 'axios';
import { Redirect } from "react-router-dom";

class Register extends Component {
    state = {
        data: {
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            cpassword: ""
        },
        messageSuccess: false,
        messageError: "",
        time: 3,
        redirect: null
    };

    handleChange = e => {
        const user = {...this.state.data};
        user[e.target.name] = e.target.value;
        this.setState({ data: user });
    };

    handleSubmit = e => {
        e.preventDefault();
        const user = this.state.data;
        axios({
            method: "post",
            url: "/users/new",
            data: user
        })
            .then(response => {
                if(response.status === 201) {
                    this.setState({ messageSuccess: !this.state.messageSuccess, data: "", messageError:"" });
                    const timeRedirect = setInterval(() => {
                        this.setState({ time: this.state.time - 1 });
                        if (this.state.time === 0) {
                            clearInterval(timeRedirect);
                            this.setState({ redirect: "/signin" });
                        }
                    }, 1000)
                }
            })
            .catch(error => {
                if(error.response.status === 400) {
                    this.setState({ messageError: error.response.data.message })
                }
            })
    };

    render() {
        const { data, messageSuccess, messageError, redirect, time } = this.state;
        if(redirect) {
            return <Redirect to={redirect} />
        }
        return (
            <React.Fragment>
                <section id="header-signup" className="jumbotron">
                    <div className="container">
                        <h2>Inscription</h2>
                    </div>
                </section>
                <section id="form-signup" className="my-5">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-5 m-auto">
                                {
                                    messageError ? <div className="alert alert-danger">{messageError}</div> : null
                                }
                                <form method="POST" onSubmit={this.handleSubmit} className="bg-light p-4">
                                    <div className="form-group">
                                        <label htmlFor="firstname">Prénom</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="firstname"
                                            name="firstname"
                                            value={data.firstname || ""}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="lastname">Nom</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="lastname"
                                            name="lastname"
                                            value={data.lastname || ""}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            name="email"
                                            value={data.email || ""}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">Password</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="password"
                                            name="password"
                                            value={data.password || ""}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="cpassword">Password</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="cpassword"
                                            name="cpassword"
                                            value={data.cpassword || ""}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                    <button className="btn btn-primary">S'inscrire</button>
                                    {
                                        messageSuccess ? <div className="text-success">Votre compte a bien été créé...<br /> <span className="text-secondary">Vous allez être redirigé dans {time}...</span></div> : null
                                    }
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </React.Fragment>
        )
    }
}

export default Register;