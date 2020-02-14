const express = require("express");
const app = express();
require("dotenv").config();
const articlesRouter = require("./routes/articles");

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Middleware Routes
app.use("/api/articles", articlesRouter);

const PORT = process.env.PORT;

app.listen(PORT, () => console.log("Server is runnning on port " + PORT));
