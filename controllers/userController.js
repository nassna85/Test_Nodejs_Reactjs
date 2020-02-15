const User = require('../models/User');
const passport = require('passport');
const { cryptPassword } = require('../services/cryptPassword');

const newUser = (req, res) => {
    let dataUser = req.body;
    const user = new User();
    if(dataUser.firstname === "" || dataUser.lastname === "" || dataUser.email === "" || dataUser.password === "") {
        return res.status(400).json({ message: "Veuillez remplir tous les champs !" });
    }
    user.findAll((error, users) => {
        if(error) {
            return res.status(500).json({ message: "Error Server..." });
        }
        let findEmail = false;
        users.forEach(user => {
            if(user.email === dataUser.email) {
                findEmail = true;
            }
        });
        if(findEmail) {
            return res.status(400).json({ message: "Cet email existe déjà..." });
        } else {
            if(dataUser.password !== dataUser.cpassword) {
                return res.status(400).json({ message: "Vos deux mots de passe doivent être identique !" });
            }
            //Validation passed
            dataUser = {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                password: req.body.password
            };
            cryptPassword(dataUser.password).then(passwordHashed => {
                if(passwordHashed) {
                    dataUser.password = passwordHashed;
                    user.insert(dataUser, (error, result) => {
                        if(error) return res.status(500).json({ message: "Problème Serveur..." });
                        res.status(201).json({ message: "Votre compte a bien été créé..." });
                    })
                }
            }).catch(err => {
                return res.status(500).json({ message: err });
            });
        }
    });

};

const postLogin = (req, res) => {
    passport.authenticate("local", (error, user, info) => {
        if(error) return res.status(401).json({ message: error });
        if(!user) {
            return res.status(401).json({ message: info });
        } else {
            req.logIn(user, error => {
                if(error) return res.status(500).json({ message: "Session save went bad." });
                res.status(200).json({ message: "Authenticated...", user });
            })
        }
    })(req, res);
};

module.exports = {
    newUser,
    postLogin
};