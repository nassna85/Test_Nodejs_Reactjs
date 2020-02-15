const bcrypt = require('bcrypt');

const cryptPassword = password => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, 10, (err, hash) => {
            if(hash) return resolve(hash);
            else return reject("Problème lors du hashage du mot de passe...");
        });
    })
};

const comparePassword = (password, passwordHashed) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, passwordHashed, (err, result) => {
            if(result) return resolve(result);
            else return reject("Mot de passe incorrect !");
        });
    })
};

module.exports = {
    cryptPassword,
    comparePassword
};