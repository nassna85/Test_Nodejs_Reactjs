const con = require("../config/db");
const today = new Date();

function Model(options) {
  this.tableName = options.tableName;
  this.created_at = today;
  this.db = con;
}

Model.prototype.findAll = function(callback) {
  const sql = `SELECT * FROM ${this.tableName}`;
  this.db.query(sql, callback);
};

Model.prototype.findById = function(id, callback) {
  const sql = `SELECT * FROM ${this.tableName} WHERE id = ?`;
  this.db.query(sql, id, callback);
};

Model.prototype.insert = function(data, callback) {
  const sql = `INSERT INTO ${this.tableName} SET ?`;
  if (data.created_at !== "undefined") {
    data.created_at = this.created_at;
  }
  this.db.query(sql, data, callback);
};

Model.prototype.update = function(data, id, callback) {
  const sql = `UPDATE ${this.tableName} SET ? WHERE id = ?`;
  this.db.query(sql, [data, id], callback);
};

Model.prototype.destroy = function(id, callback) {
  const sql = `DELETE FROM ${this.tableName} WHERE id = ?`;
  this.db.query(sql, id, callback);
};

module.exports = Model;
