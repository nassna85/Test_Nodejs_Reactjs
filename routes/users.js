const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.get("/logout", userController.logout);

router.post("/new", userController.newUser);

router.post("/login", userController.postLogin);

module.exports = router;