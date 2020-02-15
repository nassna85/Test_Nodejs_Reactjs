const Model = require('./Model');

function User() {
    Model.call(this, {
        tableName: "users"
    });
}

User.prototype = Object.create(Model.prototype);
User.prototype.constructor = Model;

User.prototype.findByEmail = function(email, callback) {
    const sql = `SELECT * FROM ${this.tableName} WHERE email = ?`;
    this.db.query(sql, email, callback);
};

module.exports = User;