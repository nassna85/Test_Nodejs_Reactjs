const Article = require("../models/Article");

module.exports = {
  index: (req, res) => {
    const article = new Article();
    article.findAll((error, articles) => {
      if (error) {
        console.log(error);
        throw error;
      }
      return res.status(200).json({ articles });
    });
  },

  show: (req, res) => {
    const articleID = req.params.id;
    const article = new Article();
    if (isNaN(articleID)) {
      return res.status(400).json({
        status: "error",
        message: "Reqête invalide, ID doit être un nombre"
      });
    }
    article.findById(articleID, (error, article) => {
      if (error) {
        console.log(error);
        throw error;
      }
      if (!article.length) {
        return res.status(404).json({
          status: "error",
          message: "Aucun article correspond à cet ID"
        });
      }
      return res.status(200).json({ status: "success", article });
    });
  },

  new: (req, res) => {
    const { title, introduction, description, cover_image } = req.body;
    if (
      title === "" ||
      introduction === "" ||
      description === "" ||
      cover_image === ""
    ) {
      return res.status(400).json({
        status: "error",
        message: "Veuillez remplir tous les champs !"
      });
    }
    //Validation passed
    const newArticle = new Article();
    const data = req.body;
    newArticle.insert(data, (error, result) => {
      if (error) {
        console.log(error);
        throw error;
      }
      return res
        .status(201)
        .json({ status: "success", message: "L'article a bien été créé" });
    });
  },

  edit: (req, res) => {
    const { title, introduction, description, cover_image } = req.body;
    if (
      title === "" ||
      introduction === "" ||
      description === "" ||
      cover_image === ""
    ) {
      return res.status(400).json({
        status: "error",
        message: "Veuillez remplir tous les champs !"
      });
    }
    //Validation passed
    const articleID = req.params.id;
    const updatedArticle = new Article();
    const data = req.body;
    if (isNaN(articleID)) {
      return res.status(400).json({
        status: "error",
        message: "Reqête invalide, ID doit être un nombre"
      });
    }
    //I use checkDateTime (from Model Article) for format date before insert in database because the current format is not valid
    updatedArticle.checkDateTime(data, articleID, (error, result) => {
      if (error) {
        console.log(error);
        throw error;
      }
      return res
        .status(200)
        .json({ status: "success", message: "L'article a bien été modifié" });
    });
  },

  delete: (req, res) => {
    const articleID = req.params.id;
    if (isNaN(articleID)) {
      return res.status(400).json({
        status: "error",
        message: "Requête invalide, ID doit être un nombre"
      });
    }
    const article = new Article();
    article.destroy(articleID, (error, result) => {
      if (error) {
        console.log(error);
        throw error;
      }
      return res
        .status(200)
        .json({ status: "success", message: "L'article a bien été supprimé" });
    });
  }
};
