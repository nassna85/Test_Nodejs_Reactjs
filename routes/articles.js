const express = require("express");
const router = express.Router();
const articleController = require("../controllers/articleController");

router.get("/", articleController.index);

router.get("/:id/show", articleController.show);

router.delete("/:id/delete", articleController.delete);

router.post("/new", articleController.new);

router.put("/:id/edit", articleController.edit);

module.exports = router;
