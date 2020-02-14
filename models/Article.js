const Model = require("./Model");

function Article() {
  Model.call(this, {
    tableName: "articles"
  });
}

Article.prototype = Object.create(Model.prototype);
Article.prototype.constructor = Model;

//Because when i update in React, when insert data, the format of datetime is not correct for sql
Article.prototype.checkDateTime = function(data, id, callback) {
  if (data.created_at) {
    data.created_at = data.created_at.replace(/[TZ]/g, " ");
  }
  this.update(data, id, callback);
};

module.exports = Article;
